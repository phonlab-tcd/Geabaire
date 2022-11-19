import { View } from "react-native";
import { StyleSheet } from "react-native";
import {
    fa2,
    faArrowRightFromBracket,
    faDeleteLeft,
    faGear,
    faHouse,
    faRotateLeft,
    faVolumeHigh,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "./TouchableIcon";
import { play } from "../../state/handlers/synthesisHelper";
import { settingsState } from "../../state/atoms/settings";
import { useRecoilState, useRecoilValue } from "recoil";
import { sentenceSpeechTimer } from "../../state/atoms/timers";

export default function BoardControls({
    boards,
    setBoards,
    sentence,
    setSentence,
    setSettingsVisable,
}) {
    const navigation = useNavigation();
    const settings = useRecoilValue(settingsState);
    const [speechTimer, setSpeechTimer] = useRecoilState(sentenceSpeechTimer);

    let resetFolder = () => {
        setBoards((boards) => [boards[0]]);
    };

    let closeFolder = () => {
        if (boards.length > 1) {
            setBoards((boards) => boards.slice(0, -1));
        }
    };

    let removeLastWord = () => {
        setSentence((sentence) =>
            sentence.substring(0, sentence.lastIndexOf(" "))
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <TouchableIcon
                    icon={faArrowRightFromBracket}
                    size={45}
                    action={() => navigation.navigate("Home")}
                />
                <TouchableIcon icon={faHouse} size={45} action={resetFolder} />
                <TouchableIcon
                    icon={faRotateLeft}
                    size={45}
                    action={closeFolder}
                />
                <TouchableIcon
                    icon={faVolumeHigh}
                    size={45}
                    action={() => {
                        clearTimeout(speechTimer);
                        setSpeechTimer(null);
                        // TODO add corrector here
                        play(sentence, settings);
                    }}
                />
            </View>

            <TextInput
                defaultValue={sentence}
                onChangeText={(newText) => setSentence(newText)}
                style={styles.sentenceContainer}
                autoCorrect={false}
            />

            <View style={styles.settingsContainer}>
                <TouchableIcon
                    icon={faDeleteLeft}
                    size={45}
                    action={removeLastWord}
                />
                <TouchableIcon
                    icon={faXmark}
                    size={45}
                    action={() => setSentence("")}
                />
                <TouchableIcon icon={fa2} size={45} action={() => {}} />
                <TouchableIcon
                    icon={faGear}
                    size={45}
                    action={() => setSettingsVisable((prev) => !prev)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#edede9",
        alignItems: "center",
        paddingLeft: 32,
        paddingRight: 32,
    },
    settingsContainer: {
        flexDirection: "row",
    },
    sentenceContainer: {
        flex: 8,
        margin: 15,
        backgroundColor: "#CCC",
        height: "100%",
        fontSize: 25,
    },
});
