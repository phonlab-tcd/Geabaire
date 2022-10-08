import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./state/store";
import Home from "./views/Home";

const Stack = createNativeStackNavigator();

export default function App() {
    NavigationBar.setVisibilityAsync("hidden");

    return (
        <Provider store={store}>
            <StatusBar hidden={true} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
