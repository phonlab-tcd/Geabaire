import { Alert } from "react-native";
import { supabase } from "../state/supabase";

const API_LINK = process.env.EXPO_PUBLIC_GEABAIRE_API_LINK;

let signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log("[auth.js] ", error);
        Alert.alert("Authentication Failed [auth.js]", error.message);
    }

    return error;
};

let signUp = async (email, password, code, can_contact, name, guardian) => {
    const response = await fetch(API_LINK + "/account/signup", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            code,
            "template": "geabaire_29_12_23",
            "meta": {
                guardian,
                name,
                can_contact
            }
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    const body = response.json();
    console.log(body);
};

export { signIn, signUp };