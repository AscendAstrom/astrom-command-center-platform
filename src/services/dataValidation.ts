
import { z } from 'zod';

// Schema definitions for production data validation
export const patientSchema = z.object({
  mrn: z.string().min(1, 'MRN is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['M', 'F', 'Other']).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export const bedSchema = z.object({
  bedNumber: z.string().min(1, 'Bed number is required'),
  departmentId: z.string().uuid('Invalid department ID'),
  bedType: z.string().optional(),
  roomNumber: z.string().optional(),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'BLOCKED']),
});

export const staffSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  position: z.string().min(1, 'Position is required'),
  departmentId: z.string().uuid('Invalid department ID').optional(),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']).optional(),
});

export const dataSourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['HL7', 'FHIR', 'API', 'CSV', 'MANUAL', 'EPIC']),
  ingestionMode: z.enum(['BATCH', 'STREAM']),
  config: z.object({}).passthrough(),
  fieldMappings: z.object({}).passthrough(),
});

class DataValidationService {
  private static instance: DataValidationService;

  static getInstance(): DataValidationService {
    if (!DataValidationService.instance) {
      DataValidationService.instance = new DataValidationService();
    }
    return DataValidationService.instance;
  }

  validatePatient(data: unknown): { valid: boolean; errors?: string[]; data?: any } {
    try {
      const validated = patientSchema.parse(data);
      return { valid: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return { valid: false, errors: ['Unknown validation error'] };
    }
  }

  validateBed(data: unknown): { valid: boolean; errors?: string[]; data?: any } {
    try {
      const validated = bedSchema.parse(data);
      return { valid: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return { valid: false, errors: ['Unknown validation error'] };
    }
  }

  validateStaff(data: unknown): { valid: boolean; errors?: string[]; data?: any } {
    try {
      const validated = staffSchema.parse(data);
      return { valid: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return { valid: false, errors: ['Unknown validation error'] };
    }
  }

  validateDataSource(data: unknown): { valid: boolean; errors?: string[]; data?: any } {
    try {
      const validated = dataSourceSchema.parse(data);
      return { valid: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return { valid: false, errors: ['Unknown validation error'] };
    }
  }

  // Bulk validation for CSV imports
  validateBulkData<T>(
    data: unknown[], 
    validator: (item: unknown) => { valid: boolean; errors?: string[]; data?: T }
  ): { validItems: T[]; invalidItems: { index: number; errors: string[]; data: unknown }[] } {
    const validItems: T[] = [];
    const invalidItems: { index: number; errors: string[]; data: unknown }[] = [];

    data.forEach((item, index) => {
      const result = validator(item);
      if (result.valid && result.data) {
        validItems.push(result.data);
      } else {
        invalidItems.push({
          index,
          errors: result.errors || ['Unknown error'],
          data: item
        });
      }
    });

    return { validItems, invalidItems };
  }
}

export const dataValidator = DataValidationService.getInstance();
