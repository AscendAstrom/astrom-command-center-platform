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
      accreditations: {
        Row: {
          accrediting_body: string
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          name: string
          next_review_date: string | null
          status: Database["public"]["Enums"]["accreditation_status"]
          updated_at: string
        }
        Insert: {
          accrediting_body: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          name: string
          next_review_date?: string | null
          status?: Database["public"]["Enums"]["accreditation_status"]
          updated_at?: string
        }
        Update: {
          accrediting_body?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          name?: string
          next_review_date?: string | null
          status?: Database["public"]["Enums"]["accreditation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      alert_subscriptions: {
        Row: {
          channels: string[]
          created_at: string
          frequency: string
          id: string
          is_active: boolean
          rule_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channels: string[]
          created_at?: string
          frequency?: string
          id?: string
          is_active?: boolean
          rule_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channels?: string[]
          created_at?: string
          frequency?: string
          id?: string
          is_active?: boolean
          rule_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_subscriptions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
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
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used: string | null
          name: string
          permissions: Json | null
          rate_limit: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used?: string | null
          name: string
          permissions?: Json | null
          rate_limit?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used?: string | null
          name?: string
          permissions?: Json | null
          rate_limit?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          correlation_id: string | null
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          session_id: string | null
          severity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          correlation_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          session_id?: string | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          correlation_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          session_id?: string | null
          severity?: string | null
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
          last_executed: string | null
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
          last_executed?: string | null
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
          last_executed?: string | null
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
      bed_status_history: {
        Row: {
          bed_id: string | null
          changed_by: string | null
          duration_minutes: number | null
          id: string
          metadata: Json | null
          new_status: string
          previous_status: string | null
          reason: string | null
          timestamp: string | null
        }
        Insert: {
          bed_id?: string | null
          changed_by?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          new_status: string
          previous_status?: string | null
          reason?: string | null
          timestamp?: string | null
        }
        Update: {
          bed_id?: string | null
          changed_by?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          new_status?: string
          previous_status?: string | null
          reason?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bed_status_history_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bed_status_history_changed_by_fkey"
            columns: ["changed_by"]
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
          deleted_at: string | null
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
          deleted_at?: string | null
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
          deleted_at?: string | null
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
      billing_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          patient_id: string
          status: Database["public"]["Enums"]["billing_status"]
          transaction_date: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          visit_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          patient_id: string
          status?: Database["public"]["Enums"]["billing_status"]
          transaction_date?: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          visit_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          patient_id?: string
          status?: Database["public"]["Enums"]["billing_status"]
          transaction_date?: string
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_transactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_transactions_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_allocations: {
        Row: {
          budget_amount: number
          budget_period_end: string
          budget_period_start: string
          category: string
          created_at: string
          department_id: string | null
          id: string
        }
        Insert: {
          budget_amount: number
          budget_period_end: string
          budget_period_start: string
          category: string
          created_at?: string
          department_id?: string | null
          id?: string
        }
        Update: {
          budget_amount?: number
          budget_period_end?: string
          budget_period_start?: string
          category?: string
          created_at?: string
          department_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_allocations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      capacity_forecasts: {
        Row: {
          confidence_interval: number | null
          created_at: string | null
          department_id: string | null
          forecast_date: string
          forecast_type: string
          id: string
          metadata: Json | null
          model_version: string | null
          predicted_value: number
        }
        Insert: {
          confidence_interval?: number | null
          created_at?: string | null
          department_id?: string | null
          forecast_date: string
          forecast_type: string
          id?: string
          metadata?: Json | null
          model_version?: string | null
          predicted_value: number
        }
        Update: {
          confidence_interval?: number | null
          created_at?: string | null
          department_id?: string | null
          forecast_date?: string
          forecast_type?: string
          id?: string
          metadata?: Json | null
          model_version?: string | null
          predicted_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "capacity_forecasts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      care_pathway_analytics: {
        Row: {
          avg_los_days: string
          compliance_percent: number
          id: string
          outcome_summary: string
          pathway_name: string
          updated_at: string
        }
        Insert: {
          avg_los_days: string
          compliance_percent: number
          id?: string
          outcome_summary: string
          pathway_name: string
          updated_at?: string
        }
        Update: {
          avg_los_days?: string
          compliance_percent?: number
          id?: string
          outcome_summary?: string
          pathway_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      claim_denials: {
        Row: {
          appeal_status: Database["public"]["Enums"]["appeal_status"] | null
          claim_id: string
          created_at: string
          denial_date: string
          denial_reason: Database["public"]["Enums"]["denial_reason_code"]
          details: string | null
          id: string
        }
        Insert: {
          appeal_status?: Database["public"]["Enums"]["appeal_status"] | null
          claim_id: string
          created_at?: string
          denial_date?: string
          denial_reason: Database["public"]["Enums"]["denial_reason_code"]
          details?: string | null
          id?: string
        }
        Update: {
          appeal_status?: Database["public"]["Enums"]["appeal_status"] | null
          claim_id?: string
          created_at?: string
          denial_date?: string
          denial_reason?: Database["public"]["Enums"]["denial_reason_code"]
          details?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "claim_denials_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "insurance_claims"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_areas: {
        Row: {
          created_at: string
          description: string | null
          id: string
          last_assessed_date: string | null
          name: string
          owner_name: string | null
          regulation: string
          status: Database["public"]["Enums"]["compliance_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          last_assessed_date?: string | null
          name: string
          owner_name?: string | null
          regulation: string
          status?: Database["public"]["Enums"]["compliance_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          last_assessed_date?: string | null
          name?: string
          owner_name?: string | null
          regulation?: string
          status?: Database["public"]["Enums"]["compliance_status"]
          updated_at?: string
        }
        Relationships: []
      }
      critical_lab_values: {
        Row: {
          created_at: string
          critical_high: number | null
          critical_low: number | null
          description: string | null
          id: string
          test_type_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          critical_high?: number | null
          critical_low?: number | null
          description?: string | null
          id?: string
          test_type_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          critical_high?: number | null
          critical_low?: number | null
          description?: string | null
          id?: string
          test_type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "critical_lab_values_test_type_id_fkey"
            columns: ["test_type_id"]
            isOneToOne: false
            referencedRelation: "lab_test_types"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_summaries: {
        Row: {
          content: Json
          created_at: string
          generated_by: string | null
          id: string
          summary_date: string
        }
        Insert: {
          content: Json
          created_at?: string
          generated_by?: string | null
          id?: string
          summary_date: string
        }
        Update: {
          content?: Json
          created_at?: string
          generated_by?: string | null
          id?: string
          summary_date?: string
        }
        Relationships: []
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
      data_lineage: {
        Row: {
          created_at: string | null
          id: string
          pipeline_id: string | null
          source_column: string | null
          source_table: string
          target_column: string | null
          target_table: string
          transformation_rule: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pipeline_id?: string | null
          source_column?: string | null
          source_table: string
          target_column?: string | null
          target_table: string
          transformation_rule?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pipeline_id?: string | null
          source_column?: string | null
          source_table?: string
          target_column?: string | null
          target_table?: string
          transformation_rule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_lineage_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "data_pipelines"
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
          version: number
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
          version?: number
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
          version?: number
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
          file_content: string | null
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
          file_content?: string | null
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
          file_content?: string | null
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
          deleted_at: string | null
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
          deleted_at?: string | null
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
          deleted_at?: string | null
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
      education_materials: {
        Row: {
          created_at: string
          format: string
          id: string
          title: string
          topic: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          format: string
          id?: string
          title: string
          topic: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          format?: string
          id?: string
          title?: string
          topic?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
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
      equipment_maintenance: {
        Row: {
          completed_date: string | null
          cost: number | null
          created_at: string | null
          description: string | null
          equipment_id: string | null
          id: string
          maintenance_type: string
          notes: string | null
          parts_used: Json | null
          scheduled_date: string | null
          status: string | null
          technician_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          equipment_id?: string | null
          id?: string
          maintenance_type: string
          notes?: string | null
          parts_used?: Json | null
          scheduled_date?: string | null
          status?: string | null
          technician_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          equipment_id?: string | null
          id?: string
          maintenance_type?: string
          notes?: string | null
          parts_used?: Json | null
          scheduled_date?: string | null
          status?: string | null
          technician_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_maintenance_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_maintenance_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_forecasts: {
        Row: {
          confidence_level: number | null
          created_at: string
          forecast_date: string
          forecasted_value: number
          id: string
          metric_name: string
          model_version: string | null
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string
          forecast_date: string
          forecasted_value: number
          id?: string
          metric_name: string
          model_version?: string | null
        }
        Update: {
          confidence_level?: number | null
          created_at?: string
          forecast_date?: string
          forecasted_value?: number
          id?: string
          metric_name?: string
          model_version?: string | null
        }
        Relationships: []
      }
      hospital_expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          department_id: string | null
          description: string | null
          expense_date: string
          id: string
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          department_id?: string | null
          description?: string | null
          expense_date: string
          id?: string
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          department_id?: string | null
          description?: string | null
          expense_date?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_expenses_department_id_fkey"
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
      insurance_claims: {
        Row: {
          created_at: string
          id: string
          insurer_name: string
          paid_amount: number | null
          patient_id: string
          processing_time_days: number | null
          resolution_date: string | null
          status: Database["public"]["Enums"]["claim_status"]
          submission_date: string | null
          total_amount: number
          updated_at: string
          visit_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          insurer_name: string
          paid_amount?: number | null
          patient_id: string
          processing_time_days?: number | null
          resolution_date?: string | null
          status?: Database["public"]["Enums"]["claim_status"]
          submission_date?: string | null
          total_amount: number
          updated_at?: string
          visit_id: string
        }
        Update: {
          created_at?: string
          id?: string
          insurer_name?: string
          paid_amount?: number | null
          patient_id?: string
          processing_time_days?: number | null
          resolution_date?: string | null
          status?: Database["public"]["Enums"]["claim_status"]
          submission_date?: string | null
          total_amount?: number
          updated_at?: string
          visit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_claims_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
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
      knowledge_graph_nodes: {
        Row: {
          connections: number | null
          created_at: string
          id: string
          label: string
          relevance_score: number | null
          type: string
        }
        Insert: {
          connections?: number | null
          created_at?: string
          id?: string
          label: string
          relevance_score?: number | null
          type: string
        }
        Update: {
          connections?: number | null
          created_at?: string
          id?: string
          label?: string
          relevance_score?: number | null
          type?: string
        }
        Relationships: []
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
      lab_test_types: {
        Row: {
          category: string | null
          code: string
          created_at: string
          id: string
          name: string
          reference_range_high: number | null
          reference_range_low: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string
          id?: string
          name: string
          reference_range_high?: number | null
          reference_range_low?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          reference_range_high?: number | null
          reference_range_low?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      lab_tests: {
        Row: {
          created_at: string
          id: string
          is_abnormal: boolean
          is_critical: boolean
          notes: string | null
          ordered_at: string
          ordered_by_staff_id: string | null
          patient_id: string
          result_received_at: string | null
          result_unit: string | null
          result_value: string | null
          specimen_collected_at: string | null
          status: Database["public"]["Enums"]["lab_test_status"]
          test_type_id: string
          turnaround_time_minutes: number | null
          updated_at: string
          visit_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_abnormal?: boolean
          is_critical?: boolean
          notes?: string | null
          ordered_at?: string
          ordered_by_staff_id?: string | null
          patient_id: string
          result_received_at?: string | null
          result_unit?: string | null
          result_value?: string | null
          specimen_collected_at?: string | null
          status?: Database["public"]["Enums"]["lab_test_status"]
          test_type_id: string
          turnaround_time_minutes?: number | null
          updated_at?: string
          visit_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_abnormal?: boolean
          is_critical?: boolean
          notes?: string | null
          ordered_at?: string
          ordered_by_staff_id?: string | null
          patient_id?: string
          result_received_at?: string | null
          result_unit?: string | null
          result_value?: string | null
          specimen_collected_at?: string | null
          status?: Database["public"]["Enums"]["lab_test_status"]
          test_type_id?: string
          turnaround_time_minutes?: number | null
          updated_at?: string
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_ordered_by_staff_id_fkey"
            columns: ["ordered_by_staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_test_type_id_fkey"
            columns: ["test_type_id"]
            isOneToOne: false
            referencedRelation: "lab_test_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
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
      medication_adherence_log: {
        Row: {
          created_at: string
          dose_time: string
          id: string
          is_critical: boolean
          medication_name: string
          patient_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          dose_time: string
          id?: string
          is_critical?: boolean
          medication_name: string
          patient_id?: string | null
          status: string
        }
        Update: {
          created_at?: string
          dose_time?: string
          id?: string
          is_critical?: boolean
          medication_name?: string
          patient_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_adherence_log_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_safety_alerts: {
        Row: {
          alert_details: string
          created_at: string
          id: string
          patient_name: string
          status: string
        }
        Insert: {
          alert_details: string
          created_at?: string
          id?: string
          patient_name: string
          status: string
        }
        Update: {
          alert_details?: string
          created_at?: string
          id?: string
          patient_name?: string
          status?: string
        }
        Relationships: []
      }
      message_templates: {
        Row: {
          body_template: string
          channel_type: string
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          priority: string | null
          subject_template: string | null
          template_variables: Json | null
          updated_at: string | null
        }
        Insert: {
          body_template: string
          channel_type: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          priority?: string | null
          subject_template?: string | null
          template_variables?: Json | null
          updated_at?: string | null
        }
        Update: {
          body_template?: string
          channel_type?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          priority?: string | null
          subject_template?: string | null
          template_variables?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      metric_aggregations: {
        Row: {
          aggregation_date: string
          aggregation_type: string
          count: number | null
          created_at: string | null
          department_id: string | null
          id: string
          max_value: number | null
          metadata: Json | null
          metric_name: string
          min_value: number | null
          value: number
        }
        Insert: {
          aggregation_date: string
          aggregation_type: string
          count?: number | null
          created_at?: string | null
          department_id?: string | null
          id?: string
          max_value?: number | null
          metadata?: Json | null
          metric_name: string
          min_value?: number | null
          value: number
        }
        Update: {
          aggregation_date?: string
          aggregation_type?: string
          count?: number | null
          created_at?: string | null
          department_id?: string | null
          id?: string
          max_value?: number | null
          metadata?: Json | null
          metric_name?: string
          min_value?: number | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "metric_aggregations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
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
      ml_federated_sites: {
        Row: {
          created_at: string
          data_contribution_records: number | null
          id: string
          last_sync: string | null
          location: string | null
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_contribution_records?: number | null
          id?: string
          last_sync?: string | null
          location?: string | null
          name: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_contribution_records?: number | null
          id?: string
          last_sync?: string | null
          location?: string | null
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      ml_models: {
        Row: {
          accuracy: number | null
          confidence: number | null
          created_at: string
          created_by: string | null
          data_points: number | null
          id: string
          last_trained: string | null
          name: string
          parameters: Json | null
          status: string | null
          target: string
          type: string
          updated_at: string
          version: string
        }
        Insert: {
          accuracy?: number | null
          confidence?: number | null
          created_at?: string
          created_by?: string | null
          data_points?: number | null
          id?: string
          last_trained?: string | null
          name: string
          parameters?: Json | null
          status?: string | null
          target: string
          type: string
          updated_at?: string
          version?: string
        }
        Update: {
          accuracy?: number | null
          confidence?: number | null
          created_at?: string
          created_by?: string | null
          data_points?: number | null
          id?: string
          last_trained?: string | null
          name?: string
          parameters?: Json | null
          status?: string | null
          target?: string
          type?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      ml_training_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          estimated_time_remaining_mins: number | null
          gpu_utilization: number | null
          id: string
          logs: Json | null
          model_id: string | null
          model_name: string
          progress: number | null
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          estimated_time_remaining_mins?: number | null
          gpu_utilization?: number | null
          id?: string
          logs?: Json | null
          model_id?: string | null
          model_name: string
          progress?: number | null
          started_at?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          estimated_time_remaining_mins?: number | null
          gpu_utilization?: number | null
          id?: string
          logs?: Json | null
          model_id?: string | null
          model_name?: string
          progress?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ml_training_jobs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ml_models"
            referencedColumns: ["id"]
          },
        ]
      }
      nlp_tasks: {
        Row: {
          confidence: number | null
          created_at: string
          entities: number | null
          id: string
          processing_time: string | null
          status: string
          type: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          entities?: number | null
          id?: string
          processing_time?: string | null
          status: string
          type: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          entities?: number | null
          id?: string
          processing_time?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      notification_channels: {
        Row: {
          configuration: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          configuration?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_delivery_log: {
        Row: {
          channel_id: string | null
          created_at: string | null
          delivery_metadata: Json | null
          delivery_status: string | null
          delivery_timestamp: string | null
          error_message: string | null
          id: string
          notification_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string | null
          delivery_metadata?: Json | null
          delivery_status?: string | null
          delivery_timestamp?: string | null
          error_message?: string | null
          id?: string
          notification_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string | null
          delivery_metadata?: Json | null
          delivery_status?: string | null
          delivery_timestamp?: string | null
          error_message?: string | null
          id?: string
          notification_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_delivery_log_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "notification_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_delivery_log_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
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
      patient_education_log: {
        Row: {
          completion_status: string | null
          created_at: string
          delivered_by_staff_name: string | null
          delivery_date: string
          id: string
          material_id: string
          patient_feedback_score: number | null
          patient_id: string
          visit_id: string | null
        }
        Insert: {
          completion_status?: string | null
          created_at?: string
          delivered_by_staff_name?: string | null
          delivery_date?: string
          id?: string
          material_id: string
          patient_feedback_score?: number | null
          patient_id: string
          visit_id?: string | null
        }
        Update: {
          completion_status?: string | null
          created_at?: string
          delivered_by_staff_name?: string | null
          delivery_date?: string
          id?: string
          material_id?: string
          patient_feedback_score?: number | null
          patient_id?: string
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_education_log_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "education_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_education_log_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_education_log_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_flow_events: {
        Row: {
          department_id: string | null
          details: Json | null
          event_type: string
          id: string
          patient_id: string | null
          timestamp: string
        }
        Insert: {
          department_id?: string | null
          details?: Json | null
          event_type: string
          id?: string
          patient_id?: string | null
          timestamp?: string
        }
        Update: {
          department_id?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          patient_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_flow_events_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_flow_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_surveys: {
        Row: {
          cleanliness_rating: number | null
          comments: string | null
          communication_rating: number | null
          created_at: string
          id: string
          overall_satisfaction: number | null
          survey_date: string
          visit_id: string | null
          wait_time_rating: number | null
        }
        Insert: {
          cleanliness_rating?: number | null
          comments?: string | null
          communication_rating?: number | null
          created_at?: string
          id?: string
          overall_satisfaction?: number | null
          survey_date: string
          visit_id?: string | null
          wait_time_rating?: number | null
        }
        Update: {
          cleanliness_rating?: number | null
          comments?: string | null
          communication_rating?: number | null
          created_at?: string
          id?: string
          overall_satisfaction?: number | null
          survey_date?: string
          visit_id?: string | null
          wait_time_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_surveys_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
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
          deleted_at: string | null
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
          deleted_at?: string | null
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
          deleted_at?: string | null
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
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          resource?: string
        }
        Relationships: []
      }
      pipeline_executions: {
        Row: {
          completed_at: string | null
          duration_seconds: number | null
          error_message: string | null
          execution_id: string
          execution_log: Json | null
          id: string
          metrics: Json | null
          pipeline_id: string | null
          records_failed: number | null
          records_processed: number | null
          started_at: string | null
          status: string | null
          trigger_type: string | null
          triggered_by: string | null
        }
        Insert: {
          completed_at?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          execution_id: string
          execution_log?: Json | null
          id?: string
          metrics?: Json | null
          pipeline_id?: string | null
          records_failed?: number | null
          records_processed?: number | null
          started_at?: string | null
          status?: string | null
          trigger_type?: string | null
          triggered_by?: string | null
        }
        Update: {
          completed_at?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          execution_id?: string
          execution_log?: Json | null
          id?: string
          metrics?: Json | null
          pipeline_id?: string | null
          records_failed?: number | null
          records_processed?: number | null
          started_at?: string | null
          status?: string | null
          trigger_type?: string | null
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_executions_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "data_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_executions_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      predictive_diagnostic_suggestions: {
        Row: {
          confidence: number
          created_at: string
          evidence: string | null
          id: string
          patient_name: string
          suggestion: string
        }
        Insert: {
          confidence: number
          created_at?: string
          evidence?: string | null
          id?: string
          patient_name: string
          suggestion: string
        }
        Update: {
          confidence?: number
          created_at?: string
          evidence?: string | null
          id?: string
          patient_name?: string
          suggestion?: string
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
      protocol_adherence_metrics: {
        Row: {
          adherence_value: number
          id: string
          protocol_name: string
          updated_at: string
        }
        Insert: {
          adherence_value: number
          id?: string
          protocol_name: string
          updated_at?: string
        }
        Update: {
          adherence_value?: number
          id?: string
          protocol_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      quality_improvement_initiatives: {
        Row: {
          created_at: string
          department_id: string | null
          description: string | null
          end_date: string | null
          id: string
          metrics_impacted: Json | null
          name: string
          owner_name: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["initiative_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics_impacted?: Json | null
          name: string
          owner_name?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["initiative_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics_impacted?: Json | null
          name?: string
          owner_name?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["initiative_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quality_improvement_initiatives_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_indicators: {
        Row: {
          calculation_method: string | null
          category: string
          created_at: string | null
          data_source: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          reporting_frequency: string | null
          target_value: number | null
          unit: string | null
        }
        Insert: {
          calculation_method?: string | null
          category: string
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          reporting_frequency?: string | null
          target_value?: number | null
          unit?: string | null
        }
        Update: {
          calculation_method?: string | null
          category?: string
          created_at?: string | null
          data_source?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          reporting_frequency?: string | null
          target_value?: number | null
          unit?: string | null
        }
        Relationships: []
      }
      quality_measurements: {
        Row: {
          created_at: string | null
          denominator: number | null
          department_id: string | null
          id: string
          indicator_id: string | null
          measured_by: string | null
          measurement_date: string
          notes: string | null
          numerator: number | null
          value: number
        }
        Insert: {
          created_at?: string | null
          denominator?: number | null
          department_id?: string | null
          id?: string
          indicator_id?: string | null
          measured_by?: string | null
          measurement_date: string
          notes?: string | null
          numerator?: number | null
          value: number
        }
        Update: {
          created_at?: string | null
          denominator?: number | null
          department_id?: string | null
          id?: string
          indicator_id?: string | null
          measured_by?: string | null
          measurement_date?: string
          notes?: string | null
          numerator?: number | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "quality_measurements_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_measurements_indicator_id_fkey"
            columns: ["indicator_id"]
            isOneToOne: false
            referencedRelation: "quality_indicators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_measurements_measured_by_fkey"
            columns: ["measured_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      report_definitions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          output_format: string | null
          parameters: Json | null
          query_definition: Json
          recipients: Json | null
          report_type: string
          schedule_cron: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          output_format?: string | null
          parameters?: Json | null
          query_definition: Json
          recipients?: Json | null
          report_type: string
          schedule_cron?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          output_format?: string | null
          parameters?: Json | null
          query_definition?: Json
          recipients?: Json | null
          report_type?: string
          schedule_cron?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_definitions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      report_executions: {
        Row: {
          error_message: string | null
          execution_date: string | null
          execution_time_ms: number | null
          file_path: string | null
          file_size: number | null
          generated_by: string | null
          id: string
          report_definition_id: string | null
          status: string | null
        }
        Insert: {
          error_message?: string | null
          execution_date?: string | null
          execution_time_ms?: number | null
          file_path?: string | null
          file_size?: number | null
          generated_by?: string | null
          id?: string
          report_definition_id?: string | null
          status?: string | null
        }
        Update: {
          error_message?: string | null
          execution_date?: string | null
          execution_time_ms?: number | null
          file_path?: string | null
          file_size?: number | null
          generated_by?: string | null
          id?: string
          report_definition_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_executions_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_executions_report_definition_id_fkey"
            columns: ["report_definition_id"]
            isOneToOne: false
            referencedRelation: "report_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_assessments: {
        Row: {
          created_at: string
          department_id: string | null
          id: string
          identified_date: string
          mitigation_plan: string | null
          owner_name: string | null
          review_date: string | null
          risk_description: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          status: Database["public"]["Enums"]["risk_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          id?: string
          identified_date?: string
          mitigation_plan?: string | null
          owner_name?: string | null
          review_date?: string | null
          risk_description: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["risk_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          id?: string
          identified_date?: string
          mitigation_plan?: string | null
          owner_name?: string | null
          review_date?: string | null
          risk_description?: string
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["risk_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_assessments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_executions: {
        Row: {
          created_at: string
          details: Json | null
          executed_at: string
          id: string
          rule_id: string
          status: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          executed_at?: string
          id?: string
          rule_id: string
          status: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          executed_at?: string
          id?: string
          rule_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rule_executions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      sla_configurations: {
        Row: {
          alert_enabled: boolean
          created_at: string
          description: string | null
          escalation_rules: Json
          id: string
          metric_type: string
          name: string
          status: string
          threshold: number
          time_window: string
          unit: string
          updated_at: string
          zone_id: string | null
          zone_name: string | null
        }
        Insert: {
          alert_enabled?: boolean
          created_at?: string
          description?: string | null
          escalation_rules?: Json
          id?: string
          metric_type: string
          name: string
          status?: string
          threshold: number
          time_window: string
          unit: string
          updated_at?: string
          zone_id?: string | null
          zone_name?: string | null
        }
        Update: {
          alert_enabled?: boolean
          created_at?: string
          description?: string | null
          escalation_rules?: Json
          id?: string
          metric_type?: string
          name?: string
          status?: string
          threshold?: number
          time_window?: string
          unit?: string
          updated_at?: string
          zone_id?: string | null
          zone_name?: string | null
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
      staff: {
        Row: {
          certifications: Json | null
          created_at: string | null
          credentials: string[] | null
          deleted_at: string | null
          department_id: string | null
          emergency_contact: Json | null
          employee_id: string
          employment_type: string | null
          hire_date: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          license_expiry: string | null
          license_number: string | null
          overtime_rate: number | null
          position: string
          profile_id: string | null
          specializations: string[] | null
          updated_at: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string | null
          credentials?: string[] | null
          deleted_at?: string | null
          department_id?: string | null
          emergency_contact?: Json | null
          employee_id: string
          employment_type?: string | null
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          overtime_rate?: number | null
          position: string
          profile_id?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string | null
          credentials?: string[] | null
          deleted_at?: string | null
          department_id?: string | null
          emergency_contact?: Json | null
          employee_id?: string
          employment_type?: string | null
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          overtime_rate?: number | null
          position?: string
          profile_id?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      surge_predictions: {
        Row: {
          confidence_score: number | null
          created_at: string
          department_id: string | null
          id: string
          model_version: string | null
          predicted_admissions: number
          prediction_datetime: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          model_version?: string | null
          predicted_admissions: number
          prediction_datetime: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          model_version?: string | null
          predicted_admissions?: number
          prediction_datetime?: string
        }
        Relationships: [
          {
            foreignKeyName: "surge_predictions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      surgical_outcomes: {
        Row: {
          created_at: string
          department_id: string | null
          duration_minutes: number | null
          id: string
          on_time_start: boolean | null
          outcome: string | null
          patient_id: string | null
          procedure_name: string
          surgery_date: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          duration_minutes?: number | null
          id?: string
          on_time_start?: boolean | null
          outcome?: string | null
          patient_id?: string | null
          procedure_name: string
          surgery_date: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          duration_minutes?: number | null
          id?: string
          on_time_start?: boolean | null
          outcome?: string | null
          patient_id?: string | null
          procedure_name?: string
          surgery_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "surgical_outcomes_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "surgical_outcomes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      system_metrics: {
        Row: {
          department_id: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number
          timestamp: string
        }
        Insert: {
          department_id?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          timestamp?: string
        }
        Update: {
          department_id?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_metrics_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
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
      user_sessions: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          login_method: string | null
          session_token: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          login_method?: string | null
          session_token: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          login_method?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vision_tasks: {
        Row: {
          accuracy: number | null
          created_at: string
          id: string
          objects_detected: number | null
          processing_time: string | null
          status: string
          type: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          id?: string
          objects_detected?: number | null
          processing_time?: string | null
          status: string
          type: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          id?: string
          objects_detected?: number | null
          processing_time?: string | null
          status?: string
          type?: string
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
      accreditation_status: "ACCREDITED" | "PENDING" | "EXPIRED" | "REVOKED"
      alert_priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "URGENT"
      alert_severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      alert_status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED"
      appeal_status: "NONE" | "IN_PROGRESS" | "SUCCESSFUL" | "UNSUCCESSFUL"
      automation_status: "ACTIVE" | "PAUSED" | "DRAFT" | "ERROR"
      bed_status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "RESERVED"
      billing_status:
        | "DRAFT"
        | "BILLED"
        | "PAID"
        | "PARTIALLY_PAID"
        | "VOID"
        | "WRITEOFF"
      claim_status:
        | "SUBMITTED"
        | "PENDING"
        | "APPROVED"
        | "DENIED"
        | "APPEALED"
        | "PAID"
      compliance_status:
        | "COMPLIANT"
        | "NON_COMPLIANT"
        | "IN_PROGRESS"
        | "AT_RISK"
      dashboard_type: "OPERATIONAL" | "EXECUTIVE" | "CLINICAL" | "FINANCIAL"
      data_source_type: "HL7" | "FHIR" | "API" | "CSV" | "MANUAL" | "EPIC"
      denial_reason_code:
        | "CODING_ERROR"
        | "PRIOR_AUTH"
        | "NOT_COVERED"
        | "DUPLICATE_CLAIM"
        | "MEDICAL_NECESSITY"
        | "PATIENT_INELIGIBLE"
        | "OTHER"
      department_type:
        | "EMERGENCY"
        | "ICU"
        | "SURGERY"
        | "CARDIOLOGY"
        | "PEDIATRICS"
        | "MATERNITY"
        | "GENERAL"
        | "NEUROLOGY"
        | "ORTHOPEDICS"
        | "RADIOLOGY"
      execution_status: "PENDING" | "RUNNING" | "SUCCESS" | "FAILED"
      expense_category:
        | "Labor"
        | "Supplies"
        | "Utilities"
        | "Equipment"
        | "Overhead"
        | "Administrative"
      ingestion_mode: "BATCH" | "STREAM"
      initiative_status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD"
      integration_status: "CONNECTED" | "DISCONNECTED" | "ERROR" | "SYNCING"
      kpi_category:
        | "OPERATIONAL"
        | "CLINICAL"
        | "FINANCIAL"
        | "QUALITY"
        | "SAFETY"
      lab_test_status:
        | "ORDERED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELED"
        | "ERROR"
      module_type:
        | "ASTRO_SCAN"
        | "ASTRO_BRICKS"
        | "ASTRO_METRICS"
        | "ASTRO_VIEW"
        | "ASTRO_FLOW"
      patient_status: "ACTIVE" | "DISCHARGED" | "TRANSFERRED" | "DECEASED"
      pipeline_status: "DRAFT" | "ACTIVE" | "PAUSED" | "DEPRECATED"
      risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      risk_status: "OPEN" | "MITIGATED" | "CLOSED" | "ACCEPTED"
      rule_status: "DRAFT" | "ACTIVE" | "PAUSED"
      sync_status: "CONNECTED" | "SYNCING" | "ERROR" | "PAUSED"
      transaction_type: "CHARGE" | "PAYMENT" | "ADJUSTMENT" | "REFUND"
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
      accreditation_status: ["ACCREDITED", "PENDING", "EXPIRED", "REVOKED"],
      alert_priority: ["LOW", "MEDIUM", "HIGH", "CRITICAL", "URGENT"],
      alert_severity: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      alert_status: ["ACTIVE", "ACKNOWLEDGED", "RESOLVED"],
      appeal_status: ["NONE", "IN_PROGRESS", "SUCCESSFUL", "UNSUCCESSFUL"],
      automation_status: ["ACTIVE", "PAUSED", "DRAFT", "ERROR"],
      bed_status: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"],
      billing_status: [
        "DRAFT",
        "BILLED",
        "PAID",
        "PARTIALLY_PAID",
        "VOID",
        "WRITEOFF",
      ],
      claim_status: [
        "SUBMITTED",
        "PENDING",
        "APPROVED",
        "DENIED",
        "APPEALED",
        "PAID",
      ],
      compliance_status: [
        "COMPLIANT",
        "NON_COMPLIANT",
        "IN_PROGRESS",
        "AT_RISK",
      ],
      dashboard_type: ["OPERATIONAL", "EXECUTIVE", "CLINICAL", "FINANCIAL"],
      data_source_type: ["HL7", "FHIR", "API", "CSV", "MANUAL", "EPIC"],
      denial_reason_code: [
        "CODING_ERROR",
        "PRIOR_AUTH",
        "NOT_COVERED",
        "DUPLICATE_CLAIM",
        "MEDICAL_NECESSITY",
        "PATIENT_INELIGIBLE",
        "OTHER",
      ],
      department_type: [
        "EMERGENCY",
        "ICU",
        "SURGERY",
        "CARDIOLOGY",
        "PEDIATRICS",
        "MATERNITY",
        "GENERAL",
        "NEUROLOGY",
        "ORTHOPEDICS",
        "RADIOLOGY",
      ],
      execution_status: ["PENDING", "RUNNING", "SUCCESS", "FAILED"],
      expense_category: [
        "Labor",
        "Supplies",
        "Utilities",
        "Equipment",
        "Overhead",
        "Administrative",
      ],
      ingestion_mode: ["BATCH", "STREAM"],
      initiative_status: ["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD"],
      integration_status: ["CONNECTED", "DISCONNECTED", "ERROR", "SYNCING"],
      kpi_category: [
        "OPERATIONAL",
        "CLINICAL",
        "FINANCIAL",
        "QUALITY",
        "SAFETY",
      ],
      lab_test_status: [
        "ORDERED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELED",
        "ERROR",
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
      risk_level: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      risk_status: ["OPEN", "MITIGATED", "CLOSED", "ACCEPTED"],
      rule_status: ["DRAFT", "ACTIVE", "PAUSED"],
      sync_status: ["CONNECTED", "SYNCING", "ERROR", "PAUSED"],
      transaction_type: ["CHARGE", "PAYMENT", "ADJUSTMENT", "REFUND"],
      user_role: ["ADMIN", "DATA_ENGINEER", "ANALYST", "CLINICIAN"],
      widget_type: ["CHART", "METRIC_CARD", "TABLE", "MAP", "ALERT_PANEL"],
      workflow_status: ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "FAILED"],
    },
  },
} as const
