
export interface ExternalIntegration {
  id: string;
  name: string;
  integration_type: 'classlink' | 'skyward' | 'other';
  is_active: boolean;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface IntegrationSyncLog {
  id: string;
  integration_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  records_processed: number;
  records_failed: number;
  started_at: string;
  completed_at?: string;
  error_message?: string;
  details?: Record<string, any>;
}

export interface SyncSchedule {
  id: string;
  integration_id: string;
  entity_type: string;
  frequency_minutes: number;
  is_active: boolean;
  last_run?: string;
  next_run?: string;
}
