import { StyleSheet, View } from "react-native";

export default function EmptyButton() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
