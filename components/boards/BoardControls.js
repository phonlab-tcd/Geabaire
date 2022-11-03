import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { getObfBoard } from "../../state/handlers/boardHandler";
import {
    faArrowRightFromBracket,
    faDeleteLeft,
    faGear,
    faHouse,
    faRotateLeft,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "./TouchableIcon";
import { useEffect } from "react";

export default function BoardControls({
    boards,
    setBoards,
    sentence,
    setSentence,
    setSettingsVisable,
}) {
    const navigation = useNavigation();

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

    // useEffect(() => {}, [sentence]);

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
