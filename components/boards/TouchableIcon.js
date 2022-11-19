import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function TouchableIcon({ icon, action, size, style1, style2 }) {
    return (
        <TouchableOpacity
            style={[style1, styles.defaultSpacing]}
            onPress={action}
        >
            <FontAwesomeIcon style={style2} icon={icon} size={size} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    defaultSpacing: {
        margin: 12,
    },
});