import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";

import appjson from "../app.json";
setupURLPolyfill();

export const supabase = createClient(
    appjson.supabase.url,
    appjson.supabase.anon_key,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);
