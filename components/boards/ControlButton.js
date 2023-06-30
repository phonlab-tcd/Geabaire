import { StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";

export default function ControlButton({icon, label, action}) {

    return (
        <TouchableOpacity style={[styles.container]} onPress={action}>
            <Text style={styles.labelStyle}>{label}</Text>
            <FontAwesomeIcon icon={icon} size={32} color={"black"} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        margin: 8,
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    labelStyle: {
        fontSize: 16,
        paddingBottom: 10,
        textAlign: "center",
    },
})