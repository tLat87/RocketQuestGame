import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert, // For showing alerts if audio link fails
} from 'react-native';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack'; // For more precise navigation typing

// Define types for your navigation stack
// IMPORTANT: Replace 'RootStackParamList' with the actual name of your root stack param list
// from your App.tsx or your navigation setup file.
type RootStackParamList = {
  HistoryInfoScreen: { item: Flight }; // Ensure this matches how you navigate to it
  // Add other screen names here if they exist in your root stack
  FlightHistoryScreen: undefined; // To navigate back to
};

// Define the interface for a single flight object, matching the one from FlightHistoryScreen
interface Flight {
  id: string;
  title: string;
  image: any; // Use 'any' for local image require paths
  keyMilestones: string[];
  audioFragments: { title: string; url?: string }[]; // Assuming audio fragments now have title and optional URL
  missionObjectives?: string;
  crewParticipants?: string[];
  vehicleInfo?: string;
  scientificOutcomes?: string;
  progress?: number;
}

// Update the type for `addMission` if your slice expects these new fields.
// For example:
// interface SavedMission {
//   id: string;
//   name: string;
//   image: any;
//   info?: string[]; // Renamed from 'info' to 'keyMilestones' in Flight interface, adjust as needed
//   AudioFragments?: { title: string; url?: string }[]; // Renamed to audioFragments
//   // Add new fields if your savedMissionsSlice saves them:
//   keyMilestones?: string[];
//   missionObjectives?: string;
//   crewParticipants?: string[];
//   vehicleInfo?: string;
//   scientificOutcomes?: string;
// }
// import { addMission } from '../redux/slices/savedMissionsSlice'; // Ensure this points to your slice

// Placeholder for addMission type - adjust based on your actual Redux slice
// If your slice's addMission expects the full Flight object, you can do:
import { addMission } from '../redux/slices/savedMissionsSlice';


type HistoryInfoScreenProps = StackScreenProps<RootStackParamList, 'HistoryInfoScreen'>;

