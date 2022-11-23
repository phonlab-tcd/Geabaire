import {
    doCorrectSentencesBeforeSpeakingState,
    doDisplayCorrectedSentencesAfterSpeakingState,
    doShowImagesInHomeBarState,
    doSpeakEachWordState,
    doSpeakFullSentenceState,
    pitchState,
    speakSentenceDelayState,
    speedState,
    voiceState,
} from "../atoms/settings";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsState } from "../atoms/settings";

export default function useSettings() {
    // Settings state
    let settings = useRecoilValue(settingsState);

    let setDoSpeakEachWord = useSetRecoilState(doSpeakEachWordState);
    let setDoSpeakFulLSentence = useSetRecoilState(doSpeakFullSentenceState);
    let setDoShowImagesInHomeBar = useSetRecoilState(
        doShowImagesInHomeBarState
    );
    let setDoCorrectSentencesBeforeSpeaking = useSetRecoilState(
        doCorrectSentencesBeforeSpeakingState
    );
    let setDoDisplayCorrectedSentencesAfterSpeaking = useSetRecoilState(
        doDisplayCorrectedSentencesAfterSpeakingState
    );
    let setSpeakSentenceDelay = useSetRecoilState(speakSentenceDelayState);
    let setVoice = useSetRecoilState(voiceState);
    let setSpeed = useSetRecoilState(speedState);
    let setPitch = useSetRecoilState(pitchState);

    function setSettings(settings) {
        setDoSpeakEachWord(settings.doSpeakEachWord);
        setDoSpeakFulLSentence(settings.doSpeakFullSentence);
        setDoShowImagesInHomeBar(settings.doShowImagesInHomeBar);
        setDoCorrectSentencesBeforeSpeaking(
            settings.doCorrectSentencesBeforeSpeaking
        );
        setDoDisplayCorrectedSentencesAfterSpeaking(
            settings.doDisplayCorrectedSentencesAfterSpeaking
        );
        setSpeakSentenceDelay(settings.speakSentenceDelay);
        setVoice(settings.voice);
        setSpeed(settings.speed);
        setPitch(settings.pitch);
    }

    return {
        setSettings,
        getSettings: () => settings,
    };
}
