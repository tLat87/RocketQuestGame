import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const RocketScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/img/857839cf268323b1cb0db6f8e3db3a41e4a0ce40.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.timer}>Dodge and take off</Text>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    marginTop: 80,
    fontSize: 58,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 120,
  },
  startButton: {
    backgroundColor: '#7ED6FC',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 0,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RocketScreen;
