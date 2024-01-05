import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../state/supabase.js"
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import TouchableIcon from "../../components/ui/TouchableIcon.jsx";


export default function HomeScreen() {
    const [boards, setBoards] = useState([]);
    const navigation = useNavigation();

    const goToBoard = (boardId) => {
        navigation.navigate("BoardRouter", { boardId });
    }

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
                <Text style={styles.header}>Welcome to <Text style={styles.bold}>Geabaire</Text></Text>
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
    }
})