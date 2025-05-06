import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Image, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from './src/navigation/WelcomeScreen';
import RocketDetailsScreen from './src/screens/RocketInfoScreen';
import CreateMissionScreen from './src/screens/CreateMissionScreen';
import GameScreen from './src/screens/GameScreen';
import GameResultScreen from './src/screens/GameResultScreen';
import HistoryInfoScreen from './src/screens/HistoryInfoScreen';
import MySpaceInfoScreen from './src/screens/MySpaceInfoScreen';


const Stack = createStackNavigator();

const leftCu = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginLeft: 16}}>
            {/*<BackArrow/>*/}
        </TouchableOpacity>
        )
    }

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', height: 180 },
                        headerLeft: leftCu,
                        // headerTitle: () => (
                        //     <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', width: '100%'}}>
                        //         <Image
                        //             source={require('../barcelona/src/assets/img/Vector.png')}
                        //             style={{ width: 220, height: 100, resizeMode: 'contain' }}
                        //         />
                        //     </View>
                        // ),
                        headerShadowVisible: false,
                    }}>

                        {/*<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />*/}
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="RocketDetailsScreen" component={RocketDetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="CreateMissionScreen" component={CreateMissionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="GameResultScreen" component={GameResultScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="HistoryInfoScreen" component={HistoryInfoScreen} options={{ headerShown: false }} />

                        <Stack.Screen name="MySpaceInfoScreen" component={MySpaceInfoScreen} options={{ headerShown: false }} />

                        {/*<Stack.Screen name="PrestigiousAbout" component={PrestigiousAboutScreen} options={{  }} />*/}

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
