import { SafeAreaView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoadingBoardScreen from "../screens/boards/LoadingBoardScreen";
import BoardScreen from "../screens/boards/BoardScreen";
import BoardSettingsScreen from "../screens/boards/BoardSettingsScreen";
import WordFinderScreen from "../screens/boards/WordFinderScreen";
import BoardDrawer from "../components/drawers/BoardDrawer";

const Drawer = createDrawerNavigator();

export default function BoardRouter({ route, navigation }) {
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
                <Drawer.Screen name="Board Loader" component={LoadingBoardScreen} initialParams={{ boardId }} options={{drawerItemStyle: { height: 0 }}}/>
                <Drawer.Screen name="Board" component={BoardScreen} initialParams={{ boardId }}/>
                <Drawer.Screen name="Board Settings" component={BoardSettingsScreen} initialParams={{ boardId }}/>
                <Drawer.Screen name="Board Finder" component={WordFinderScreen} initialParams={{ boardId }}/>
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});