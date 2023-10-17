import { atom } from "recoil";

const regionState = atom({
    key: "regionSelectionState",
    default: null
})

const speakerState = atom({
    key: "speakerState",
    default: null
})

export { regionState, speakerState }