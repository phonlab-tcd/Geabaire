import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function ImageBarEntry({ string, image }) {
    return (
        <View>
            <Image />
            <Text>{string}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
