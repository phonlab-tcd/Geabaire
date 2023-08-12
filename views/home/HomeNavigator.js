import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";

import HomeView from "./HomeView";
import HomeBoardsView from "./HomeBoardsView";
import HomeSettingsView from "./HomeSettingsView";
import HomeDrawer from "../../components/home/HomeDrawer";

const Drawer = createDrawerNavigator();

export default function HomeNavigator({route}) {
    return (
        <View style={styles.container}>
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
                drawerContent={HomeDrawer}
            >
                <Drawer.Screen name="HomeView" component={HomeView}/>
                <Drawer.Screen name="Boards" component={HomeBoardsView} initialParams={{ params: route.params }}/>
                <Drawer.Screen name="Account" component={HomeSettingsView} />
            </Drawer.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
