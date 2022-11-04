import { atom, selector } from "recoil";

const doSpeakEachWordState = atom({
    key: "doSpeakEachWordState",
    default: true,
});

const speakSentenceDelayState = atom({
    key: "speakSentenceDelayState",
    default: 6000,
});

const voiceState = atom({
    key: "voiceState",
    default: "ga_CO_snc_nemo",
});

const speedState = atom({
    key: "speedState",
    default: 1,
});

const pitchState = atom({
    key: "pitchState",
    default: 1,
});

const settingsState = selector({
    key: "settings",
    get: ({ get }) => {
        return {
            doSpeakEachWord: get(doSpeakEachWordState),
            speakSentenceDelay: get(speakSentenceDelayState),
            voice: get(voiceState),
            speed: get(speedState),
            pitch: get(pitchState),
        };
    },
});

export {
    doSpeakEachWordState,
    speakSentenceDelayState,
    voiceState,
    speedState,
    pitchState,
    settingsState,
};
