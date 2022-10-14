import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function BoardButton({
    item,
    height,
    addWord,
    openFolder,
    images,
}) {
    let [imageLink, setImageLink] = useState(null);
    const isFolder = Boolean(item["load_board"]);

    useEffect(() => {
        function getImage(id) {
            let matchingImages = images.filter((image) => image.id == id);
            return matchingImages[0];
        }

        setImageLink(getImage(item.image_id).url);
    }, []);

    let style = {
        height: height,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 1,
        padding: 6,
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <TouchableOpacity
            onPress={() =>
                isFolder
                    ? openFolder(item["load_board"].id)
                    : addWord(item.label)
            }
        >
            <View
                style={[
                    style,
                    {
                        backgroundColor: item["background_color"],
                        borderColor: item["border_color"],
                    },
                ]}
            >
                <Text style={styles.labelStyle} numberOfLines={1}>
                    {item.label}
                </Text>
                <Image source={{ uri: imageLink }} style={styles.imageStyle} />
                {isFolder && (
                    <FontAwesomeIcon
                        style={styles.topRight}
                        icon={faFolder}
                        color="rgba(12, 12, 12, 0.3)"
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
        textAlign: "center",
    },
    imageStyle: {
        width: 40,
        height: 40,
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 3,
        marginRight: 3,
    },
});
