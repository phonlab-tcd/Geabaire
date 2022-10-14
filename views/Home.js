import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { getAvailableBoards } from "../state/handlers/boardHandler";
import { supabase } from "../state/supabase";

export default function Home() {
    let [boardListModal, setBoardListModal] = useState(false);
    let [boards, setBoards] = useState();
    const navigation = useNavigation();

    let boardButtons = [];

    if (boards) {
        boardButtons = boards.map((item) => (
            <Button
                key={item.id}
                style={styles.button}
                title={item.name}
                type="solid"
                fontSize={50}
                onPress={() => {
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
                        <Button
                            style={styles.button}
                            title="Close"
                            type="clear"
                            fontSize={50}
                            onPress={() => setBoardListModal((old) => !old)}
                        />
                    </View>
                </View>
            </Modal>
            <Text style={styles.header}>OpenAAC Viewer</Text>
            <Text style={styles.subheader}>
                A simple application made as an alternative to Coughdrop which
                supports alternative languages more easily.
            </Text>

            <View style={styles.buttons}>
                <Button
                    style={styles.button}
                    title="Speak Mode"
                    type="solid"
                    fontSize={50}
                    onPress={() => setBoardListModal((old) => !old)}
                />
                <Button
                    style={styles.button}
                    title="Logout"
                    type="clear"
                    fontSize={50}
                    onPress={() => supabase.auth.signOut()}
                />
            </View>
            <View>
                <Button
                    style={styles.button}
                    buttonStyle={{
                        backgroundColor: "rgba(78, 116, 289, 1)",
                        borderRadius: 3,
                    }}
                    title="Board Editor"
                    type="solid"
                    color="red"
                    fontSize={50}
                    onPress={() => navigation.navigate("BoardEditor")}
                />
            </View>
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
    button: {
        margin: 7,
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
