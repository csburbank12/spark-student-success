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
      accessibility_settings: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          school_id: string | null
          setting_type: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          school_id?: string | null
          setting_type: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          school_id?: string | null
          setting_type?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accessibility_settings_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      account_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      behavior_logs: {
        Row: {
          created_at: string
          effectiveness_rating: number | null
          id: string
          intervention_used: string
          notes: string | null
          situation_type: string
          staff_id: string
          student_id: string | null
        }
        Insert: {
          created_at?: string
          effectiveness_rating?: number | null
          id?: string
          intervention_used: string
          notes?: string | null
          situation_type: string
          staff_id: string
          student_id?: string | null
        }
        Update: {
          created_at?: string
          effectiveness_rating?: number | null
          id?: string
          intervention_used?: string
          notes?: string | null
          situation_type?: string
          staff_id?: string
          student_id?: string | null
        }
        Relationships: []
      }
      class_wellness_scores: {
        Row: {
          alert_resolution_score: number
          class_id: string | null
          created_at: string
          date: string
          id: string
          mood_score: number
          participation_score: number
          sel_completion_score: number
          status: string
          teacher_id: string | null
          total_score: number
        }
        Insert: {
          alert_resolution_score?: number
          class_id?: string | null
          created_at?: string
          date?: string
          id?: string
          mood_score?: number
          participation_score?: number
          sel_completion_score?: number
          status?: string
          teacher_id?: string | null
          total_score?: number
        }
        Update: {
          alert_resolution_score?: number
          class_id?: string | null
          created_at?: string
          date?: string
          id?: string
          mood_score?: number
          participation_score?: number
          sel_completion_score?: number
          status?: string
          teacher_id?: string | null
          total_score?: number
        }
        Relationships: []
      }
      culture_pulse_surveys: {
        Row: {
          belonging_score: number | null
          grade_level: string | null
          id: string
          mood_score: number | null
          open_feedback: string | null
          safety_perception: number | null
          school_id: string | null
          staff_role: string | null
          submitted_at: string
          survey_type: Database["public"]["Enums"]["pulse_survey_type"]
          user_id: string
        }
        Insert: {
          belonging_score?: number | null
          grade_level?: string | null
          id?: string
          mood_score?: number | null
          open_feedback?: string | null
          safety_perception?: number | null
          school_id?: string | null
          staff_role?: string | null
          submitted_at?: string
          survey_type: Database["public"]["Enums"]["pulse_survey_type"]
          user_id: string
        }
        Update: {
          belonging_score?: number | null
          grade_level?: string | null
          id?: string
          mood_score?: number | null
          open_feedback?: string | null
          safety_perception?: number | null
          school_id?: string | null
          staff_role?: string | null
          submitted_at?: string
          survey_type?: Database["public"]["Enums"]["pulse_survey_type"]
          user_id?: string
        }
        Relationships: []
      }
      culture_pulse_trends: {
        Row: {
          avg_belonging: number | null
          avg_mood: number | null
          avg_safety: number | null
          created_at: string | null
          grade_level: string | null
          id: string
          school_id: string | null
          staff_role: string | null
          survey_type: Database["public"]["Enums"]["pulse_survey_type"]
          total_responses: number | null
          week_end: string
          week_start: string
        }
        Insert: {
          avg_belonging?: number | null
          avg_mood?: number | null
          avg_safety?: number | null
          created_at?: string | null
          grade_level?: string | null
          id?: string
          school_id?: string | null
          staff_role?: string | null
          survey_type: Database["public"]["Enums"]["pulse_survey_type"]
          total_responses?: number | null
          week_end: string
          week_start: string
        }
        Update: {
          avg_belonging?: number | null
          avg_mood?: number | null
          avg_safety?: number | null
          created_at?: string | null
          grade_level?: string | null
          id?: string
          school_id?: string | null
          staff_role?: string | null
          survey_type?: Database["public"]["Enums"]["pulse_survey_type"]
          total_responses?: number | null
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          action: string | null
          error_message: string | null
          id: string
          profile_type: string | null
          resolved: boolean | null
          status_code: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          error_message?: string | null
          id?: string
          profile_type?: string | null
          resolved?: boolean | null
          status_code?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          error_message?: string | null
          id?: string
          profile_type?: string | null
          resolved?: boolean | null
          status_code?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      external_integrations: {
        Row: {
          config: Json
          created_at: string | null
          id: string
          integration_type: Database["public"]["Enums"]["integration_type"]
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          config: Json
          created_at?: string | null
          id?: string
          integration_type: Database["public"]["Enums"]["integration_type"]
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          id?: string
          integration_type?: Database["public"]["Enums"]["integration_type"]
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      external_system_mappings: {
        Row: {
          created_at: string | null
          entity_type: string
          external_id: string
          id: string
          integration_id: string
          internal_id: string
          metadata: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entity_type: string
          external_id: string
          id?: string
          integration_id: string
          internal_id: string
          metadata?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entity_type?: string
          external_id?: string
          id?: string
          integration_id?: string
          internal_id?: string
          metadata?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_system_mappings_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "external_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_credentials: {
        Row: {
          created_at: string | null
          credential_type: string
          credential_value: string
          expires_at: string | null
          id: string
          integration_id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credential_type: string
          credential_value: string
          expires_at?: string | null
          id?: string
          integration_id: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credential_type?: string
          credential_value?: string
          expires_at?: string | null
          id?: string
          integration_id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_credentials_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "external_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_sync_logs: {
        Row: {
          completed_at: string | null
          details: Json | null
          error_message: string | null
          id: string
          integration_id: string
          records_failed: number | null
          records_processed: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["sync_status"]
        }
        Insert: {
          completed_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          integration_id: string
          records_failed?: number | null
          records_processed?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["sync_status"]
        }
        Update: {
          completed_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          integration_id?: string
          records_failed?: number | null
          records_processed?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["sync_status"]
        }
        Relationships: [
          {
            foreignKeyName: "integration_sync_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "external_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      interventions: {
        Row: {
          created_at: string | null
          due_date: string | null
          id: string
          owner_id: string
          plan_text: string
          start_date: string | null
          status: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          owner_id: string
          plan_text: string
          start_date?: string | null
          status?: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          owner_id?: string
          plan_text?: string
          start_date?: string | null
          status?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          prompt_id: string | null
          student_id: string
          text: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          prompt_id?: string | null
          student_id: string
          text: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          prompt_id?: string | null
          student_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "journal_prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_prompts: {
        Row: {
          competency: string
          created_at: string | null
          grade_level: string[] | null
          id: string
          prompt_text: string
        }
        Insert: {
          competency: string
          created_at?: string | null
          grade_level?: string[] | null
          id?: string
          prompt_text: string
        }
        Update: {
          competency?: string
          created_at?: string | null
          grade_level?: string[] | null
          id?: string
          prompt_text?: string
        }
        Relationships: []
      }
      kindness_notes: {
        Row: {
          anonymous: boolean
          id: string
          message: string
          recipient_id: string
          sender_id: string | null
          sent_at: string
          signed: boolean
        }
        Insert: {
          anonymous?: boolean
          id?: string
          message: string
          recipient_id: string
          sender_id?: string | null
          sent_at?: string
          signed?: boolean
        }
        Update: {
          anonymous?: boolean
          id?: string
          message?: string
          recipient_id?: string
          sender_id?: string | null
          sent_at?: string
          signed?: boolean
        }
        Relationships: []
      }
      loopbot_logs: {
        Row: {
          action_taken: string | null
          component: string
          id: string
          issue: string
          scan_id: string | null
          severity: Database["public"]["Enums"]["loopbot_severity"]
          status: Database["public"]["Enums"]["loopbot_status"]
          timestamp: string
        }
        Insert: {
          action_taken?: string | null
          component: string
          id?: string
          issue: string
          scan_id?: string | null
          severity: Database["public"]["Enums"]["loopbot_severity"]
          status?: Database["public"]["Enums"]["loopbot_status"]
          timestamp?: string
        }
        Update: {
          action_taken?: string | null
          component?: string
          id?: string
          issue?: string
          scan_id?: string | null
          severity?: Database["public"]["Enums"]["loopbot_severity"]
          status?: Database["public"]["Enums"]["loopbot_status"]
          timestamp?: string
        }
        Relationships: []
      }
      loopbot_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          location: string | null
          meeting_type: string | null
          organizer_id: string
          participant_ids: string[]
          start_time: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          meeting_type?: string | null
          organizer_id: string
          participant_ids: string[]
          start_time: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          meeting_type?: string | null
          organizer_id?: string
          participant_ids?: string[]
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mood_check_ins: {
        Row: {
          activities: string | null
          created_at: string | null
          energy_level: number
          id: string
          mood_type: Database["public"]["Enums"]["mood_type"]
          notes: string | null
          user_id: string
        }
        Insert: {
          activities?: string | null
          created_at?: string | null
          energy_level: number
          id?: string
          mood_type: Database["public"]["Enums"]["mood_type"]
          notes?: string | null
          user_id: string
        }
        Update: {
          activities?: string | null
          created_at?: string | null
          energy_level?: number
          id?: string
          mood_type?: Database["public"]["Enums"]["mood_type"]
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          activities: string | null
          created_at: string | null
          id: string
          mood_level: number | null
          mood_type: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          activities?: string | null
          created_at?: string | null
          id: string
          mood_level?: number | null
          mood_type?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          activities?: string | null
          created_at?: string | null
          id?: string
          mood_level?: number | null
          mood_type?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      page_not_found_logs: {
        Row: {
          attempted_path: string
          id: string
          referrer_path: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempted_path: string
          id?: string
          referrer_path?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempted_path?: string
          id?: string
          referrer_path?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      parent_meeting_requests: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          parent_id: string
          preferred_date: string | null
          preferred_time_slots: string[] | null
          reason: string
          staff_id: number | null
          status: string
          student_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          parent_id: string
          preferred_date?: string | null
          preferred_time_slots?: string[] | null
          reason: string
          staff_id?: number | null
          status?: string
          student_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          parent_id?: string
          preferred_date?: string | null
          preferred_time_slots?: string[] | null
          reason?: string
          staff_id?: number | null
          status?: string
          student_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_meeting_requests_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_student_relationships: {
        Row: {
          created_at: string
          has_emergency_contact_access: boolean
          id: string
          is_primary: boolean
          parent_id: string
          relationship: string
          student_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          has_emergency_contact_access?: boolean
          id?: string
          is_primary?: boolean
          parent_id: string
          relationship: string
          student_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          has_emergency_contact_access?: boolean
          id?: string
          is_primary?: boolean
          parent_id?: string
          relationship?: string
          student_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_student_relationships_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      safety_alert_settings: {
        Row: {
          alert_type: string
          created_at: string | null
          id: string
          is_active: boolean | null
          notification_rules: Json | null
          school_id: string | null
          threshold_value: Json | null
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notification_rules?: Json | null
          school_id?: string | null
          threshold_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notification_rules?: Json | null
          school_id?: string | null
          threshold_value?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_alert_settings_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_admins: {
        Row: {
          created_at: string
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_admins_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_wellness_scores: {
        Row: {
          alert_resolution_score: number
          created_at: string
          date: string
          id: string
          mood_score: number
          participation_score: number
          school_id: string | null
          sel_completion_score: number
          status: string
          total_score: number
          user_id: string
        }
        Insert: {
          alert_resolution_score?: number
          created_at?: string
          date?: string
          id?: string
          mood_score?: number
          participation_score?: number
          school_id?: string | null
          sel_completion_score?: number
          status?: string
          total_score?: number
          user_id: string
        }
        Update: {
          alert_resolution_score?: number
          created_at?: string
          date?: string
          id?: string
          mood_score?: number
          participation_score?: number
          school_id?: string | null
          sel_completion_score?: number
          status?: string
          total_score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_wellness_scores_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          code: string
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          code: string
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sel_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string
          due_date: string | null
          id: string
          lesson_id: string
          status: string
          student_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          due_date?: string | null
          id?: string
          lesson_id: string
          status?: string
          student_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          due_date?: string | null
          id?: string
          lesson_id?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      sel_lessons: {
        Row: {
          activity_type: string | null
          age_range: string | null
          casel_competency: string
          competency_area: string | null
          content_url: string | null
          created_at: string | null
          created_by: string | null
          cultural_focus: string | null
          description: string | null
          estimated_duration: number | null
          evidence_base: string | null
          grade_range: string[] | null
          id: string
          recommended_moods: string[] | null
          title: string
        }
        Insert: {
          activity_type?: string | null
          age_range?: string | null
          casel_competency?: string
          competency_area?: string | null
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          cultural_focus?: string | null
          description?: string | null
          estimated_duration?: number | null
          evidence_base?: string | null
          grade_range?: string[] | null
          id?: string
          recommended_moods?: string[] | null
          title: string
        }
        Update: {
          activity_type?: string | null
          age_range?: string | null
          casel_competency?: string
          competency_area?: string | null
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          cultural_focus?: string | null
          description?: string | null
          estimated_duration?: number | null
          evidence_base?: string | null
          grade_range?: string[] | null
          id?: string
          recommended_moods?: string[] | null
          title?: string
        }
        Relationships: []
      }
      sel_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          id: string
          lesson_id: string
          progress: number
          student_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id: string
          progress?: number
          student_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id?: string
          progress?: number
          student_id?: string
        }
        Relationships: []
      }
      site_audit_logs: {
        Row: {
          completed_at: string | null
          details: Json | null
          id: string
          issues_found: number
          run_at: string
          run_by_admin_id: string
          status: Database["public"]["Enums"]["audit_status"]
          summary: string | null
        }
        Insert: {
          completed_at?: string | null
          details?: Json | null
          id?: string
          issues_found?: number
          run_at?: string
          run_by_admin_id: string
          status?: Database["public"]["Enums"]["audit_status"]
          summary?: string | null
        }
        Update: {
          completed_at?: string | null
          details?: Json | null
          id?: string
          issues_found?: number
          run_at?: string
          run_by_admin_id?: string
          status?: Database["public"]["Enums"]["audit_status"]
          summary?: string | null
        }
        Relationships: []
      }
      staff_members: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          position: string | null
          school_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          position?: string | null
          school_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          position?: string | null
          school_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      student_badges: {
        Row: {
          badge_name: string | null
          badge_type: string | null
          date_earned: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          badge_name?: string | null
          badge_type?: string | null
          date_earned?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          badge_name?: string | null
          badge_type?: string | null
          date_earned?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_checkins: {
        Row: {
          checkin_time: string | null
          id: number
          notes: string | null
          student_id: string | null
        }
        Insert: {
          checkin_time?: string | null
          id?: never
          notes?: string | null
          student_id?: string | null
        }
        Update: {
          checkin_time?: string | null
          id?: never
          notes?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_checkins_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_goals: {
        Row: {
          created_at: string | null
          goal_text: string | null
          id: string
          is_completed: boolean | null
          reflection_on_goal: string | null
          student_id: string | null
          week_start: string | null
        }
        Insert: {
          created_at?: string | null
          goal_text?: string | null
          id?: string
          is_completed?: boolean | null
          reflection_on_goal?: string | null
          student_id?: string | null
          week_start?: string | null
        }
        Update: {
          created_at?: string | null
          goal_text?: string | null
          id?: string
          is_completed?: boolean | null
          reflection_on_goal?: string | null
          student_id?: string | null
          week_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_goals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_import_logs: {
        Row: {
          created_at: string | null
          error_details: Json | null
          failed_records: number | null
          file_name: string | null
          id: string
          imported_by: string | null
          school_id: string | null
          successful_records: number | null
          total_records: number | null
        }
        Insert: {
          created_at?: string | null
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          id?: string
          imported_by?: string | null
          school_id?: string | null
          successful_records?: number | null
          total_records?: number | null
        }
        Update: {
          created_at?: string | null
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          id?: string
          imported_by?: string | null
          school_id?: string | null
          successful_records?: number | null
          total_records?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_import_logs_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      student_reflections: {
        Row: {
          date_submitted: string | null
          id: string
          prompt_used: string | null
          reflection_text: string | null
          shared_with: string | null
          student_id: string | null
        }
        Insert: {
          date_submitted?: string | null
          id?: string
          prompt_used?: string | null
          reflection_text?: string | null
          shared_with?: string | null
          student_id?: string | null
        }
        Update: {
          date_submitted?: string | null
          id?: string
          prompt_used?: string | null
          reflection_text?: string | null
          shared_with?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_reflections_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_toolkit: {
        Row: {
          added_on: string | null
          id: string
          item_label: string | null
          item_type: string | null
          item_url: string | null
          student_id: string | null
        }
        Insert: {
          added_on?: string | null
          id?: string
          item_label?: string | null
          item_type?: string | null
          item_url?: string | null
          student_id?: string | null
        }
        Update: {
          added_on?: string | null
          id?: string
          item_label?: string | null
          item_type?: string | null
          item_url?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_toolkit_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          enrollment_status: string | null
          grade_level: string | null
          id: string
          school_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          enrollment_status?: string | null
          grade_level?: string | null
          id?: string
          school_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          enrollment_status?: string | null
          grade_level?: string | null
          id?: string
          school_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      super_admins: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "super_admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_schedules: {
        Row: {
          created_at: string | null
          entity_type: string
          frequency_minutes: number
          id: string
          integration_id: string
          is_active: boolean | null
          last_run: string | null
          next_run: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entity_type: string
          frequency_minutes: number
          id?: string
          integration_id: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entity_type?: string
          frequency_minutes?: number
          id?: string
          integration_id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sync_schedules_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "external_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trend_alerts: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          primary_trigger: string
          recommended_action: string | null
          resolution_notes: string | null
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          secondary_triggers: Json | null
          severity: Database["public"]["Enums"]["alert_severity"]
          student_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          primary_trigger: string
          recommended_action?: string | null
          resolution_notes?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          secondary_triggers?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          student_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          primary_trigger?: string
          recommended_action?: string | null
          resolution_notes?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          secondary_triggers?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          student_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trusted_adults: {
        Row: {
          created_at: string
          id: string
          staff_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          staff_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          staff_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trusted_adults_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trusted_adults_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notification_settings: {
        Row: {
          app_enabled: boolean | null
          created_at: string | null
          email_enabled: boolean | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          app_enabled?: boolean | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          app_enabled?: boolean | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          age_group: string | null
          created_at: string | null
          email: string
          full_name: string
          grade_level: string | null
          id: string
          role: string
          school_id: string | null
        }
        Insert: {
          age_group?: string | null
          created_at?: string | null
          email: string
          full_name: string
          grade_level?: string | null
          id: string
          role: string
          school_id?: string | null
        }
        Update: {
          age_group?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          grade_level?: string | null
          id?: string
          role?: string
          school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_sel_focus: {
        Row: {
          competency: string
          created_at: string | null
          description: string
          featured_lesson_ids: string[] | null
          id: string
          school_id: string | null
          theme_title: string
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          competency: string
          created_at?: string | null
          description: string
          featured_lesson_ids?: string[] | null
          id?: string
          school_id?: string | null
          theme_title: string
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          competency?: string
          created_at?: string | null
          description?: string
          featured_lesson_ids?: string[] | null
          id?: string
          school_id?: string | null
          theme_title?: string
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_student_mood: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_school_wellness_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_tiered_support_recommendation: {
        Args: {
          p_student_id: string
          p_recommended_by: string
          p_tier: number
          p_intervention_id?: string
          p_recommendation_notes?: string
          p_status?: string
        }
        Returns: Json
      }
      execute_sql_transaction: {
        Args: { p_sql: string }
        Returns: Json
      }
      get_current_weekly_sel_focus: {
        Args: { p_school_id?: string }
        Returns: {
          competency: string
          created_at: string | null
          description: string
          featured_lesson_ids: string[] | null
          id: string
          school_id: string | null
          theme_title: string
          user_id: string
          week_end: string
          week_start: string
        }[]
      }
      get_filtered_loopbot_logs: {
        Args: {
          p_severity?: Database["public"]["Enums"]["loopbot_severity"][]
          p_component?: string[]
          p_days_back?: number
        }
        Returns: {
          action_taken: string | null
          component: string
          id: string
          issue: string
          scan_id: string | null
          severity: Database["public"]["Enums"]["loopbot_severity"]
          status: Database["public"]["Enums"]["loopbot_status"]
          timestamp: string
        }[]
      }
      get_micro_coach_logs: {
        Args: { p_student_id?: string }
        Returns: Json[]
      }
      get_recommended_sel_lessons: {
        Args: {
          p_mood?: string
          p_grade_level?: string
          p_competency?: string
          p_limit?: number
        }
        Returns: {
          activity_type: string | null
          age_range: string | null
          casel_competency: string
          competency_area: string | null
          content_url: string | null
          created_at: string | null
          created_by: string | null
          cultural_focus: string | null
          description: string | null
          estimated_duration: number | null
          evidence_base: string | null
          grade_range: string[] | null
          id: string
          recommended_moods: string[] | null
          title: string
        }[]
      }
      get_student_intervention_impacts: {
        Args: { p_student_id: string }
        Returns: Json[]
      }
      get_teacher_mood_check_ins: {
        Args: { p_teacher_id: string; p_days_back?: number }
        Returns: {
          id: string
          student_id: string
          mood_type: string
          energy_level: number
          notes: string
          created_at: string
        }[]
      }
      get_teacher_mood_trends: {
        Args:
          | Record<PropertyKey, never>
          | { p_student_id: string; p_days_back?: number }
        Returns: {
          date: string
          mood_type: string
          energy_level: number
        }[]
      }
      get_tiered_support_recommendations: {
        Args: { p_student_id: string }
        Returns: Json[]
      }
      get_user_mood_check_ins: {
        Args: { user_uuid: string; days_back?: number }
        Returns: {
          id: string
          date: string
          mood_type: string
          energy_level: number
          notes: string
        }[]
      }
      get_user_mood_stats: {
        Args:
          | Record<PropertyKey, never>
          | { user_uuid: string; days_back?: number }
        Returns: {
          mood: string
          count: number
        }[]
      }
      get_user_mood_trends: {
        Args: { user_uuid: string; days_back?: number }
        Returns: {
          date: string
          mood_type: string
          energy_level: number
        }[]
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      has_role: {
        Args:
          | { role_name: string }
          | {
              user_id: string
              required_role: Database["public"]["Enums"]["app_role"]
            }
          | { user_id: string; required_role: string }
        Returns: boolean
      }
      insert_intervention_impact: {
        Args: {
          p_student_id: string
          p_staff_id: string
          p_intervention_id: string
          p_tier: number
          p_strategy_notes?: string
          p_impact_score?: number
          p_outcome_notes?: string
        }
        Returns: Json
      }
      insert_micro_coach_log: {
        Args: {
          p_student_id: string
          p_user_id: string
          p_viewed_prompt: string
          p_context: string
        }
        Returns: Json
      }
      insert_teacher_mood_check_in: {
        Args: {
          p_student_id: string
          p_teacher_id: string
          p_mood_type: string
          p_energy_level: number
          p_notes?: string
        }
        Returns: Json[]
      }
      is_school_admin: {
        Args: { user_id: string; school_uuid: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      log_integration_sync: {
        Args: {
          p_integration_id: string
          p_status: Database["public"]["Enums"]["sync_status"]
          p_records_processed?: number
          p_records_failed?: number
          p_error_message?: string
          p_details?: Json
        }
        Returns: string
      }
      map_external_entity: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_integration_id: string
              p_external_id: string
              p_internal_id: string
              p_entity_type: string
              p_metadata?: Json
            }
        Returns: undefined
      }
      register_external_integration: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_name: string
              p_type: Database["public"]["Enums"]["integration_type"]
              p_config: Json
            }
        Returns: undefined
      }
      reset_demo_environment: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      safe_uuid_cast: {
        Args: { text_id: string }
        Returns: string
      }
      schedule_integration_sync: {
        Args: {
          p_integration_id: string
          p_entity_type: string
          p_frequency_minutes: number
        }
        Returns: string
      }
      send_email_on_emergent_need_toggle: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      alert_severity: "stable" | "at_risk" | "critical"
      app_role: "student" | "staff" | "admin" | "parent"
      audit_status: "success" | "warning" | "error"
      integration_type: "classlink" | "skyward" | "other"
      loopbot_severity: "info" | "warning" | "critical"
      loopbot_status: "fixed" | "needs_review" | "ignored"
      mood_type: "happy" | "good" | "okay" | "sad" | "stressed"
      pulse_survey_type: "student" | "staff"
      sync_status: "pending" | "in_progress" | "completed" | "failed"
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
      alert_severity: ["stable", "at_risk", "critical"],
      app_role: ["student", "staff", "admin", "parent"],
      audit_status: ["success", "warning", "error"],
      integration_type: ["classlink", "skyward", "other"],
      loopbot_severity: ["info", "warning", "critical"],
      loopbot_status: ["fixed", "needs_review", "ignored"],
      mood_type: ["happy", "good", "okay", "sad", "stressed"],
      pulse_survey_type: ["student", "staff"],
      sync_status: ["pending", "in_progress", "completed", "failed"],
    },
  },
} as const
