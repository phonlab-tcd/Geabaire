import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import HomeRouter from "./HomeRouter";
import BoardRouter from "./BoardRouter";
import LoadingUserScreen from "../screens/LoadingUserScreen";

const Stack = createStackNavigator();

export default function RootRouter() {

    return (
        // NavigationContainer wraps the entire navigation tree
        <NavigationContainer>
            {/* Stack.Navigator is used for managing the stack of screens */}
            <Stack.Navigator
                // Global screen options applied to all screens in the navigator
                screenOptions={{
                    // Hide the header for all screens
                    headerShown: false,
                }}
            >
                {/* LoadingUserScreen is shown while loading the user data */}
                <Stack.Screen name="LoadingUserScreen" component={LoadingUserScreen} />
                {/* HomeRouter handles navigation within the home section */}
                <Stack.Screen name="HomeRouter" component={HomeRouter} />
                {/* BoardRouter handles navigation within the board section */}
                <Stack.Screen name="BoardRouter" component={BoardRouter} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}