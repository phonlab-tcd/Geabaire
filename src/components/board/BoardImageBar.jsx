import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import useSentence from "../../state/hooks/useSentence";

/**
 * ImageBarEntry component displays an image and its label.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.buttonPress - The object containing information about the button press.
 * @param {string} props.buttonPress.imageLink - The URL of the image to display.
 * @param {string} props.buttonPress.label - The label of the button press.
 * @returns {JSX.Element} A styled View component representing an image and its label.
 */
function ImageBarEntry({ buttonPress }) {
    return (
        <View style={styles.imageBarEntryContainer}>
            <Image
                source={{ uri: buttonPress.imageLink }}
                style={styles.imageStyle}
                contentFit={"contain"}
                cachePolicy={"memory-disk"}
            />
            <Text>{buttonPress.label}</Text>
        </View>
    )
}

/**
 * BoardImageBar component displays a bar of images representing button presses.
 * It allows users to play the associated audio by tapping the bar.
 * 
 * @returns {JSX.Element} A styled TouchableOpacity component representing the image bar.
 */
export default function BoardImageBar() {
    let { buttonPresses, playNow } = useSentence();

    return (
        <TouchableOpacity style={styles.container} onPress={playNow}>
            {buttonPresses.map(buttonPress => <ImageBarEntry key={Math.random()} buttonPress={buttonPress} />)}
        </TouchableOpacity>
    )
}

// Styles for the BoardImageBar component and its children
const styles = StyleSheet.create({
    container: {
        flex: 1, // Flex grow to fill available space
        height: "75%", // Height of the image bar
        flexDirection: "row", // Arrange children in a row
        backgroundColor: "#d8f3dc", // Background color of the image bar
        justifyContent: "flex-start", // Align children to the start of the row
        alignItems: "center", // Center children vertically
        marginTop: 2, // Top margin
        marginBottom: 2, // Bottom margin
        borderRadius: 12, // Rounded corners
        paddingLeft: 6, // Padding on the left
    },
    imageBarEntryContainer: {
        height: "85%", // Height of the image bar entry
        justifyContent: "center", // Center children vertically
        alignItems: "center", // Center children horizontally
        margin: 2, // Margin around the entry
        paddingTop: 3, // Top padding
        paddingLeft: 12, // Left padding
        paddingRight: 12, // Right padding
        borderRadius: 12, // Rounded corners
        backgroundColor: "#DDD", // Background color of the entry
    },
    imageStyle: {
        width: 15, // Width of the image
        height: 15, // Height of the image
    }
})