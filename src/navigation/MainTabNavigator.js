import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native'; // Import StyleSheet
import HomeScreen from '../screens/HomeScreen';
import FlightHistoryScreen from '../screens/FlightHistoryScreen';
import SpaceMissionCollection from '../screens/SpaceMissionCollectionScreen';
import RocketScreen from '../screens/RocketScreen'; // Assuming this is your Rocket Encyclopedia screen from previous example
import SettingsScreen from '../screens/SettingsScreen';
import SignalAnalyzerScreen from '../screens/SignalAnalyzerScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ensure headers are hidden as per your options
        tabBarStyle: styles.tabBar,

        tabBarShowLabel: false, // Hide default labels to use custom ones
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconName;
          let screenName;

          if (route.name === 'Home') {
            iconSource = require('../assets/img/ico/Vectorк23.png'); // Home icon
            iconName = '';
            screenName = 'Home';
          } else if (route.name === 'FlightHistoryScreen') {
            iconSource = require('../assets/img/ico/Vector.png'); // History icon
            iconName = '';
            screenName = 'FlightHistoryScreen';
          } else if (route.name === 'SpaceMissionCollection') {
            iconSource = require('../assets/img/ico/Group.png'); // Collection icon
            iconName = '';
            screenName = 'SpaceMissionCollection';
          } else if (route.name === 'RocketScreen') {
            iconSource = require('../assets/img/ico/Vectorко.png'); // Rockets icon (Encyclopedia)
            iconName = 'Rockets';
            screenName = 'RocketScreen';
          } else if (route.name === 'SettingsScreen') {
            iconSource = require('../assets/img/ico/Page-1.png'); // Settings icon
            iconName = 'Settings';
            screenName = 'SettingsScreen';
          }

          return (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.tabIcon,
                  focused && styles.tabIconFocused, // Apply focused style
                ]}
              />
              {/*<Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>*/}
              {/*  {iconName}*/}
              {/*</Text>*/}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="FlightHistoryScreen"
        component={FlightHistoryScreen}
      />
      <Tab.Screen
        name="SpaceMissionCollection"
        component={SpaceMissionCollection}
      />
      <Tab.Screen
        name="RocketScreen"
        component={RocketScreen}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25, // Slightly higher off the bottom
    left: 20,
    right: 20,
    width: '90%',
    marginLeft: '5%',
    height: 80, // Taller tab bar
    borderRadius: 25, // More rounded corners for a sleek, modern look
    backgroundColor: 'rgba(15, 15, 15, 0.9)', // Very dark, semi-transparent background
    borderTopWidth: 2, // A distinct top border
    borderTopColor: 'rgba(0, 255, 255, 0.5)', // Cyan glowing border
    shadowColor: '#00FFFF', // Cyan glow shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    paddingTop: 10,
    elevation: 20, // Android shadow
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1, // Allow each icon to take equal space
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10, // Adjust padding for icon and label positioning
  },
  tabIcon: {
    width: 26, // Slightly larger icons
    height: 26,
    resizeMode: 'contain',
    tintColor: '#888', // Default grey for inactive icons
    marginBottom: 5, // Space between icon and label
  },
  tabIconFocused: {
    tintColor: '#00FFFF', // Bright cyan for focused icon
    transform: [{ scale: 1.1 }], // Slightly scale up focused icon
  },
  tabLabel: {
    color: '#888', // Default grey for inactive labels
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase labels
    letterSpacing: 0.5,
  },
  tabLabelFocused: {
    color: '#00FFFF', // Bright cyan for focused label
    textShadowColor: 'rgba(0, 255, 255, 0.5)', // Subtle glow for focused label
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default MainTabNavigator;
