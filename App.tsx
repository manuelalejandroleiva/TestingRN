import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { openDatabaseSync } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import migrations from './drizzle/migrations';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ToastProvider } from 'react-native-toast-notifications';

import { navigationRef } from './RootNavigation';
import Routes from './src/routes/Route';
import { NavigationContainer } from "@react-navigation/native";
import { SQLiteProvider } from 'expo-sqlite';




export default function App() {
  
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <ToastProvider>
      <NavigationContainer ref={navigationRef}>
          <Routes />
        
      </NavigationContainer>
      </ToastProvider>
  </Provider>
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
