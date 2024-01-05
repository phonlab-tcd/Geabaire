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

    async function authHandler() {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }

    useEffect(() => {
        authHandler();
    }, []);

    return (
        <>
            {session && session.user ? children : <AuthComponent/>}
        </>
    );
}