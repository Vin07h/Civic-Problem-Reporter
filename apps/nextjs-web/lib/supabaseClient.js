import { createClient } from '@supabase/supabase-js'

console.log("--- INITIALIZING SUPABASE CLIENT ---");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This will log the values in your VS Code terminal AND the browser console
console.log("URL being used:", supabaseUrl);
console.log("ANON KEY being used:", supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL ERROR: Supabase URL or Key is missing. Check your .env.local file and restart the server.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)