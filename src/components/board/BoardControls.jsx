import { View } from "react-native";
import { StyleSheet } from "react-native";
import useSentence from "../../state/hooks/useSentence";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import useBoard from "../../state/hooks/useBoard";
import BoardImageBar from "./BoardImageBar";
import BoardTextBar from "./BoardTextBar";
import TouchableIcon from "../ui/TouchableIcon";

export default function BoardControls({ navigation, textBarInputRef }) {
    const { removeLastButtonPress, clearSentence } = useSentence();
    const { popAll, pop } = useBoard();
    const settings = useRecoilValue(settingsState);

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <TouchableIcon 
                    type="material-community"
                    icon="folder-home" 
                    size={45} 
                    action={popAll} 
                />
                <TouchableIcon
                    type="fontawesome"
                    icon="arrow-left"
                    size={45}
                    action={pop}
                />
            </View>

            {settings.doShowImagesInHomeBar ? <BoardImageBar /> : <BoardTextBar textBarInputRef={textBarInputRef}/>}

            <View style={styles.settingsContainer}>
                <TouchableIcon
                    type="material-community"
                    icon="arrow-left-bold-box-outline"
                    size={45}
                    action={removeLastButtonPress}
                />
                <TouchableIcon
                    type="material-community"
                    icon="trash-can"
                    size={45}
                    action={clearSentence}
                />
                <TouchableIcon
                    type="fontawesome"
                    icon="bars"
                    size={40}
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