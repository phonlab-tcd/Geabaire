import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BoardButton({ item, height, addWord }) {
    console.log(height);
    let style = {
        height: height,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 1,
        padding: 6,
    };

    return (
        <TouchableOpacity
            onPress={() => {
                addWord(item.label);
            }}
        >
            <View style={style}>
                <Text style={styles.labelStyle} numberOfLines={1}>
                    {item.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
    },
});
