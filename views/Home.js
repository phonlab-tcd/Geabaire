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
            <View>
                <Button
                    title="Speak Mode"
                    type="solid"
                    fontSize={50}
                    onPress={() => navigation.navigate("Board")}
                />
                <Button
                    title="Logout"
                    type="clear"
                    fontSize={50}
                    onPress={() => supabase.auth.signOut()}
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
});
