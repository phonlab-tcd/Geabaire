import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import GButton from "../components/GButton";
import { getAvailableBoards } from "../state/handlers/boardHandler";
import { supabase } from "../state/supabase";

export default function Home() {
    let [boardListModal, setBoardListModal] = useState(false);
    let [boards, setBoards] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.navigate("Board", { rootId: "1_1701841" });
    });

    let boardButtons = [];

    if (boards) {
        boardButtons = boards.map((item) => (
            <GButton
                key={item.id}
                label={item.name}
                action={() => {
                    navigation.navigate("Board", { rootId: item.id });
                    setBoardListModal((old) => !old);
                }}
            />
        ));
    }

    useEffect(() => {
        async function load() {
            setBoards(await getAvailableBoards());
        }
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={boardListModal}
                onRequestClose={() => {
                    setBoardListModal(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Available Boards</Text>
                        {boardButtons}
                        {/* <Button
                            style={styles.button}
                            title="Close"
                            type="clear"
                            fontSize={50}
                            onPress={() => setBoardListModal((old) => !old)}
                        /> */}
                    </View>
                </View>
            </Modal>
            <Text style={styles.header}>Geabaire</Text>
            <Text style={styles.subheader}>An OpenAAC board renderer.</Text>

            <View style={styles.buttons}>
                <GButton
                    label="Speak Mode"
                    action={() => setBoardListModal((old) => !old)}
                />
                <GButton
                    label="Log out"
                    action={() => supabase.auth.signOut()}
                />
            </View>
            <GButton
                label="Board Editor"
                action={() => navigation.navigate("BoardEditor")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        color: "#265b5f",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 64,
    },
    subheader: {
        paddingTop: 12,
        color: "#333",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: 32,
    },
    p: {
        color: "#002223",
    },
    buttons: {
        paddingTop: 15,
        flexDirection: "row",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
});
