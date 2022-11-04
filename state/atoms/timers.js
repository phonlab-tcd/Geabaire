import { atom, selector } from "recoil";

const sentenceSpeechTimer = atom({
    key: "sentenceSpeechTimer",
    default: null,
});

export { sentenceSpeechTimer };
