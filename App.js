import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import 'react-native-gesture-handler';
import { RecoilRoot } from "recoil";

import Auth from "./views/auth/Auth";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { supabase } from "./state/supabase";
import LoadingView from './views/LoadingView';
import HomeNavigator from './views/home/HomeNavigator';
import BoardEditor from './views/editor/BoardEditor'
import BoardNavigator from './views/board/BoardNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState(null);

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
                        <Stack.Screen name="LoadingView" component={LoadingView} />
                        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
                        <Stack.Screen name="BoardNavigator" component={BoardNavigator} />
                        <Stack.Screen
                            name="BoardEditorNavigator"
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
