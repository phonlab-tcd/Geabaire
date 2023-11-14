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
import { getSpeakerAndRegion } from "../../partials/synthesis";

export default function useSettings(loadedSettings) {
    // Settings state
    let initialSettings = null;

    if (loadedSettings) {
        initialSettings = loadedSettings;
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
        if (!loadedSettings || !initialSettings) {
            return;
        }

        console.log("[useSettings] Loading board settings.");

        if (initialSettings === settings) {
            return;
        }

        setSettings(initialSettings);
    }, [loadedSettings])

    useEffect(() => {
        if (!loadedSettings) return;

        // async function updateSettings() {
        //     console.log("settings changed");
        //     // update the settings 
        //     let board = loadedBoard;
        //     board.meta.settings = settings;
        //     console.log(settings);

        //     const {error} = await supabase.from("aac_complete_boards")
        //         .update({board})
        //         .eq("id", board.meta.id);

        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Updated settings sucessfully")
        //     }
        // }
        // updateSettings();
    }, [settings])

    return {
        setSettings,
        setVoice,
        getSettings: () => settings,
        settings,
        initialSettings
    };
}