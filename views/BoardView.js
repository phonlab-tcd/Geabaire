import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getObfBoard } from "../state/handlers/boardHandler";
import BoardSettingsModal from "../components/boards/BoardSettingsModal";
import BoardControls from "../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BoardGrid from "../components/boards/BoardGrid";
export default function BoardView({ route }) {
    let [boards, setBoards] = useState(null);
    let board =
        boards && boards.length > 0 ? boards[boards.length - 1] : undefined;

    let [sentence, setSentence] = useState("");
    let [settingsVisable, setSettingsVisable] = useState(false);

    let openFolder = async (id) => {
        let newBoard = await getObfBoard(id);
        setBoards((boards) => [...boards, newBoard]);
    };

    let addWord = (word) => {
        setSentence((sentence) => (sentence + " " + word).trim());
    };

    console.log(board);

    const navigation = useNavigation();

    let load = async () => {
        if (!boards || boards.length === 0) {
            setBoards([await getObfBoard(route.params.rootId)]);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <BoardSettingsModal
                settingsVisable={settingsVisable}
                setSettingsVisable={setSettingsVisable}
            />
            <BoardControls
                boards={boards}
                setBoards={setBoards}
                sentence={sentence}
                setSentence={setSentence}
                setSettingsVisable={setSettingsVisable}
            />
            {board && (
                <BoardGrid
                    style={styles.container}
                    board={board}
                    openFolder={openFolder}
                    addWord={addWord}
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
});
