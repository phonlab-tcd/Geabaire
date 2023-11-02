import BoardControls from "../../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import BoardGrid from "../../components/boards/BoardGrid";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import useBoard from "../../state/hooks/useBoard";
import { useMemo } from "react";

export default function BoardView({route, navigation}) {
    const {board, loadedBoard, push} = useBoard(route.params.boardId);
    const settings = useRecoilValue(settingsState);

    const boardComponent = useMemo(() => {
        if (!board) return <></>

        return (
            <BoardGrid
                style={styles.container}
                board={board}
                openFolder={push}
                settings={settings}
                boardId={loadedBoard.meta.id}
            />
        )
    }, [board])


    return (
        <>
            <BoardControls
                navigation={navigation}
            />
            {boardComponent}
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
