import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { getUserSettings } from "../state/handlers/settingsHandler";
import useSettings from "../state/hooks/useSettings";
import useVoices from "../state/hooks/useVoices";
import useProfile from "../state/hooks/useProfile";
import useBoard from "../state/hooks/useBoard";

export default function LoadingView() {
    let navigation = useNavigation();

    // Loads user profile into Recoil
    const {onOpenBoard} = useProfile();

    const board = useBoard();

    async function load() {
        // if the user has an on launch board set go to that, otherwise go to the home page.
        if (onOpenBoard) {
            navigation.navigate("BoardView");
        } else {
            navigation.navigate("HomeNavigator");
        }



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
