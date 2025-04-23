
import { supabase } from '@/integrations/supabase/client';
import { ExternalIntegration, IntegrationSyncLog, SyncSchedule } from '@/types/integrations';

export class IntegrationService {
  static async registerIntegration(
    name: string,
    type: 'classlink' | 'skyward' | 'other',
    config: Record<string, any>
  ) {
    const { data, error } = await supabase.rpc('register_external_integration', {
      p_name: name,
      p_type: type,
      p_config: config
    });

    if (error) throw error;
    return data;
  }

  static async listIntegrations() {
    const { data, error } = await supabase
      .from('external_integrations')
      .select('*');

    if (error) throw error;
    return data as ExternalIntegration[];
  }

  static async scheduleSyncTask(
    integrationId: string, 
    entityType: string, 
    frequencyMinutes: number
  ) {
    const { data, error } = await supabase.rpc('schedule_integration_sync', {
      p_integration_id: integrationId,
      p_entity_type: entityType,
      p_frequency_minutes: frequencyMinutes
    });

    if (error) throw error;
    return data;
  }

  static async getSyncLogs(integrationId: string) {
    const { data, error } = await supabase
      .from('integration_sync_logs')
      .select('*')
      .eq('integration_id', integrationId)
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data as IntegrationSyncLog[];
  }

  static async getSchedules(integrationId: string) {
    const { data, error } = await supabase
      .from('sync_schedules')
      .select('*')
      .eq('integration_id', integrationId);

    if (error) throw error;
    return data as SyncSchedule[];
  }
}
