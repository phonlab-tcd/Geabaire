import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import Slider from '@react-native-community/slider';

export default function SliderEntry({ title, atom, min, max, step }) {
    const [value, setValue] = useRecoilState(atom);

    const interpolate = (start, end) => {
        let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const color = () => {
        let r = interpolate(255, 0);
        let g = interpolate(0, 255);
        let b = interpolate(0, 0);
        return `rgb(${r},${g},${b})`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.key}>{title}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
    />
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
        marginLeft: 35,
    },
    fill: {
        width: 50,
    },
    value: {
        width: 150,
        marginLeft: "auto",
        marginRight: 35,
    },
});
