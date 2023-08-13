import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { getContrastingTextColor } from "../../state/handlers/accessibilityHandler";
import { useRef, useState } from "react";

function SmartText({style, text, fontSize, screenSize}) {
    const textRef = useRef(null);
    let modifiedText = text;
    // modifiedText = modifiedText.replace("/", "/\n");

    const [dynFontSize, setDynFontSize] = useState(fontSize);
    if (!screenSize) return <></>
    
    const onLayout = () => {
        textRef.current.measure((fx, fy, width, height, px, py) => {
            if (width > screenSize.width-2) {
                setDynFontSize(old => {
                    textRef.current.setNativeProps({ style: { fontSize: old - 1 } });
                    return old - 1;
                });
            }
        });
    }

    return (
        <Text ref={textRef} style={[style, {fontSize: dynFontSize}]} onLayout={onLayout}>{modifiedText}</Text>
    )
}

export default function BoardButton({ item, addButtonPress, openFolder, images }) {
    const [size, setSize] = useState();
    //const matchingImages = images.filter((image) => image.id == item.image_id);
    //const imageLink = matchingImages.length > 0 ? matchingImages[0].url : undefined;
    const isFolder = Boolean(item["load_board"]);

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
                    ? openFolder(item["load_board"].id)
                    : addButtonPress({ label: item.label, imageLink });
            }}
            style={[styles.container, computedStyle]}
            onLayout={onLayout}
        >
            <SmartText style={[styles.labelStyle, labelColor]} text={item.label} fontSize={18} screenSize={size}/>
            {/* {imageLink && imageLink !== null && (
                <Image
                    source={{ uri: imageLink }}
                    style={styles.imageStyle}
                    contentFit={"contain"}
                />
            )} */}
            {isFolder && (
                <FontAwesomeIcon
                    style={styles.topRight}
                    icon={faFolder}
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