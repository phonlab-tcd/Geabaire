import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../state/supabase.js"
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "../../components/ui/TouchableIcon.jsx";

import appjson from "../../../app.json"
import { Platform } from "react-native";

// Determine platform-specific build/version information
let platformString; 

switch (Platform.OS) {
    case "ios":
        platformString = `${appjson.expo.ios.buildNumber}-ios`
        break;
    case "android":
        platformString = `${appjson.expo.android.versionCode}-android`
        break;
    case "web":
        platformString = `react-web`;
        break;
    default: 
        platformString = "Unknown Platform.";
        break;
}

// Concatenate the full version string
const versionString = `Geabaire v${appjson.expo.version} (${platformString})`

/**
 * HomeScreen component displaying the home screen with boards list and user info.
 */
export default function HomeScreen() {
    const [boards, setBoards] = useState([]); // State for storing the list of boards
    const navigation = useNavigation(); // Navigation object from React Navigation
    const [user, setUser] = useState(); // State for storing user information
    /** 
     * Navigate to a specific board.
     * @param {string} boardId - The ID of the board to navigate to.
     */
    const goToBoard = (boardId) => {
        navigation.navigate("BoardRouter", { boardId });
    }

    // Check if a board parameter is present in the URL and navigate to that board
    const urlParams = new URLSearchParams(window.location.search);
    const boardParam = urlParams.get("board");
    if (boardParam) {
        goToBoard(boardParam);
    }

    // Load boards and user information when the component mounts
    useEffect(() => {
        async function load() {
            // Fetch the list of boards from the database
            const { data, error } = await supabase.from("aac_complete_boards").select();

            if (data) {
                setBoards(data.map(item => ({ id: item.id, name: item.name, icon: item.icon })))
            }

            if (error) {
                console.error(error);
            }

            // Fetch the current user's information
            const {data: d2, error: e2} = await supabase.auth.getUser();

            if (d2) {
                setUser(d2.user);
                console.log(d2.user);
            }

            if (e2) {
                console.error(e2);
            }

        }

        // Load data if the boards list is empty
        if (boards.length == 0) {
            load();
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <View style={{marginLeft: "auto"}}>
                <TouchableIcon
                    type="fontawesome"
                    icon="bars"
                    size={40}
                    action={() => { navigation.toggleDrawer() }}
                />
                </View>
            </View>

            <View>
                <Text style={styles.header}>Welcome to Ge<Text style={styles.bold}>abair</Text>e</Text>
                <Text style={styles.subheader}>Choose a board to begin, or modify your settings using the drawer to your right.</Text>
            </View>
            <FlatList
                style={styles.boardList}
                data={boards}
                numColumns={2}
                renderItem={({ index, item }) => (
                    <TouchableOpacity style={styles.boardButton} onPress={() => goToBoard(item.id)}>
                        {item.icon && (
                            <Image source={item.icon} style={styles.boardButtonImage} />
                        )}
                        <Text style={styles.boardButtonLabel}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.footer}>{versionString} Logged in as: {user?.user_metadata?.name ?? "Unknown"} ({user?.email ?? "Unknown"}) ({user?.id ?? "Unknown"})</Text>
        </SafeAreaView>
    )
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    topBar: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 10
    },
    header: {
        fontSize: 40,
        textAlign: "center"
    },
    subheader: {
        paddingTop: 5,
        fontSize: 24,
        textAlign: "center"
    },
    bold: {
        fontWeight: "bold"
    },
    gridItem: {
        backgroundColor: "#F3F4F6"
    },
    boardList: {
        padding: 40
    },

    boardButton: {
        margin: 12,
        padding: 12,
        borderRadius: 6,
        width: 500,
        backgroundColor: "white",
    },
    boardButtonImage: {
        width: 256,
        height: 256,
        alignSelf: "center"
    },
    boardButtonLabel: {
        textAlign: "center",
        fontSize: 24
    },
    footer: {
        marginTop: "auto",
        textAlign: "center",
        marginBottom: 5,
        fontSize: 16
    }
})