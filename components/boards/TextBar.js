import { StyleSheet, TextInput, View } from "react-native";
import TouchableIcon from "./TouchableIcon";
import useSentence from "../../state/hooks/useSentence";

export default function TextBar() {
    const {sentence, playNow, setSentence} = useSentence();

    return (
        <View style={styles.container}>
            <TouchableIcon
                type="fontawesome"
                icon="volume-high"
                size={45}
                action={playNow}
                color={"#6a994e"}
            />
            <TextInput
                defaultValue={sentence}
                style={styles.sentenceContainer}
                autoCorrect={false}
                onChangeText={setSentence}
            />
        </View>
    )
}

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