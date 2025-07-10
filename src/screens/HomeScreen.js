import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';

const rockets = [
  {
    id: '1',
    name: 'Falcon 9',
    type: 'Orbital',
    status: 'Flying Now',
    color: '#00FFFF', // Cyan for active status
    statusColor: '#32CD32', // Lime green for "Flying Now"
    Specifications: [
      'Height: 70 m',
      'Mass: 549 t',
      'Payload to orbit: up to 22.8 t (LEO)',
    ],
    Missions: [
      'Crew Dragon missions to the ISS',
      'Starlink satellite launches',
      'NASA, private, and military payload deployments',
    ],
    interestingFacts: [
      'The first orbital-class rocket capable of reflight.',
      'Over 300 successful launches as of early 2025.',
    ],
    Country: "USA",
    image: require('../assets/img/1f04c2d921205548d16091678a7dae5dbda6d78b.png'),
  },
  {
    id: '2',
    name: 'Saturn V',
    Country: "USA",
    Specifications: [
      'Height: 110.6 m',
      'Mass: 2,970 t',
      'Payload to orbit: up to 140 t (LEO)',
    ],
    Missions: [
      'Apollo missions to the Moon',
      'Launch of the Skylab space station',
    ],
    interestingFacts: [
      'The most powerful rocket ever successfully flown.',
      'No complete Saturn V mission ever failed catastrophically.'
    ],
    type: 'Historic', // Changed to Historic for consistency
    status: 'Retired',
    color: '#FFD700', // Gold for historic/retired
    statusColor: '#FFA500', // Orange for retired
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'),
  },
  {
    id: '3',
    name: 'Soyuz',
    Country: 'Russia (formerly USSR)',
    Specifications: [
      'Height: 46.1 m',
      'Mass: 312 t',
      'Payload to orbit: up to 7 t (LEO)',
    ],
    Missions: [
      'Crew and cargo transport to the ISS',
      'Satellite deployments',
    ],
    interestingFacts: [
      'The most frequently launched rocket in history.',
      'Based on the R-7 ICBM platform from the 1950s.'
    ],
    type: 'Orbital',
    status: 'Flying Now',
    color: '#00FFFF', // Cyan for active status
    statusColor: '#32CD32', // Lime green for "Flying Now"
    image: require('../assets/img/6e78dff5ba756afd30e38fb1149cc86c77b0672b.png'),
  },
  {
    id: '4',
    Country: 'USA',
    name: 'Starship',
    Specifications: [
      'Height: 120 m (with Super Heavy booster)',
      'Mass: approximately 5,000 t',
      'Payload to orbit: over 100 t (LEO)'
    ],
    Missions: [
      'Future Mars missions',
      'Artemis program Moon landings',
      'Global deployment of Starlink satellites'
    ],
    interestingFacts: [
      'The largest rocket ever built.',
      'Designed to be fully reusable, including booster and ship.'
    ],
    type: 'Prototype', // Changed to Prototype for more specific status
    status: 'Testing',
    color: '#FF4500', // Orange-red for testing/prototype
    statusColor: '#FF6347', // Tomato for testing
    image: require('../assets/img/9e66016a08e08d706a2df042eddfb53d947bbe5c.png'),
  },
  {
    id: '5',
    name: 'Ariane',
    Country: 'Europe (ESA)',
    Specifications: [
      'Height: 52 m',
      'Mass: 780 t',
      'Payload to orbit: up to 21 t (LEO), up to 10 t (GTO)',
      'Retired (Ariane 5 retired in 2023, replaced by Ariane 6)'
    ],
    Missions: [
      'Launch of the James Webb Space Telescope',
      'Commercial satellite deployments',
    ],
    interestingFacts:[
      'Europe\'s most reliable heavy-lift launcher.',
      'Symbol of European excellence in space transportation.'
    ],
    type: 'Historic',
    status: 'Retired',
    color: '#FFD700', // Gold for historic/retired
    statusColor: '#FFA500', // Orange for retired
    image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'),
  },
  {
    id: '6',
    name: 'Delta',
    type: 'Military',
    status: 'Operational', // Assuming this is operational
    color: '#87CEFA', // Light blue for military/specialized
    statusColor: '#32CD32', // Lime green for "Operational"
    image: require('../assets/img/d62f32498eec0213986f2fde276aa0fe2eff5e39.png'),
  },
  {
    id: '7',
    name: 'Electron',
    type: 'Small-Lift', // More descriptive type
    status: 'Flying Now',
    color: '#00FFFF', // Cyan for active status
    statusColor: '#32CD32', // Lime green for "Flying Now"
    image: require('../assets/img/ec1d656927cba57f373a047fbfad47d7a9ed310d.png'),
  },
  {
    id: '8',
    name: 'New Shepard',
    type: 'Suborbital Tourism', // More descriptive type
    status: 'Operational',
    color: '#00BFFF', // Deep sky blue for tourism/specialized
    statusColor: '#32CD32', // Lime green for "Operational"
    image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'),
  },
];


