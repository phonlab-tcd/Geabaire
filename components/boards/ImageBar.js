import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import useSentence from "../../state/hooks/useSentence";

function ImageBarEntry({ buttonPress }) { 
    return (
        <View style={ styles.imageBarEntryContainer}>
            <Image
                source={{ uri: buttonPress.imageLink }}
                style={styles.imageStyle}
                resizeMode="contain"
            />
            <Text>{ buttonPress.label }</Text>
        </View>
    )
}

export default function ImageBar() {
    let { buttonPresses, playNow } = useSentence();

    return (
        <TouchableOpacity style={ styles.container} onPress={playNow}>
            {buttonPresses.map(buttonPress => <ImageBarEntry key={ Math.random() } buttonPress={buttonPress}/>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        flexDirection: "row",
        backgroundColor: "#CCC"
    },
    imageBarEntryContainer: {
        height: "85%",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        paddingTop: 3,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
        backgroundColor: "#DDD"
    },
    imageStyle: {
        width: 15,
        height: 15,
    }
})
