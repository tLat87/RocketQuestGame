import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';


const { width, height } = Dimensions.get('window');

interface Planet {
  id: string;
  name: string;
  type: 'Core Systems' | 'Outer Rim' | 'Frontier Worlds' | 'Unknown Regions';
  status: 'Active' | 'Restricted' | 'Dangerous' | 'Peaceful';
  resources: string[];
  tradeGoods: string[];
  distance: number;
  population: number;
  block: string;
}

// Mock planets data
const planets: Planet[] = [
  {
    id: '1',
    name: 'Nova Prime',
    type: 'Core Systems',
    status: 'Active',
    resources: ['Quantum Crystals', 'Plasma Energy', 'Neural Networks'],
    tradeGoods: ['Advanced Technology', 'Luxury Items', 'Rare Materials'],
    distance: 2.3,
    population: 15000000,
    block: 'Core Systems',
  },
  {
    id: '2',
    name: 'Quantum Station',
    type: 'Core Systems',
    status: 'Active',
    resources: ['Quantum Processors', 'Energy Cores', 'AI Modules'],
    tradeGoods: ['Computing Technology', 'Research Data', 'Scientific Equipment'],
    distance: 1.8,
    population: 8500000,
    block: 'Core Systems',
  },
  {
    id: '3',
    name: 'Crystal World',
    type: 'Outer Rim',
    status: 'Peaceful',
    resources: ['Exotic Crystals', 'Rare Minerals', 'Energy Shards'],
    tradeGoods: ['Jewelry', 'Decorative Items', 'Energy Sources'],
    distance: 4.7,
    population: 3200000,
    block: 'Outer Rim',
  },
  {
    id: '4',
    name: 'Tech Hub',
    type: 'Outer Rim',
    status: 'Active',
    resources: ['Advanced Alloys', 'Circuit Components', 'Data Crystals'],
    tradeGoods: ['Electronic Devices', 'Communication Tech', 'Industrial Equipment'],
    distance: 3.9,
    population: 6800000,
    block: 'Outer Rim',
  },
  {
    id: '5',
    name: 'Resource Center',
    type: 'Frontier Worlds',
    status: 'Dangerous',
    resources: ['Raw Materials', 'Energy Deposits', 'Rare Metals'],
    tradeGoods: ['Construction Materials', 'Fuel', 'Industrial Supplies'],
    distance: 6.2,
    population: 1200000,
    block: 'Frontier Worlds',
  },
  {
    id: '6',
    name: 'Mystery Zone',
    type: 'Unknown Regions',
    status: 'Restricted',
    resources: ['Unknown Substances', 'Exotic Matter', 'Ancient Artifacts'],
    tradeGoods: ['Mysterious Items', 'Forbidden Knowledge', 'Rare Collectibles'],
    distance: 8.9,
    population: 0,
    block: 'Unknown Regions',
  },
];

