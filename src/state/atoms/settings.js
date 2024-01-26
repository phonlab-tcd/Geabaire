import { atom } from "recoil";

const settingsState = atom({
    key: "settings",
    default: {
        doSpeakEachWord: true,
        doSpeakFullSentence: true,
        doShowImagesInHomeBar: true,
        speakSentenceDelay: 10000,
        doCorrectSentencesBeforeSpeaking: false,
        doDisplayCorrectedSentencesAfterSpeaking: false,
        voice: "ga_CO_snc_nemo",
        speed: 1.0,
        pitch: 1.0,
        internalSettings: {}
    },
});

const initialSettingsState = atom({
    key: "initialSettings",
    default: undefined
});

export {
    settingsState, initialSettingsState
};