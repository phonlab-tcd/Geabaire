import { atom, selector } from "recoil";

const boardStackState = atom({
    key: "boardStackState",
    default: [],
});

const loadedBoardState = atom({
    key: "loadedBoardState",
    default: null,
})

export { boardStackState, loadedBoardState };
