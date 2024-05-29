import { StyleSheet, TextInput, View } from "react-native";
import useSentence from "../../state/hooks/useSentence";
import TouchableIcon from "../ui/TouchableIcon";


/**
 * BoardTextBar component renders a text input bar with a play button for the board.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.textBarInputRef - Reference to the text input component.
 * @returns {JSX.Element} A styled View component containing a play button and a text input bar.
 */
export default function BoardTextBar({textBarInputRef}) {
    const {sentence, playNow, setSentence} = useSentence();

    return (
        <View style={styles.container}>
            <TouchableIcon
                type="fontawesome"
                icon="volume-up"
                size={30}
                action={playNow}
                color={"#6a994e"}
            />
            <TextInput
                ref={textBarInputRef}
                defaultValue={sentence}
                style={styles.sentenceContainer}
                autoCorrect={false}
                onChangeText={setSentence}
            />
        </View>
    )
}

// Styles for the BoardText component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 70*.85,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        backgroundColor: "#DDD",
        paddingTop: 3,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
    },
    sentenceContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})