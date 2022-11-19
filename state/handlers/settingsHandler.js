import { supabase } from "../supabase";

let getUserSettings = async () => {
    let { data, error } = await supabase
        .from("user_profiles")
        .select()
        .limit(1)
        .single();

    return data.settings;
};

let updateUserSettings = async (settings) => {
    let { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("user_profiles")
        .update({ uuid: user.user.id, settings: settings });

    console.log(error);
};

export { getUserSettings, updateUserSettings };
