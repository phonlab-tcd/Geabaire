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
import { useEffect } from "react";
import { regionState, speakerState } from "../atoms/voices";
import { getSpeakerAndRegion } from "./useSynthesis";

export default function useSettings(loadedBoard) {
    // Settings state
    let initialSettings = null;

    if (loadedBoard) {
        initialSettings = loadedBoard.meta.settings;
    }

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

    // Voice settings
    let setRegion = useSetRecoilState(regionState);
    let setSpeaker = useSetRecoilState(speakerState);

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
        
        const {speakerName, regionName} = getSpeakerAndRegion(settings.voice);

        setRegion(regionName);
        setSpeaker(speakerName);
    }

    useEffect(() => {
        // If somehow in an invalid state.
        if (!loadedBoard || !initialSettings) {
            return;
        }
        console.log("Loading settings for: " + loadedBoard.meta.id);
        setSettings(initialSettings);
    }, [loadedBoard])


    return {
        setSettings,
        setVoice,
        getSettings: () => settings,
        settings
    };
}

