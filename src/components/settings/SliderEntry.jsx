import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import Slider from '@react-native-community/slider';


/**
 * SliderEntry component renders a slider entry with a title, slider, and value label.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the slider entry.
 * @param {number} props.value - The current value of the slider.
 * @param {function} props.setValue - Function to set the value of the slider.
 * @param {number} props.min - The minimum value of the slider.
 * @param {number} props.max - The maximum value of the slider.
 * @param {number} props.step - The step value of the slider.
 * @param {string} props.unit - The unit label for the value.
 * @returns {JSX.Element} A slider entry component.
 */
export default function SliderEntry({ title, value, setValue, min, max, step, unit }) {
    // If unit is provided, use it; otherwise, use an empty string
    const unitLabel = unit ?? "";

    // Format the value to one decimal place
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

// Styles for the SliderEntry component
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