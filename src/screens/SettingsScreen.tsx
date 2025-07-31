import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your RootStackParamList if you haven't already
type RootStackParamList = {
  SpaceRoadmap: undefined;
  AstronautProfile: undefined;
};

type AstronautProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AstronautProfile'>;

interface AstronautProfileData {
  name: string;
  description: string;
  advice: string;
  emoji: string;
  height: string;
  weight: string;
  birthYear: string;
}

const AstronautProfileScreen: React.FC = () => {
  const [profileData, setProfileData] = useState<AstronautProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<AstronautProfileScreenNavigationProp>();

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('astronautProfile');
      if (storedData) {
        setProfileData(JSON.parse(storedData));
      } else {
        setProfileData(null); // No profile found
      }
    } catch (e) {
      console.error('Failed to load astronaut profile:', e);
      Alert.alert('Error', 'Failed to load your astronaut profile.');
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load profile data when the screen focuses
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const navigateToProfileInput = () => {
    navigation.navigate('SpaceRoadmapScreen'); // Navigate back to SpaceRoadmap to fill out
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <ActivityIndicator size="large" color="#E0FFFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.headerTitle}>MY ASTRONAUT PROFILE</Text>

      {profileData ? (
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {/* Replace with a user profile image if you have one */}
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>{profileData.emoji}</Text>
            </View>
            <View style={styles.profileHeaderText}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileStatus}>Cosmic Explorer</Text>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.height} cm</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.weight} kg</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.birthYear}</Text>
              <Text style={styles.statLabel}>Born</Text>
            </View>
          </View>

          <Text style={styles.profileBio}>{profileData.description}</Text>
          <Text style={styles.profileAdvice}>
            <Text style={{ fontWeight: 'bold' }}>Astronaut's Tip:</Text> {profileData.advice}
          </Text>

          <TouchableOpacity style={styles.editProfileButton} onPress={navigateToProfileInput}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noProfileContainer}>
          <Text style={styles.noProfileText}>You haven't determined your astronaut profile yet!</Text>
          <Text style={styles.noProfileSubText}>
            Fill in your details on the Cosmic Roadmap screen to see your cosmic identity.
          </Text>
          <TouchableOpacity style={styles.fillProfileButton} onPress={navigateToProfileInput}>
            <Text style={styles.fillProfileButtonText}>Go to Profile Input</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#E0FFFF',
    marginTop: 15,
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0FFFF',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  profileCard: {
    backgroundColor: 'rgba(20, 20, 40, 0.95)',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center', // Center content
  },
  profileImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(0, 191, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImageText: {
    fontSize: 40,
  },
  profileHeaderText: {
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFEA00',
    textShadowColor: 'rgba(255, 234, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  profileStatus: {
    fontSize: 16,
    color: '#D0E0FF',
    marginTop: 5,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0FFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#B0C4DE',
    marginTop: 3,
    textTransform: 'uppercase',
  },
  profileBio: {
    fontSize: 16,
    color: '#E0FFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  profileAdvice: {
    fontSize: 15,
    color: '#ADFF2F',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noProfileContainer: {
    backgroundColor: 'rgba(25, 25, 25, 0.8)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
  },
  noProfileText: {
    color: '#FFA726',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  noProfileSubText: {
    color: '#E0E0E0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  fillProfileButton: {
    backgroundColor: '#00FA9A', // Greenish accent
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#00FA9A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  fillProfileButtonText: {
    color: '#050505', // Dark text for contrast
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

export default AstronautProfileScreen;
