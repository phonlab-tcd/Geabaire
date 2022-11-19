import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { getUserSettings } from "../state/handlers/settingsHandler";
import useSettings from "../state/hooks/useSettings";

export default function LoadingView() {
    let navigation = useNavigation();
    let { setSettings } = useSettings();

    async function load() {
        // Load and set settings
        let settings = await getUserSettings();
        setSettings(settings);

        // Finished loading, go to the home screen.
        navigation.navigate("Home");
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading!!!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "black",
        fontSize: 120,
    },
});
