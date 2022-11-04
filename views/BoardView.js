import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getObfBoard } from "../state/handlers/boardHandler";
import BoardSettingsModal from "../components/boards/BoardSettingsModal";
import BoardControls from "../components/boards/BoardControls";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BoardGrid from "../components/boards/BoardGrid";
import { play } from "../state/handlers/synthesisHelper";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../state/atoms/settings";
import { sentenceSpeechTimer } from "../state/atoms/timers";
export default function BoardView({ route }) {
    let [boards, setBoards] = useState(null);
    let board =
        boards && boards.length > 0 ? boards[boards.length - 1] : undefined;

    let [sentence, setSentence] = useState("");
    let [settingsVisable, setSettingsVisable] = useState(false);

    let [speechTimer, setSpeechTimer] = useRecoilState(sentenceSpeechTimer);

    const settings = useRecoilValue(settingsState);

    let openFolder = async (id) => {
        let newBoard = await getObfBoard(id);
        setBoards((boards) => [...boards, newBoard]);
    };

    let addWord = (word) => {
        setSentence((sentence) => {
            let newSentence = (sentence + " " + word).trim();

            if (settings.doSpeakEachWord) {
                play(word, settings);
            }

            // Reset time since last button press to stop sentence speech
            if (speechTimer) {
                clearTimeout(speechTimer);
            }

            // Set new timeout
            setSpeechTimer(
                setTimeout(() => {
                    // TODO: add corrector step.
                    play(newSentence, settings);
                }, settings.speakSentenceDelay)
            );

            return newSentence;
        });
    };

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
