// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
//
// const GameResultScreen = ({ route, navigation }) => {
//   const {score} = route.params;
//   return (
//     <ImageBackground
//       source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')} // фоновая картинка
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <Text style={styles.title}>Your Result</Text>
//       <Text style={styles.score}>{score}</Text>
//       {/*<Text style={styles.bestScore}>Best Score {bestScore}</Text>*/}
//       <Text style={styles.rank}>Turbostarter</Text>
//
//       <Image
//         source={require('../assets/img/game/80e3a65070938420130366796ee1e910f97140ac.png')} // астронавт
//         style={styles.image}
//       />
//
//
//
//       <TouchableOpacity style={styles.leaveButton} onPress={()=>{navigation.pop(2)}}>
//         <Text style={styles.leaveText}>Leave</Text>
//       </TouchableOpacity>
//     </ImageBackground>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 24,
//     marginBottom: 10,
//     fontWeight: '500',
//   },
//   score: {
//     fontSize: 64,
//     color: '#c29cf3',
//     fontWeight: 'bold',
//   },
//   bestScore: {
//     fontSize: 20,
//     color: '#f9f17c',
//     marginTop: 8,
//     fontWeight: '600',
//   },
//   rank: {
//     fontSize: 28,
//     color: '#80c9ff',
//     marginVertical: 16,
//     fontWeight: '700',
//   },
//   image: {
//     width: 120,
//     height: 120,
//     marginVertical: 24,
//     resizeMode: 'contain',
//   },
//   tryAgainButton: {
//     backgroundColor: '#74D3FF',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 0,
//     marginBottom: 12,
//   },
//   tryAgainText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   leaveButton: {
//     backgroundColor: '#FD8A3A',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 0,
//   },
//   leaveText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
// });
//
// export default GameResultScreen;
import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';

const spaceMissions = [
  // --- Moon Missions ---
  {
    id: 'moon-1',
    title: 'Luna 2 🌕', // Emoji added for target identification
    date: 'September 12, 1959',
    description: 'The Soviet Union\'s Luna 2 was the first spacecraft to reach the surface of the Moon, making a hard landing near the Sea of Serenity.',
    fact: 'Significance: It was the first human-made object to impact another celestial body, proving that such a feat was possible.'
  },
  {
    id: 'moon-2',
    title: 'Apollo 11 🌕',
    date: 'July 16, 1969',
    description: 'NASA\'s Apollo 11 mission culminated in the first human moon landing. Neil Armstrong and Buzz Aldrin walked on the lunar surface.',
    fact: 'Significance: Achieved the primary goal of the "Space Race," fulfilling President Kennedy\'s challenge to land a man on the Moon and return him safely to Earth.'
  },
  {
    id: 'moon-3',
    title: 'Chang\'e 4 🌕',
    date: 'December 8, 2018',
    description: 'The China National Space Administration (CNSA) successfully landed Chang\'e 4 on the far side of the Moon, an unprecedented achievement.',
    fact: 'Significance: This was the first time any spacecraft landed on the never-before-seen far side of the Moon, exploring the Von Kármán crater.'
  },
  {
    id: 'moon-4',
    title: 'Artemis I 🌕',
    date: 'November 16, 2022',
    description: 'Artemis I was an uncrewed test flight of NASA\'s Orion spacecraft and Space Launch System (SLS) around the Moon.',
    fact: 'Significance: It was the crucial first step in returning humans to the Moon under the Artemis program, paving the way for future crewed missions.'
  },
  // --- Mars Missions ---
  {
    id: 'mars-1',
    title: 'Mariner 4 🪐', // Emoji added for target identification
    date: 'November 28, 1964',
    description: 'NASA\'s Mariner 4 performed the first successful flyby of Mars, sending back the first close-up images of the red planet.',
    fact: 'Significance: It provided humanity\'s first detailed look at Mars, revealing a cratered, moon-like surface, dispelling popular notions of canals.'
  },
  {
    id: 'mars-2',
    title: 'Viking 1 Lander 🪐',
    date: 'August 20, 1975',
    description: 'Viking 1 was part of a two-spacecraft mission by NASA, with its lander making the first successful U.S. landing on Mars.',
    fact: 'Significance: The Viking landers conducted groundbreaking biological experiments to search for signs of life on Mars.'
  },
  {
    id: 'mars-3',
    title: 'Mars Pathfinder 🪐',
    date: 'December 4, 1996',
    description: 'NASA\'s Mars Pathfinder mission deployed the Sojourner rover, the first wheeled rover to explore the Martian surface.',
    fact: 'Significance: Demonstrated a new, low-cost way to deliver payloads to Mars and captured the public imagination with its rover\'s movements.'
  },
  {
    id: 'mars-4',
    title: 'Curiosity Rover 🪐',
    date: 'November 26, 2011',
    description: 'NASA\'s Curiosity rover landed in Gale Crater and has been exploring Mars\'s geology and climate, searching for evidence of past microbial life.',
    fact: 'Significance: It successfully executed the complex "Sky Crane" landing maneuver and has found strong evidence of ancient freshwater lake environments on Mars.'
  },
  {
    id: 'mars-5',
    title: 'Perseverance Rover 🪐',
    date: 'July 30, 2020',
    description: 'NASA\'s Perseverance rover landed in Jezero Crater, carrying the Ingenuity helicopter, and is collecting samples for future return to Earth.',
    fact: 'Significance: Equipped with advanced tools for astrobiology research and the first mission to attempt controlled flight on another planet (Ingenuity).'
  },
];

const SpaceRoadmapScreen = () => { // Removed navigation prop as items are not pressable
  return (
    <ImageBackground
      source={require('../assets/img/BG.png')} // Your background image
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.headerTitle}>SPACE EXPLORATION ROADMAP</Text>
      <FlatList
        data={spaceMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.missionCard}> {/* No TouchableOpacity */}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>Launch Date: {item.date}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardFact}>{item.fact}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No space missions found.</Text>
            <Text style={styles.emptyListSubText}>The cosmos awaits new explorations!</Text>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default SpaceRoadmapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 215, 0, 0.7)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  flatListContent: {
    paddingBottom: 40,
  },
  missionCard: {
    backgroundColor: 'rgba(25, 25, 25, 0.85)', // Slightly less transparent for better readability
    borderRadius: 20, // More rounded corners for a softer look
    padding: 25, // More padding inside the card
    marginBottom: 25, // More space between cards
    borderWidth: 3, // Thicker border
    borderColor: '#00BFFF', // Sky Blue
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 8 }, // More pronounced shadow
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 24, // Larger title
    fontWeight: '900', // Even bolder
    color: '#E0E0E0',
    marginBottom: 10,
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  cardDate: {
    fontSize: 16,
    color: '#87CEFA', // Lighter blue
    fontWeight: '600',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 15,
    color: '#D0D0D0', // Slightly lighter grey for main text
    lineHeight: 22,
    marginBottom: 10,
  },
  cardFact: {
    fontSize: 15,
    color: '#FFD700', // Gold for significant facts
    fontWeight: '700',
    marginTop: 5,
    fontStyle: 'italic',
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
