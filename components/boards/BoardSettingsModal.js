import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    doSpeakEachWordState,
    pitchState,
    speakSentenceDelayState,
    speedState,
    voiceState,
} from "../../state/atoms/settings";
import SliderEntry from "../settings/SliderEntry";
import StringEntry from "../settings/StringEntry";
import SwitchEntry from "../settings/SwitchEntry";

export default function BoardSettingsModal({
    settingsVisable,
    setSettingsVisable,
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={settingsVisable}
            onRequestClose={() => {
                setSettingsVisable((prev) => !prev);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView styles={styles.fill}>
                        <View style={styles.modalTop}>
                            <Text style={styles.headerText}>
                                Board Settings
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    setSettingsVisable((prev) => !prev)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={32}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <SwitchEntry
                            title="Speak each word"
                            atom={doSpeakEachWordState}
                        />
                        <StringEntry title="Voice" atom={voiceState} />
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
    },
    modalView: {
        width: "40%",
        height: "50%",
        backgroundColor: "#fcfbfc",
    },
    modalTop: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#7156fe",
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
});
