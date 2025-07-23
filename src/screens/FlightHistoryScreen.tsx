import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ListRenderItem, // For FlatList renderItem typing
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; // For navigation typing

// Define types for your navigation stack
type RootStackParamList = {
  HistoryInfoScreen: { item: Flight }; // Assuming you navigate to HistoryInfoScreen with a Flight item
  // Add other screen names in your stack if needed, e.g., 'Home': undefined
};

type FlightHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryInfoScreen'
>;

interface FlightHistoryScreenProps {
  navigation: FlightHistoryScreenNavigationProp;
}

// Define the interface for a single flight object
interface Flight {
  id: string;
  title: string;
  image: any; // Use 'any' for local image require paths, or define a more specific type if loading from URI
  keyMilestones: string[]; // Renamed from 'info' for clarity
  audioFragments: string[]; // Renamed for consistency
  missionObjectives?: string; // New field, optional
  crewParticipants?: string[]; // New field, optional
  vehicleInfo?: string; // New field, optional
  scientificOutcomes?: string; // New field, optional
  progress?: number; // Example of a new numeric field, e.g., for completion percentage
}

const flights: Flight[] = [
  {
    id: '1',
    title: 'Apollo 11',
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'), // Replace with your image path
    keyMilestones: [
      'Launch: July 16, 1969 – Saturn V rocket from Kennedy Space Center.',
      'Lunar Orbit Insertion: July 19, 1969 – Entered lunar orbit.',
      'Moon Landing: July 20, 1969 – "Eagle" lunar module landed in the Sea of Tranquility.',
      'First Moonwalk: July 20, 1969 – Neil Armstrong and Buzz Aldrin walked on the Moon.',
      'Splashdown: July 24, 1969 – Successful return to Earth in the Pacific Ocean.'
    ],
    audioFragments: [
      'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
    ],
    missionObjectives: 'First human lunar landing and safe return to Earth, demonstrating national capabilities.',
    crewParticipants: ['Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
    vehicleInfo: 'Launch Vehicle: Saturn V | Command/Service Module: Columbia | Lunar Module: Eagle',
    scientificOutcomes: 'Collected 21.5 kg of lunar samples, deployed scientific instruments.',
    progress: 100,
  },
  {
    id: '2',
    title: 'SpaceX\nInspiration4',
    image: require('../assets/img/6e78dff5ba756afd30e38fb1149cc86c77b0672b.png'), // Replace with your image path
    keyMilestones: [
      'Launch: September 16, 2021 – Falcon 9 rocket from Kennedy Space Center.',
      'Orbit: September 16–18, 2021 – Crew orbited Earth for three days in Dragon capsule.',
      'Splashdown: September 18, 2021 – Successful return off the coast of Florida.',
      'Significance: First all-civilian crewed spaceflight, no professional astronauts on board.'
    ],
    audioFragments: [
      'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
    ],
    missionObjectives: 'To raise awareness and funds for St. Jude Children\'s Research Hospital and demonstrate private spaceflight capabilities.',
    crewParticipants: ['Jared Isaacman', 'Sian Proctor', 'Hayley Arceneaux', 'Chris Sembroski'],
    vehicleInfo: 'Launch Vehicle: Falcon 9 Block 5 | Spacecraft: Crew Dragon Resilience',
    scientificOutcomes: 'Collected health data on civilian space travelers, demonstrated autonomous orbital operations.',
    progress: 100,
  },
  {
    id: '3',
    title: 'James Webb\nSpace Telescope\nLaunch',
    image: require('../assets/img/9e66016a08e08d706a2df042eddfb53d947bbe5c.png'), // Replace with your image path
    keyMilestones: [
      'Launch: December 25, 2021 – Ariane 5 rocket from Kourou, French Guiana.',
      'Orbit Insertion: January 24, 2022 – Webb arrived at its destination at L2 orbit.',
      'Deployment: December 2021–January 2022 – Complex unfolding of the telescope.',
      'First Images: July 12, 2022 – NASA released the first high-resolution cosmic images.',
      'Start of Operations: Summer 2022 – Full scientific operations began.'
    ],
    audioFragments: [
      'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
    ],
    missionObjectives: 'To succeed the Hubble Space Telescope as the premier observatory of the next decade, exploring every phase of cosmic history.',
    crewParticipants: ['N/A (robotic mission)'],
    vehicleInfo: 'Launch Vehicle: Ariane 5 ECA',
    scientificOutcomes: 'Unprecedented infrared sensitivity, enabling studies of exoplanet atmospheres, early universe galaxies, and star formation.',
    progress: 100,
  },
  {
    id: '4',
    title: 'Artemis I\nUncrewed Test',
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'), // Replace with your image path
    keyMilestones: [
      'Launch: November 16, 2022 – Space Launch System (SLS) rocket from Kennedy Space Center.',
      'Lunar Flyby: November 21, 2022 – Closest approach to the Moon, just 80 miles (128 km) above the surface.',
      'Orion Lunar Orbit: November 25 – December 1, 2022 – Orion capsule entered distant retrograde orbit.',
      'Splashdown: December 11, 2022 – Successful return to Earth in the Pacific Ocean.'
    ],
    audioFragments: [
      'Launch Pad Sounds: "Roar of the most powerful rocket."',
      'Mission Control Updates: "Live status reports from flight controllers."'
    ],
    missionObjectives: 'To test the Space Launch System (SLS) rocket and the Orion spacecraft for future crewed lunar missions.',
    crewParticipants: ['Commander Moonikin Campos (mannequin)'],
    vehicleInfo: 'Launch Vehicle: Space Launch System (SLS) | Spacecraft: Orion capsule',
    scientificOutcomes: 'Validated spacecraft systems for extreme space environments, provided data for human deep-space exploration.',
    progress: 100,
  },
  {
    id: '5',
    title: 'Voyager 1\nDeep Space',
    image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'), // Replace with your image path
    keyMilestones: [
      'Launch: September 5, 1977 – Titan IIIE-Centaur rocket from Cape Canaveral.',
      'Jupiter Flyby: March 5, 1979 – Closest approach to Jupiter.',
      'Saturn Flyby: November 12, 1980 – Closest approach to Saturn.',
      'Interstellar Space: August 25, 2012 – Officially entered interstellar space.'
    ],
    audioFragments: [
      'Golden Record Introduction: "Sounds of Earth for aliens."',
      'Distance Reports: "Updates on Voyager\'s journey."'
    ],
    missionObjectives: 'To explore the outer planets (Jupiter, Saturn) and then to explore the outer heliosphere and interstellar space.',
    crewParticipants: ['N/A (robotic probe)'],
    vehicleInfo: 'Launch Vehicle: Titan IIIE-Centaur | Spacecraft: Voyager 1 probe',
    scientificOutcomes: 'First detailed images of Jupiter\'s and Saturn\'s moons, discovery of new moons and rings, first probe to enter interstellar space, ongoing data about cosmic rays and magnetic fields.',
    progress: 100,
  },
  // Add more missions with the new structure
  {
    id: '6',
    title: 'Hubble Space\nTelescope\nDeployment',
    image: require('../assets/img/1f04c2d921205548d16091678a7dae5dbda6d78b.png'), // Replace with your image path
    keyMilestones: [
      'Launch: April 24, 1990 – Space Shuttle Discovery from Kennedy Space Center.',
      'Deployment: April 25, 1990 – Deployed into low Earth orbit.',
      'First Images: May 20, 1990 – First light image of star cluster NGC 3532.',
      'Servicing Missions: 1993-2009 – Multiple shuttle missions to upgrade and repair.'
    ],
    audioFragments: [
      'Shuttle Launch Audio: "Power of the Space Shuttle."',
      'Hubble Operations: "Sounds from its long journey."'
    ],
    missionObjectives: 'To provide a long-term space-based observatory for astronomical research, offering unprecedented views of the universe free from atmospheric distortion.',
    crewParticipants: ['STS-31 Crew (for deployment)', 'Multiple Astronaut Crews (for servicing missions)'],
    vehicleInfo: 'Launch Vehicle: Space Shuttle Discovery (STS-31) | Instrument: Hubble Space Telescope',
    scientificOutcomes: 'Revolutionized astronomy with discoveries in cosmology (dark energy, age of universe), exoplanets, galactic evolution, and black holes. Provided iconic images of nebulae and galaxies.',
    progress: 100,
  },
];

const FlightHistoryScreen: React.FC<FlightHistoryScreenProps> = ({ navigation }) => {
  // Renderer for each item in the FlatList
  const renderFlightItem: ListRenderItem<Flight> = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HistoryInfoScreen', { item }); // Pass the entire item
      }}
      style={styles.missionCard}
    >
      <View style={styles.cardTextContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {/* Display primary objective or first milestone */}
        {item.missionObjectives ? (
          <Text style={styles.cardSubtitle}>Objective: {item.missionObjectives}</Text>
        ) : item.keyMilestones && item.keyMilestones.length > 0 ? (
          <Text style={styles.cardSubtitle}>
            {item.keyMilestones[0].split('–')[0].trim()}
          </Text>
        ) : null}
        {/* Display crew/participants if available */}
        {item.crewParticipants && item.crewParticipants.length > 0 && (
          <Text style={styles.cardDetail}>Crew: {item.crewParticipants.join(', ')}</Text>
        )}
        {/* Display vehicle info if available */}
        {item.vehicleInfo && (
          <Text style={styles.cardDetail}>Vehicle: {item.vehicleInfo.split('|')[0].replace('Launch Vehicle: ', '').trim()}</Text>
        )}
      </View>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.arrowContainer}>
        <Text style={styles.cardArrow}>{'〉'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // Your background image
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.headerTitle}>MISSION ARCHIVES</Text>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={renderFlightItem} // Use the typed renderer
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No historical records found.</Text>
            <Text style={styles.emptyListSubText}>New missions will appear here after completion.</Text>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default FlightHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505', // Consistent very dark background
    padding: 20,
    paddingTop: 60, // Adjusted padding top for consistency
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color, signifying importance/history
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 215, 0, 0.7)', // Gold glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  flatListContent: {
    paddingBottom: 40, // Space at the bottom
  },
  missionCard: {
    backgroundColor: 'rgba(25, 25, 25, 0.7)', // Semi-transparent dark grey for cards
    borderRadius: 15, // Rounded corners
    padding: 18,
    marginBottom: 20, // More space between cards
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2, // Prominent border
    borderColor: '#4CAF50', // Green border for historical significance
    shadowColor: '#4CAF50', // Matching green glow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTextContent: {
    flex: 1, // Allows text to take available space
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800', // Extra bold title
    color: '#E0E0E0', // Light grey for main text
    marginBottom: 5,
    textShadowColor: 'rgba(255,255,255,0.2)', // Subtle white text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#B0E0E6', // Light blue for subtle info
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 3, // Small margin for clarity
  },
  cardDetail: {
    fontSize: 12, // Smaller font for additional details
    color: '#A9A9A9', // Darker grey for details
    marginTop: 2,
  },
  cardImage: {
    width: 90, // Larger image for impact
    height: 90,
    borderRadius: 10, // Rounded image corners
    resizeMode: 'cover', // Ensures image fills the space
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', // Subtle border around image
  },
  arrowContainer: {
    paddingLeft: 15, // Space for the arrow
  },
  cardArrow: {
    fontSize: 26,
    color: '#FFD700', // Gold arrow, matching title
    fontWeight: 'bold',
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
