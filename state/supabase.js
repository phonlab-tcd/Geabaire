import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);

// Some code to run privilged statements in the local dev environment

// export const supabase_priviliged_local = createClient(
//     process.env.EXPO_PUBLIC_SUPABASE_URL,
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU",
//     {
//         auth: {
//             storage: AsyncStorage,
//             autoRefreshToken: true,
//             persistSession: true,
//             detectSessionInUrl: false,
//         },
//     })


// async function run() {
//     console.log(await supabase_priviliged_local.auth.admin.updateUserById("36eb281f-9c92-46f0-8ac4-ca3296df97c2", {
//         password: "test1234"
//     }))
// }

// run();