import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import HomeRouter from "./HomeRouter";
import BoardRouter from "./BoardRouter";
import LoadingUserScreen from "../screens/LoadingUserScreen";

const Stack = createStackNavigator();

export default function RootRouter() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="LoadingUserScreen" component={LoadingUserScreen} />
                <Stack.Screen name="HomeRouter" component={HomeRouter} />
                <Stack.Screen name="BoardRouter" component={BoardRouter} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}