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

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("Home")}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faArrowRightFromBracket}
                    size={45}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={resetFolder}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faHouse}
                    size={45}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => closeFolder()}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faRotateLeft}
                    size={45}
                />
            </TouchableOpacity>

            <TextInput
                style={styles.speakBox}
                onChangeText={(sentence) => setSentence(sentence)}
                defaultValue={sentence}
            />

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => removeLastWord()}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faDeleteLeft}
                    size={45}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setSentence("")}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faXmark}
                    size={45}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setSettingsVisable((prev) => !prev)}
            >
                <FontAwesomeIcon
                    style={styles.topBarIcon}
                    icon={faGear}
                    size={45}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        flex: 1,
    },
    topBar: {
        height: "12%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(12, 12, 12, 0.3)",
        alignItems: "center",
        paddingLeft: 32,
        paddingRight: 32,
    },
    topBarIcon: {
        color: "#f2f2f2",
    },
    iconContainer: {
        borderColor: "#f2f2f2",
        borderRadius: 12,
        borderWidth: 3,
        padding: 10,
        marginRight: 10,
    },
    speakBox: {
        flex: 1,
        height: 70,
        borderWidth: 4,
        fontSize: 40,
        paddingLeft: 9,
        marginLeft: 32,
        marginRight: 45,
        borderColor: "#f2f2f2",
        borderRadius: 12,
    },
});
