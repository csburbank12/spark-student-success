
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xdrfaqdtdxuqocxzuiee.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcmZhcWR0ZHh1cW9jeHp1aWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NzI5ODcsImV4cCI6MjA2MDI0ODk4N30.7VOO6dY_yj2stiVh2nxGfipffzyEa421uWDzB24qOLw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