export default function HomeScreen({ navigation }: any) {
  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for title
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getGroupedPlanets = () => {
    if (selectedBlock === 'All') {
      return planets;
    }
    return planets.filter(planet => planet.block === selectedBlock);
  };

  const getBlockColors = (block: string) => {
    switch (block) {
      case 'Core Systems': return ['#FF6B6B', '#FF8E8E'];
      case 'Outer Rim': return ['#4ECDC4', '#6EE7E0'];
      case 'Frontier Worlds': return ['#45B7D1', '#6BC5E3'];
      case 'Unknown Regions': return ['#96CEB4', '#B8E6B8'];
      default: return ['#B0C4DE', '#C5D1E8'];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#4ECDC4';
      case 'Restricted': return '#FFD700';
      case 'Dangerous': return '#FF6B6B';
      case 'Peaceful': return '#96CEB4';
      default: return '#B0C4DE';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Core Systems': return '#FF6B6B';
      case 'Outer Rim': return '#4ECDC4';
      case 'Frontier Worlds': return '#45B7D1';
      case 'Unknown Regions': return '#96CEB4';
      default: return '#B0C4DE';
    }
  };

  const handlePlanetPress = (planet: Planet) => {
    navigation.navigate('PlanetDetailsScreen', { planet });
  };

  const renderPlanetCard = (planet: Planet, index: number) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Staggered entrance animation
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(cardAnim, {
            toValue: 1,
            duration: 600,
            delay: index * 100,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            delay: index * 100,
            useNativeDriver: true,
          }),
        ]).start();
      }, index * 100);
    }, []);

    return (
      <Animated.View
        key={planet.id}
        style={[
          styles.planetCard,
          {
            opacity: cardAnim,
            transform: [
              { translateY: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              })},
              { scale: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              })},
              { rotateY: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })},
            ],
          },
        ]}
      >
        <View
          style={styles.planetTouchable}
          // onPress={() => handlePlanetPress(planet)}
          // activeOpacity={0.8}
        >
          <View style={[styles.planetContainer, { backgroundColor: getBlockColors(planet.block)[0] }]}>
            <View style={styles.planetHeader}>
              <Text style={styles.planetName}>{planet.name}</Text>
              <View style={styles.planetMeta}>
                <Text style={[styles.planetType, { color: getTypeColor(planet.type) }]}>
                  {planet.type}
                </Text>
                <Text style={[styles.planetStatus, { color: getStatusColor(planet.status) }]}>
                  {planet.status}
                </Text>
              </View>
            </View>

            <View style={styles.planetInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Distance:</Text>
                <Text style={styles.infoValue}>{planet.distance} LY</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Population:</Text>
                <Text style={styles.infoValue}>{planet.population.toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.resourcesSection}>
              <Text style={styles.resourcesTitle}>Key Resources:</Text>
              <View style={styles.resourcesList}>
                {planet.resources.slice(0, 2).map((resource, idx) => (
                  <Text key={idx} style={styles.resourceItem}>• {resource}</Text>
                ))}
              </View>
            </View>

            <View style={styles.tradeSection}>
              <Text style={styles.tradeTitle}>Trade Goods:</Text>
              <View style={styles.tradeList}>
                {planet.tradeGoods.slice(0, 2).map((good, idx) => (
                  <Text key={idx} style={styles.tradeItem}>• {good}</Text>
                ))}
              </View>
            </View>

          
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderShipStatus = () => {
    const shipAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(shipAnim, {
          toValue: 1,
          duration: 1000,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.shipStatusContainer,
          {
            opacity: shipAnim,
            transform: [{
              translateY: shipAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
        <View style={styles.shipContainer}>
          <Text style={styles.shipStatusTitle}>SHIP STATUS</Text>
          <View style={styles.shipStatsGrid}>
            <Animated.View
              style={[
                styles.shipStatItem,
                {
                  shadowOpacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.shipStatLabel}>Credits</Text>
              <Text style={styles.shipStatValue}>125,000</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.shipStatItem,
                {
                  shadowOpacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.shipStatLabel}>Cargo</Text>
              <Text style={styles.shipStatValue}>85%</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.shipStatItem,
                {
                  shadowOpacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.shipStatLabel}>Fuel</Text>
              <Text style={styles.shipStatValue}>92%</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.shipStatItem,
                {
                  shadowOpacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.shipStatLabel}>Reputation</Text>
              <Text style={styles.shipStatValue}>A+</Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Animated Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              STELLAR MERCHANT
            </Animated.Text>
            <Text style={styles.subtitle}>Navigate the cosmos, trade the stars</Text>
          </Animated.View>

          {/* Ship Status */}
          {renderShipStatus()}

          {/* Block Filter
          <Animated.View
            style={[
              styles.filterContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Core Systems', 'Outer Rim', 'Frontier Worlds', 'Unknown Regions'].map((block) => (
                <TouchableOpacity
                  key={block}
                  style={[
                    styles.filterButton,
                    selectedBlock === block && styles.activeFilterButton,
                  ]}
                  onPress={() => setSelectedBlock(block)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedBlock === block && styles.activeFilterButtonText,
                  ]}>
                    {block}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View> */}

          {/* Planets Grid */}
          <Animated.View
            style={[
              styles.planetsContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  scale: scaleAnim,
                }],
              },
            ]}
          >
            <Text style={styles.planetsTitle}>AVAILABLE PLANETS</Text>
            <View style={styles.planetsGrid}>
              {getGroupedPlanets().map((planet, index) => renderPlanetCard(planet, index))}
            </View>
          </Animated.View>
                 </ScrollView>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 215, 0, 0.3)',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 3,
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#B0C4DE',
    textAlign: 'center',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  shipStatusContainer: {
    margin: 20,
  },
  shipContainer: {
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    backgroundColor: '#1E2433',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  shipStatusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  shipStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shipStatItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  shipStatLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    fontWeight: '600',
  },
  shipStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  filterButton: {
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  activeFilterButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B0C4DE',
    letterSpacing: 1,
  },
  activeFilterButtonText: {
    color: '#000000',
  },
  planetsContainer: {
    padding: 20,
  },
  planetsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  planetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planetCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  planetTouchable: {
    flex: 1,
  },
  planetContainer: {
    padding: 20,
    minHeight: 280,
  },
  planetHeader: {
    marginBottom: 15,
  },
  planetName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  planetMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planetStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planetInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resourcesSection: {
    marginBottom: 15,
  },
  resourcesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  resourcesList: {
    marginLeft: 10,
  },
  resourceItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  tradeSection: {
    marginBottom: 20,
  },
  tradeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tradeList: {
    marginLeft: 10,
  },
  tradeItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  exploreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
