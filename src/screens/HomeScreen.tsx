import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define types for your navigation stack
type RootStackParamList = {
  RocketDetailsScreen: { rocket: Rocket };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RocketDetailsScreen'>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Define the interface for a single Rocket object (unchanged)
interface Rocket {
  id: string;
  name: string;
  type: string;
  status: 'Flying Now' | 'Operational' | 'Retired' | 'Testing' | 'Development' | 'Concept';
  color: string;
  statusColor: string;
  Specifications: string[];
  Missions: string[];
  interestingFacts: string[];
  Country: string;
  image: any;
  block: 'Active Launch Vehicles' | 'Next-Gen & Development' | 'Historic & Legacy';
}

// Hard-coded rocket data (unchanged)
const rockets: Rocket[] = [
  {
    id: '1',
    name: 'Falcon 9',
    type: 'Medium-Lift Orbital',
    status: 'Flying Now',
    color: '#00FFFF',
    statusColor: '#32CD32',
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
    image: require('../assets/img/1f04c2d921205548d16091678a7dae5dbda6d78b.png'),
    block: 'Active Launch Vehicles',
  },
  {
    id: '3',
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
    image: require('../assets/img/6e78dff5ba756afd30e38fb1149cc86c77b0672b.png'),
    block: 'Active Launch Vehicles',
  },
  {
    id: '7',
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
    image: require('../assets/img/ec1d656927cba57f373a047fbfad47d7a9ed310d.png'),
    block: 'Active Launch Vehicles',
  },
  {
    id: '8',
    name: 'New Shepard',
    type: 'Suborbital Tourism',
    status: 'Operational',
    color: '#00BFFF',
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
    image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'),
    block: 'Active Launch Vehicles',
  },
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
    color: '#FF4500',
    statusColor: '#FF6347',
    image: require('../assets/img/9e66016a08e08d706a2df042eddfb53d947bbe5c.png'),
    block: 'Next-Gen & Development',
  },
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
    status: 'Development',
    color: '#FF4500',
    statusColor: '#FF6347',
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'),
    block: 'Next-Gen & Development',
  },
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
    color: '#FFD700',
    statusColor: '#FFA500',
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'),
    block: 'Historic & Legacy',
  },
  {
    id: '5',
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
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'),
    block: 'Historic & Legacy',
  },
  {
    id: '6',
    name: 'Delta II',
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
    image: require('../assets/img/d62f32498eec0213986f2fde276aa0fe2eff5e39.png'),
    block: 'Historic & Legacy',
  },
];

// Group rockets by their 'block' property
const getGroupedRockets = (allRockets: Rocket[]) => {
  const grouped: Record<string, Rocket[]> = {};
  allRockets.forEach((rocket) => {
    if (!grouped[rocket.block]) {
      grouped[rocket.block] = [];
    }
    grouped[rocket.block].push(rocket);
  });
  return grouped;
};

const groupedRockets = getGroupedRockets(rockets);

// Component for a single rocket card with the new design
const RocketCard: React.FC<{
  item: Rocket;
  navigation: HomeScreenNavigationProp;
  accentColor: string;
}> = ({ item, navigation, accentColor }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('RocketDetailsScreen', { rocket: item })}
    style={[styles.rocketCard, { borderColor: accentColor }]}
    activeOpacity={0.8}
  >
    <Image source={item.image} style={styles.rocketImage} />
    <View style={styles.cardInfo}>
      <Text style={styles.rocketName}>{item.name}</Text>
      <Text style={styles.rocketType}>{item.type}</Text>
      <Text style={[styles.statusIndicator, { color: accentColor }]}>
        {item.status.toUpperCase()}
      </Text>
      <Text style={styles.rocketCountry}>Страна: {item.Country}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  // Define accent colors for each block
  const blockColors = {
    'Active Launch Vehicles': '#00BFFF', // Deep Sky Blue
    'Next-Gen & Development': '#FF7F50', // Coral
    'Historic & Legacy': '#D3D3D3', // Light Gray
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>LAUNCHPAD LOG</Text>

        {Object.keys(groupedRockets).map((blockName) => (
          <View key={blockName} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{blockName}</Text>
            <View style={styles.cardListContainer}>
              {groupedRockets[blockName].map((rocket) => (
                <RocketCard
                  key={rocket.id}
                  item={rocket}
                  navigation={navigation}
                  accentColor={blockColors[blockName as keyof typeof blockColors]}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#0A0E1A', // Dark navy background
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1.5,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D3D3D3', // Light gray title
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
    paddingBottom: 5,
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  rocketCard: {
    width: '48%', // Approx. two cards per row
    backgroundColor: '#1E2433', // Darker blue for cards
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  rocketImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardInfo: {
    alignItems: 'center',
  },
  rocketName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rocketType: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 4,
    textAlign: 'center',
  },
  statusIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  rocketCountry: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
