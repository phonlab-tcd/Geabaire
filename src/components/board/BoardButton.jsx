import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getContrastingFolderColor, getContrastingTextColor } from "../../partials/accessibility";
import BoardButtonEmpty from "./BoardButtonEmpty";

// function SmartText({ style, text, fontSize, screenSize }) {
//     const textRef = useRef(null);
//     let modifiedText = text;

//     const [dynFontSize, setDynFontSize] = useState(fontSize);
//     if (!screenSize) return <></>

//     const onLayout = () => {
//         textRef.current.measure((fx, fy, width, height, px, py) => {
//             if (width > screenSize.width - 2) {
//                 setDynFontSize(old => {
//                     textRef.current.setNativeProps({ style: { fontSize: old - 1 } });
//                     return old - 1;
//                 });
//             }
//         });
//     }

//     return (
//         <Text ref={textRef} style={[style, { fontSize: dynFontSize }]} onLayout={onLayout}>{modifiedText}</Text>
//     )
// }

export default function BoardButton({ item, addButtonPress, openFolder, boardId }) {
    if (item == null) {
        return <BoardButtonEmpty/>;
    }

    const [size, setSize] = useState();
    const isFolder = Boolean(item["child"]);

    const API_LINK = process.env.EXPO_PUBLIC_GEABAIRE_API_LINK?? "https://api.geabaire.abair.ie/v1/"
    const imageLink = `${API_LINK}/images/${boardId}/${item.image}.webp`
    //console.log(imageLink)
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const computedStyle = {
        backgroundColor: item["background_color"],
        borderColor: item["border_color"],
    };

    const labelColor = {
        color: getContrastingTextColor(item["background_color"])
    };

    if (!item) return <></>

    const onLayout = (event) => {
        setSize(event.nativeEvent.layout)
    }

    return (
        <TouchableOpacity
            onPress={() => {
                isFolder
                    ? openFolder(item.child)
                    : addButtonPress({ label: item.label, imageLink });
            }}
            style={[styles.container, computedStyle]}
            onLayout={onLayout}
        >
            {!item.hide_label && <Text style={[styles.labelStyle, labelColor]} fontSize={13} screenSize={size} >{item.label}</Text>}
            {item.image && (
                <Image
                    source={imageLink}
                    style={styles.imageStyle}
                    placeholder={blurhash}
                    contentFit={"contain"}
                    cachePolicy={"memory-disk"}
                />
            )}
            {isFolder && (
                <FAIcon
                    type="fontawesome"
                    name="folder"
                    style={styles.topRight}
                    color={getContrastingFolderColor(item["background_color"])}
                />
            )}
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
    },
    labelStyle: {
        color: "black",
        textAlign: "center",
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

