import { View } from "react-native";
import { StyleSheet } from "react-native";
import {
    fa2,
    faArrowRightFromBracket,
    faDeleteLeft,
    faGear,
    faHouse,
    faRotateLeft,
    faTrashCan,
    faVolumeHigh,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "./TouchableIcon";
import useSentence from "../../state/hooks/useSentence";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import ImageBar from "./ImageBar";

export default function BoardControls({
    boards,
    setBoards,
    setSettingsVisable,
}) {
    const navigation = useNavigation();
    const { sentence, removeLastButtonPress, clearSentence, playNow } = useSentence();
    const settings = useRecoilValue(settingsState);

    let resetFolder = () => {
        setBoards((boards) => [boards[0]]);
    };

    let closeFolder = () => {
        if (boards.length > 1) {
            setBoards((boards) => boards.slice(0, -1));
        }
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
                    action={playNow}
                />
            </View>

            {settings.doShowImagesInHomeBar ?
                <ImageBar /> :
                <TextInput
                    defaultValue={sentence}
                    style={styles.sentenceContainer}
                    autoCorrect={false}
                />
            }

            <View style={styles.settingsContainer}>
                <TouchableIcon
                    icon={faDeleteLeft}
                    size={45}
                    action={removeLastButtonPress}
                />
                <TouchableIcon
                    icon={faTrashCan}
                    size={30}
                    action={clearSentence}
                />
                {/* <TouchableIcon icon={fa2} size={45} action={() => {}} /> */}
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
        backgroundColor: "#6a994e",
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
