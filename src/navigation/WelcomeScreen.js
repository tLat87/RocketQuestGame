import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const handleStart = () => {
        navigation.navigate('MainTab'); // Замените на ваш экран
    };

    return (
      <View style={styles.container}>
          {/* Фоновый слой с ракетами */}
          <ImageBackground
            source={require('../assets/img/BG.png')} // Создай прозрачный PNG с повторяющимися ракетами
            style={styles.background}
            resizeMode="repeat"
          >
              <Text style={styles.title}>ROCKET{'\n'}QUEST{'\n'}GAME</Text>
              <TouchableOpacity style={styles.button} onPress={handleStart}>
                  <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
          </ImageBackground>
      </View>
    );
};

export default WelcomeScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Чёрный фон
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 48,
        marginBottom: 100,
    },
    button: {
        backgroundColor: '#FFF176',
        paddingVertical: 20,
        width: width - 40,
        borderRadius: 40,
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
