import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    faDeleteLeft,
    faHouse,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getObfBoard } from "../state/handlers/boardHandler";
import BoardButton from "../components/boards/BoardButton";
export default function BoardView() {
    let [board, setBoard] = useState(null);

    const navigation = useNavigation();

    let load = async () => {
        let boardData = await getObfBoard("1_1701841");
        setBoard(boardData);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate("Home")}
                >
                    <FontAwesomeIcon
                        style={styles.topBarIcon}
                        icon={faHouse}
                        size={45}
                    />
                </TouchableOpacity>

                <TextInput style={styles.speakBox} />

                <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesomeIcon
                        style={styles.topBarIcon}
                        icon={faDeleteLeft}
                        size={45}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesomeIcon
                        style={styles.topBarIcon}
                        icon={faXmark}
                        size={45}
                    />
                </TouchableOpacity>
            </View>
            {board && (
                <View style={styles.boardContainer}>
                    <FlatList
                        style={styles.boardContainer}
                        data={board.buttons}
                        numColumns={board.grid.columns}
                        renderItem={BoardButton}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        flex: 1,
    },
    topBar: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(12, 12, 12, 0.3)",
        alignItems: "center",
        paddingLeft: 32,
        paddingRight: 32,
    },
    topBarIcon: {
        color: "#f2f2f2",
    },
    speakBox: {
        flex: 1,
        height: 70,
        borderWidth: 4,
        fontSize: 40,
        paddingLeft: 9,
        marginLeft: 32,
        marginRight: 45,
        borderColor: "#f2f2f2",
        borderRadius: 12,
    },
    boardContainer: {
        flex: 1,
    },
    iconContainer: {
        borderColor: "#f2f2f2",
        borderRadius: 12,
        borderWidth: 3,
        padding: 10,
        marginRight: 10,
    },
});
