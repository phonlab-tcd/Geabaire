import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "https://eqebprduguylkjzkshhf.supabase.co"
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZWJwcmR1Z3V5bGtqemtzaGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NTIyNDksImV4cCI6MjAxMzEyODI0OX0.J_3TY0djdj_u6d0lzhcDXmJPE3AcdHyLeLqAIK0d6VQ"

export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);