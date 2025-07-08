export interface Result {
  total_emails_sent: number;
  emails_in_queue: number;
  created_templates: number;
  total_templates: number;
  active_templates: number;
  in_active_templates: number;
  settings_wise_usages: SettingsWiseUsage[];
}

export interface SettingsWiseUsage {
  setting_name: string;
  total_api_request: number;
  email_instances: number;
}
export interface ListRequest {
  filter_type?: string;
  notification_code?: string;
  filter_method?: string;
}
