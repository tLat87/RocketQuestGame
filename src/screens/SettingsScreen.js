import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearMissions } from '../redux/slices/savedMissionsSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const handleClearMissions = () => {
    Alert.alert(
      'Clear All Missions',
      'Are you sure you want to delete all saved missions?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(clearMissions()) },
      ]
    );
  };

  const handleOpenPrivacyLink = () => {
    Linking.openURL('https://www.termsfeed.com/live/725b769b-80c4-4d16-9dd7-3908bd5970c3'); // замените на свою ссылку
  };

  return (
    <ImageBackground
      source={require('../assets/img/BG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.card} onPress={handleClearMissions}>
        <Text style={styles.cardText}>Collection History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleOpenPrivacyLink}>
        <Text style={styles.cardText}>Privacy & Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleOpenPrivacyLink}>
        <Text style={styles.cardText}>Terms of use</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF176',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFE05F',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default SettingsScreen;
