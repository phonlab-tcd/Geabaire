import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import useBoard from "../../state/hooks/useBoard";
import { useEffect } from "react";

export default function BoardLoadingView({route, navigation}) {
    const {loadedBoard} = useBoard(route.params.boardId);

    useEffect(() => {
        if (route.params && !route.params.boardId) {
            alert("You need to specify which board to open.");
            return;
        }
    
        if (loadedBoard && loadedBoard.meta.id) {
            navigation.navigate("Speak Mode", { boardId: route.params.boardId })
        }
    }, [loadedBoard])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading Board...</Text>
            <ActivityIndicator style={styles.indicator} size={90} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        color: "black",
        fontSize: 120,
    },
    indicator: {
        paddingTop: 25,
        marginLeft: 25
    }
});
