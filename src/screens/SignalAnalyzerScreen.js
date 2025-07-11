import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

const SIGNAL_BLOCK_SIZE = 70;
const SIGNAL_TYPES = ['ALPHA', 'BETA', 'GAMMA', 'DELTA', 'EPSILON']; // Possible signal types/patterns
const CORRECT_SIGNAL_RATE = 0.35; // Chance for a signal to be the correct type
const SPAWN_INTERVAL = 700; // milliseconds
const SIGNAL_TRAVEL_TIME = 4000; // milliseconds to cross the screen

const SignalAnalyzerScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeSignals, setActiveSignals] = useState([]); // { id, type, startX, startY, animatedX, animatedY }
  const [currentKeyPattern, setCurrentKeyPattern] = useState('');

  const scoreRef = useRef(score);
  scoreRef.current = score;
  const gameOverRef = useRef(gameOver);
  gameOverRef.current = gameOver;

  // --- Game Logic Functions ---

  // Function to generate a random signal pattern
  const getRandomSignalType = () => {
    return SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)];
  };

  // Function to change the key pattern
  const changeKeyPattern = useCallback(() => {
    setCurrentKeyPattern(getRandomSignalType());
  }, []);

  const spawnSignal = useCallback(() => {
    if (gameOverRef.current) return;

    const id = Date.now();
    const type = Math.random() < CORRECT_SIGNAL_RATE ? currentKeyPattern : getRandomSignalType();

    // Start from a random vertical position off-screen right
    const startX = width;
    const startY = Math.random() * (height * 0.7 - SIGNAL_BLOCK_SIZE) + (height * 0.1);

    const animatedX = new Animated.Value(startX); // For horizontal movement
    const animatedY = new Animated.Value(startY); // For subtle vertical float

    setActiveSignals(prevSignals => [
      ...prevSignals,
      { id, type, animatedX, animatedY, startX, startY }
    ]);

    // Animate signal moving across the screen
    Animated.parallel([
      Animated.timing(animatedX, {
        toValue: -SIGNAL_BLOCK_SIZE, // Move off-screen left
        duration: SIGNAL_TRAVEL_TIME,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.sequence([ // Subtle vertical floating animation
        Animated.timing(animatedY, {
          toValue: startY + 15,
          duration: SIGNAL_TRAVEL_TIME / 4,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedY, {
          toValue: startY - 15,
          duration: SIGNAL_TRAVEL_TIME / 4,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedY, {
          toValue: startY,
          duration: SIGNAL_TRAVEL_TIME / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ])
    ]).start(({ finished }) => {
      if (finished && !gameOverRef.current) {
        setActiveSignals(prevSignals => {
          const missedSignal = prevSignals.find(s => s.id === id);
          if (missedSignal && missedSignal.type === currentKeyPattern) {
            // Penalize for missing a correct signal
            setScore(s => Math.max(0, s - 15));
          }
          return prevSignals.filter(s => s.id !== id);
        });
      }
    });
  }, [currentKeyPattern]); // Depend on currentKeyPattern to spawn correct signals

  const handleSignalPress = useCallback((id, type) => {
    if (gameOverRef.current) return;

    setActiveSignals(prevSignals => {
      const targetSignal = prevSignals.find(obj => obj.id === id);
      if (targetSignal) {
        // Immediately fade out the pressed object
        Animated.timing(targetSignal.animatedX, { // Just stop its animation or quickly move off-screen
          toValue: targetSignal.animatedX.__getValue(), // Stop current animation
          duration: 1, // Instantly
          useNativeDriver: true,
        }).stop(); // Stop any ongoing animations

        // Remove from active signals
        setActiveSignals(currentSignals => currentSignals.filter(obj => obj.id !== id));

        // Update score based on type
        if (type === currentKeyPattern) {
          setScore(s => s + 20); // Correct capture
        } else {
          setScore(s => Math.max(0, s - 25)); // Incorrect capture
        }
      }
      return prevSignals;
    });
  }, [currentKeyPattern]);

  // --- Effects ---

  // Initial setup: set first key pattern
  useEffect(() => {
    changeKeyPattern();
  }, [changeKeyPattern]);

  // Game Loop: Spawn new signals
  useEffect(() => {
    let spawnInterval;
    let keyPatternChangeInterval;

    if (!gameOver) {
      spawnInterval = setInterval(() => {
        spawnSignal();
      }, SPAWN_INTERVAL);

      // Key pattern changes periodically
      keyPatternChangeInterval = setInterval(() => {
        changeKeyPattern();
      }, 7000); // Change key pattern every 7 seconds
    }

    return () => {
      clearInterval(spawnInterval);
      clearInterval(keyPatternChangeInterval);
    };
  }, [gameOver, spawnSignal, changeKeyPattern]);

  // Check for game over condition
  useEffect(() => {
    if (score < -50 && !gameOver) { // Game over if score drops too low (more leeway than 0)
      setGameOver(true);
      navigation.navigate('GameOverScreen', { score: scoreRef.current });
    }
  }, [score, gameOver, navigation]);

  return (
    <View style={styles.container}>
      {/* Header with Score, Back Button and Key Pattern */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'⟪ ARCHIVE'}</Text>
        </TouchableOpacity>
        <View style={styles.patternDisplay}>
          <Text style={styles.patternLabel}>ЦЕЛЕВОЙ СИГНАЛ:</Text>
          <Text style={styles.currentPatternText}>{currentKeyPattern}</Text>
        </View>
        <Text style={styles.scoreText}>СЧЕТ: {score}</Text>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {activeSignals.map((signal) => (
          <TouchableOpacity
            key={signal.id}
            style={{
              position: 'absolute',
              left: signal.animatedX,
              top: signal.animatedY,
            }}
            onPress={() => handleSignalPress(signal.id, signal.type)}
            disabled={gameOver}
          >
            <View
              style={[
                styles.signalBlock,
                signal.type === currentKeyPattern ? styles.correctSignal : styles.incorrectSignal
              ]}
            >
              <Text style={styles.signalText}>{signal.type}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>СИГНАЛ ПОТЕРЯН</Text>
            <Text style={styles.finalScoreText}>Итоговый счет: {score}</Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => {
                setGameOver(false);
                setScore(0);
                setActiveSignals([]);
                changeKeyPattern(); // Reset key pattern on retry
              }}
            >
              <Text style={styles.restartButtonText}>ПЕРЕЗАПУСК</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SignalAnalyzerScreen;

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
  patternDisplay: {
    alignItems: 'center',
    flex: 1,
  },
  patternLabel: {
    color: '#87CEFA', // Light sky blue
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  currentPatternText: {
    color: '#00FF00', // Bright green for the target pattern
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 255, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginTop: 5,
  },
  gameArea: {
    flex: 1,
    position: 'relative', // For absolutely positioned signals
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly transparent black for game area
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden', // Crucial for containing animations within the view
  },
  signalBlock: {
    width: SIGNAL_BLOCK_SIZE,
    height: SIGNAL_BLOCK_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Slightly rounded corners for blocks
    borderWidth: 2,
    padding: 5,
  },
  correctSignal: {
    backgroundColor: 'rgba(0, 200, 0, 0.3)', // Greenish transparent
    borderColor: '#00FF00', // Bright green border
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  incorrectSignal: {
    backgroundColor: 'rgba(200, 0, 0, 0.3)', // Reddish transparent
    borderColor: '#FF0000', // Bright red border
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  signalText: {
    color: '#FFFFFF', // White text for readability
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  gameOverText: {
    color: '#FF4500',
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
