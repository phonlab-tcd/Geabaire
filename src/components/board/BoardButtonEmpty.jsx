import { StyleSheet, View } from "react-native";

/**
 * BoardButtonEmpty component renders an empty board button with a border.
 * 
 * @returns {JSX.Element} A styled View component representing an empty board button.
 */
export default function BoardButtonEmpty() {
    return <View style={styles.container}></View>;
}

// Styles for the BoardButtonEmpty component
const styles = StyleSheet.create({
    container: {
        height: "100%", // Full height of the container
        alignItems: "center", // Center children horizontally
        justifyContent: "center", // Center children vertically
        borderRadius: 12, // Rounded corners
        borderColor: "rgba(12, 12, 12, 0.3)", // Border color with transparency
        borderWidth: 2, // Border width
        margin: 8, // Margin around the component
    },

});