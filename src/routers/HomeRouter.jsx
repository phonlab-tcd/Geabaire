import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import HomeSettingsScreen from "../screens/home/HomeSettingsScreen";
import HomeDrawer from "../components/drawers/HomeDrawer";

const Drawer = createDrawerNavigator();


/**
 * HomeRouter handles navigation within the home-related screens using a drawer navigator.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.route - The route object containing information about the route params.
 * @returns {JSX.Element} A View containing the DrawerNavigator for home-related screens.
 */
export default function HomeRouter({route}) {
    return (
        <View style={styles.container}>
            {/* Drawer navigator for navigating between different screens */}
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false, // hide the header for all screens
                    drawerPosition: "right", // Position of the drawer on the screen
                    drawerActiveBackgroundColor: "#F2F2F2", // Background colour of the active drawer item
                    drawerStyle: {
                        backgroundColor: "#F2F2F2" // Background colour of the drawer
                    },
                    drawerType: "front", // Type of the drawer (front or slide)
                    swipeEnabled: false, // Disable swiping gesture to open the drawer
                    swipeEdgeWidth: 0, // Width of the swipe gesture area to open the drawer
                
                }}
                drawerContent={HomeDrawer} // Custom drawer content provided by HomeDrawer component
            >
                {/* Define screens for different home-related functionalities */}
                <Drawer.Screen name="Home" component={HomeScreen}/>
                <Drawer.Screen name="Account" component={HomeSettingsScreen} />
            </Drawer.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 // Ensure the container takes up the entire available space
    }
});