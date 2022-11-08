import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { useRecoilState } from "recoil";
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
} from "../state/atoms/settings";
import { getUserSettings } from "../state/handlers/settingsHandler";

export default function LoadingView() {
    let navigation = useNavigation();

    // Settings state
    let [doSpeakEachWord, setDoSpeakEachWord] =
        useRecoilState(doSpeakEachWordState);

    let [doSpeakFullSentence, setDoSpeakFulLSentence] = useRecoilState(
        doSpeakFullSentenceState
    );

    let [doShowImagesInHomeBar, setDoShowImagesInHomeBar] = useRecoilState(
        doShowImagesInHomeBarState
    );

    let [
        doCorrectSentencesBeforeSpeaking,
        setDoCorrectSentencesBeforeSpeaking,
    ] = useRecoilState(doCorrectSentencesBeforeSpeakingState);
    let [
        doDisplayCorrectedSentencesAfterSpeaking,
        setDoDisplayCorrectedSentencesAfterSpeaking,
    ] = useRecoilState(doDisplayCorrectedSentencesAfterSpeakingState);
    let [speakSentenceDelay, setSpeakSentenceDelay] = useRecoilState(
        speakSentenceDelayState
    );
    let [voice, setVoice] = useRecoilState(voiceState);
    let [speed, setSpeed] = useRecoilState(speedState);
    let [pitch, setPitch] = useRecoilState(pitchState);

    async function load() {
        let settings = await getUserSettings();
        setSettings(settings);

        navigation.navigate("Home");
    }

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

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading!!!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "black",
        fontSize: 120,
    },
});
