import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getObfBoard } from "../state/handlers/boardHandler";
import BoardSettingsModal from "../components/boards/BoardSettingsModal";
import BoardControls from "../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import BoardGrid from "../components/boards/BoardGrid";
import { useRecoilValue } from "recoil";
import { settingsState } from "../state/atoms/settings";
import { updateUserSettings } from "../state/handlers/settingsHandler";

export default function BoardView({ route }) {
    let [boards, setBoards] = useState(null);
    let board =
        boards && boards.length > 0 ? boards[boards.length - 1] : undefined;

    let [settingsVisable, setSettingsVisable] = useState(true);
    const settings = useRecoilValue(settingsState);

    let openFolder = async (id) => {
        let newBoard = await getObfBoard(id);
        setBoards((boards) => [...boards, newBoard]);
    };

    let addWord = async (word) => {};

    let load = async () => {
        if (!boards || boards.length === 0) {
            setBoards([await getObfBoard(route.params.rootId)]);
        }
    };

    let setSettings = () => {
        updateUserSettings(settings);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <BoardSettingsModal
                settingsVisable={settingsVisable}
                setSettingsVisable={setSettingsVisable}
                setSettings={setSettings}
            />
            <BoardControls
                boards={boards}
                setBoards={setBoards}
                setSettingsVisable={setSettingsVisable}
            />
            {board && (
                <BoardGrid
                    style={styles.container}
                    board={board}
                    openFolder={openFolder}
                    addWord={addWord}
                    settings={settings}
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
