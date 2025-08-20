import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';


interface Planet {
  id: string;
  name: string;
  type: string;
  distance: number;
  travelTime: number;
  fuelCost: number;
  risk: 'Low' | 'Medium' | 'High' | 'Extreme';
  image: any;
}

interface TravelEvent {
  id: string;
  name: string;
  description: string;
  effect: 'positive' | 'negative' | 'neutral';
  probability: number;
}

// Mock planets data
const mockPlanets: Planet[] = [
  {
    id: '1',
    name: 'Nova Prime',
    type: 'Trading Hub',
    distance: 0,
    travelTime: 0,
    fuelCost: 0,
    risk: 'Low',
    image: require('../assets/img/1f04c2d921205548d16091678a7dae5dbda6d78b.png'),
  },
  {
    id: '2',
    name: 'Crimson Forge',
    type: 'Mining Colony',
    distance: 15.7,
    travelTime: 2.5,
    fuelCost: 150,
    risk: 'Medium',
    image: require('../assets/img/6e78dff5ba756afd30e38fb1149cc86c77b0672b.png'),
  },
  {
    id: '3',
    name: 'Quantum Station',
    type: 'Research Station',
    distance: 23.4,
    travelTime: 3.8,
    fuelCost: 220,
    risk: 'Low',
    image: require('../assets/img/ec1d656927cba57f373a047fbfad47d7a9ed310d.png'),
  },
  {
    id: '4',
    name: 'Shadow Port',
    type: 'Military Base',
    distance: 45.2,
    travelTime: 6.2,
    fuelCost: 380,
    risk: 'High',
    image: require('../assets/img/f9abfd12a2980520e6db1676a17dbcbff21eb5b2.png'),
  },
  {
    id: '5',
    name: 'Paradise Resort',
    type: 'Tourist Resort',
    distance: 67.8,
    travelTime: 8.5,
    fuelCost: 520,
    risk: 'Low',
    image: require('../assets/img/9e66016a08e08d706a2df042eddfb53d947bbe5c.png'),
  },
  {
    id: '6',
    name: 'Void Gate',
    type: 'Research Station',
    distance: 89.1,
    travelTime: 11.2,
    fuelCost: 680,
    risk: 'Extreme',
    image: require('../assets/img/2be9fe1af1118c0de429881b4372dfb2a44ae225.png'),
  },
];

// Mock travel events
const mockTravelEvents: TravelEvent[] = [
  {
    id: '1',
    name: 'Solar Flare',
    description: 'A massive solar storm approaches. Take evasive action!',
    effect: 'negative',
    probability: 0.3,
  },
  {
    id: '2',
    name: 'Asteroid Field',
    description: 'Navigate through a dense asteroid field. Requires skill!',
    effect: 'negative',
    probability: 0.4,
  },
  {
    id: '3',
    name: 'Space Debris',
    description: 'Minor collision with space debris. Minor damage sustained.',
    effect: 'negative',
    probability: 0.5,
  },
  {
    id: '4',
    name: 'Wormhole',
    description: 'A stable wormhole appears! Travel time reduced significantly.',
    effect: 'positive',
    probability: 0.1,
  },
  {
    id: '5',
    name: 'Cosmic Wind',
    description: 'Favorable cosmic currents boost your speed.',
    effect: 'positive',
    probability: 0.2,
  },
  {
    id: '6',
    name: 'Quiet Space',
    description: 'Peaceful journey through empty space. Nothing eventful.',
    effect: 'neutral',
    probability: 0.6,
  },
];

