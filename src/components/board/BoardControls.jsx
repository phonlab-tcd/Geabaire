import { View } from "react-native";
import { StyleSheet } from "react-native";
import useSentence from "../../state/hooks/useSentence";
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms/settings";
import useBoard from "../../state/hooks/useBoard";
import BoardImageBar from "./BoardImageBar";
import BoardTextBar from "./BoardTextBar";
import TouchableIcon from "../ui/TouchableIcon";


/**
 * BoardControls component provides a control bar for the board.
 * It includes buttons for navigation, sentence manipulation, and settings.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.navigation - The navigation object for navigating between screens.
 * @param {Object} props.textBarInputRef - A reference to the text bar input element.
 * @returns {JSX.Element} A styled View component representing the board controls.
 */
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

// Styles for the BoardControls component
const styles = StyleSheet.create({
    container: {
        height: 70, // Height of the control bar
        flexDirection: "row", // Arrange children in a row
        justifyContent: "space-between", // Space out children evenly
        backgroundColor: "#6a994e", // Background color of the control bar
        alignItems: "center", // Center children vertically
        paddingLeft: 8, // Padding on the left
        paddingRight: 8, // Padding on the right
    },
    settingsContainer: {
        flexDirection: "row", // Arrange children in a row
    }
});