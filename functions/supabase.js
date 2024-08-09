import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sb3ZiemNqbG9ka3RxcHdtcGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NzQyMjcsImV4cCI6MjAxMzA1MDIyN30.V_3TLXeM6TLslQ4MJWSZmxmMENabpyj3rTCOV5uVUEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
