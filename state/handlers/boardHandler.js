import BoardButton from "../../components/boards/BoardButton";
import { supabase } from "../supabase";

let getObfBoard = async (id) => {
    // Only works if their ownership id is correct at the RLS level.
    let { data, error } = await supabase
        .from("obf_boards")
        .select()
        .eq("obf_id", id);

    console.log(error);
    console.log(data);

    if (data.length < 1) {
        return undefined;
    }

    return data[0]["obfdata"];
};

let getObfImage = async (id) => {
    let userId = supabase.auth.session().id;

    const { data, error } = await supabase.storage
        .from("obfdata")
        .getPublicUrl(id.replace("images", userId));

    console.log(error);

    console.log(data);
    return data;
};

export { getObfBoard, getObfImage };
