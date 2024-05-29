import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { getContrastingFolderColor, getContrastingTextColor } from "../../partials/accessibility"
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Image } from "expo-image";
import { Platform } from "react-native";

/**
 * BoardUtilityButton renders a utility button based on the item passed.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.item - The utility button item data.
 * @param {Function} props.onKeyboardPress - The function to execute on keyboard press.
 * @param {Function} props.onPluralPress - The function to execute on plural press.
 * @param {string} props.boardId - The ID of the board.
 * @returns {JSX.Element} A TouchableOpacity component representing the utility button.
 */
export default function BoardUtilityButton({ item, onKeyboardPress, onPluralPress, boardId }) {
    const code = item.label.trim()

    const isWeb = Platform.OS === "web";

    switch (code) {
        case "<% KEYBOARD>": {
            return (
                !isWeb ?
                <UtilityButton
                    onPress={onKeyboardPress}
                    boardId={boardId}
                    label={item.hide_label ? null : "méarchlár"}
                    image={item.image}
                    borderColor={item["border_color"]}
                    backgroundColor={item["background_color"]}
                /> :
                <UtilityButton
                    onPress={() => { /* Todo: add toast? */}}
                    boardId={boardId}
                    label={item.hide_label ? null : "méarchlár (ar fáil)"}
                    image={item.image}
                    borderColor={"#D8DAE0"}
                    backgroundColor={"#E0DED8"}
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


/**
 * UtilityButton renders the utility button with a label and an optional image.
 * 
 * @param {Object} props - The properties object.
 * @param {Function} props.onPress - The function to execute on button press.
 * @param {string} props.boardId - The ID of the board.
 * @param {string} props.label - The label of the button.
 * @param {string} props.image - The image URI.
 * @param {string} props.borderColor - The border color of the button.
 * @param {string} props.backgroundColor - The background color of the button.
 * @returns {JSX.Element} A TouchableOpacity component representing the utility button.
 */
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



// Styles for the BoardUtilityButton and UtilityButton components
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