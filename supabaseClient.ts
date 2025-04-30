import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(
  'https://alvmuuodakpsjwfvmspk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdm11dW9kYWtwc2p3ZnZtc3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NjE0OTIsImV4cCI6MjA1MzQzNzQ5Mn0.byppoIwq3NQMb9QkPY0pI1y0Cad8_jUEXHl4llPan4A'
);
