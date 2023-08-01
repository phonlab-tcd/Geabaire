import { Switch, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";

export default function SwitchEntry({ title, atom }) {
    const [value, setValue] = useRecoilState(atom);

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
