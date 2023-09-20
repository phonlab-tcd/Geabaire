import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default function TouchableIcon({ type, icon, action, size, style1, style2, color }) {
    return (
        <TouchableOpacity
            style={[style1, styles.defaultSpacing]}
            onPress={action}
        >
            {type === "fontawesome" && (
                <FAIcon style={style2} name={icon} size={size} color={color ?? "white"} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    defaultSpacing: {
        margin: 12,
        alignItems: "center",
        justifyContent: "center"
    },
});