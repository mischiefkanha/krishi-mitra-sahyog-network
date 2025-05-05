
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pkdurupsohmxccbosjnt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZHVydXBzb2hteGNjYm9zam50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5MzYsImV4cCI6MjA1OTQ5NzkzNn0.lMsp90ijyh-VO8QrbvqthGQ81AC2hjKyL13Yr7zCvu4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Change 'export { Database }' to 'export type { Database }' to fix the TS1205 error
export type { Database } from './types';
