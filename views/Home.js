import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { obf } from "../obf/obf";

export default function Home() {
    const board = new obf("./irish_obz_dc");
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>OpenAAC Viewer</Text>
            <Text style={styles.subheader}>
                A simple application made as an alternative to Coughdrop which
                supports alternative languages more easily.
            </Text>
            <Button onPress={() => navigation.navigate("Board")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        color: "#265b5f",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 64,
    },
    subheader: {
        paddingTop: 12,
        color: "#333",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: 32,
    },
    p: {
        color: "#002223",
    },
});
