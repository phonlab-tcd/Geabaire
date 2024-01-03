import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import AuthProvider from './src/state/providers/AuthProvider';
import AuthScreen from './src/screens/AuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootRouter from './src/routers/RootRouter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './src/partials/theme';

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <StatusBar hidden={true} />
          <RecoilRoot>
            <SafeAreaProvider>
              <AuthProvider AuthComponent={AuthScreen}>
                <RootRouter />
              </AuthProvider>
            </SafeAreaProvider>
          </RecoilRoot>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
