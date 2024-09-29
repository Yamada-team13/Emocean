// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Supabase API URL と KEY を環境変数から取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
