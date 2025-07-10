import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

const GameResultScreen = ({ route, navigation }) => {
  const {score} = route.params;
  return (
    <ImageBackground
      source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')} // фоновая картинка
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Your Result</Text>
      <Text style={styles.score}>{score}</Text>
      {/*<Text style={styles.bestScore}>Best Score {bestScore}</Text>*/}
      <Text style={styles.rank}>Turbostarter</Text>

      <Image
        source={require('../assets/img/game/80e3a65070938420130366796ee1e910f97140ac.png')} // астронавт
        style={styles.image}
      />



      <TouchableOpacity style={styles.leaveButton} onPress={()=>{navigation.pop(2)}}>
        <Text style={styles.leaveText}>Leave</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '500',
  },
  score: {
    fontSize: 64,
    color: '#c29cf3',
    fontWeight: 'bold',
  },
  bestScore: {
    fontSize: 20,
    color: '#f9f17c',
    marginTop: 8,
    fontWeight: '600',
  },
  rank: {
    fontSize: 28,
    color: '#80c9ff',
    marginVertical: 16,
    fontWeight: '700',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 24,
    resizeMode: 'contain',
  },
  tryAgainButton: {
    backgroundColor: '#74D3FF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 0,
    marginBottom: 12,
  },
  tryAgainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  leaveButton: {
    backgroundColor: '#FD8A3A',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 0,
  },
  leaveText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default GameResultScreen;