const HistoryInfoScreen: React.FC<HistoryInfoScreenProps> = ({ route, navigation }) => {
  const { item } = route.params; // 'item' is now typed as 'Flight'
  const dispatch = useDispatch();

  const handleOpenAudioLink = (url: string | undefined) => {
    if (url && url.startsWith('http')) {
      Linking.openURL(url).catch((err) => {
        console.error("Couldn't open URL: ", err);
        Alert.alert('Error', 'Could not open audio link. Please check the URL.');
      });
    } else {
      Alert.alert('Info', 'No valid audio link available for this fragment.');
    }
  };

  const handleAddToCollection = () => {
    // Dispatch the entire item or specific fields based on what your Redux slice expects
    dispatch(addMission(item)); // Assuming addMission takes a Flight object
    Alert.alert('Mission Added', `${item.title} has been added to your Personal Archive!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'⟪ MISSION ARCHIVES'}</Text>
        </TouchableOpacity>
      </View>

      {item.image && <Image source={item.image} style={styles.image} />}

      <Text style={styles.title}>{item.title || 'Historical Mission'}</Text>

      {/* Mission Overview Section */}
      {item.missionObjectives && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.label}>Mission Objective:</Text>
          <Text style={styles.item}>{item.missionObjectives}</Text>
        </>
      )}

      {/* Key Milestones Section */}
      {item.keyMilestones && item.keyMilestones.length > 0 && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.label}>Key Milestones:</Text>
          <View style={styles.list}>
            {item.keyMilestones.map((milestone, index) => (
              <Text key={index} style={styles.item}>• {milestone}</Text>
            ))}
          </View>
        </>
      )}

      {/* Crew & Participants Section */}
      {item.crewParticipants && item.crewParticipants.length > 0 && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.label}>Crew & Participants:</Text>
          <Text style={styles.item}>{item.crewParticipants.join(', ')}</Text>
        </>
      )}

      {/* Vehicle Information Section */}
      {item.vehicleInfo && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.label}>Vehicle Information:</Text>
          <Text style={styles.item}>{item.vehicleInfo}</Text>
        </>
      )}

      {/* Scientific Outcomes Section */}
      {item.scientificOutcomes && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.label}>Scientific Outcomes:</Text>
          <Text style={styles.item}>{item.scientificOutcomes}</Text>
        </>
      )}

      {/* Audio Transmissions Section */}
      {/*{item.audioFragments && item.audioFragments.length > 0 && (*/}
      {/*  <>*/}
      {/*    <View style={styles.sectionDivider} />*/}
      {/*    <Text style={[styles.label, styles.audioLabel]}>Transmissions:</Text>*/}
      {/*    <View style={styles.list}>*/}
      {/*      {item.audioFragments.map((audioFragment, index) => (*/}
      {/*        <TouchableOpacity*/}
      {/*          key={index}*/}
      {/*          onPress={() => handleOpenAudioLink(audioFragment.url)}*/}
      {/*          style={styles.audioFragmentButton}*/}
      {/*        >*/}
      {/*          <Text style={styles.audioFragmentText}>▶ {audioFragment.title || `Audio Fragment ${index + 1}`}</Text>*/}
      {/*        </TouchableOpacity>*/}
      {/*      ))}*/}
      {/*    </View>*/}
      {/*  </>*/}
      {/*)}*/}

      <TouchableOpacity style={styles.addToCollectionButton} onPress={handleAddToCollection}>
        <Text style={styles.addToCollectionButtonText}>ADD TO PERSONAL ARCHIVE</Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 120 }} /> {/* More space at the bottom */}
    </ScrollView>
  );
};

export default HistoryInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Even darker background for a deep space feel
    padding: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    color: '#00BFFF', // Deep sky blue, consistent with the previous screen
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.8, // Increased letter spacing
    textShadowColor: 'rgba(0, 191, 255, 0.6)', // More pronounced blue glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    textTransform: 'uppercase', // Uppercase for back button
  },
  image: {
    width: '100%',
    height: 280, // Slightly adjusted height for balance
    borderRadius: 12, // More rounded corners
    marginBottom: 25,
    resizeMode: 'cover',
    borderWidth: 3, // Thicker border
    borderColor: '#4CAF50', // Consistent "retro-tech" green border
    shadowColor: '#4CAF50', // Matching green shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8, // Stronger shadow
    shadowRadius: 18, // Wider shadow blur
    elevation: 18,
  },
  title: {
    fontSize: 36, // Even larger title
    color: '#FFD700', // Gold color, consistent
    fontWeight: '900',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.8)', // Stronger gold glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    textTransform: 'uppercase',
    letterSpacing: 2, // More letter spacing for grandeur
  },
  sectionDivider: {
    height: 1.5, // Thicker divider
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // More subtle white line
    marginVertical: 25, // More space around dividers
    alignSelf: 'center',
    width: '90%', // Wider divider
  },
  label: {
    color: '#87CEFA', // Light sky blue, consistent
    fontWeight: '800', // Bolder labels
    marginTop: 15,
    marginBottom: 10, // More space below labels
    fontSize: 20, // Larger label font
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottomWidth: 1.5, // Thicker underline
    borderBottomColor: 'rgba(135, 206, 250, 0.4)', // Slightly stronger underline color
    paddingBottom: 8, // More padding below underline
  },
  audioLabel: {
    color: '#FCD24D', // Distinct warm yellow for audio sections, consistent
    borderBottomColor: 'rgba(252, 210, 77, 0.5)', // Stronger underline for audio label
  },
  list: {
    marginLeft: 18, // More indentation
    paddingLeft: 12,
    borderLeftWidth: 2.5, // Thicker left border
    borderLeftColor: 'rgba(255, 255, 255, 0.15)', // Slightly more visible white line
  },
  item: {
    color: '#E0E0E0', // Light grey for standard text, consistent
    fontSize: 16,
    marginBottom: 10, // More space between list items
    lineHeight: 25, // Improved readability
    paddingRight: 10, // Small right padding to prevent text touching edge
  },
  audioFragmentButton: {
    backgroundColor: 'rgba(252, 210, 77, 0.15)', // Slightly more visible yellow background
    paddingVertical: 14, // More padding
    paddingHorizontal: 18,
    borderRadius: 10, // More rounded
    marginBottom: 12, // More space between audio buttons
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1.5, // Thicker border
    borderColor: '#FCD24D', // Yellow border
    shadowColor: 'rgba(252, 210, 77, 0.3)', // Yellow glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  audioFragmentText: {
    color: '#FCD24D', // Warm yellow text for audio items, consistent
    fontSize: 17, // Slightly larger font
    fontWeight: '700', // Bolder
    marginLeft: 8, // More space after play icon
  },
  addToCollectionButton: {
    backgroundColor: '#4CAF50', // Vibrant green, consistent
    paddingVertical: 22, // More padding
    borderRadius: 15, // More rounded, modern button
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30, // Positioned at the bottom
    left: 20,
    right: 20,
    zIndex: 999, // Ensure it's above other content
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 }, // Stronger shadow
    shadowOpacity: 0.9, // More opaque shadow
    shadowRadius: 15, // Wider shadow blur
    elevation: 15,
  },
  addToCollectionButtonText: {
    color: '#000', // Black text for high contrast, consistent
    fontSize: 20, // Larger font
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2, // More letter spacing
  },
});
