import { StyleSheet, View } from "react-native";

export default function BoardButtonEmpty() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        margin: 8,
    },
});