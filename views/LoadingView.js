import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { getUserSettings } from "../state/handlers/settingsHandler";
import useSettings from "../state/hooks/useSettings";
import useVoices from "../state/hooks/useVoices";

export default function LoadingView() {
    let navigation = useNavigation();
    let { setSettings } = useSettings();
    let { loadVoices } = useVoices(); // Loads valid voices on first run.

    async function load() {
        // Load and set settings
        let settings = await getUserSettings();
        setSettings(settings);

        await loadVoices(settings);
        // Finished loading, go to the home screen.
        navigation.navigate("Home");
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading Boards...</Text>
            <ActivityIndicator style={styles.indicator} size={90}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        color: "black",
        fontSize: 120,
    },
    indicator: {
        paddingTop: 25,
        marginLeft: 25
    }
});
