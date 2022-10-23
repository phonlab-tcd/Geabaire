import BoardButton from "../../components/boards/BoardButton";
import { supabase } from "../supabase";

let getObfBoard = async (id) => {
    // Only works if their ownership id is correct at the RLS level.
    let { data, error } = await supabase
        .from("obf_boards")
        .select()
        .eq("obf_id", id)
        .single();

    if (data.length < 1) {
        return undefined;
    }

    return { board: data["buttondata"], images: data["obfdata"]["images"] };
};

let getAvailableBoards = async () => {
    let { data, error } = await supabase
        .from("user_profiles")
        .select()
        .limit(1)
        .single();

    if (error) console.error(error);

    return data.boards;
};

export { getObfBoard, getAvailableBoards };
