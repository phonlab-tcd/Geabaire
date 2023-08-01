// import { setupURLPolyfill } from 'react-native-url-polyfill';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import Home from "./views/Home";
import Auth from "./views/Auth";
import { supabase } from "./state/supabase";
import BoardView from "./views/BoardView";
import BoardEditor from "./views/BoardEditor.js";
import LoadingView from "./views/LoadingView";
import { Platform } from 'react-native';

// if (Platform.OS === "web") {
//     setupURLPolyfill();
// }

const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState(null);
    NavigationBar.setVisibilityAsync("hidden");

    async function authHandler() {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }

    useEffect(() => {
        authHandler();
    }, []);

    return (
        <RecoilRoot>
            <StatusBar hidden={true} />
            {session && session.user ? (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Loading" component={LoadingView} />
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
        </RecoilRoot>
    );
}
