import { StyleSheet, View } from "react-native";

export default function BoardView() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
    },
});
