import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * TouchableIcon component renders an icon inside a TouchableOpacity.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of icon library ("fontawesome" or "material-community").
 * @param {string} props.icon - The name of the icon.
 * @param {Function} props.action - The function to execute on press.
 * @param {number} props.size - The size of the icon.
 * @param {Object} props.style1 - Custom styles for the TouchableOpacity.
 * @param {Object} props.style2 - Custom styles for the icon.
 * @param {string} props.color - The color of the icon.
 * @returns {JSX.Element} A TouchableOpacity containing the specified icon.
 */
export default function TouchableIcon({ type, icon, action, size, style1, style2, color }) {
    return (
        <TouchableOpacity
            style={[style1, styles.defaultSpacing]} // Apply custom styles and default spacing
            onPress={action}
        >
            {type === "fontawesome" && (
                <FAIcon style={style2} name={icon} size={size} color={color ?? "white"} />
            )}
            {type === "material-community" && (
                <MCIcon style={style2} name={icon} size={size} color={color ?? "white"} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    defaultSpacing: {
        margin: 12, // Default margin for the TouchableOpacity
        alignItems: "center",
        justifyContent: "center"
    },
});