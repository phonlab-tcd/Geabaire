import FAIcon from 'react-native-vector-icons/FontAwesome';

import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../../state/supabase";

/**
 * HomeDrawer renders the custom drawer content for the home screen.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.state - The navigation state object.
 * @param {Object} props.navigation - The navigation object.
 * @param {Object} props.descriptors - The descriptors object.
 * @returns {JSX.Element} A View component representing the custom drawer content.
 */
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
                        <FAIcon name="sign-out" style={{marginRight: 15}} size={32}/>
                        <Text style={styles.buttonLabel}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// Styles for the HomeDrawer component
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