import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

export default function BoardButton({ item, addWord, openFolder, images }) {
    const matchingImages = images.filter((image) => image.id == item.image_id);
    const imageLink =
        matchingImages.length > 0 ? matchingImages[0].url : undefined;
    const isFolder = Boolean(item["load_board"]);

    let style = {
        height: "100%",
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: item["background_color"],
        borderColor: item["border_color"],
    };

    return (
        item && (
            <TouchableOpacity
                onPress={() => {
                    isFolder
                        ? openFolder(item["load_board"].id)
                        : addWord(item.label);
                }}
                style={style}
            >
                <Text style={styles.labelStyle} numberOfLines={1}>
                    {item.label}
                </Text>
                {imageLink && (
                    <Image
                        source={{ uri: imageLink }}
                        style={styles.imageStyle}
                    />
                )}
                {isFolder && (
                    <FontAwesomeIcon
                        style={styles.topRight}
                        icon={faFolder}
                        color="rgba(12, 12, 12, 0.3)"
                    />
                )}
            </TouchableOpacity>
        )
    );
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
        textAlign: "center",
    },
    imageStyle: {
        width: "45%",
        height: "45%",
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 3,
        marginRight: 3,
    },
});