export default function SpaceTravelScreen() {
  const [currentPlanet, setCurrentPlanet] = useState<Planet>(mockPlanets[0]);
  const [shipFuel, setShipFuel] = useState(1000);
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0);
  const [travelEvent, setTravelEvent] = useState<TravelEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return '#32CD32';
      case 'Medium': return '#FFD700';
      case 'High': return '#FFA500';
      case 'Extreme': return '#FF4500';
      default: return '#B0C4DE';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return '🟢';
      case 'Medium': return '🟡';
      case 'High': return '🟠';
      case 'Extreme': return '🔴';
      default: return '⚪';
    }
  };

  const canTravelToPlanet = (planet: Planet) => {
    return shipFuel >= planet.fuelCost && planet.id !== currentPlanet.id;
  };

  const handleTravel = (destinationPlanet: Planet) => {
    if (!canTravelToPlanet(destinationPlanet)) {
      Alert.alert(
        'Cannot Travel',
        destinationPlanet.id === currentPlanet.id 
          ? 'You are already at this planet.'
          : 'Insufficient fuel for this journey.'
      );
      return;
    }

    Alert.alert(
      'Confirm Travel',
      `Travel to ${destinationPlanet.name}?\n\nDistance: ${destinationPlanet.distance.toFixed(1)} LY\nTravel Time: ${destinationPlanet.travelTime.toFixed(1)} hours\nFuel Cost: ${destinationPlanet.fuelCost}\nRisk: ${destinationPlanet.risk}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Travel', style: 'default', onPress: () => startTravel(destinationPlanet) },
      ]
    );
  };

  const startTravel = (destinationPlanet: Planet) => {
    setIsTraveling(true);
    setTravelProgress(0);
    setShipFuel(prev => prev - destinationPlanet.fuelCost);

    // Simulate travel progress
    const travelInterval = setInterval(() => {
      setTravelProgress(prev => {
        if (prev >= 100) {
          clearInterval(travelInterval);
          completeTravel(destinationPlanet);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Random travel event
    setTimeout(() => {
      const randomEvent = getRandomTravelEvent();
      if (randomEvent) {
        setTravelEvent(randomEvent);
        setShowEventModal(true);
      }
    }, Math.random() * 3000 + 2000);
  };

  const getRandomTravelEvent = (): TravelEvent | null => {
    const random = Math.random();
    const event = mockTravelEvents.find(e => random <= e.probability);
    return event || null;
  };

  const completeTravel = (destinationPlanet: Planet) => {
    setIsTraveling(false);
    setCurrentPlanet(destinationPlanet);
    setTravelProgress(0);
    
    Alert.alert(
      'Travel Complete',
      `Welcome to ${destinationPlanet.name}!`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleEventResponse = (response: 'positive' | 'negative') => {
    setShowEventModal(false);
    
    if (travelEvent) {
      if (travelEvent.effect === 'positive') {
        Alert.alert('Lucky!', 'The event had a positive outcome!');
      } else if (travelEvent.effect === 'negative') {
        Alert.alert('Unfortunate', 'The event had a negative outcome.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>SPACE TRAVEL</Text>

        {/* Current Location */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.currentLocationContainer}
        >
          <Text style={styles.currentLocationTitle}>CURRENT LOCATION</Text>
          <View style={styles.currentLocationInfo}>
            <Text style={styles.currentPlanetName}>{currentPlanet.name}</Text>
            <Text style={styles.currentPlanetType}>{currentPlanet.type}</Text>
            <Text style={styles.currentPlanetStatus}>You are here</Text>
          </View>
        </LinearGradient>

        {/* Ship Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SHIP STATUS</Text>
          
          <View style={styles.shipStatusContainer}>
            <View style={styles.shipStatusItem}>
              <Text style={styles.shipStatusLabel}>Fuel</Text>
              <Text style={styles.shipStatusValue}>{shipFuel}</Text>
            </View>
            <View style={styles.shipStatusItem}>
              <Text style={styles.shipStatusLabel}>Status</Text>
              <Text style={[styles.shipStatusValue, { color: isTraveling ? '#FFD700' : '#32CD32' }]}>
                {isTraveling ? 'Traveling' : 'Ready'}
              </Text>
            </View>
          </View>
        </View>

        {/* Travel Progress */}
        {isTraveling && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TRAVEL PROGRESS</Text>
            
            <View style={styles.travelProgressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${travelProgress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{travelProgress.toFixed(1)}%</Text>
            </View>
          </View>
        )}

        {/* Available Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AVAILABLE DESTINATIONS</Text>
          
          {mockPlanets.map((planet) => (
            <TouchableOpacity
              key={planet.id}
              style={[
                styles.planetCard,
                planet.id === currentPlanet.id && styles.currentPlanetCard
              ]}
              onPress={() => handleTravel(planet)}
              disabled={planet.id === currentPlanet.id || isTraveling}
            >
              <View style={styles.planetCardHeader}>
                <View style={styles.planetInfo}>
                  <Text style={styles.planetName}>{planet.name}</Text>
                  <Text style={styles.planetType}>{planet.type}</Text>
                  <View style={styles.planetMeta}>
                    <Text style={styles.planetDistance}>
                      {planet.distance.toFixed(1)} LY
                    </Text>
                    <Text style={styles.planetTravelTime}>
                      {planet.travelTime.toFixed(1)}h
                    </Text>
                  </View>
                </View>
                
                <View style={styles.planetStats}>
                  <View style={styles.riskIndicator}>
                    <Text style={styles.riskIcon}>{getRiskIcon(planet.risk)}</Text>
                    <Text style={[styles.riskLevel, { color: getRiskColor(planet.risk) }]}>
                      {planet.risk}
                    </Text>
                  </View>
                  
                  <Text style={styles.fuelCost}>
                    {planet.fuelCost} Fuel
                  </Text>
                </View>
              </View>
              
              {planet.id === currentPlanet.id ? (
                <Text style={styles.currentLocationText}>CURRENT LOCATION</Text>
              ) : !canTravelToPlanet(planet) ? (
                <Text style={styles.cannotTravelText}>
                  {planet.id === currentPlanet.id ? 'Already here' : 'Insufficient fuel'}
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.travelButton}
                  onPress={() => handleTravel(planet)}
                  disabled={isTraveling}
                >
                  <Text style={styles.travelButtonText}>TRAVEL</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Travel Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRAVEL TIPS</Text>
          
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>⛽</Text>
              <Text style={styles.tipText}>
                Always ensure you have enough fuel for your journey
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>⚠️</Text>
              <Text style={styles.tipText}>
                Higher risk destinations may have unexpected events
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>⏱️</Text>
              <Text style={styles.tipText}>
                Longer journeys take more time and resources
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Travel Event Modal */}
      {showEventModal && travelEvent && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{travelEvent.name}</Text>
            <Text style={styles.modalDescription}>{travelEvent.description}</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleEventResponse('positive')}
              >
                <Text style={styles.modalButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1.5,
  },
  currentLocationContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  currentLocationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  currentLocationInfo: {
    alignItems: 'center',
  },
  currentPlanetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  currentPlanetType: {
    fontSize: 18,
    color: '#B0C4DE',
    marginBottom: 5,
  },
  currentPlanetStatus: {
    fontSize: 16,
    color: '#32CD32',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  shipStatusContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  shipStatusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  shipStatusLabel: {
    fontSize: 16,
    color: '#B0C4DE',
  },
  shipStatusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  travelProgressContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#2C3A5A',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  planetCard: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  currentPlanetCard: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  planetCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  planetInfo: {
    flex: 1,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  planetType: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
  },
  planetMeta: {
    flexDirection: 'row',
  },
  planetDistance: {
    fontSize: 12,
    color: '#00BFFF',
    marginRight: 15,
  },
  planetTravelTime: {
    fontSize: 12,
    color: '#FFD700',
  },
  planetStats: {
    alignItems: 'flex-end',
  },
  riskIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  riskLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  fuelCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cannotTravelText: {
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  travelButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  travelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  tipsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 15,
    marginTop: 2,
  },
  tipText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 22,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
