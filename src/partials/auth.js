import { Alert } from "react-native";
import { supabase } from "../state/supabase";

let signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log("[auth.js] ", error);
        Alert.alert("[auth.js] ", error.message);
    }

    return error;
};

let signUp = async (email, password, invite, con_contact, name, guardian) => {
    
};

export { signIn, signUp };