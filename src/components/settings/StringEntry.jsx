import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";

export default function StringEntry({ title, atom }) {
    const [value, setValue] = useRecoilState(atom);

    return (
        <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <TextInput
                style={styles.value}
                defaultValue={value}
                onChangeText={setValue}
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
        marginLeft: 35,
    },
    value: {
        marginLeft: "auto",
        marginRight: 35,
        backgroundColor: "#CCC",
        padding: 3,
    },
});