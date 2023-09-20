import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { getContrastingTextColor } from "../../state/handlers/accessibilityHandler";
import { useRef, useState } from "react";
import FAIcon from 'react-native-vector-icons/FontAwesome';

function SmartText({ style, text, fontSize, screenSize }) {
    const textRef = useRef(null);
    let modifiedText = text;
    // modifiedText = modifiedText.replace("/", "/\n");

    const [dynFontSize, setDynFontSize] = useState(fontSize);
    if (!screenSize) return <></>

    const onLayout = () => {
        textRef.current.measure((fx, fy, width, height, px, py) => {
            if (width > screenSize.width - 2) {
                setDynFontSize(old => {
                    textRef.current.setNativeProps({ style: { fontSize: old - 1 } });
                    return old - 1;
                });
            }
        });
    }

    return (
        <Text ref={textRef} style={[style, { fontSize: dynFontSize }]} onLayout={onLayout}>{modifiedText}</Text>
    )
}

export default function BoardButton({ item, addButtonPress, openFolder, boardId }) {
    const [size, setSize] = useState();
    const isFolder = Boolean(item["child"]);

    const imageLink = `${process.env.EXPO_PUBLIC_GEABAIRE_API_LINK}/images/${boardId}/${item.image}.${item.image_type}`

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
            {!item.hide_label && <SmartText style={[styles.labelStyle, labelColor]} text={item.label} fontSize={13} screenSize={size} />}
            {item.image && (
                <Image
                    source={imageLink}
                    style={styles.imageStyle}
                    contentFit={"contain"}
                />
            )}
            {isFolder && (
                <FAIcon
                    type="fontawesome"
                    name="folder"
                    style={styles.topRight}
                    color="rgba(12, 12, 12, 0.3)"
                />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        margin: 8,
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