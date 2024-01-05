import { atom } from "recoil";

const boardStackState = atom({
    key: "boardStackState",
    default: [],
});

const loadedBoardState = atom({
    key: "loadedBoardState",
    default: null,
})

const loadedSettingsState = atom({
    key: "loadedSettingsState",
    default: null,
})

export { boardStackState, loadedBoardState, loadedSettingsState };