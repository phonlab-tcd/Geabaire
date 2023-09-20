import FAIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../../state/supabase";

export default function HomeDrawer({state, navigation, descriptors}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Geabaire</Text>
            </View>
            <View style={styles.listContainer}>
                <DrawerContentScrollView>
                    <DrawerItemList state={state} navigation={navigation} descriptors={descriptors} />
                </DrawerContentScrollView>
            </View>

            <View style={styles.actionList}>
                <View style={styles.actionItem}>
                    <TouchableOpacity style={styles.button} onPress={() => {supabase.auth.signOut()}}>
                        <FAIcon icon="door-open" style={{marginRight: 15}} size={32}/>
                        <Text style={styles.buttonLabel}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    listContainer: {
        flex: 10,
    },
    actionList: {
        flex: 2,
        marginBottom: 35,
        justifyContent: "flex-end",
        marginLeft: "auto",
        marginRight: "auto"
    },
    actionItem: {
        padding: 6
    },
    header: {
        flex: 1,
        backgroundColor: "#6A994E"
    },
    headerText: {
        fontSize: 24,
        padding: 12,
        textAlign: "center",
        color: "#F2F2F2",
        fontWeight: "bold"
    }, 
    button: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    buttonLabel: {
        fontSize: 32,
    }
});