export default function HomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // your background image
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>LAUNCHPAD LOG</Text> {/* New thematic title */}
        {rockets.map(rocket => (
          <TouchableOpacity
            key={rocket.id}
            onPress={() => navigation.navigate('RocketDetailsScreen', { rocket })}
            style={styles.rocketCard}
          >
            <View style={styles.textColumn}>
              <View style={[styles.typePill, { backgroundColor: rocket.color }]}>
                <Text style={styles.typeText}>{rocket.type}</Text>
              </View>
              <Text style={styles.rocketName}>{rocket.name}</Text>
              {rocket.status ? (
                <Text style={[styles.statusIndicator, { color: rocket.statusColor }]}>
                  STATUS: {rocket.status.toUpperCase()}
                </Text>
              ) : null}
            </View>
            <Image source={rocket.image} style={styles.rocketImage} />
          </TouchableOpacity>
        ))}
        <View style={{ marginBottom: 100 }} /> {/* Spacer for bottom */}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#050505', // Consistent very dark background
    paddingTop: 60, // More top padding
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    color: '#90EE90', // Light green for a "system ready" or "online" feel
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(144, 238, 144, 0.7)', // Green glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  rocketCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 0.8)', // Darker, semi-transparent card background
    borderRadius: 15, // More rounded corners
    padding: 18,
    marginBottom: 20, // More space between cards
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2, // Prominent border
    borderColor: '#00FFFF', // Cyan border for cards
    shadowColor: '#00FFFF', // Matching cyan glow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  textColumn: {
    flex: 1,
    // height: 180, // Adjust height if needed, but flex should handle
    justifyContent: 'space-between', // Distribute content vertically
    marginRight: 15, // More space before image
  },
  typePill: {
    borderRadius: 20, // Fully rounded "pill" shape
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignSelf: 'flex-start', // Only take up necessary width
    marginBottom: 8,
    // Color handled by `rocket.color`
    shadowColor: 'rgba(0,0,0,0.3)', // Subtle shadow for pill
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#050505', // Dark text on colored badge
    textTransform: 'uppercase', // Uppercase type text
  },
  rocketName: {
    fontSize: 28, // Larger name for prominence
    fontWeight: '900', // Extra bold
    color: '#E0E0E0', // Light grey for main text
    marginBottom: 5,
    textShadowColor: 'rgba(255,255,255,0.2)', // Subtle white text shadow
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  statusIndicator: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: '700', // Bolder status
    // Color handled by `rocket.statusColor`
    letterSpacing: 0.5,
  },
  rocketImage: {
    width: 130, // Slightly wider image
    height: 190, // Slightly taller image
    resizeMode: 'contain', // Changed to contain to ensure full image visibility without stretching
    borderRadius: 10, // Slight rounding for the image itself
    borderWidth: 1, // Subtle border around image
    borderColor: 'rgba(255,255,255,0.1)', // Very light white border
  },
});
