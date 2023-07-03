import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getObfBoard } from "../state/handlers/boardHandler";
import BoardSettingsModal from "../components/modals/BoardSettingsModal";
import BoardControls from "../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import BoardGrid from "../components/boards/BoardGrid";
import { useRecoilValue } from "recoil";
import { settingsState } from "../state/atoms/settings";
import { updateUserSettings } from "../state/handlers/settingsHandler";

export default function BoardView({ route }) {
    const [boards, setBoards] = useState(null);
    const board = boards && boards.length > 0 ? boards[boards.length - 1] : undefined;

    const [settingsVisable, setSettingsVisable] = useState(false);
    const settings = useRecoilValue(settingsState);

    let openFolder = async (id) => {
        let newBoard = await getObfBoard(id);
        setBoards((boards) => [...boards, newBoard]);
    };

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
            />

            {board && (
                <BoardGrid
                    style={styles.container}
                    board={board}
                    openFolder={openFolder}
                    settings={settings}
                    setSettingsVisable={setSettingsVisable}
                />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECF9EE",
        marginBottom: 16,
        flex: 1
    }
});
