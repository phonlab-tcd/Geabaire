import { SafeAreaView, StyleSheet } from "react-native";
import BoardDrawer from "../../components/boards/BoardDrawer";
import BoardView from "./BoardView";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function BoardNavigator({ route, navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerPosition: "right",
                    drawerActiveBackgroundColor: "#F2F2F2",
                    drawerStyle: {
                        backgroundColor: "#F2F2F2"
                    },
                    drawerType: "front",
                    swipeEnabled: false,
                    swipeEdgeWidth: 0,
                
                }}
                drawerContent={BoardDrawer}
                
            >
                <Drawer.Screen name="Speak Mode" component={BoardView} initialParams={{ params: route.params }}/>
                <Drawer.Screen name="Settings" component={SettingsView} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECF9EE",
        marginBottom: 16,
        flex: 1
    }
});
