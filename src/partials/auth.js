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

let signUp = async (email, password, code, can_contact, name, guardian, change) => {
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
            "Content-Type": "application/json"
        }
    })
    let body;
    if (response.status !== 200) {
        try {
            body = await response.json();
            Alert.alert("An error occured", `Status: ${response.status} Error: ` + body.message);
        } catch (e) {
            Alert.alert("An error occured", `Status: ${response.status}. We have no further information`);
        }
        return;
    }

    body = await response.json();
    Alert.alert("Sucess!", body.message);
    change();
};

export { signIn, signUp };