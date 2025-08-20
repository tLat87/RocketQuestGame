import 'react-native-gesture-handler'; // Эта строка должна быть самой первой
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import MainTabNavigator from './src/navigation/MainTabNavigator.tsx';
import PlanetDetailsScreen from './src/screens/RocketInfoScreen.tsx';
import TradeScreen from './src/screens/CreateMissionScreen.tsx';
import SpaceTravelScreen from './src/screens/GameScreen.tsx';
import TradeResultScreen from './src/screens/GameResultScreen.tsx';
import CargoDetailsScreen from './src/screens/HistoryInfoScreen.tsx';
import ShipManagementScreen from './src/screens/MySpaceInfoScreen.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              {/* Оборачиваем NavigationContainer в GestureHandlerRootView */}
              <GestureHandlerRootView style={{ flex: 1 }}>
                  <NavigationContainer>
                      <Stack.Navigator>
                          {/*<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />*/}
                          <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                          <Stack.Screen name="PlanetDetailsScreen" component={PlanetDetailsScreen} options={{ headerShown: false }} />
                          <Stack.Screen name="TradeScreen" component={TradeScreen} options={{ headerShown: false }} />
                          <Stack.Screen name="SpaceTravelScreen" component={SpaceTravelScreen} options={{ headerShown: false }} />
                          <Stack.Screen name="TradeResultScreen" component={TradeResultScreen} options={{ headerShown: false }} />
                          <Stack.Screen name="CargoDetailsScreen" component={CargoDetailsScreen} options={{ headerShown: false }} />
                          <Stack.Screen name="ShipManagementScreen" component={ShipManagementScreen} options={{ headerShown: false }} />
                      </Stack.Navigator>
                  </NavigationContainer>
              </GestureHandlerRootView>
          </PersistGate>
      </Provider>
    );
}
