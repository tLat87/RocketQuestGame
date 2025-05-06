import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import FlightHistoryScreen from '../screens/FlightHistoryScreen';
import SpaceMissionCollection from '../screens/SpaceMissionCollectionScreen';
import RocketScreen from '../screens/RocketScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#000000' },
                // headerTitle: () => (
                //
                // ),
                headerShadowVisible: false,
              tabBarStyle: {
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                marginLeft: '5%',
                width: '90%',
                height: 70,
                borderRadius: 35,
                backgroundColor: '#B296F7', // фиолетовый фон
                borderTopWidth: 0,
                elevation: 0,
                shadowColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              },
              tabBarIcon: ({ focused }) => {
                if (route.name === 'Home') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Vectorк23.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                if (route.name === 'FlightHistoryScreen') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Vector.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                if (route.name === 'FlightHistoryScreen') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Vector.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                if (route.name === 'SpaceMissionCollection') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Group.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                if (route.name === 'RocketScreen') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Vectorко.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                if (route.name === 'SettingsScreen') {
                  return (
                    <Image
                      source={require('../assets/img/ico/Page-1.png')}
                      style={{
                        marginBottom: -25
                      }}
                    />
                  );
                }
                return null;
              }
            })}
        >


            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
          <Tab.Screen
            name="FlightHistoryScreen"
            component={FlightHistoryScreen}
            options={{
              tabBarLabel: '',
            }}
          />
          <Tab.Screen
            name="SpaceMissionCollection"
            component={SpaceMissionCollection}
            options={{
              tabBarLabel: '',
            }}
          />
          <Tab.Screen
            name="RocketScreen"
            component={RocketScreen}
            options={{
              headerShown: false,
              tabBarLabel: '',
            }}
          />
          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarLabel: '',
            }}
          />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
