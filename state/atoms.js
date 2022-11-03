import { atom } from "recoil";

const settingsState = atom({
    key: "settingsState",
    default: {
        doSpeakEachWord: true,
        speakSentenceDelay: 2000,
        voice: "ga_CO_snc_nemo",
        speed: 1,
        pitch: 1,
    },
});

export { settingsState };
