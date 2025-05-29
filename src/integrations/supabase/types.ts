export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          assigned_to: string | null
          created_at: string
          id: string
          message: string
          metadata: Json | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          source_id: string | null
          source_type: string
          status: Database["public"]["Enums"]["alert_status"] | null
          title: string
        }
        Insert: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          source_id?: string | null
          source_type: string
          status?: Database["public"]["Enums"]["alert_status"] | null
          title: string
        }
        Update: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          source_id?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["alert_status"] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          created_at: string
          created_by: string | null
          description: string | null
          execution_count: number | null
          id: string
          last_execution: string | null
          name: string
          status: Database["public"]["Enums"]["automation_status"] | null
          trigger_conditions: Json
          updated_at: string
        }
        Insert: {
          actions: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          last_execution?: string | null
          name: string
          status?: Database["public"]["Enums"]["automation_status"] | null
          trigger_conditions: Json
          updated_at?: string
        }
        Update: {
          actions?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          last_execution?: string | null
          name?: string
          status?: Database["public"]["Enums"]["automation_status"] | null
          trigger_conditions?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      beds: {
        Row: {
          bed_number: string
          bed_type: string | null
          capabilities: Json | null
          created_at: string
          department_id: string
          id: string
          last_cleaned: string | null
          location: Json | null
          patient_id: string | null
          room_number: string | null
          status: Database["public"]["Enums"]["bed_status"] | null
          updated_at: string
        }
        Insert: {
          bed_number: string
          bed_type?: string | null
          capabilities?: Json | null
          created_at?: string
          department_id: string
          id?: string
          last_cleaned?: string | null
          location?: Json | null
          patient_id?: string | null
          room_number?: string | null
          status?: Database["public"]["Enums"]["bed_status"] | null
          updated_at?: string
        }
        Update: {
          bed_number?: string
          bed_type?: string | null
          capabilities?: Json | null
          created_at?: string
          department_id?: string
          id?: string
          last_cleaned?: string | null
          location?: Json | null
          patient_id?: string | null
          room_number?: string | null
          status?: Database["public"]["Enums"]["bed_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beds_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beds_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboards: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          filters: Json | null
          id: string
          is_public: boolean | null
          layout: Json
          name: string
          organization: string | null
          refresh_interval: number | null
          type: Database["public"]["Enums"]["dashboard_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          id?: string
          is_public?: boolean | null
          layout?: Json
          name: string
          organization?: string | null
          refresh_interval?: number | null
          type?: Database["public"]["Enums"]["dashboard_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          id?: string
          is_public?: boolean | null
          layout?: Json
          name?: string
          organization?: string | null
          refresh_interval?: number | null
          type?: Database["public"]["Enums"]["dashboard_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_pipelines: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          schedule_cron: string | null
          source_id: string | null
          status: string
          target_schema: Json
          transformation_rules: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          schedule_cron?: string | null
          source_id?: string | null
          status?: string
          target_schema: Json
          transformation_rules?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          schedule_cron?: string | null
          source_id?: string | null
          status?: string
          target_schema?: Json
          transformation_rules?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_pipelines_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_pipelines_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_quality_scores: {
        Row: {
          accuracy_score: number | null
          completeness_score: number | null
          consistency_score: number | null
          created_at: string
          data_source_id: string
          evaluation_date: string
          id: string
          issues: Json | null
          overall_score: number | null
          recommendations: Json | null
          timeliness_score: number | null
        }
        Insert: {
          accuracy_score?: number | null
          completeness_score?: number | null
          consistency_score?: number | null
          created_at?: string
          data_source_id: string
          evaluation_date?: string
          id?: string
          issues?: Json | null
          overall_score?: number | null
          recommendations?: Json | null
          timeliness_score?: number | null
        }
        Update: {
          accuracy_score?: number | null
          completeness_score?: number | null
          consistency_score?: number | null
          created_at?: string
          data_source_id?: string
          evaluation_date?: string
          id?: string
          issues?: Json | null
          overall_score?: number | null
          recommendations?: Json | null
          timeliness_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "data_quality_scores_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          config: Json
          created_at: string
          created_by: string | null
          description: string | null
          field_mappings: Json
          health_score: number | null
          id: string
          ingestion_mode: Database["public"]["Enums"]["ingestion_mode"]
          last_error: string | null
          last_health_check: string | null
          last_sync: string | null
          metadata: Json | null
          name: string
          records_count: number | null
          schedule_cron: string | null
          status: Database["public"]["Enums"]["sync_status"]
          tags: string[] | null
          type: Database["public"]["Enums"]["data_source_type"]
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          field_mappings?: Json
          health_score?: number | null
          id?: string
          ingestion_mode?: Database["public"]["Enums"]["ingestion_mode"]
          last_error?: string | null
          last_health_check?: string | null
          last_sync?: string | null
          metadata?: Json | null
          name: string
          records_count?: number | null
          schedule_cron?: string | null
          status?: Database["public"]["Enums"]["sync_status"]
          tags?: string[] | null
          type: Database["public"]["Enums"]["data_source_type"]
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          field_mappings?: Json
          health_score?: number | null
          id?: string
          ingestion_mode?: Database["public"]["Enums"]["ingestion_mode"]
          last_error?: string | null
          last_health_check?: string | null
          last_sync?: string | null
          metadata?: Json | null
          name?: string
          records_count?: number | null
          schedule_cron?: string | null
          status?: Database["public"]["Enums"]["sync_status"]
          tags?: string[] | null
          type?: Database["public"]["Enums"]["data_source_type"]
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          capacity: number | null
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          location: Json | null
          manager_id: string | null
          name: string
          type: Database["public"]["Enums"]["department_type"]
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: Json | null
          manager_id?: string | null
          name: string
          type: Database["public"]["Enums"]["department_type"]
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: Json | null
          manager_id?: string | null
          name?: string
          type?: Database["public"]["Enums"]["department_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          bed_id: string | null
          created_at: string
          department_id: string | null
          equipment_type: string
          id: string
          last_maintenance: string | null
          location: Json | null
          model: string | null
          name: string
          next_maintenance: string | null
          serial_number: string | null
          specifications: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          bed_id?: string | null
          created_at?: string
          department_id?: string | null
          equipment_type: string
          id?: string
          last_maintenance?: string | null
          location?: Json | null
          model?: string | null
          name: string
          next_maintenance?: string | null
          serial_number?: string | null
          specifications?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          bed_id?: string | null
          created_at?: string
          department_id?: string | null
          equipment_type?: string
          id?: string
          last_maintenance?: string | null
          location?: Json | null
          model?: string | null
          name?: string
          next_maintenance?: string | null
          serial_number?: string | null
          specifications?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      ingestion_logs: {
        Row: {
          completed_at: string | null
          data_source_id: string | null
          error_details: Json | null
          id: string
          message: string | null
          records_processed: number | null
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          data_source_id?: string | null
          error_details?: Json | null
          id?: string
          message?: string | null
          records_processed?: number | null
          started_at?: string
          status: string
        }
        Update: {
          completed_at?: string | null
          data_source_id?: string | null
          error_details?: Json | null
          id?: string
          message?: string | null
          records_processed?: number | null
          started_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingestion_logs_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          authentication: Json | null
          configuration: Json | null
          created_at: string
          created_by: string | null
          endpoint_url: string | null
          id: string
          last_sync: string | null
          name: string
          status: Database["public"]["Enums"]["integration_status"] | null
          sync_frequency: number | null
          type: string
          updated_at: string
        }
        Insert: {
          authentication?: Json | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          endpoint_url?: string | null
          id?: string
          last_sync?: string | null
          name: string
          status?: Database["public"]["Enums"]["integration_status"] | null
          sync_frequency?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          authentication?: Json | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          endpoint_url?: string | null
          id?: string
          last_sync?: string | null
          name?: string
          status?: Database["public"]["Enums"]["integration_status"] | null
          sync_frequency?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kpis: {
        Row: {
          category: Database["public"]["Enums"]["kpi_category"]
          created_at: string
          created_by: string | null
          critical_threshold: number | null
          data_source_id: string | null
          description: string | null
          formula: string
          id: string
          name: string
          target_value: number | null
          unit: string | null
          updated_at: string
          warning_threshold: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["kpi_category"]
          created_at?: string
          created_by?: string | null
          critical_threshold?: number | null
          data_source_id?: string | null
          description?: string | null
          formula: string
          id?: string
          name: string
          target_value?: number | null
          unit?: string | null
          updated_at?: string
          warning_threshold?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["kpi_category"]
          created_at?: string
          created_by?: string | null
          critical_threshold?: number | null
          data_source_id?: string | null
          description?: string | null
          formula?: string
          id?: string
          name?: string
          target_value?: number | null
          unit?: string | null
          updated_at?: string
          warning_threshold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kpis_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpis_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          content: Json
          created_at: string
          id: string
          metadata: Json | null
          patient_id: string
          record_type: string
          recorded_at: string
          recorded_by: string | null
          title: string
          updated_at: string
          visit_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          metadata?: Json | null
          patient_id: string
          record_type: string
          recorded_at?: string
          recorded_by?: string | null
          title: string
          updated_at?: string
          visit_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          metadata?: Json | null
          patient_id?: string
          record_type?: string
          recorded_at?: string
          recorded_by?: string | null
          title?: string
          updated_at?: string
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics_snapshots: {
        Row: {
          created_at: string
          department_id: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number | null
          timestamp: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "metrics_snapshots_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          priority: Database["public"]["Enums"]["alert_priority"] | null
          read_at: string | null
          recipient_id: string
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          priority?: Database["public"]["Enums"]["alert_priority"] | null
          read_at?: string | null
          recipient_id: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: Database["public"]["Enums"]["alert_priority"] | null
          read_at?: string | null
          recipient_id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_visits: {
        Row: {
          admission_date: string
          assigned_nurse_id: string | null
          attending_physician_id: string | null
          bed_id: string | null
          chief_complaint: string | null
          created_at: string
          department_id: string
          diagnosis: Json | null
          discharge_date: string | null
          id: string
          medications: Json | null
          notes: string | null
          patient_id: string
          status: Database["public"]["Enums"]["patient_status"] | null
          treatment_plan: Json | null
          updated_at: string
          visit_number: string
          vital_signs: Json | null
        }
        Insert: {
          admission_date?: string
          assigned_nurse_id?: string | null
          attending_physician_id?: string | null
          bed_id?: string | null
          chief_complaint?: string | null
          created_at?: string
          department_id: string
          diagnosis?: Json | null
          discharge_date?: string | null
          id?: string
          medications?: Json | null
          notes?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["patient_status"] | null
          treatment_plan?: Json | null
          updated_at?: string
          visit_number: string
          vital_signs?: Json | null
        }
        Update: {
          admission_date?: string
          assigned_nurse_id?: string | null
          attending_physician_id?: string | null
          bed_id?: string | null
          chief_complaint?: string | null
          created_at?: string
          department_id?: string
          diagnosis?: Json | null
          discharge_date?: string | null
          id?: string
          medications?: Json | null
          notes?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["patient_status"] | null
          treatment_plan?: Json | null
          updated_at?: string
          visit_number?: string
          vital_signs?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_visits_assigned_nurse_id_fkey"
            columns: ["assigned_nurse_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_attending_physician_id_fkey"
            columns: ["attending_physician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: Json | null
          admission_date: string | null
          created_at: string
          date_of_birth: string | null
          discharge_date: string | null
          email: string | null
          emergency_contact: Json | null
          first_name: string
          gender: string | null
          id: string
          insurance_info: Json | null
          last_name: string
          mrn: string
          phone: string | null
          status: Database["public"]["Enums"]["patient_status"] | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          admission_date?: string | null
          created_at?: string
          date_of_birth?: string | null
          discharge_date?: string | null
          email?: string | null
          emergency_contact?: Json | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_info?: Json | null
          last_name: string
          mrn: string
          phone?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          admission_date?: string | null
          created_at?: string
          date_of_birth?: string | null
          discharge_date?: string | null
          email?: string | null
          emergency_contact?: Json | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_info?: Json | null
          last_name?: string
          mrn?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          organization: string | null
          phone: string | null
          position: string | null
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      slas: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          escalation_rules: Json | null
          id: string
          is_active: boolean | null
          kpi_id: string | null
          measurement_period: string
          name: string
          notification_settings: Json | null
          target_value: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          escalation_rules?: Json | null
          id?: string
          is_active?: boolean | null
          kpi_id?: string | null
          measurement_period: string
          name: string
          notification_settings?: Json | null
          target_value: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          escalation_rules?: Json | null
          id?: string
          is_active?: boolean | null
          kpi_id?: string | null
          measurement_period?: string
          name?: string
          notification_settings?: Json | null
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "slas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slas_kpi_id_fkey"
            columns: ["kpi_id"]
            isOneToOne: false
            referencedRelation: "kpis"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_schedules: {
        Row: {
          created_at: string
          department_id: string
          id: string
          is_on_call: boolean | null
          role: string
          shift_end: string
          shift_start: string
          staff_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id: string
          id?: string
          is_on_call?: boolean | null
          role: string
          shift_end: string
          shift_start: string
          staff_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string
          id?: string
          is_on_call?: boolean | null
          role?: string
          shift_end?: string
          shift_start?: string
          staff_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_schedules_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_schedules_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      wait_times: {
        Row: {
          arrival_time: string
          created_at: string
          department_id: string
          discharge_time: string | null
          id: string
          patient_id: string | null
          priority_level: number | null
          seen_by_provider_time: string | null
          total_wait_minutes: number | null
          triage_time: string | null
          triage_to_provider_minutes: number | null
          visit_id: string | null
        }
        Insert: {
          arrival_time?: string
          created_at?: string
          department_id: string
          discharge_time?: string | null
          id?: string
          patient_id?: string | null
          priority_level?: number | null
          seen_by_provider_time?: string | null
          total_wait_minutes?: number | null
          triage_time?: string | null
          triage_to_provider_minutes?: number | null
          visit_id?: string | null
        }
        Update: {
          arrival_time?: string
          created_at?: string
          department_id?: string
          discharge_time?: string | null
          id?: string
          patient_id?: string | null
          priority_level?: number | null
          seen_by_provider_time?: string | null
          total_wait_minutes?: number | null
          triage_time?: string | null
          triage_to_provider_minutes?: number | null
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wait_times_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wait_times_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wait_times_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      widgets: {
        Row: {
          config: Json
          created_at: string
          dashboard_id: string | null
          data_source_id: string | null
          id: string
          name: string
          position: Json
          query: Json | null
          type: Database["public"]["Enums"]["widget_type"]
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          dashboard_id?: string | null
          data_source_id?: string | null
          id?: string
          name: string
          position?: Json
          query?: Json | null
          type: Database["public"]["Enums"]["widget_type"]
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          dashboard_id?: string | null
          data_source_id?: string | null
          id?: string
          name?: string
          position?: Json
          query?: Json | null
          type?: Database["public"]["Enums"]["widget_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "widgets_dashboard_id_fkey"
            columns: ["dashboard_id"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "widgets_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: string | null
          error_message: string | null
          execution_data: Json | null
          id: string
          patient_id: string | null
          started_at: string
          status: Database["public"]["Enums"]["workflow_status"] | null
          triggered_by: string | null
          visit_id: string | null
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          execution_data?: Json | null
          id?: string
          patient_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["workflow_status"] | null
          triggered_by?: string | null
          visit_id?: string | null
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          execution_data?: Json | null
          id?: string
          patient_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["workflow_status"] | null
          triggered_by?: string | null
          visit_id?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string | null
          department_id: string | null
          description: string | null
          execution_count: number | null
          id: string
          last_executed: string | null
          name: string
          status: Database["public"]["Enums"]["workflow_status"] | null
          success_rate: number | null
          triggers: Json | null
          type: string
          updated_at: string
          workflow_definition: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          last_executed?: string | null
          name: string
          status?: Database["public"]["Enums"]["workflow_status"] | null
          success_rate?: number | null
          triggers?: Json | null
          type: string
          updated_at?: string
          workflow_definition: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          last_executed?: string | null
          name?: string
          status?: Database["public"]["Enums"]["workflow_status"] | null
          success_rate?: number | null
          triggers?: Json | null
          type?: string
          updated_at?: string
          workflow_definition?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "URGENT"
      alert_severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      alert_status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED"
      automation_status: "ACTIVE" | "PAUSED" | "DRAFT" | "ERROR"
      bed_status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "RESERVED"
      dashboard_type: "OPERATIONAL" | "EXECUTIVE" | "CLINICAL" | "FINANCIAL"
      data_source_type: "HL7" | "FHIR" | "API" | "CSV" | "MANUAL" | "EPIC"
      department_type:
        | "EMERGENCY"
        | "ICU"
        | "SURGERY"
        | "CARDIOLOGY"
        | "PEDIATRICS"
        | "MATERNITY"
        | "GENERAL"
      execution_status: "PENDING" | "RUNNING" | "SUCCESS" | "FAILED"
      ingestion_mode: "BATCH" | "STREAM"
      integration_status: "CONNECTED" | "DISCONNECTED" | "ERROR" | "SYNCING"
      kpi_category:
        | "OPERATIONAL"
        | "CLINICAL"
        | "FINANCIAL"
        | "QUALITY"
        | "SAFETY"
      module_type:
        | "ASTRO_SCAN"
        | "ASTRO_BRICKS"
        | "ASTRO_METRICS"
        | "ASTRO_VIEW"
        | "ASTRO_FLOW"
      patient_status: "ACTIVE" | "DISCHARGED" | "TRANSFERRED" | "DECEASED"
      pipeline_status: "DRAFT" | "ACTIVE" | "PAUSED" | "DEPRECATED"
      rule_status: "DRAFT" | "ACTIVE" | "PAUSED"
      sync_status: "CONNECTED" | "SYNCING" | "ERROR" | "PAUSED"
      user_role: "ADMIN" | "DATA_ENGINEER" | "ANALYST" | "CLINICIAN"
      widget_type: "CHART" | "METRIC_CARD" | "TABLE" | "MAP" | "ALERT_PANEL"
      workflow_status: "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "FAILED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_priority: ["LOW", "MEDIUM", "HIGH", "CRITICAL", "URGENT"],
      alert_severity: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      alert_status: ["ACTIVE", "ACKNOWLEDGED", "RESOLVED"],
      automation_status: ["ACTIVE", "PAUSED", "DRAFT", "ERROR"],
      bed_status: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"],
      dashboard_type: ["OPERATIONAL", "EXECUTIVE", "CLINICAL", "FINANCIAL"],
      data_source_type: ["HL7", "FHIR", "API", "CSV", "MANUAL", "EPIC"],
      department_type: [
        "EMERGENCY",
        "ICU",
        "SURGERY",
        "CARDIOLOGY",
        "PEDIATRICS",
        "MATERNITY",
        "GENERAL",
      ],
      execution_status: ["PENDING", "RUNNING", "SUCCESS", "FAILED"],
      ingestion_mode: ["BATCH", "STREAM"],
      integration_status: ["CONNECTED", "DISCONNECTED", "ERROR", "SYNCING"],
      kpi_category: [
        "OPERATIONAL",
        "CLINICAL",
        "FINANCIAL",
        "QUALITY",
        "SAFETY",
      ],
      module_type: [
        "ASTRO_SCAN",
        "ASTRO_BRICKS",
        "ASTRO_METRICS",
        "ASTRO_VIEW",
        "ASTRO_FLOW",
      ],
      patient_status: ["ACTIVE", "DISCHARGED", "TRANSFERRED", "DECEASED"],
      pipeline_status: ["DRAFT", "ACTIVE", "PAUSED", "DEPRECATED"],
      rule_status: ["DRAFT", "ACTIVE", "PAUSED"],
      sync_status: ["CONNECTED", "SYNCING", "ERROR", "PAUSED"],
      user_role: ["ADMIN", "DATA_ENGINEER", "ANALYST", "CLINICIAN"],
      widget_type: ["CHART", "METRIC_CARD", "TABLE", "MAP", "ALERT_PANEL"],
      workflow_status: ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "FAILED"],
    },
  },
} as const
