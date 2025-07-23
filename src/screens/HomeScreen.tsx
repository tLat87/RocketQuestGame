import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ListRenderItem, // For FlatList renderItem typing
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; // For navigation typing

// Define types for your navigation stack
type RootStackParamList = {
  RocketDetailsScreen: { rocket: Rocket }; // Ensure this matches your navigation setup
  // Add other screen names in your stack if needed
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RocketDetailsScreen'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Define the interface for a single Rocket object
interface Rocket {
  id: string;
  name: string;
  type: string; // e.g., 'Orbital', 'Suborbital', 'Heavy-Lift'
  status: 'Flying Now' | 'Operational' | 'Retired' | 'Testing' | 'Development' | 'Concept';
  color: string; // Base color for the card/type pill
  statusColor: string; // Color specifically for the status text
  Specifications: string[];
  Missions: string[];
  interestingFacts: string[];
  Country: string;
  image: any; // Use 'any' for local image require paths
  block: 'Active Launch Vehicles' | 'Next-Gen & Development' | 'Historic & Legacy'; // New categorization block
}

const rockets: Rocket[] = [
  {
    id: '1',
    name: 'Falcon 9',
    type: 'Medium-Lift Orbital',
    status: 'Flying Now',
    color: '#00FFFF', // Cyan for active/modern feel
    statusColor: '#32CD32', // Lime green for "Flying Now"
    Specifications: [
      'Height: 70 m (229.6 ft)',
      'Mass: 549 t (1,207,920 lb)',
      'Payload to LEO: up to 22.8 t (50,265 lb) (expendable)',
      'Payload to GTO: up to 8.3 t (18,300 lb) (expendable)',
    ],
    Missions: [
      'Crew Dragon missions to the ISS',
      'Starlink satellite deployments (constellation building)',
      'NASA, commercial, and military payload deployments',
      'Transporter rideshare missions',
    ],
    interestingFacts: [
      'The first orbital-class rocket capable of propulsive landing and reflight of its first stage.',
      'Has achieved over 300 successful launches, making it one of the most reliable and frequently launched rockets.',
      'Pioneered the rapid reusability concept, significantly reducing launch costs.',
      'Utilizes Merlin engines, known for their high performance and reusability.',
    ],
    Country: 'USA',
    image: require('../assets/img/1f04c2d921205548d16091678a7dae5dbda6d78b.png'), // Your image path
    block: 'Active Launch Vehicles',
  },
  {
    id: '3', // Moved up for logical grouping in 'Active' block
    name: 'Soyuz',
    Country: 'Russia (formerly USSR)',
    Specifications: [
      'Height: 46.1 m (151.2 ft)',
      'Mass: 312 t (687,840 lb)',
      'Payload to LEO: up to 7 t (15,400 lb)',
      'Legacy variants up to 28 t (61,730 lb) for different orbits',
    ],
    Missions: [
      'Crew and cargo transport to the ISS (Soyuz and Progress spacecraft)',
      'Satellite deployments (e.g., OneWeb constellation)',
      'Interplanetary probes (historically)',
    ],
    interestingFacts: [
      'The most frequently launched rocket in history, with over 1,900 launches across all variants.',
      'Based on the R-7 Semyorka ICBM platform from the 1950s, making it one of the longest-serving rocket families.',
      'Known for its "Korolyov cross" staging event where the first stage boosters peel away.',
      'Has flown more human spaceflight missions than any other rocket.',
    ],
    type: 'Medium-Lift Orbital',
    status: 'Flying Now',
    color: '#00FFFF',
    statusColor: '#32CD32',
    image: require('../assets/img/6e78dff5ba756afd30e38fb1149cc86c77b0672b.png'), // Your image path
    block: 'Active Launch Vehicles',
  },
  {
    id: '7', // Moved up for logical grouping
    name: 'Electron',
    type: 'Small-Lift Orbital',
    status: 'Flying Now',
    color: '#00FFFF',
    statusColor: '#32CD32',
    Specifications: [
      'Height: 18 m (59 ft)',
      'Mass: 13 t (28,660 lb)',
      'Payload to LEO: up to 300 kg (660 lb)',
      'Payload to Sun-Synchronous Orbit: up to 200 kg (440 lb)',
    ],
    Missions: [
      'Dedicated small satellite launches',
      'Lunar missions (e.g., CAPSTONE for NASA)',
      'Earth observation and technology demonstration satellites',
    ],
    interestingFacts: [
      'Features 3D-printed Rutherford engines with electric pumps, a unique design in rocketry.',
      'Rocket Lab, its manufacturer, has successfully caught Electron boosters mid-air with a helicopter for reusability attempts.',
      'Known for its carbon composite structure, making it very lightweight and efficient.',
    ],
    Country: 'New Zealand/USA',
    image: require('../assets/img/ec1d656927cba57f373a047fbfad47d7a9ed310d.png'), // Your image path
    block: 'Active Launch Vehicles',
  },
  {
    id: '8', // Moved up for logical grouping
    name: 'New Shepard',
    type: 'Suborbital Tourism',
    status: 'Operational',
    color: '#00BFFF', // Deep sky blue for specialized/tourism
    statusColor: '#32CD32',
    Specifications: [
      'Height: 18 m (59 ft) (booster and capsule)',
      'Apogee: over 100 km (Kármán line)',
      'Capacity: 6 passengers',
    ],
    Missions: [
      'Suborbital space tourism flights for private individuals',
      'Scientific research payloads at the edge of space',
      'Lunar landing technology demonstrations',
    ],
    interestingFacts: [
      'Developed by Blue Origin, founded by Jeff Bezos.',
      'Designed for fully autonomous flight and vertical landing of both booster and capsule.',
      'Provides a few minutes of weightlessness and views of Earth from space.',
    ],
    Country: 'USA',
    image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'), // Your image path
    block: 'Active Launch Vehicles',
  },
  // --- NEXT-GEN & DEVELOPMENT ---
  {
    id: '4',
    Country: 'USA',
    name: 'Starship',
    Specifications: [
      'Height: 120 m (394 ft) (with Super Heavy booster)',
      'Mass: approximately 5,000 t (11 million lb) (fully fueled)',
      'Payload to LEO: >100 t (220,000 lb) (fully reusable), up to 250 t (550,000 lb) (expendable)',
    ],
    Missions: [
      'Future Mars colonization missions (planned)',
      'Artemis program human lunar lander (planned)',
      'Global deployment of next-generation Starlink satellites',
      'Point-to-point Earth transportation (concept)',
    ],
    interestingFacts: [
      'The largest and most powerful rocket ever built, surpassing the Saturn V in thrust and payload capacity.',
      'Designed to be fully and rapidly reusable, including both the booster (Super Heavy) and the Starship upper stage.',
      'Aims to enable human multi-planetary exploration, starting with Mars.',
      'Uses Raptor engines, which are full-flow staged combustion cycle engines.',
    ],
    type: 'Super Heavy-Lift Reusable',
    status: 'Testing',
    color: '#FF4500', // Orange-red for development/testing
    statusColor: '#FF6347', // Tomato for testing
    image: require('../assets/img/9e66016a08e08d706a2df042eddfb53d947bbe5c.png'), // Your image path
    block: 'Next-Gen & Development',
  },
  // Add other upcoming/future rockets here
  // Example for Ariane 6 (current successor to Ariane 5)
  {
    id: '9',
    name: 'Ariane 6',
    Country: 'Europe (ESA)',
    Specifications: [
      'Height: 60 m (197 ft)',
      'Mass: 900 t (1,984,160 lb) (A64 variant)',
      'Payload to GTO: up to 11.5 t (25,350 lb) (A64 variant)',
      'Payload to LEO: up to 21.6 t (47,620 lb)',
    ],
    Missions: [
      'Commercial and institutional satellite launches (telecom, Earth observation)',
      'Deep-space missions (e.g., ESA science missions)',
      'Serving as Europe\'s primary heavy-lift launcher for decades to come.',
    ],
    interestingFacts: [
      'Successor to Ariane 5, designed to be more cost-effective and flexible.',
      'Features a modular design with either two (A62) or four (A64) solid rocket boosters.',
      'Its first flight is highly anticipated as it will secure Europe\'s independent access to space.',
      'Capable of multiple reignitions of its Vinci upper stage engine, allowing for precise orbit insertions.',
    ],
    type: 'Heavy-Lift Orbital',
    status: 'Development', // Or 'Testing' closer to first flight
    color: '#FF4500',
    statusColor: '#FF6347',
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'), // Reusing Ariane 5 image for now, replace with Ariane 6 if available
    block: 'Next-Gen & Development',
  },
  // --- HISTORIC & LEGACY ---
  {
    id: '2',
    name: 'Saturn V',
    Country: 'USA',
    Specifications: [
      'Height: 110.6 m (363 ft)',
      'Mass: 2,970 t (6.5 million lb)',
      'Payload to LEO: 140 t (310,000 lb)',
      'Payload to TLI (Trans-Lunar Injection): 48.6 t (107,000 lb)',
    ],
    Missions: [
      'Apollo missions to the Moon (Apollo 8, 10-17)',
      'Launch of the Skylab space station (converted S-IVB third stage)',
    ],
    interestingFacts: [
      'The most powerful rocket ever successfully flown in terms of total impulse and launch thrust until Starship/Super Heavy.',
      'Only 13 Saturn V rockets were launched, with zero catastrophic failures during crewed missions.',
      'Its F-1 engines are still among the most powerful single-chamber liquid-propellant rocket engines ever developed.',
      'Stood taller than the Statue of Liberty.',
    ],
    type: 'Super Heavy-Lift Expendable',
    status: 'Retired',
    color: '#FFD700', // Gold for historic/retired
    statusColor: '#FFA500', // Orange for retired
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'), // Your image path
    block: 'Historic & Legacy',
  },
  {
    id: '5', // Adjusted to fit into Historic block
    name: 'Ariane 5',
    Country: 'Europe (ESA)',
    Specifications: [
      'Height: 52 m (170 ft)',
      'Mass: 780 t (1.7 million lb)',
      'Payload to GTO: up to 10 t (22,000 lb)',
      'Payload to LEO: up to 21 t (46,300 lb)',
    ],
    Missions: [
      'Launch of the James Webb Space Telescope (JWST)',
      'Galileo navigation satellites',
      'Commercial and institutional satellite deployments',
      'ATV cargo missions to the ISS',
    ],
    interestingFacts: [
      'Europe\'s workhorse heavy-lift launcher for over 25 years, with more than 110 launches.',
      'Known for its high reliability, achieving a long streak of successful launches.',
      'Successfully launched the Rosetta probe to a comet and the BepiColombo mission to Mercury.',
    ],
    type: 'Heavy-Lift Orbital',
    status: 'Retired',
    color: '#FFD700',
    statusColor: '#FFA500',
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'), // Your image path
    block: 'Historic & Legacy',
  },
  // Example for an older Delta variant, assuming Delta IV is phased out
  {
    id: '6', // Assuming this is an older Delta variant, no longer operational
    name: 'Delta II', // Specific older variant
    type: 'Medium-Lift Expendable',
    status: 'Retired',
    color: '#FFD700',
    statusColor: '#FFA500',
    Specifications: [
      'Height: 39 m (128 ft)',
      'Mass: 231.8 t (511,000 lb)',
      'Payload to LEO: up to 6.3 t (13,890 lb)',
    ],
    Missions: [
      'Mars rovers (Spirit & Opportunity)',
      'GPS satellites',
      'Deep Impact comet mission',
      'NASA science missions',
    ],
    interestingFacts: [
      'A highly reliable rocket with 155 successful launches out of 157 attempts.',
      'Served as NASA\'s workhorse for launching interplanetary missions and Earth-orbiting satellites for decades.',
      'Known for its distinctive "nine-pack" solid rocket booster configuration on some variants.',
    ],
    Country: 'USA',
    image: require('../assets/img/d62f32498eec0213986f2fde276aa0fe2eff5e39.png'), // Your image path
    block: 'Historic & Legacy',
  },
];

// Group rockets by their 'block'
const getGroupedRockets = (allRockets: Rocket[]) => {
  const grouped: Record<string, Rocket[]> = {};
  allRockets.forEach((rocket) => {
    if (!grouped[rocket.block]) {
      grouped[rocket.block] = [];
    }
    grouped[rocket.block].push(rocket);
  });
  return Object.keys(grouped).map((blockName) => ({
    title: blockName,
    data: grouped[blockName],
  }));
};

const sections = getGroupedRockets(rockets);

const RocketCard: React.FC<{ item: Rocket; navigation: HomeScreenNavigationProp }> = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('RocketDetailsScreen', { rocket: item })}
    style={styles.rocketCard}
  >
    <View style={styles.textColumn}>
      <View style={[styles.typePill, { backgroundColor: item.color }]}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
      <Text style={styles.rocketName}>{item.name}</Text>
      {item.status ? (
        <Text style={[styles.statusIndicator, { color: item.statusColor }]}>
          STATUS: {item.status.toUpperCase()}
        </Text>
      ) : null}
      {item.Country && (
        <Text style={styles.rocketCountry}>Country: {item.Country}</Text>
      )}
    </View>
    <Image source={item.image} style={styles.rocketImage} />
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // your background image
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <Text style={styles.title}>LAUNCHPAD LOG</Text>

      <FlatList
        data={sections.flatMap(section => [
          { type: 'header', title: section.title, id: section.title }, // Header marker
          ...section.data,
        ])}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if ((item as any).type === 'header') {
            return (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{(item as any).title}</Text>
                <View style={styles.sectionUnderline} />
              </View>
            );
          }
          return <RocketCard item={item as Rocket} navigation={navigation} />;
        }}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No rocket data found.</Text>
            <Text style={styles.emptyListSubText}>Exploring new frontiers!</Text>
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 60,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 40, // More space at the bottom
  },
  title: {
    color: '#90EE90',
    fontSize: 36, // Larger title
    fontWeight: 'bold',
    marginBottom: 25, // Less margin to bring content up
    textAlign: 'center',
    textShadowColor: 'rgba(144, 238, 144, 0.8)', // Stronger green glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15, // Wider glow
    letterSpacing: 2.5, // More letter spacing
    textTransform: 'uppercase',
  },
  sectionHeader: {
    marginBottom: 15,
    marginTop: 25, // More space above new section
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0FFFF', // Cyan/Aqua for section titles
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  sectionUnderline: {
    height: 2,
    width: '100%', // Full width underline
    backgroundColor: 'rgba(0, 255, 255, 0.3)', // Faded cyan underline
    borderRadius: 1,
  },
  rocketCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 0.85)', // Slightly less transparent for better readability
    borderRadius: 18, // More rounded corners
    padding: 20, // More padding
    marginBottom: 18, // Consistent space between cards
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#00FFFF', // Cyan border
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 8 }, // More pronounced shadow
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    marginRight: 15,
  },
  typePill: {
    borderRadius: 25, // More rounded, larger pill
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    // Color handled by `rocket.color`
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 15, // Slightly larger
    color: '#050505',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rocketName: {
    fontSize: 30, // Even larger name
    fontWeight: '900',
    color: '#E0E0E0',
    marginBottom: 8,
    textShadowColor: 'rgba(255,255,255,0.3)', // Stronger text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  statusIndicator: {
    fontSize: 16, // Larger status text
    marginTop: 5,
    fontWeight: '800', // Even bolder status
    letterSpacing: 0.8,
  },
  rocketCountry: {
    fontSize: 14,
    color: '#A9A9A9', // Darker grey for country
    marginTop: 5,
    fontStyle: 'italic',
  },
  rocketImage: {
    width: 140, // Wider image
    height: 200, // Taller image
    resizeMode: 'contain',
    borderRadius: 12, // More rounded image corners
    borderWidth: 1.5, // Slightly thicker border
    borderColor: 'rgba(255,255,255,0.15)', // Slightly more visible border
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    borderRadius: 15,
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
