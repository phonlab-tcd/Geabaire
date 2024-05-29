import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import useBoard from "../../state/hooks/useBoard";
import { useEffect } from "react";

export default function LoadingBoardScreen({route, navigation}) {
    // Get the loadedBoard state from the custom hook
    const {loadedBoard} = useBoard(route.params.boardId);

    useEffect(() => {
        // Check if route params are present and if the boardID is specified
        if (route.params && !route.params.boardId) {
            alert("You need to specify which board to open.");
            return;
        }
    
        // If loadedBoard is available and has an id, navigate to the BoardScreen
        if (loadedBoard && loadedBoard.meta.id) {
            navigation.navigate("Board", { boardId: route.params.boardId })
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