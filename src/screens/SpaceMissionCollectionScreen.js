import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import CreateMissionScreen from './CreateMissionScreen';
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
      source={require('../assets/img/BG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Space Mission Collection</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'My expedition' ? styles.tabActive : styles.tabInactive
          ]}
          onPress={() => setActiveTab('My expedition')}
        >
          <Text style={activeTab === 'My expedition' ? styles.tabTextActive : styles.tabTextInactive}>
            My expedition
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
            Added
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
          >            <Text style={styles.missionText}>{item.name}</Text>
            <Text style={styles.missionText}>{">"}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />

      {/* Create Mission Button */}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateMissionScreen')}>
        <Text style={styles.createButtonText}>Create Mission</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#FFFF66',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  tabButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: '#4C6EF5',
    borderColor: '#4C6EF5',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: '#4C6EF5',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#4C6EF5',
    fontWeight: 'bold',
  },
  missionItem: {
    backgroundColor: '#FFEB3B',
    padding: 25,
    borderRadius: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  missionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#F57C00',
    padding: 25,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    left: 20,
    right: 20,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpaceMissionCollection;
