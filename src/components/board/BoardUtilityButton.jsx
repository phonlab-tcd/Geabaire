import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { getContrastingFolderColor, getContrastingTextColor } from "../../partials/accessibility"
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Image } from "expo-image";


export default function BoardUtilityButton({ item, onKeyboardPress, onPluralPress, boardId }) {
    const code = item.label.trim()

    switch (code) {
        case "<% KEYBOARD>": {
            return (
                <UtilityButton
                    onPress={onKeyboardPress}
                    boardId={boardId}
                    label={item.hide_label ? null : "méarchlár"}
                    image={item.image}
                    borderColor={item["border_color"]}
                    backgroundColor={item["background_color"]}
                />
            )
        }

        case "<% PLURAL>": {
            return (
                <UtilityButton
                    onPress={onPluralPress}
                    boardId={boardId}
                    label={item.hide_label ? null : "iolra"}
                    image={item.image}
                    borderColor={item["border_color"]}
                    backgroundColor={item["background_color"]}
                />
            )
        }
    }

}

function UtilityButton({ onPress, boardId, label, image, borderColor, backgroundColor }) {
    const API_LINK = process.env.EXPO_PUBLIC_GEABAIRE_API_LINK ?? "https://api.geabaire.abair.ie/v1/"

    const imageLink = `${API_LINK}/images/${boardId}/${image}.webp`
    //console.log(imageLink)
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const computedStyle = {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
    };

    const labelColor = {
        color: getContrastingTextColor(backgroundColor)
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, computedStyle]}
        >
            {label && (
                <Text style={[styles.labelStyle, labelColor]} fontSize={11} >{label}</Text>
            )}
            {image && (
                <Image
                    source={imageLink}
                    style={styles.imageStyle}
                    placeholder={blurhash}
                    contentFit={"contain"}
                    cachePolicy={"memory-disk"}
                />
            )}

            <FAIcon
                type="fontawesome"
                name="cogs"
                style={styles.topRight}
                color={getContrastingFolderColor(backgroundColor)}
            />

        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    container: {
        margin: 8,
        height: "100%",
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 1
    },
    labelStyle: {
        color: "black",
        textAlign: "center",
        fontSize: 11
    },
    imageStyle: {
        width: 32,
        height: 32,
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 3,
        marginRight: 3,
    },
});