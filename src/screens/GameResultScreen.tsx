import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your RootStackParamList for navigation
type RootStackParamList = {
  SpaceRoadmap: undefined;
  AstronautProfile: undefined;
};

type SpaceRoadmapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SpaceRoadmap'>;


// Example Space Event data (you can expand this)
interface SpaceEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  shortDescription: string;
  significance?: string;
  targetEmoji: string;
}

const spaceEvents: SpaceEvent[] = [
  {
    id: '1',
    date: '2025-08-15',
    title: 'Artemis III Mission Launch',
    shortDescription: 'Humanity\'s return to the Moon.',
    significance: 'A significant step in lunar exploration.',
    targetEmoji: '🚀🌕',
  },
  {
    id: '2',
    date: '2025-09-01',
    title: 'First Starship Super Heavy Flight',
    shortDescription: 'Integrated flight of Starship prototype and Super Heavy booster.',
    significance: 'Potentially revolutionizing space launches.',
    targetEmoji: '✨🌌',
  },
  {
    id: '3',
    date: '2025-10-20',
    title: 'Europa Clipper Exploration',
    shortDescription: 'NASA\'s mission to explore Europa, Jupiter\'s moon.',
    significance: 'Searching for signs of life beyond Earth.',
    targetEmoji: '🔭💧',
  },
  {
    id: '4',
    date: '2026-01-05',
    title: 'LUVOIR Telescope Launch',
    shortDescription: 'Next-generation space telescope for exoplanet observation.',
    significance: 'Expanding our knowledge of distant worlds.',
    targetEmoji: '💫🌍',
  },
  {
    id: '5',
    date: '2026-03-10',
    title: 'Mission to Asteroid Psyche',
    shortDescription: 'Studying a unique metal-rich asteroid.',
    significance: 'Understanding planetary core formation.',
    targetEmoji: '⛏️☄️',
  },
  {
    id: '6',
    date: '2025-08-20',
    title: 'ISS Spacewalk',
    shortDescription: 'Scheduled spacewalk by astronauts for ISS maintenance.',
    significance: 'Maintaining the operational readiness of the orbital station.',
    targetEmoji: '👨‍🚀🛰️',
  },
];

// Object with astronaut characteristics
interface AstronautProfile {
  name: string;
  description: string;
  advice: string;
  emoji: string;
}

const astronautProfiles: AstronautProfile[] = [
  {
    name: 'Galactic Giant',
    description: 'You are ready to conquer the unexplored expanses of space! Your impressive size will allow you to easily reach the most distant control panels.',
    advice: 'Don\'t forget to check the ceiling height in the shuttle!',
    emoji: '🚀🌟',
  },
  {
    name: 'Stellar Sprinter',
    description: 'Lightness and maneuverability are your main advantages in zero gravity. You are ideal for quick repairs and planting flags on new planets.',
    advice: 'Be careful not to float away into open space too quickly!',
    emoji: '☄️💨',
  },
  {
    name: 'Orbital Optimist',
    description: 'You radiate positivity that can illuminate even the darkest corners of the Universe. Your energy will fuel the entire mission!',
    advice: 'Keep smiling, even when the spacesuit feels tight!',
    emoji: '☀️😄',
  },
  {
    name: 'Cosmic Thinker',
    description: 'Your mind is your greatest strength. You are capable of solving the most complex cosmic puzzles and paving the way for new discoveries.',
    advice: 'Bring a notebook with you to jot down your brilliant ideas!',
    emoji: '🧠🌌',
  },
  {
    name: 'Intergalactic Master',
    description: 'You are a versatile specialist, capable of handling any task, from repairing an engine to growing potatoes on Mars. You can be relied upon!',
    advice: 'Always carry a multi-tool and some spare duct tape.',
    emoji: '🛠️🌠',
  },
];

