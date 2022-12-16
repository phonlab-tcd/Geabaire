import { atom } from "recoil";

const voicesState = atom({
    key: "voicesState",
    default: null,
});

const regionState = atom({
    key: "regionSelectionState",
    default: null
})

const speakerState = atom({
    key: "speakerState",
    default: null
})

const synthTypeState = atom({
    key: "synthTypeState",
    default: null
})

export { voicesState, regionState, speakerState, synthTypeState }