
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, X, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { securityService } from "@/services/securityService";
import { dataValidator } from "@/services/dataValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CSVConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const CSVConfigurationFields = ({ config, updateConfig }: CSVConfigurationFieldsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file security
      const validation = securityService.validateFileUpload(file);
      if (!validation.valid) {
        setValidationErrors([validation.error || 'File validation failed']);
        return;
      }

      setValidationErrors([]);
      setUploadedFile(file);
      updateConfig('uploadedFile', file);
      updateConfig('filePath', ''); // Clear the path when file is uploaded
      
      // Log security event for file upload
      securityService.logSecurityEvent({
        type: 'data_access',
        details: {
          action: 'file_upload',
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        },
        riskLevel: 'low'
      });
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setValidationErrors([]);
    updateConfig('uploadedFile', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFilePathChange = (value: string) => {
    // Sanitize input for security
    const sanitizedValue = securityService.sanitizeInput(value);
    updateConfig('filePath', sanitizedValue);
    
    if (sanitizedValue && uploadedFile) {
      // Clear uploaded file if user starts typing a path
      setUploadedFile(null);
      updateConfig('uploadedFile', null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Label className="text-foreground font-medium">Data Source</Label>
        
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert className="border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              <ul className="space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm">• {error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        {/* File Upload Option */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Upload CSV File</Label>
          <div className="text-xs text-muted-foreground mb-2">
            Maximum file size: 10MB. Allowed formats: .csv, .txt
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
              disabled={!!config.filePath}
            >
              <Upload className="h-4 w-4" />
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            {uploadedFile && (
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                <span className="text-sm text-foreground">{uploadedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearUploadedFile}
                  className="h-auto p-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* OR separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-border"></div>
          <span className="text-xs text-muted-foreground bg-background px-2">OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* File Path/URL Option */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">File Path/URL</Label>
          <div className="text-xs text-muted-foreground mb-2">
            Secure HTTPS URLs only. Local paths must be accessible by the system.
          </div>
          <Input
            value={config.filePath || ''}
            onChange={(e) => handleFilePathChange(e.target.value)}
            placeholder="https://example.com/data.csv or /secure/path/to/file.csv"
            className="bg-background border-border text-foreground"
            disabled={!!uploadedFile}
          />
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">Delimiter</Label>
        <Select value={config.delimiter || ','} onValueChange={(value) => updateConfig('delimiter', value)}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value=",">Comma (,)</SelectItem>
            <SelectItem value=";">Semicolon (;)</SelectItem>
            <SelectItem value="\t">Tab</SelectItem>
            <SelectItem value="|">Pipe (|)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.hasHeader || false}
          onCheckedChange={(checked) => updateConfig('hasHeader', checked)}
        />
        <Label className="text-foreground font-medium">File has header row</Label>
      </div>

      {/* Production Settings */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="text-foreground font-medium">Production Settings</Label>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={config.enableValidation || true}
            onCheckedChange={(checked) => updateConfig('enableValidation', checked)}
          />
          <Label className="text-sm">Enable data validation</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={config.enableAuditLogging || true}
            onCheckedChange={(checked) => updateConfig('enableAuditLogging', checked)}
          />
          <Label className="text-sm">Enable audit logging</Label>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Batch size for processing</Label>
          <Select 
            value={config.batchSize?.toString() || '1000'} 
            onValueChange={(value) => updateConfig('batchSize', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100 records</SelectItem>
              <SelectItem value="500">500 records</SelectItem>
              <SelectItem value="1000">1000 records</SelectItem>
              <SelectItem value="5000">5000 records</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
