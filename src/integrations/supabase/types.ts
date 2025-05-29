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
      alert_severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      alert_status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED"
      automation_status: "ACTIVE" | "PAUSED" | "DRAFT" | "ERROR"
      dashboard_type: "OPERATIONAL" | "EXECUTIVE" | "CLINICAL" | "FINANCIAL"
      data_source_type: "HL7" | "FHIR" | "API" | "CSV" | "MANUAL" | "EPIC"
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
      sync_status: "CONNECTED" | "SYNCING" | "ERROR" | "PAUSED"
      user_role: "ADMIN" | "DATA_ENGINEER" | "ANALYST" | "CLINICIAN"
      widget_type: "CHART" | "METRIC_CARD" | "TABLE" | "MAP" | "ALERT_PANEL"
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
      alert_severity: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      alert_status: ["ACTIVE", "ACKNOWLEDGED", "RESOLVED"],
      automation_status: ["ACTIVE", "PAUSED", "DRAFT", "ERROR"],
      dashboard_type: ["OPERATIONAL", "EXECUTIVE", "CLINICAL", "FINANCIAL"],
      data_source_type: ["HL7", "FHIR", "API", "CSV", "MANUAL", "EPIC"],
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
      sync_status: ["CONNECTED", "SYNCING", "ERROR", "PAUSED"],
      user_role: ["ADMIN", "DATA_ENGINEER", "ANALYST", "CLINICIAN"],
      widget_type: ["CHART", "METRIC_CARD", "TABLE", "MAP", "ALERT_PANEL"],
    },
  },
} as const
