import { StyleSheet } from "react-native"
import useBoard from "../../state/hooks/useBoard"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { doShowImagesInHomeBarState, settingsState } from "../../state/atoms/settings";
import { useEffect, useMemo, useRef } from "react";
import BoardControls from "../../components/board/BoardControls";
import useSentence from "../../state/hooks/useSentence";
import FlatGrid from "../../components/structures/FlatGrid";
import BoardButton from "../../components/board/BoardButton";
import BoardSideControls from "../../components/board/BoardSideControls";
import { View } from "react-native";
import BoardButtonEmpty from "../../components/board/BoardButtonEmpty";
import BoardUtilityButton from "../../components/board/BoardUtilityButton";
import { getPluralOf } from "../../partials/plurals";

export default function BoardScreen({ navigation, route: { params: { boardId } } }) {
    const { board, loadedBoard, push } = useBoard(boardId);
    const { addButtonPress, sentence, lastWord, cutOffLastWord } = useSentence();
    const settings = useRecoilValue(settingsState);
    const setShowImagesInHomebar = useSetRecoilState(doShowImagesInHomeBarState);
    const textBarInputRef = useRef(null);

    const boardControls = useMemo(() => <BoardControls navigation={navigation} textBarInputRef={textBarInputRef}/>, [navigation]);
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
                if (item === null) return <BoardButtonEmpty/>
                if (item.label.startsWith("<%")) return (
                    <BoardUtilityButton
                        item={item}
                        onKeyboardPress={onKeyboardPress}
                        onPluralPress={onPluralPress}
                        boardId={boardId}
                    />
                )

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
    }, [board, sentence]);

    async function test() {
        getPluralOf("fear")
    }

    useEffect(() => {test()}, [])

    function onKeyboardPress() {
        // Switch to text bar in settings if not already
        if (settings.doShowImagesInHomeBar) {
            setShowImagesInHomebar(false);
        }

        // Focus text bar input
        if (textBarInputRef.current) {
            textBarInputRef.current.focus();
        }
    }

    async function onPluralPress() {
        // console.log(sentence)
        // const words = sentence.split(" ");

        // if (words.length === 0) return;
        // const lastWord = words[words.length - 1];
        console.log(lastWord)

        const plural = await getPluralOf(lastWord);
        if (plural == null) return;

        const {imageLink, label} = cutOffLastWord();
        addButtonPress({imageLink, label: plural});

    }

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