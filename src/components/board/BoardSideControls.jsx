import { Platform, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * BoardSideControls component renders control buttons on the side of the board.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.sentence - The sentence to be shared.
 * @param {Object} props.navigation - The navigation object for navigating between screens.
 * @returns {JSX.Element} A styled View component containing control buttons.
 */
export default function BoardSideControls({sentence, navigation}) {
    return <View style={[styles.sidebar]}>
        {Platform.OS !== "web" && (
            <ControlButton
                type="material-community"
                icon="share-variant-outline"
                label={"Seol"}
                action={async () => await Share.share({
                    message: sentence,
                })}
            />
        )}
        <ControlButton
            type="material-community"
            icon="magnify"
            label={"Cuardaigh an Focal"}
            action={async () => navigation.navigate("Board Finder")}
        />
    </View>
}

/**
 * ControlButton component renders a button with an icon and a label.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.icon - The name of the icon to display.
 * @param {string} props.label - The label of the button.
 * @param {Function} props.action - The function to execute on button press.
 * @param {string} props.type - The type of the icon (e.g., "fontawesome", "material-community").
 * @returns {JSX.Element} A styled TouchableOpacity component representing a control button.
 */
function ControlButton({ icon, label, action, type }) {
    return (
        <TouchableOpacity style={[styles.controlButtonContainer]} onPress={action}>
            <Text style={styles.cblabelStyle} numberOfLines={2}>{label}</Text>
            {type === "fontawesome" && (
                <FAIcon name={icon} size={24} color={"black"} />
            )}
            {type === "material-community" && (
                <MCIcon name={icon} size={24} color="black" />
            )}
        </TouchableOpacity>
    )
}

// Styles for the BoardSideControls component and its children
const styles = StyleSheet.create({
    row: {
        marginTop: 16,
        marginBottom: 16
    },
    controlButtonContainer: {
        padding: 14,
        margin: 2,
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    cblabelStyle: {
        fontSize: 12,
        paddingBottom: 10,
        textAlign: "center",
    },
    sidebar: {
        backgroundColor: "#E2E2E2",
        padding: 6,
        justifyContent: "flex-end",
        borderLeftColor: "#CCCCCC",
        borderLeftWidth: 1,
        maxWidth: 130
    }
});