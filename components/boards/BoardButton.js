import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BoardButton({ item }) {
    let style = {
        flex: 1,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 1,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
    };

    return (
        <TouchableOpacity>
            <View style={style}>
                <Text style={styles.labelStyle}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 36,
    },
});
