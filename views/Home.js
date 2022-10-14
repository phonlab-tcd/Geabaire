import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../state/supabase";

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
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
                    onPress={() => navigation.navigate("Board")}
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
});
