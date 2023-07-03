import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { doCorrectSentencesBeforeSpeakingState, doDisplayCorrectedSentencesAfterSpeakingState, doShowImagesInHomeBarState, doSpeakEachWordState, doSpeakFullSentenceState, pitchState, speakSentenceDelayState, speedState, voiceState } from "../../state/atoms/settings";
import { regionState, speakerState, synthTypeState } from "../../state/atoms/voices";
import useVoices from "../../state/hooks/useVoices";
import DropdownEntry from "../settings/DropdownEntry";
import SliderEntry from "../settings/SliderEntry";
import StringEntry from "../settings/StringEntry";
import SwitchEntry from "../settings/SwitchEntry";

export default function BoardSettingsModal({ settingsVisable, setSettingsVisable, setSettings }) {
    let voiceApi = useVoices();

    return (
        <Modal
            animationType="fade"
            visible={settingsVisable}
            onRequestClose={() => {
                setSettingsVisable((prev) => !prev);
                setSettings();
            }}
            transparent
            statusBarTranslucent
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView styles={styles.fill}>
                        <View style={styles.modalTop}>
                            <Text style={styles.headerText}>
                                Board Settings
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setSettingsVisable((prev) => !prev);
                                    setSettings();
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={32}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

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
                                title="Synth Type"
                                atom={synthTypeState}
                                data={voiceApi.getAvailableSynths()}
                            />
                        }

                        <SwitchEntry
                            title="Speak each word"
                            subtitle=""
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

                        <SwitchEntry
                            title="Correct Sentences before speaking"
                            atom={doCorrectSentencesBeforeSpeakingState}
                        />

                        <SwitchEntry
                            title="Display corrected sentence after speaking"
                            atom={doDisplayCorrectedSentencesAfterSpeakingState}
                        />

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
                        <SliderEntry
                            title="Speak Sentence Delay"
                            atom={speakSentenceDelayState}
                            min={1000}
                            max={15000}
                            step={1000}
                        />

                        {
                            voiceApi.synthType && (
                                <Text style={styles.key}>
                                    Selected voice: {voiceApi.getVoiceString()}
                                </Text>
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        width: 600,
        height: 700,
        backgroundColor: "#ECF9EE",
    },
    modalTop: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6a994e",
        justifyContent: "space-between",
        paddingLeft: 23,
        paddingRight: 23,
        marginBottom: 12,
    },
    headerText: {
        color: "white",
        fontSize: 24,
        padding: 12,
    },
    button: {
        marginBottom: "auto",
        marginTop: "auto",
    },
    fill: {
        flex: 1,
        flexGrow: 1,
    },
    key: {
        marginLeft: "auto",
        marginRight: "auto",
        color: "#777"
    }
});
