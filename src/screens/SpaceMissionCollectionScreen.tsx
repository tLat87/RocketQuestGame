import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
// import CreateMissionScreen from './CreateMissionScreen'; // No need to import if only navigating
import {selectSavedMissions} from '../redux/slices/savedMissionsSlice';
import {useSelector} from 'react-redux';
import {selectCreatedExpeditions} from '../redux/slices/createdExpeditionsSlice';

const SpaceMissionCollection = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Added');

  const savedMissions = useSelector(selectSavedMissions);
  const myExpeditions = useSelector(selectCreatedExpeditions);

  const missionsToShow = activeTab === 'My expedition' ? myExpeditions : savedMissions;

  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // Assuming this is a dark, space-themed background
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>MY LOGBOOK</Text> {/* More thematic title */}

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'My expedition' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setActiveTab('My expedition')}
        >
          <Text style={activeTab === 'My expedition' ? styles.tabTextActive : styles.tabTextInactive}>
            My Expeditions 🚀
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Added' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setActiveTab('Added')}
        >
          <Text style={activeTab === 'Added' ? styles.tabTextActive : styles.tabTextInactive}>
            Saved History 🛰️
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={missionsToShow}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (activeTab === 'My expedition') {
                navigation.navigate('MySpaceInfoScreen', { item });
              } else {
                navigation.navigate('HistoryInfoScreen', { item });
              }
            }}
            style={styles.missionItem}
          >
            <Text style={styles.missionItemText}>{item.name || item.title || 'Untitled Entry'}</Text>
            <Text style={styles.missionItemArrow}>{'〉'}</Text> {/* Stylish arrow */}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No records found.</Text>
            <Text style={styles.emptyListSubText}>Start by creating an expedition or adding from history.</Text>
          </View>
        )}
      />

      {/* Create Mission Button */}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateMissionScreen')}>
        <Text style={styles.createButtonText}>+ New Expedition</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505', // Even darker background for more depth
    padding: 20,
    paddingTop: 60, // Adjusted padding top
  },
  title: {
    color: '#00FFFF', // Cyan/Aqua color for a digital, HUD-like feel
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 255, 0.6)', // Matching text glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.8)', // Semi-transparent dark background for tabs
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#333', // Subtle border
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Small gap between tabs
  },
  tabActive: {
    backgroundColor: '#00FFFF', // Active tab is bright cyan
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF', // Glow for active tab
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: '#007ACC', // A slightly darker blue for inactive tab border
  },
  tabTextActive: {
    color: '#050505', // Dark text on bright active tab
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  tabTextInactive: {
    color: '#00FFFF', // Cyan text on transparent inactive tab
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  listContentContainer: {
    paddingBottom: 100, // Ensure space for the fixed button
  },
  missionItem: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)', // Semi-transparent dark grey for items
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12, // More space between items
    borderLeftWidth: 5, // Prominent left border
    borderColor: '#00BFFF', // Blue border for items
    shadowColor: '#00BFFF', // Subtle glow for items
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  missionItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E0E0E0', // Light grey for mission text
    flexShrink: 1, // Allows text to wrap
    paddingRight: 10,
  },
  missionItemArrow: {
    fontSize: 22,
    color: '#00FFFF', // Cyan arrow
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#4CAF50', // Vibrant green for the create button
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 80,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30, // Adjusted for typical fixed button placement
    left: 20,
    right: 20,
    zIndex: 999,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 12,
  },
  createButtonText: {
    color: '#050505', // Dark text on vibrant green
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  emptyListText: {
    color: '#FFA726', // Orange for emphasis
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyListSubText: {
    color: '#E0E0E0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default SpaceMissionCollection;
