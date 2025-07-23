import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearMissions } from '../redux/slices/savedMissionsSlice';
import { clearExpeditions } from '../redux/slices/createdExpeditionsSlice'; // Assuming you have this action

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const handleClearCollectionHistory = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all saved missions and created expeditions? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(clearMissions());
            dispatch(clearExpeditions()); // Clear both saved missions and created expeditions
            Alert.alert('Data Cleared', 'All your collection history has been deleted.');
          },
        },
      ]
    );
  };

  const handleOpenLink = (url, title) => {
    Alert.alert(
      title,
      `You are about to open "${title}" in your browser. Do you want to continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL(url).catch(err => console.error("Failed to open URL:", err)) },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // Keep your space background
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>COMMAND CENTER</Text> {/* More thematic title */}
      <Text style={styles.subtitle}>System Preferences & Data Management</Text> {/* Added a subtitle */}

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.settingCard} onPress={handleClearCollectionHistory}>
          <Text style={styles.settingCardText}>Wipe Logbook Data</Text>
          <Text style={styles.settingCardIcon}>{'✕'}</Text> {/* A clear 'delete' icon */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => handleOpenLink('https://www.termsfeed.com/live/725b769b-80c4-4d16-9dd7-3908bd5970c3', 'Privacy Policy')}
        >
          <Text style={styles.settingCardText}>Secure Protocols</Text>
          <Text style={styles.settingCardIcon}>{'🔗'}</Text> {/* Link icon */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => handleOpenLink('https://www.termsfeed.com/live/725b769b-80c4-4d16-9dd7-3908bd5970c3', 'Operational Directives')}
        >
          <Text style={styles.settingCardText}>Operational Directives</Text>
          <Text style={styles.settingCardIcon}>{'🔗'}</Text> {/* Link icon */}
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Version 1.0. Galactic Alpha</Text> {/* Footer for version info */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505', // Consistent very dark background
    padding: 20,
    alignItems: 'center',
    paddingTop: 80, // More top padding for a balanced layout
  },
  title: {
    fontSize: 34,
    color: '#00FFFF', // Cyan for digital feel
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0E0E6', // Lighter blue for subtitle
    marginBottom: 40,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 10, // Inner padding for cards
  },
  settingCard: {
    width: '100%',
    backgroundColor: 'rgba(30, 30, 30, 0.7)', // Semi-transparent dark grey for cards
    borderRadius: 15, // Rounded corners for modern look
    paddingVertical: 22,
    paddingHorizontal: 25,
    marginVertical: 10, // More vertical space between cards
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2, // Border to define cards
    borderColor: '#007ACC', // Blue border for cards
    shadowColor: '#007ACC', // Matching shadow for a glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  settingCardText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#E0E0E0', // Light grey text for readability
    flex: 1, // Allow text to take up space
  },
  settingCardIcon: {
    fontSize: 24, // Larger icons
    color: '#00FFFF', // Cyan for icons
    fontWeight: 'bold',
    marginLeft: 15, // Space between text and icon
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    color: '#888', // Subtle grey for footer
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

export default SettingsScreen;
