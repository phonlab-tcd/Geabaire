import { atom } from "recoil";

const doSpeakEachWordState = atom({
    key: "doSpeakEachWordState",
    value: true,
});

const speakSentenceDelayState = atom({
    key: "speakSentenceDelayState",
    value: 2000,
});

const voiceState = atom({
    key: "voiceState",
    value: "ga_CO_snc_nemo",
});

const speedState = atom({
    key: "speedState",
    value: 1,
});

const pitchState = atom({
    key: "pitchState",
    value: 1,
});

export {
    doSpeakEachWordState,
    speakSentenceDelayState,
    voiceState,
    speedState,
    pitchState,
};
