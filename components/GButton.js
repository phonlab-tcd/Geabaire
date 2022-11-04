import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function GButton({ buttonColor, textColor, label, action }) {
    let buttonStyle = buttonColor
        ? { ...styles.button, backgroundColor: buttonColor }
        : styles.button;

    let textStyle = textColor
        ? { ...styles.buttonText, color: textColor }
        : styles.textColor;

    return (
        <TouchableOpacity style={buttonStyle} onPress={action}>
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#CCC",
        margin: 12,
        borderRadius: 12,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonText: {
        color: "#181818",
        fontSize: 10,
        textTransform: "uppercase",
    },
});
