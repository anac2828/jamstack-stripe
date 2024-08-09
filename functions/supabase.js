import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2ZnFjamd0dGtjeWJuaGtlbWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNTQxNDcsImV4cCI6MjAzODczMDE0N30.ebBOSQruOMr13e0H0j2x0GUUgd5txbRF4-gBTMIxwdw';
const supabase = await createClient(supabaseUrl, supabaseKey);

export default supabase;
