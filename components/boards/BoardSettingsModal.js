import {
    faCross,
    faSpaghettiMonsterFlying,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { Switch } from "react-native-web";
import { useRecoilState } from "recoil";
import { settingsState } from "../../state/atoms";

export default function BoardSettingsModal({
    settingsVisable,
    setSettingsVisable,
}) {
    const [settings, setSettings] = useRecoilState(settingsState);

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
                    <ScrollView>
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

                        <View>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#81b0ff",
                                }}
                                thumbColor={
                                    settings.doSpeakEachWord
                                        ? "#f5dd4b"
                                        : "#f4f3f4"
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {}}
                                value={settings.doSpeakEachWord}
                            />
                        </View>

                        <Button
                            style={styles.button}
                            title="Close"
                            type="clear"
                            fontSize={50}
                            onPress={() => setSettingsVisable((prev) => !prev)}
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
    },
    headerText: {
        color: "white",
        fontSize: 24,
        padding: 12,
    },
    button: {
        marginTop: "auto",
    },
});
