import { useEffect, useState } from "react";
import { getObfBoard } from "../../state/handlers/boardHandler";
import BoardControls from "../../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import BoardGrid from "../../components/boards/BoardGrid";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import useBoard from "../../state/hooks/useBoard";

export default function BoardView({route, navigation}) {
    const {board, boardStack, loadedBoard} = useBoard(route.params.boardId);

    const [settingsVisable, setSettingsVisable] = useState(false);
    const settings = useRecoilValue(settingsState);

    let openFolder = async (id) => {
        // let newBoard = await getObfBoard(id);
        // setBoards((boards) => [...boards, newBoard]);
    };



    useEffect(() => {
        // load();
    }, []);

    return (
        <>
            {/* <BoardControls
                boards={boards}
                setBoards={setBoards}
                navigation={navigation}
            /> */}

            {board && (
                <BoardGrid
                    style={styles.container}
                    board={board}
                    openFolder={openFolder}
                    settings={settings}
                    setSettingsVisable={setSettingsVisable}
                    boardId={loadedBoard.meta.id}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECF9EE",
        marginBottom: 16,
        flex: 1
    }
});