const SpaceRoadmapScreen: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [yourAstronautProfile, setYourAstronautProfile] = useState<AstronautProfile | null>(null);

  const navigation = useNavigation<SpaceRoadmapScreenNavigationProp>();

  // Load profile data from AsyncStorage on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('astronautProfile');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setHeight(parsedData.height || '');
          setWeight(parsedData.weight || '');
          setBirthYear(parsedData.birthYear || '');
          setYourAstronautProfile({
            name: parsedData.name,
            description: parsedData.description,
            advice: parsedData.advice,
            emoji: parsedData.emoji,
          });
        }
      } catch (e) {
        console.error('Failed to load astronaut profile from storage:', e);
      }
    };
    loadProfileData();
  }, []);


  // Sort events by date
  const sortedEvents = [...spaceEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group events by year and then month for calendar-like view
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    const month = new Date(event.date).toLocaleString('en-US', { month: 'long' });
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(event);
    return acc;
  }, {} as Record<string, Record<string, SpaceEvent[]>>);

  const determineAndSaveAstronautProfile = async () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const by = parseInt(birthYear, 10);

    if (isNaN(h) || isNaN(w) || isNaN(by) || h <= 0 || w <= 0 || by < 1900 || by > new Date().getFullYear()) {
      Alert.alert('Invalid Data', 'Please enter valid values for height, weight, and birth year.');
      setYourAstronautProfile(null);
      return;
    }

    let profileIndex: number;
    const currentYear = new Date().getFullYear();
    const age = currentYear - by;

    // Simple logic for determining the profile
    if (h > 185 && w > 85) {
      profileIndex = 0; // Galactic Giant
    } else if (h < 170 && w < 60) {
      profileIndex = 1; // Stellar Sprinter
    } else if (age < 30) {
      profileIndex = 2; // Orbital Optimist (young and energetic)
    } else if (age >= 30 && age < 50) {
      profileIndex = 3; // Cosmic Thinker (experienced)
    } else {
      profileIndex = 4; // Intergalactic Master (wise)
    }

    const determinedProfile = astronautProfiles[profileIndex];
    setYourAstronautProfile(determinedProfile);

    // Save profile to AsyncStorage
    try {
      await AsyncStorage.setItem('astronautProfile', JSON.stringify({
        ...determinedProfile,
        height, // Save raw input values
        weight,
        birthYear,
      }));
      Alert.alert('Profile Saved!', 'Your astronaut profile has been determined and saved.');
      navigation.navigate('SettingsScreen'); // Navigate to the profile display screen
    } catch (e) {
      console.error('Failed to save astronaut profile:', e);
      Alert.alert('Error', 'Failed to save your astronaut profile.');
    }
  };

  const renderSectionHeader = (year: string, month: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{month} {year}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const renderSpaceEventItem = ({ item }: { item: SpaceEvent }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventDay}>{new Date(item.date).getDate()}</Text>
        <Text style={styles.eventMonth}>{new Date(item.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title} {item.targetEmoji}</Text>
        <Text style={styles.eventDescription}>{item.shortDescription}</Text>
        {item.significance && (
          <Text style={styles.eventSignificance}>
            <Text style={{ fontWeight: 'bold' }}>Impact:</Text> {item.significance}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')} // Your game background
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.headerTitle}>COSMIC ROADMAP</Text>

        {/* Button to navigate to Astronaut Profile Screen */}
        <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('AstronautProfile')}>
          <Text style={styles.viewProfileButtonText}>View My Astronaut Profile 👨‍🚀</Text>
        </TouchableOpacity>


        {/* My Astronaut Profile Input Section */}
        <View style={styles.profileSection}>
          <Text style={styles.profileInputTitle}>DETERMINE YOUR ASTRONAUT PROFILE</Text>
          <Text style={styles.profileDescription}>
            Enter your details to find out what kind of astronaut you are!
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height (cm):</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="e.g., 175"
              placeholderTextColor="#888"
              value={height}
              onChangeText={setHeight}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg):</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="e.g., 70"
              placeholderTextColor="#888"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Birth Year:</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="e.g., 1990"
              placeholderTextColor="#888"
              value={birthYear}
              onChangeText={setBirthYear}
              maxLength={4}
            />
          </View>

          <TouchableOpacity style={styles.determineProfileButton} onPress={determineAndSaveAstronautProfile}>
            <Text style={styles.determineProfileButtonText}>Determine & Save Profile</Text>
          </TouchableOpacity>

          {yourAstronautProfile && (
            <View style={styles.yourProfileCard}>
              <Text style={styles.yourProfileCardTitle}>{yourAstronautProfile.name} {yourAstronautProfile.emoji}</Text>
              <Text style={styles.yourProfileCardDescription}>{yourAstronautProfile.description}</Text>
              <Text style={styles.yourProfileCardAdvice}>
                <Text style={{ fontWeight: 'bold' }}>Advice:</Text> {yourAstronautProfile.advice}
              </Text>
            </View>
          )}
        </View>

        {/* Separator */}
        <View style={styles.horizontalLine} />

        {/* List of Space Events */}
        <Text style={styles.roadmapHeader}>UPCOMING EVENTS</Text>
        <FlatList
          data={Object.keys(groupedEvents).flatMap(year =>
            Object.keys(groupedEvents[year]).flatMap(month => [
              { id: `${year}-${month}-header`, type: 'header', year, month } as any, // Dummy item for header
              ...groupedEvents[year][month],
            ])
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return renderSectionHeader(item.year, item.month);
            }
            return renderSpaceEventItem({ item: item as SpaceEvent });
          }}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No cosmic events found.</Text>
              <Text style={styles.emptyListSubText}>Stay tuned for future celestial happenings!</Text>
            </View>
          )}
          scrollEnabled={false} // Disable scrolling for nested FlatList, as we have a ScrollView
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default SpaceRoadmapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 20,
    paddingTop: 60, // Consistent with other screens
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0FFFF', // Cyan/Aqua for a futuristic feel
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 255, 255, 0.6)', // Matching glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  viewProfileButton: {
    backgroundColor: 'rgba(0, 191, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  viewProfileButtonText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  // --- Profile Input Section Styles ---
  profileSection: {
    backgroundColor: 'rgba(20, 20, 40, 0.9)', // Darker, slightly transparent
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#6A5ACD', // Slate Blue for accent
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  profileInputTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFEA00', // Bright yellow for profile title
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(255, 234, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  profileDescription: {
    fontSize: 16,
    color: '#D0E0FF', // Lighter blue
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#E0FFFF',
    marginRight: 10,
    minWidth: 90, // Align labels
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#E0FFFF',
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  determineProfileButton: {
    backgroundColor: '#00BFFF', // Sky Blue
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  determineProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  yourProfileCard: {
    backgroundColor: 'rgba(30, 30, 60, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#7B68EE', // Medium Slate Blue
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  yourProfileCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700', // Gold
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  yourProfileCardDescription: {
    fontSize: 15,
    color: '#E0FFFF', // Cyan
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  yourProfileCardAdvice: {
    fontSize: 15,
    color: '#ADFF2F', // GreenYellow
    textAlign: 'center',
    fontStyle: 'italic',
  },
  horizontalLine: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 30,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 1,
  },
  roadmapHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FA9A', // Medium Spring Green
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 250, 154, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  flatListContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold for section headers
    marginRight: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 215, 0, 0.4)', // Faded gold line
    borderRadius: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 15, 30, 0.8)', // Dark blue-purple tint, semi-transparent
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 6, // Thick left border for accent
    borderColor: '#00BFFF', // Sky blue accent
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'flex-start', // Align items to the top
  },
  eventDateContainer: {
    backgroundColor: 'rgba(0, 191, 255, 0.1)', // Light blue background for date
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  eventDay: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0FFFF', // Cyan/Aqua
  },
  eventMonth: {
    fontSize: 12,
    color: '#B0C4DE', // Light grey-blue
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E0E0E0', // Light grey
    marginBottom: 5,
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  eventDescription: {
    fontSize: 14,
    color: '#B0C4DE', // Light grey-blue
    lineHeight: 20,
    marginBottom: 8,
  },
  eventSignificance: {
    fontSize: 14,
    color: '#FFD700', // Gold for significance
    fontStyle: 'italic',
    marginTop: 5,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    borderRadius: 15, // Rounded corners
    borderWidth: 1,
    borderColor: '#333',
  },
  emptyListText: {
    color: '#FFA726',
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
