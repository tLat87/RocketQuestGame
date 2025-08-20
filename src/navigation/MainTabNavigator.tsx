import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import {Image, Text, View, StyleSheet, Dimensions, Platform, TouchableOpacity} from 'react-native';

// Import your screens (ensure these paths are correct and components are TSX)
import HomeScreen from '../screens/HomeScreen';
import TradeHistoryScreen from '../screens/FlightHistoryScreen';
import CargoManagementScreen from '../screens/SpaceMissionCollectionScreen';
import ShipUpgradeScreen from '../screens/ShipManagementScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Define your Drawer Navigator params list for TypeScript
export type DrawerParamList = {
  Home: undefined;
  TradeHistoryScreen: undefined;
  CargoManagementScreen: undefined;
  ShipUpgradeScreen: undefined;
  SettingsScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const { width } = Dimensions.get('window');

// --- Custom Drawer Content Component ---
const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.drawerBackgroundContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/img/ico/Page-1.png')} // A generic rocket icon for branding
          style={styles.headerIcon}
        />
        <Text style={styles.drawerHeaderText}>STELLAR MERCHANT</Text>
        <Text style={styles.drawerSubHeaderText}>Trading Command Center</Text>
      </View>

      {/* Drawer Item List */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScrollViewContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Optional: Add a footer or additional info */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>Version 2.0.0</Text>
        <Text style={styles.drawerFooterText}>© 2025 Stellar Corp.</Text>
      </View>
    </View>
  );
};

// --- Main Drawer Navigator Component ---
const MainDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      // Use the custom drawer content component
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => ({
        headerShown: true, // <-- Показываем хедер
        headerStyle: {
          backgroundColor: '#0A0A0A',
        },
        headerTitle: '',
        headerTintColor: '#FFD700',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          letterSpacing: 1,
        },
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../assets/img/ico/Page-1.png')} // ← Иконка меню
                style={{ width: 24, height: 24, tintColor: '#FFD700' }}
              />
            </TouchableOpacity>
          </View>
        ),

        drawerType: Platform.OS === 'ios' ? 'slide' : 'front',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveTintColor: '#FFD700',
        drawerInactiveTintColor: '#B0C4DE',
        drawerActiveBackgroundColor: 'rgba(255, 215, 0, 0.15)',
        drawerInactiveBackgroundColor: 'transparent',
        drawerItemStyle: styles.drawerItem,

        drawerIcon: ({ focused, size }) => {
          let iconSource: any;
          let iconSize = size * 1.1;
          let tintColor = focused ? '#FFD700' : '#87CEFA';

          switch (route.name) {
            case 'Home':
              iconSource = require('../assets/img/ico/Vectorк23.png');
              break;
            case 'TradeHistoryScreen':
              iconSource = require('../assets/img/ico/Group.png');
              break;
            case 'CargoManagementScreen':
              iconSource = require('../assets/img/ico/Vector.png');
              break;
            case 'ShipUpgradeScreen':
              iconSource = require('../assets/img/ico/Vectorко.png');
              break;
            case 'SettingsScreen':
              iconSource = require('../assets/img/ico/Page-1.png');
              break;
            default:
              iconSource = require('../assets/img/ico/Page-1.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.drawerIcon,
                { width: iconSize, height: iconSize, tintColor: tintColor },
              ]}
            />
          );
        },
      })}

    >
      {/* Drawer Screens */}
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: ' Trading Dashboard' }} />
      <Drawer.Screen name="TradeHistoryScreen" component={TradeHistoryScreen} options={{ drawerLabel: ' Trade History' }} />
      <Drawer.Screen name="CargoManagementScreen" component={CargoManagementScreen} options={{ drawerLabel: ' Cargo Hold' }} />
      <Drawer.Screen name="ShipUpgradeScreen" component={ShipUpgradeScreen} options={{ drawerLabel: ' Ship Management' }} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} options={{ drawerLabel: ' Captain Profile' }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerBackgroundContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: Platform.OS === 'android' ? 25 : 50, // More top padding for Android, consider notch for iOS
  },
  drawerHeader: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5, // Thicker border
    borderBottomColor: 'rgba(255, 215, 0, 0.4)', // Stronger gold border
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 60,
    height: 60,
    tintColor: '#FFD700', // Gold icon
    marginBottom: 10,
    resizeMode: 'contain',
  },
  drawerHeaderText: {
    color: '#FFD700',
    fontSize: 26, // Larger header text
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 215, 0, 0.9)', // More intense gold glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  drawerSubHeaderText: {
    color: '#B0C4DE',
    fontSize: 16, // Slightly larger subheader
    marginTop: 8,
    fontStyle: 'italic',
  },
  drawerScrollViewContent: {
    paddingBottom: 20, // Padding at the bottom of scrollable content
  },
  drawerLabel: {
    fontSize: 18, // Larger font size for labels
    fontWeight: '600',
    marginLeft: -10, // Adjust text position closer to icon
    letterSpacing: 0.8,
  },
  drawerItem: {
    marginVertical: 6, // More vertical spacing between items
    borderRadius: 12, // More rounded corners for items
    overflow: 'hidden', // Ensures gradient or background colors adhere to rounded corners
    paddingHorizontal: 10, // Padding inside each item
    // Shadow for depth on active items can be added here or in active background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerIcon: {
    resizeMode: 'contain',
    // tintColor and size are set dynamically in screenOptions
  },
  drawerFooter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(176, 196, 222, 0.2)', // Light blue-grey subtle border
    alignItems: 'center',
  },
  drawerFooterText: {
    color: '#A9A9A9', // Darker grey for footer text
    fontSize: 12,
    marginTop: 5,
  },
});

export default MainDrawerNavigator;
