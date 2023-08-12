import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownEntry from "../../components/settings/DropdownEntry";
import { regionState, speakerState, synthTypeState } from "../../state/atoms/voices.js";
import useVoices from "../../state/hooks/useVoices.js";
import SliderEntry from "../../components/settings/SliderEntry";
import { doShowImagesInHomeBarState, doSpeakEachWordState, doSpeakFullSentenceState, pitchState, settingsState, speakSentenceDelayState, speedState, voiceState } from "../../state/atoms/settings";
import SwitchEntry from "../../components/settings/SwitchEntry";
import { useEffect } from "react";
import { updateUserSettings } from "../../state/handlers/settingsHandler";
import { useGetRecoilValueInfo_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";

// Region
// Speaker
// Synth Type
// Speak eeach word
// Speak full sentence
// show images 
// correct sentences
// display corrected sentence
// speed
// pitch
// delay
export default function BoardSettingsView({ navigation }) {
    const voiceApi = useVoices();
    const settings = useRecoilValue(settingsState);
    const [voice, setVoice] = useRecoilState(voiceState);
    const region = useRecoilValue(regionState);
    const speaker = useRecoilValue(speakerState);
    const type = useRecoilState(synthTypeState);

    useEffect(() => {
        updateUserSettings({ ...settings, voice: voiceApi.getVoiceString() });
    }, [settings])

    useEffect(() => {
        setVoice(voiceApi.getVoiceString());
    }, [region, speaker, type])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerLabel}>Board Settings</Text>
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.toggleDrawer()}>
                    <FontAwesomeIcon
                        icon={faBars}
                        size={30}
                        color="#F2F2F2"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.settingsContainer}>
                <View style={styles.settingsGroup}>
                    <Text style={styles.settingsHeaderLabel}>
                        Text to Speech Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Configure the text speech synthesiser by region, speaker, speed, pitch et cetera.
                    </Text>
                    <DropdownEntry
                        title="Region"
                        atom={regionState}
                        data={voiceApi.getAvailableRegions()}
                    />
                    {voiceApi.region &&
                        <DropdownEntry
                            title="Speaker"
                            atom={speakerState}
                            data={voiceApi.getAvailableSpeakers()}
                        />
                    }
                    {voiceApi.speaker &&
                        <DropdownEntry
                            title="Type"
                            atom={synthTypeState}
                            data={voiceApi.getAvailableSynths()}
                        />
                    }
                    {<Text>{ }</Text>}
                    <SliderEntry
                        title="Speed"
                        atom={speedState}
                        min={0.1}
                        max={1.5}
                        step={0.1}
                    />

                    <SliderEntry
                        title="Pitch"
                        atom={pitchState}
                        min={0.1}
                        max={1.5}
                        step={0.1}
                    />

                    <Text>Voice: {voiceApi.getVoiceString()}</Text>
                </View>

                <View style={styles.settingsGroup}>
                    <Text style={styles.settingsHeaderLabel}>
                        Interface Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Change how the interface reacts to the user.
                    </Text>
                    <SwitchEntry
                        title="Say each pressed button"
                        atom={doSpeakEachWordState}
                    />
                    <SwitchEntry
                        title="Speak full sentences after delay"
                        atom={doSpeakFullSentenceState}
                    />
                    <SwitchEntry
                        title="Show images in home bar"
                        atom={doShowImagesInHomeBarState}
                    />
                    <SliderEntry
                        title="Sentence Delay"
                        atom={speakSentenceDelayState}
                        min={1000}
                        max={15000}
                        step={1000}
                        unit={"ms"}
                    />
                </View>

                <View style={styles.settingsGroup}>
                    <Text style={styles.settingsHeaderLabel}>
                        Corrector Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Coming Soon.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
        flex: 1
    },
    settingsContainer: {
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    settingsGroup: {
        maxWidth: 500,
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#DDD"
    },
    header: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
    },
    headerLabel: {
        color: "#F2F2F2",
        fontSize: 25,
        marginLeft: 60
    },
    settingsHeaderLabel: {
        color: "#010B13",
        fontSize: 24,
        paddingBottom: 15,
        fontWeight: "bold"
    },
    settingsExplaination: {
        fontSize: 18,
        paddingBottom: 6
    }
})