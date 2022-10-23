import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function EmptyButton() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
