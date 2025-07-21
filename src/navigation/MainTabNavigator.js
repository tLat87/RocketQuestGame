import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FlightHistoryScreen from '../screens/FlightHistoryScreen';
import SpaceMissionCollection from '../screens/SpaceMissionCollectionScreen';
import RocketScreen from '../screens/RocketScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignalAnalyzerScreen from '../screens/SignalAnalyzerScreen';
import SpaceRoadmapScreen from '../screens/GameResultScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/img/ico/Vectorк23.png');
          } else if (route.name === 'FlightHistoryScreen') {
            iconSource = require('../assets/img/ico/Vector.png');
          } else if (route.name === 'SpaceMissionCollection') {
            iconSource = require('../assets/img/ico/Group.png');
          } else if (route.name === 'RocketScreen') {
            iconSource = require('../assets/img/ico/Vectorко.png');
          } else if (route.name === 'SettingsScreen') {
            iconSource = require('../assets/img/ico/Page-1.png');
          }else  if (route.name === 'SpaceRoadmapScreen') {
            iconSource = require('../assets/img/ico/Vectorко.png');
          }

          return (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.tabIcon,
                  focused && styles.tabIconFocused,
                ]}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="FlightHistoryScreen" component={FlightHistoryScreen} />
      <Tab.Screen name="SpaceMissionCollection" component={SpaceMissionCollection} />
       <Tab.Screen name="SpaceRoadmapScreen" component={SpaceRoadmapScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    width: '90%',
    marginLeft: '5%',
    height: 80,
    borderRadius: 25,
    backgroundColor: 'rgba(15, 15, 15, 0.9)',
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 215, 0, 0.6)', // Золотистая рамка
    shadowColor: '#FFD700', // Золотистая тень
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    paddingTop: 10,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  tabIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#888', // Серый по умолчанию
    marginBottom: 5,
  },
  tabIconFocused: {
    tintColor: '#FFD700', // Ярко-жёлтый при фокусе
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabLabelFocused: {
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default MainTabNavigator;
