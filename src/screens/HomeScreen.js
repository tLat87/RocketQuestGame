import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';

const rockets = [
    {
        id: '1',
        name: 'Falcon 9',
        type: 'Orbital',
        status: 'Flying Now',
        color: '#fff',
        statusColor: '#FF6F61',
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
        type: 'Research',
        status: 'Historic',
        color: '#DDA0DD',
        statusColor: '#D2691E',
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
        type: 'Research',
        status: 'Flying Now',
        color: '#DDA0DD',
        statusColor: '#FF6F61',
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
        type: 'Orbital',
        status: 'Testing',
        color: '#fff',
        statusColor: '#DE8C5A',
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
        type: 'Orbital',
        status: 'Retired',
        color: '#fff',
        statusColor: '#C0805A',
        image: require('../assets/img/616980d5a69902483b07634c7d56fb8c3659f4b6.png'),
    },
    {
        id: '6',
        name: 'Delta',
        type: 'Military',
        status: 'Testing',
        color: '#87CEFA',
        statusColor: '#000',
        image: require('../assets/img/d62f32498eec0213986f2fde276aa0fe2eff5e39.png'),
    },
    {
        id: '7',
        name: 'Electron',
        type: 'Orbital',
        status: 'Testing',
        color: '#fff',
        statusColor: '#000',
        image: require('../assets/img/ec1d656927cba57f373a047fbfad47d7a9ed310d.png'),
    },
    {
        id: '8',
        name: 'New Shepard',
        type: 'Suborbital',
        status: 'Testing',
        color: '#B595FF',
        statusColor: '#000',
        image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'),
    },
];

export default function HomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // твоя картинка-фон
      style={{ flex: 1, backgroundColor: '#000' }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rocket Encyclopedia</Text>
        {rockets.map(rocket => (
          <TouchableOpacity
            key={rocket.id}
            onPress={() => navigation.navigate('RocketDetailsScreen', { rocket })}
            style={styles.card}
          >
            <View style={styles.textSection}>
              <View style={[styles.typeBadge, { backgroundColor: rocket.color }]}>
                <Text style={styles.typeText}>{rocket.type}</Text>
              </View>
              <Text style={styles.name}>{rocket.name}</Text>
              {rocket.status ? (
                <Text style={[styles.status, { color: rocket.statusColor }]}>{rocket.status}</Text>
              ) : null}
            </View>
            <Image source={rocket.image} style={styles.image} />
          </TouchableOpacity>
        ))}
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
        color: '#FFF176',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFD966',
        borderRadius: 44,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textSection: {
        flex: 1,
        height: 180,
        justifyContent: 'space-around',
        marginRight: 10,
    },
    typeBadge: {
        borderRadius: 20,
        paddingHorizontal: 12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    typeText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    status: {
        fontSize: 14,
        marginTop: 4,
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        // borderRadius: 20,
        height: 180,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
});
