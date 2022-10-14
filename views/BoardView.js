import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { FlatGrid } from "react-native-super-grid";
export default function BoardView() {
    let [board, setBoard] = useState(null);
    let [sentence, setSentence] = useState("");

    const navigation = useNavigation();
    const windowHeight = Dimensions.get("window").height;

    let gridItemHeight;

    if (board) {
        gridItemHeight = (windowHeight - 110) / board.grid.rows;
    }

    let load = async () => {
        let boardData = await getObfBoard("1_1701841");
        setBoard(boardData);
    };

    let addWord = (word) => {
        setSentence((sentence) => (sentence + " " + word).trim());
    };

    let removeLastWord = () => {
        setSentence((sentence) =>
            sentence.substring(0, sentence.lastIndexOf(" "))
        );
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

                <TextInput
                    style={styles.speakBox}
                    onChangeText={(sentence) => setSentence(sentence)}
                    defaultValue={sentence}
                />

                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => removeLastWord()}
                >
                    <FontAwesomeIcon
                        style={styles.topBarIcon}
                        icon={faDeleteLeft}
                        size={45}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setSentence("")}
                >
                    <FontAwesomeIcon
                        style={styles.topBarIcon}
                        icon={faXmark}
                        size={45}
                    />
                </TouchableOpacity>
            </View>
            {board && (
                <FlatGrid
                    itemDimension={130}
                    data={board.buttons}
                    style={styles.boardContainer}
                    spacing={3}
                    renderItem={({ item }) => (
                        <BoardButton
                            item={item}
                            height={gridItemHeight}
                            addWord={addWord}
                            images={board.images}
                        />
                    )}
                />
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
    iconContainer: {
        borderColor: "#f2f2f2",
        borderRadius: 12,
        borderWidth: 3,
        padding: 10,
        marginRight: 10,
    },
    boardContainer: {
        flex: 1,
        height: "100%",
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
});
