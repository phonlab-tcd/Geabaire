import { useEffect, useState } from "react";
import { supabase } from "../supabase";

/**
 * The Auth Provider ensures that the user is logged in before rendering any of its child 
 * @param {Array} children The component tree to be displayed when the user is logged in.
 * @param {Component} AuthComponent The authentication screen to show if the user isn't logged in.
 * @returns 
 */
export default function AuthProvider({children, AuthComponent}) {
    const [session, setSession] = useState(null);

    // Function to handle authentication
    async function authHandler() {
        // Get the current session from Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session); // Set the session state
        });

        // Listen for authentication state changes
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session); // Update session state on change
        });
    }

    // Effect to run the authHandler on component mount
    useEffect(() => {
        authHandler();
    }, []);

    // Render children if session exists, otherwise render AuthComponent
    return (
        <>
            {session && session.user ? children : <AuthComponent/>}
        </>
    );
}