import { atom, selector } from "recoil";

export const idState = atom({
    key: "profileIdState",
    default: undefined,
});

export const nameState = atom({
    key: "profileNameState",
    default: undefined,
});

export const canContactState = atom({
    key: "profileContactState",
    default: undefined,
});

export const onOpenBoardState = atom({
    key: "profileOnOpenBoardState",
    default: undefined,
});

export const profileState = selector({
    key: "profile",
    get: ({ get }) => {
        return {
            id: get(idState),
            name: get(nameState),
            can_contact: get(canContactState),
            on_open_board: get(onOpenBoardState)
        }
    }
})