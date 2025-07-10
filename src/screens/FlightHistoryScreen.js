import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity} from 'react-native';

const flights = [
  {
    id: '1',
    title: 'Apollo 11',
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'),
    info: [
      'Launch: July 16, 1969 – Saturn V rocket launched from Kennedy Space Center.',
      'Lunar Orbit Insertion: July 19, 1969 – Apollo 11 entered lunar orbit.',
      'Moon Landing: July 20, 1969 – "Eagle" lunar module landed in the Sea of Tranquility.',
      'First Moonwalk: July 20, 1969 – Neil Armstrong and Buzz Aldrin walked on the Moon.',
    ],
    AudioFragments: [
      'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
    ]
  },
  {
    id: '2',
    title: 'SpaceX\nInspiration4',
    info: [
'Launch: September 16, 2021 – Falcon 9 rocket launched from Kennedy Space Center.',
      'Orbit: September 16–18, 2021 – Crew orbited Earth for three days in Dragon capsule.',
      'Splashdown: September 18, 2021 – Successful return off the coast of Florida.',
      'Significance: First all-civilian crewed spaceflight, no professional astronauts on board.'
    ],
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'),
    AudioFragments: [
      'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
    ]
  },
  {
    id: '3',
    info: [
      'Launch: December 25, 2021 – Ariane 5 rocket launched from Kourou, French Guiana.',
      'Orbit Insertion: January 24, 2022 – Webb arrived at its destination at L2 orbit.',
      'Deployment: December 2021–January 2022 – Complex unfolding of the telescope.',
      'First Images: July 12, 2022 – NASA released the first high-resolution cosmic images.',
    ],
    AudioFragments: [
'Countdown Audio: "Final moments before liftoff."',
      'Communication Audio: "Live voices from space missions."'
],
    title: 'James Webb\nSpace Telescope\nLaunch',
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'), // замените на свой путь
  },
];

const FlightHistoryScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // Your background image
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.headerTitle}>MISSION ARCHIVES</Text> {/* New thematic header */}
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('HistoryInfoScreen', {item})}} style={styles.missionCard}>
            <View style={styles.cardTextContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {/* Optional: Add a brief info line */}
              {item.info && item.info.length > 0 && (
                <Text style={styles.cardSubtitle}>{item.info[0].split('–')[0].trim()}</Text>
              )}
            </View>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.arrowContainer}>
              <Text style={styles.cardArrow}>{'〉'}</Text>
            </View>
          </TouchableOpacity>
        )}
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
    textShadowOffset: {width: 0, height: 0},
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
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#B0E0E6', // Light blue for subtle info
    fontWeight: '500',
    letterSpacing: 0.3,
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
