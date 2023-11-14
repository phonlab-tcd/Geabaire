import { useRecoilState, useRecoilValue } from "recoil";
import { canContactState, idState, nameState, onOpenBoardState, profileState } from "../atoms/profile";
import { useEffect } from "react";
import { supabase } from "../supabase";

export default function useProfile() {
    const [id, setId] = useRecoilState(idState);
    const [name, setName] = useRecoilState(nameState);
    const [canContact, setCanContact] = useRecoilState(canContactState);
    const [onOpenBoard, setOnOpenBoard] = useRecoilState(onOpenBoardState);
    const profile = useRecoilValue(profileState);
    
    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser()
            const id = user.id;

            const {data: newProfile, error} = await supabase.from("aac_profiles").select().eq("id", id).single();
            if (error) {
                console.log("[useProfile] ", error);
                alert("An error occured while loading your account profile.")
            }

            setId(newProfile.id);
            setName(newProfile.name);
            setCanContact(newProfile.can_contact);
            setOnOpenBoard(newProfile.on_open_board);
        }

        if (!profile.id) {
            load();
        }
    }, [])

    return {
        id,
        name, setName,
        canContact, setCanContact,
        onOpenBoard, setOnOpenBoard,
        profile
    }
}