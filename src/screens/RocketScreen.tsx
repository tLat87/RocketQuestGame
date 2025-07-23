import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

const OBJECT_SIZE = 60;
const SPAWN_INTERVAL = 800; // milliseconds
const OBJECT_LIFESPAN = 2500; // milliseconds before object disappears

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeObjects, setActiveObjects] = useState([]); // Stores { id, type, x, y, animatedValue }

  // Use a ref to store current score for callbacks that might not see the latest state
  const scoreRef = useRef(score);
  scoreRef.current = score;

  // Use a ref for game over state
  const gameOverRef = useRef(gameOver);
  gameOverRef.current = gameOver;

  // --- Game Logic Functions ---

  const spawnObject = useCallback(() => {
    if (gameOverRef.current) return;

    const id = Date.now();
    const type = Math.random() > 0.7 ? 'resource' : 'junk'; // 70% chance of resource, 30% junk
    const x = Math.random() * (width - OBJECT_SIZE);
    const y = Math.random() * (height * 0.7 - OBJECT_SIZE) + (height * 0.1); // Spawn in central game area

    const animatedValue = new Animated.Value(0); // For fade-in/fade-out animation

    setActiveObjects(prevObjects => [
      ...prevObjects,
      { id, type, x, y, animatedValue }
    ]);

    // Animate object appearing and then disappearing
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1, // Fade in
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(OBJECT_LIFESPAN - 300 - 200), // Hold for a bit
      Animated.timing(animatedValue, {
        toValue: 0, // Fade out
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]).start(({ finished }) => {
      if (finished && !gameOverRef.current) {
        // If object disappeared naturally, remove it from activeObjects
        setActiveObjects(prevObjects => prevObjects.filter(obj => obj.id !== id));
        // If it was a resource and not collected, might penalize or just let it go
        if (type === 'resource') {
          // Optional: penalty for missing a resource
          // setScore(s => Math.max(0, s - 5));
        }
      }
    });
  }, []); // Depend on gameOverRef

  const handleObjectPress = useCallback((id, type) => {
    if (gameOverRef.current) return;

    setActiveObjects(prevObjects => {
      const targetObject = prevObjects.find(obj => obj.id === id);
      if (targetObject) {
        // Immediately fade out the pressed object
        Animated.timing(targetObject.animatedValue, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          // Remove from active objects after fade out
          setActiveObjects(currentObjects => currentObjects.filter(obj => obj.id !== id));
        });

        // Update score based on type
        if (type === 'resource') {
          setScore(s => s + 10);
        } else if (type === 'junk') {
          setScore(s => Math.max(0, s - 20)); // Penalize for wrong press
          // Optional: End game immediately if junk is pressed
          // setGameOver(true);
          // navigation.navigate('GameOverScreen', { score: scoreRef.current });
        }
      }
      return prevObjects; // Return current objects to prevent re-render glitches
    });
  }, []); // Depend on gameOverRef, scoreRef

  // --- Effects ---

  // Game Loop: Spawn new objects
  useEffect(() => {
    let spawnInterval;
    if (!gameOver) {
      spawnInterval = setInterval(() => {
        spawnObject();
      }, SPAWN_INTERVAL);
    }

    return () => {
      clearInterval(spawnInterval);
    };
  }, [gameOver, spawnObject]);

  // Check for game over condition (e.g., score drops too low)
  useEffect(() => {
    if (score < 0 && !gameOver) { // Example: Game over if score goes negative
      setGameOver(true);
      navigation.navigate('GameOverScreen', { score: scoreRef.current });
    }
  }, [score, gameOver, navigation]);

  return (
    <View style={styles.container}>
      {/* Header with Score and Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'⟪ ARCHIVE'}</Text>
        </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {activeObjects.map((obj) => (
          <TouchableOpacity
            key={obj.id}
            style={{
              position: 'absolute',
              left: obj.x,
              top: obj.y,
            }}
            onPress={() => handleObjectPress(obj.id, obj.type)}
            disabled={gameOver}
          >
            <Animated.View
              style={[
                styles.object,
                obj.type === 'resource' ? styles.resourceObject : styles.junkObject,
                { opacity: obj.animatedValue }
              ]}
            >
              <Text style={styles.objectText}>
                {obj.type === 'resource' ? '💎' : '🗑️'}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>ЗАВЕРШЕНО</Text>
            <Text style={styles.finalScoreText}>Итоговый счет: {score}</Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => {
                setGameOver(false);
                setScore(0);
                setActiveObjects([]);
              }}
            >
              <Text style={styles.restartButtonText}>ПОВТОРИТЬ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F', // Very dark background
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    color: '#00BFFF', // Deep sky blue
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 191, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  scoreText: {
    color: '#FFD700', // Gold for score
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 215, 0, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  gameArea: {
    flex: 1,
    position: 'relative', // For absolutely positioned objects
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly transparent black for game area
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden', // Crucial for containing animations within the view
  },
  object: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: OBJECT_SIZE / 2,
    borderWidth: 2,
  },
  resourceObject: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)', // Greenish transparent for resources
    borderColor: '#00FF00', // Bright green border
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  junkObject: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Reddish transparent for junk
    borderColor: '#FF0000', // Bright red border
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  objectText: {
    fontSize: 40,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker overlay for game over
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Ensure it's on top
  },
  gameOverText: {
    color: '#FF4500', // Orange-red for game over
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 69, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  finalScoreText: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 215, 0, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 8,
  },
  restartButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
