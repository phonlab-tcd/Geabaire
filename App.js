import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./state/store";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import Auth from "./views/Auth";
import { supabase } from "./state/supabase";
import BoardView from "./views/BoardView";
import BoardEditor from "./views/BoardEditor.js";

const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState(null);
    NavigationBar.setVisibilityAsync("hidden");

    async function authHandler() {
        const session = await supabase.auth.session();
        setSession(session);

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }

    useEffect(() => {
        authHandler();
    }, []);

    return (
        <Provider store={store}>
            <StatusBar hidden={true} />
            {session && session.user ? (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Board" component={BoardView} />
                        <Stack.Screen
                            name="BoardEditor"
                            component={BoardEditor}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <Auth />
            )}
        </Provider>
    );
}
