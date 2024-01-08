import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import Slider from '@react-native-community/slider';

export default function SliderEntry({ title, value, setValue, min, max, step, unit }) {
    const unitLabel = unit ?? "";

    const onedp = (value ?? 0).toFixed(1);

    return (
        <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <Slider
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={value}
                onValueChange={setValue}
                step={step}
            />
            <Text style={styles.valueLabel}>
                {onedp}{unitLabel}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    key: {
        fontSize: 20,
        fontWeight: "bold"
    },
    slider: {
        width: 200,
        maxWidth: 200,
        marginLeft: "auto"
    },
    fill: {
        width: 50,
    },
    value: {
        width: 170,
        marginLeft: "auto",
        marginRight: 35,
    },
    valueLabel: {
        paddingLeft: 10,
        width: 100,
        fontSize: 20
    }
});