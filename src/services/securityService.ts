
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'data_access' | 'configuration_change';
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

class SecurityService {
  private static instance: SecurityService;
  private loginAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          action: event.type.toUpperCase(),
          resource_type: 'security',
          user_id: event.userId,
          ip_address: event.ipAddress,
          user_agent: event.userAgent,
          details: event.details,
          severity: event.riskLevel.toUpperCase()
        });

      if (error) {
        console.error('Failed to log security event:', error);
      }

      // Handle high-risk events
      if (event.riskLevel === 'critical' || event.riskLevel === 'high') {
        this.handleHighRiskEvent(event);
      }
    } catch (err) {
      console.error('Security logging failed:', err);
    }
  }

  validateLoginAttempt(identifier: string): { allowed: boolean; remainingAttempts?: number } {
    const key = identifier; // Could be email, IP, or combination
    const attempts = this.loginAttempts.get(key);
    const maxAttempts = 5;
    const lockoutDuration = 15 * 60 * 1000; // 15 minutes

    if (!attempts) {
      this.loginAttempts.set(key, { count: 1, lastAttempt: new Date() });
      return { allowed: true, remainingAttempts: maxAttempts - 1 };
    }

    // Check if lockout period has expired
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
    if (timeSinceLastAttempt > lockoutDuration) {
      this.loginAttempts.set(key, { count: 1, lastAttempt: new Date() });
      return { allowed: true, remainingAttempts: maxAttempts - 1 };
    }

    // Check if max attempts exceeded
    if (attempts.count >= maxAttempts) {
      return { allowed: false };
    }

    // Increment attempt count
    attempts.count++;
    attempts.lastAttempt = new Date();
    this.loginAttempts.set(key, attempts);

    return { 
      allowed: true, 
      remainingAttempts: maxAttempts - attempts.count 
    };
  }

  resetLoginAttempts(identifier: string): void {
    this.loginAttempts.delete(identifier);
  }

  private handleHighRiskEvent(event: SecurityEvent): void {
    console.warn('HIGH RISK SECURITY EVENT:', {
      type: event.type,
      riskLevel: event.riskLevel,
      userId: event.userId,
      timestamp: new Date()
    });

    // In production, would trigger immediate alerts
    if (event.riskLevel === 'critical') {
      this.triggerSecurityAlert(event);
    }
  }

  private triggerSecurityAlert(event: SecurityEvent): void {
    // Production implementation would send to security team
    console.error('SECURITY ALERT TRIGGERED:', event);
  }

  // Input sanitization
  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  // Validate file uploads
  validateFileUpload(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['.csv', '.txt', '.json', '.xml'];
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds maximum limit' };
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(extension)) {
      return { valid: false, error: 'File type not allowed' };
    }

    return { valid: true };
  }

  // Session validation
  async validateSession(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }
}

export const securityService = SecurityService.getInstance();
