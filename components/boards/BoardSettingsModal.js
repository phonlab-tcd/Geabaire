import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";

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
                    <View style={styles.modalTop}>
                        <Text style={styles.headerText}>Board Settings</Text>
                        <TouchableOpacity
                            onPress={() => setSettingsVisable((prev) => !prev)}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                size={32}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        style={styles.button}
                        title="Close"
                        type="clear"
                        fontSize={50}
                        onPress={() => setSettingsVisable((prev) => !prev)}
                    />
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
