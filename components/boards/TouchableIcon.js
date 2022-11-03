import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";

export default function TouchableIcon({ icon, action, size, style1, style2 }) {
    return (
        <TouchableOpacity style={style1} onPress={action}>
            <FontAwesomeIcon style={style2} icon={icon} size={45} />
        </TouchableOpacity>
    );
}
