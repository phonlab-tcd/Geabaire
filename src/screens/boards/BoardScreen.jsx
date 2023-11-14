import { StyleSheet } from "react-native"
import useBoard from "../../state/hooks/useBoard"
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import { useMemo } from "react";
import BoardControls from "../../components/board/BoardControls";
import useSentence from "../../state/hooks/useSentence";
import FlatGrid from "../../components/structures/FlatGrid";
import BoardButton from "../../components/board/BoardButton";
import BoardSideControls from "../../components/board/BoardSideControls";
import { View } from "react-native";

export default function BoardScreen({ navigation, route: { params: { boardId } } }) {
    const { board, loadedBoard, push } = useBoard(boardId);
    const { addButtonPress, sentence } = useSentence();
    const settings = useRecoilValue(settingsState);

    const boardControls = useMemo(() => <BoardControls navigation={navigation} />, [navigation]);
    const boardSideControls = useMemo(() => <BoardSideControls style={styles.sidebar} sentence={sentence} navigation={navigation}/>, [sentence, navigation]);
    const boardGrid = useMemo(() => {
        if (!board || !board.buttons) return;
        return <FlatGrid
            data={board.buttons}
            numColumns={board.grid.columns}
            numRows={board.grid.rows}
            rowStyle={styles.row}
            columnStyle={styles.column}
            renderItem={({ item }) => {
                return (
                    <BoardButton
                        item={item}
                        addButtonPress={addButtonPress}
                        openFolder={push}
                        boardId={boardId}
                    />
                )
            }}
        />
    }, [board]);

    return (
        <>
            {boardControls}
            <View style={styles.container}>
                {boardGrid}
                {boardSideControls}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8
    },
    row: {
        marginTop: 8,
        marginBottom: 8
    },
    controlButtonContainer: {
        padding: 24,
        margin: 2,
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    cblabelStyle: {
        fontSize: 16,
        paddingBottom: 10,
        textAlign: "center",
    },
    sidebar: {
        backgroundColor: "#E2E2E2",
        justifyContent: "flex-end",
        borderLeftColor: "#CCCCCC",
        borderLeftWidth: 1,
        width: 10
    }
});