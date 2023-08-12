import { SafeAreaView, StyleSheet } from "react-native";
import BoardDrawer from "../../components/boards/BoardDrawer";
import BoardView from "./BoardView";
import BoardSettingsView from "./BoardSettingsView"
import { createDrawerNavigator } from "@react-navigation/drawer";
import BoardLoadingView from "./BoardLoadingView";

const Drawer = createDrawerNavigator();

export default function BoardNavigator({ route, navigation }) {
    const { boardId } = route.params;

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
                <Drawer.Screen name="BoardLoading" component={BoardLoadingView} initialParams={{ boardId }} options={{drawerItemStyle: { height: 0 }}}/>
                <Drawer.Screen name="Speak Mode" component={BoardView} initialParams={{ boardId }}/>
                <Drawer.Screen name="Board Settings" component={BoardSettingsView} initialParams={{ boardId }}/>
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
