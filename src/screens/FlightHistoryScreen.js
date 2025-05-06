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
        source={require('../assets/img/BG.png')}
        style={styles.container}
        resizeMode="cover"
      >
      <Text style={styles.header}>Flight History</Text>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('HistoryInfoScreen', {item})}} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ImageBackground>
  );
};

export default FlightHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Чёрный фон
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFF99', // Бледно-жёлтый заголовок
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFD93D', // Жёлтый цвет
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flexShrink: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginLeft: 15,
  },
});
