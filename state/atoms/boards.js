import { atom, selector } from "recoil";

const boardStackState = atom({
    key: "boardStackState",
    default: [],
});

export { boardStackState };
