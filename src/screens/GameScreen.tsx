import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const rocketSize = 100;
const itemSize = 80;
const fallSpeed = 10;

const getRandomX = () => Math.floor(Math.random() * (width - itemSize));

const GameScreen = ({ navigation }) => {
  const [rocketX, setRocketX] = useState(width / 2 - rocketSize / 2);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      // Добавляем новый предмет
      const isBad = Math.random() < 0.2;
      setItems(prev => [
        ...prev,
        {
          id: Date.now(),
          x: getRandomX(),
          y: 0,
          isBad,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameOver) return;

      setItems(prev =>
        prev.map(item => ({ ...item, y: item.y + fallSpeed }))
      );

      // Проверка на столкновение
      items.forEach(item => {
        const collided =
          item.y + itemSize >= height - rocketSize &&
          item.x < rocketX + rocketSize &&
          item.x + itemSize > rocketX;

        if (collided) {
          if (item.isBad) {
            setGameOver(true);
          } else {
            setScore(score => score + 10);
          }

          // удаляем предмет
          setItems(prev => prev.filter(i => i.id !== item.id));
        }
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [items, rocketX, gameOver]);

  const moveRocket = (direction) => {
    setRocketX(prev => {
      const newX = direction === 'left' ? prev - 30 : prev + 30;
      return Math.max(0, Math.min(newX, width - rocketSize));
    });
  };

  if (gameOver) {
    navigation.navigate('GameResultScreen', {score})

  }

  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        const x = e.nativeEvent.locationX;
        moveRocket(x < width / 2 ? 'left' : 'right');
      }}
    >
      <ImageBackground
        source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')} // замените на свой путь
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.score}>{score}</Text>
        {items.map(item => (
          <Image
            key={item.id}
            source={item.isBad
              ? require('../assets/img/game/cd0578a85e49772df7228cb09ff90bb22ffa2957.png')
              : require('../assets/img/game/e63657cfd529b2cedbae1054f0ab0c0cb759d0d5.png')}
            style={[styles.item, { top: item.y, left: item.x }]}
          />
        ))}
        <Image
          source={require('../assets/img/game/6125bd77dfe5d9a94085b23fcc3d8804a31d3c1a.png')}
          style={[styles.rocket, { left: rocketX }]}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001D3D',
  },
  score: {
    color: 'yellow',
    fontSize: 24,
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  rocket: {
    width: rocketSize,
    height: rocketSize,
    position: 'absolute',
    bottom: 40,
  },
  item: {
    width: itemSize,
    height: itemSize,
    position: 'absolute',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    color: 'red',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 24,
    marginVertical: 20,
    color: '#fff',
  },
  retry: {
    color: '#00f',
    fontSize: 18,
  },
});

export default GameScreen;
