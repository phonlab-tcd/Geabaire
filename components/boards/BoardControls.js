import { View } from "react-native";
import { StyleSheet } from "react-native";
import { faBars, faDeleteLeft, faFolderClosed, faHamburger, faHouseUser, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import TouchableIcon from "./TouchableIcon";
import useSentence from "../../state/hooks/useSentence";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import ImageBar from "./ImageBar";
import TextBar from "./TextBar";

export default function BoardControls({ boards, setBoards }) {
    const { removeLastButtonPress, clearSentence } = useSentence();
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
                <TouchableIcon icon={faHouseUser} size={45} action={resetFolder} />
                <TouchableIcon
                    icon={faFolderClosed}
                    size={45}
                    action={closeFolder}
                />
            </View>

            {settings.doShowImagesInHomeBar ? <ImageBar /> : <TextBar />}

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
                <TouchableIcon
                    icon={faBars}
                    size={30}
                    action={() => {}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
    },
    settingsContainer: {
        flexDirection: "row",
    }
});
