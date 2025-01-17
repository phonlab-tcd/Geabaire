import { Switch, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";

/**
 * SwitchEntry component renders a switch entry with a title and switch control.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the switch entry.
 * @param {boolean} props.value - The current value of the switch.
 * @param {function} props.setValue - Function to set the value of the switch.
 * @returns {JSX.Element} A switch entry component.
 */
export default function SwitchEntry({ title, value, setValue }) {
    return (
        <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <Switch
                style={styles.value}
                trackColor={{
                    false: "#767577",
                    true: "#81b0ff",
                }}
                thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setValue}
                value={value}
            />
        </View>
    );
}

// Styles for the SwitchEntry component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    key: {
        fontSize: 20,
        fontWeight: "bold"
    },
    value: {
        marginLeft: "auto",
        marginRight: 35,
    },
});