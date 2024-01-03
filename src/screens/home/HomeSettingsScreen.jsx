import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../state/supabase.js"
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "../../components/ui/TouchableIcon.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_LINK = process.env.EXPO_PUBLIC_GEABAIRE_API_LINK;

export default function HomeSettingsScreen() {
    const [boards, setBoards] = useState([]);
    const navigation = useNavigation();

    async function beginClosure() {
        Alert.alert('Close your account.', 'This action cannot be reverted. If you close your account it is immediately deleted. There is no way to bring it back.', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Close my account, I understand it will delete all boards, images, etc.', onPress: closeAccount },
        ]);
    }

    async function closeAccount() {
        const { data: { session: { access_token, user } } } = await supabase.auth.getSession();

        const response = await fetch(API_LINK + "/account/close", {
            method: "POST",
            body: JSON.stringify({
                "email": user.email,
                "id": user.id,
                "confirm": true
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        })

        await supabase.auth.signOut();
        // await AsyncStorage.clear(); // Hard removes the session from the local cache.
        Alert.alert("Successful", "Your account has been deleted successfully.")
    }

    console.log(boards);
    useEffect(() => {
        async function load() {
            const { data, error } = await supabase.from("aac_complete_boards").select();
            console.log("data: ", data);

            if (data) {
                setBoards(data.map(item => ({ id: item.id, name: item.name, icon: item.icon })))
            }

            if (error) {
                console.error(error);
            }
        }

        if (boards.length == 0) {
            load();
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Settings</Text>
                <View style={{ marginLeft: "auto" }}>
                    <TouchableIcon
                        type="fontawesome"
                        icon="bars"
                        size={40}
                        action={() => { navigation.toggleDrawer() }}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.header}>Your <Text style={styles.bold}>account.</Text></Text>
                <Text style={styles.subheader}>Here you can modify settings to do with your account, rather than individual boards.</Text>
            </View>

            <View>
                <TouchableOpacity style={styles.closeAccountButton} onPress={beginClosure}>
                    <Text style={styles.closeAccountButtonLabel}>Close Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
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
    title: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 24,
        color: "white",
        fontWeight: "bold"
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
    closeAccountButton: {
        padding: 5
    },
    closeAccountButtonLabel: {
        color: "blue",
        textDecorationLine: "underline",
        fontWeight: "bold",
        textAlign: "center"
    },
})