import { View, Text, StyleSheet } from "react-native";
import { obf } from "../obf/obf";

export default function Home() {
    const board = new obf("./irish_obz_dc");
    console.log(board.getRoot());

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
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
});
