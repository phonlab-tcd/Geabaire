import { atom, selector } from "recoil";

const doSpeakEachWordState = atom({
    key: "doSpeakEachWordState",
    default: false,
});

const doSpeakFullSentenceState = atom({
    key: "doSpeakFullSentenceState",
    default: false,
});

const doShowImagesInHomeBarState = atom({
    key: "doShowImagesInHomeBarState",
    default: false,
});

const doCorrectSentencesBeforeSpeakingState = atom({
    key: "doCorrectSentencesBeforeSpeakingState",
    default: false,
});

const doDisplayCorrectedSentencesAfterSpeakingState = atom({
    key: "doDisplayCorrectedSentencesAfterSpeakingState",
    default: false,
});

const speakSentenceDelayState = atom({
    key: "speakSentenceDelayState",
    default: 0,
});

const voiceState = atom({
    key: "voiceState",
    default: "",
});

const speedState = atom({
    key: "speedState",
    default: 0,
});

const pitchState = atom({
    key: "pitchState",
    default: 0,
});

const settingsState = selector({
    key: "settings",
    get: ({ get }) => {
        return {
            doSpeakEachWord: get(doSpeakEachWordState),
            doSpeakFullSentence: get(doSpeakFullSentenceState),
            doShowImagesInHomeBar: get(doShowImagesInHomeBarState),
            speakSentenceDelay: get(speakSentenceDelayState),
            doCorrectSentencesBeforeSpeaking: get(
                doCorrectSentencesBeforeSpeakingState
            ),
            doDisplayCorrectedSentencesAfterSpeaking: get(
                doDisplayCorrectedSentencesAfterSpeakingState
            ),
            voice: get(voiceState),
            speed: get(speedState),
            pitch: get(pitchState),
        };
    },
});

export {
    doSpeakEachWordState,
    doSpeakFullSentenceState,
    doShowImagesInHomeBarState,
    doCorrectSentencesBeforeSpeakingState,
    doDisplayCorrectedSentencesAfterSpeakingState,
    speakSentenceDelayState,
    voiceState,
    speedState,
    pitchState,
    settingsState,
};