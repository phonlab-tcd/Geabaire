import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import HomeSettingsScreen from "../screens/home/HomeSettingsScreen";
import HomeDrawer from "../components/drawers/HomeDrawer";

const Drawer = createDrawerNavigator();

export default function HomeRouter({route}) {
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
                <Drawer.Screen name="Home" component={HomeScreen}/>
                <Drawer.Screen name="Account" component={HomeSettingsScreen} />
            </Drawer.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});