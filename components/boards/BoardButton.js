import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { getObfBoard } from "../../state/handlers/boardHandler";

export default function BoardButton({ item, height, addWord, images }) {
    let [imageLink, setImageLink] = useState(null);

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
            onPress={() => {
                addWord(item.label);
            }}
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
});
