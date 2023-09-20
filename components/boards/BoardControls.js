import { View } from "react-native";
import { StyleSheet } from "react-native";
import TouchableIcon from "./TouchableIcon";
import useSentence from "../../state/hooks/useSentence";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import ImageBar from "./ImageBar";
import TextBar from "./TextBar";
import useBoard from "../../state/hooks/useBoard";

export default function BoardControls({ boards, setBoards, navigation }) {
    const { removeLastButtonPress, clearSentence } = useSentence();
    const { popAll, pop } = useBoard();
    const settings = useRecoilValue(settingsState);

    let closeFolder = () => {
        if (boards.length > 1) {
            setBoards((boards) => boards.slice(0, -1));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <TouchableIcon 
                    type="fontawesome"
                    icon={"house-user"} 
                    size={45} 
                    action={popAll} 
                />
                <TouchableIcon
                    type="fontawesome"
                    icon={"arrow-left"}
                    size={45}
                    action={pop}
                />
            </View>

            {settings.doShowImagesInHomeBar ? <ImageBar /> : <TextBar />}

            <View style={styles.settingsContainer}>
                <TouchableIcon
                    type="fontawesome"
                    icon="delete-left"
                    size={45}
                    action={removeLastButtonPress}
                />
                <TouchableIcon
                    type="fontawesome"
                    icon="trash-can"
                    size={30}
                    action={clearSentence}
                />
                <TouchableIcon
                    type="fontawesome"
                    icon="bars"
                    size={30}
                    action={() => {navigation.toggleDrawer()}}
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
