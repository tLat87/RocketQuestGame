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

export default function PlanetDetailsScreen({ route, navigation }: any) {
  const { planet } = route.params;
  const [selectedTab, setSelectedTab] = useState<'info' | 'trade' | 'resources'>('info');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const tabAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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

  const handleTradePress = () => {
    navigation.navigate('TradeScreen', { planet });
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab as any);
    
    // Tab change animation
    Animated.sequence([
      Animated.timing(tabAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(tabAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderInfoTab = () => (
    <Animated.View
      style={[
        styles.tabContent,
        {
          opacity: tabAnim,
          transform: [{
            scale: tabAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          }],
        },
      ]}
    >
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>PLANET OVERVIEW</Text>
        <View style={styles.infoGrid}>
          <Animated.View
            style={[
              styles.infoItem,
              {
                transform: [{
                  translateY: tabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              },
            ]}
          >
            <Text style={styles.infoLabel}>Type</Text>
            <Text style={[styles.infoValue, { color: getTypeColor(planet.type) }]}>
              {planet.type}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.infoItem,
              {
                transform: [{
                  translateY: tabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              },
            ]}
          >
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={[styles.infoValue, { color: getStatusColor(planet.status) }]}>
              {planet.status}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.infoItem,
              {
                transform: [{
                  translateY: tabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              },
            ]}
          >
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{planet.distance} LY</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.infoItem,
              {
                transform: [{
                  translateY: tabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              },
            ]}
          >
            <Text style={styles.infoLabel}>Population</Text>
            <Text style={styles.infoValue}>{planet.population.toLocaleString()}</Text>
          </Animated.View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>PLANET DESCRIPTION</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {planet.name} is a remarkable world located in the {planet.block} sector. 
            This {planet.status.toLowerCase()} planet offers unique opportunities for traders 
            and explorers alike. With its rich resources and strategic location, 
            it serves as a vital hub for interstellar commerce.
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderTradeTab = () => (
    <Animated.View
      style={[
        styles.tabContent,
        {
          opacity: tabAnim,
          transform: [{
            scale: tabAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          }],
        },
      ]}
    >
      <View style={styles.tradeSection}>
        <Text style={styles.sectionTitle}>TRADE OPPORTUNITIES</Text>
        
        <View style={styles.tradeOverview}>
          <Animated.View
            style={[
              styles.tradeCard,
              {
                transform: [{
                  translateX: tabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                }],
              },
            ]}
          >
            <Text style={styles.tradeCardTitle}>IMPORT</Text>
            <View style={styles.tradeItems}>
                           {planet.tradeGoods.map((good: string, index: number) => (
               <Text key={index} style={styles.tradeItem}>• {good}</Text>
             ))}
            </View>
          </Animated.View>

                         <Animated.View
                 style={[
                   styles.tradeCard,
                   {
                     transform: [{
                       translateX: tabAnim.interpolate({
                         inputRange: [0, 1],
                         outputRange: [50, 0],
                       }),
                     }],
                   },
                 ]}
               >
            <Text style={styles.tradeCardTitle}>EXPORT</Text>
            <View style={styles.tradeItems}>
                           {planet.resources.map((resource: string, index: number) => (
               <Text key={index} style={styles.tradeItem}>• {resource}</Text>
             ))}
            </View>
          </Animated.View>
        </View>

                 <TouchableOpacity
           style={styles.tradeButton}
           onPress={handleTradePress}
           activeOpacity={0.8}
         >
           <View style={styles.tradeButtonContainer}>
             <Text style={styles.tradeButtonText}>INITIATE TRADE</Text>
           </View>
         </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderResourcesTab = () => (
    <Animated.View
      style={[
        styles.tabContent,
        {
          opacity: tabAnim,
          transform: [{
            scale: tabAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          }],
        },
      ]}
    >
      <View style={styles.resourcesSection}>
        <Text style={styles.sectionTitle}>NATURAL RESOURCES</Text>
        
        <View style={styles.resourcesGrid}>
                     {planet.resources.map((resource: string, index: number) => (
             <Animated.View
               key={index}
               style={[
                 styles.resourceCard,
                 {
                   transform: [{
                     translateY: tabAnim.interpolate({
                       inputRange: [0, 1],
                       outputRange: [30, 0],
                     }),
                   }],
                 },
               ]}
             >
                             <View style={styles.resourceContainer}>
                 <Text style={styles.resourceName}>{resource}</Text>
                 <Text style={styles.resourceValue}>High Value</Text>
               </View>
            </Animated.View>
          ))}
        </View>

        <View style={styles.resourceInfo}>
          <Text style={styles.resourceInfoTitle}>RESOURCE ANALYSIS</Text>
          <Text style={styles.resourceInfoText}>
            {planet.name} is rich in valuable resources that make it a prime 
            destination for mining operations and resource extraction. The planet's 
            unique geological composition provides rare materials not found elsewhere 
            in the sector.
          </Text>
        </View>
      </View>
    </Animated.View>
  );

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
            <Animated.View
              style={[
                styles.planetIcon,
                {
                  transform: [{
                    rotateY: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  }],
                },
              ]}
            >
              <Text style={styles.planetIconText}>🌍</Text>
            </Animated.View>
            
            <Animated.Text
              style={[
                styles.planetName,
                {
                  transform: [{
                    scale: scaleAnim,
                  }],
                },
              ]}
            >
              {planet.name}
            </Animated.Text>
            
            <View style={styles.planetMeta}>
              <Text style={[styles.planetType, { color: getTypeColor(planet.type) }]}>
                {planet.type}
              </Text>
              <Text style={[styles.planetStatus, { color: getStatusColor(planet.status) }]}>
                {planet.status}
              </Text>
            </View>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View
            style={[
              styles.quickStatsContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            <View style={styles.quickStatsContainer}>
              <View style={styles.quickStatsGrid}>
                <Animated.View
                  style={[
                    styles.quickStatItem,
                    {
                      shadowOpacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.8],
                      }),
                    },
                  ]}
                >
                  <Text style={styles.quickStatLabel}>Distance</Text>
                  <Text style={styles.quickStatValue}>{planet.distance} LY</Text>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.quickStatItem,
                    {
                      shadowOpacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.8],
                      }),
                    },
                  ]}
                >
                  <Text style={styles.quickStatLabel}>Population</Text>
                  <Text style={styles.quickStatValue}>{planet.population.toLocaleString()}</Text>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.quickStatItem,
                    {
                      shadowOpacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.8],
                      }),
                    },
                  ]}
                >
                  <Text style={styles.quickStatLabel}>Resources</Text>
                  <Text style={styles.quickStatValue}>{planet.resources.length}</Text>
                </Animated.View>
              </View>
            </View>
          </Animated.View>

          {/* Tab Navigation */}
          <Animated.View
            style={[
              styles.tabContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            {['info', 'trade', 'resources'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.activeTab,
                ]}
                onPress={() => handleTabChange(tab)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                  {tab.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Tab Content */}
          {selectedTab === 'info' && renderInfoTab()}
          {selectedTab === 'trade' && renderTradeTab()}
          {selectedTab === 'resources' && renderResourcesTab()}
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
    backgroundColor: 'rgba(30, 36, 51, 0.95)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 215, 0, 0.4)',
  },
  planetIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 215, 0, 0.6)',
  },
  planetIconText: {
    fontSize: 40,
  },
  planetName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  planetMeta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planetType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
    letterSpacing: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  planetStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  quickStatsContainer: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  quickStatLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    fontWeight: '600',
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 215, 0, 0.3)',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 18,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTab: {
    borderBottomColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B0C4DE',
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#FFD700',
  },
  tabContent: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tradeSection: {
    marginBottom: 30,
  },
  tradeOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tradeCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tradeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tradeItems: {
    marginLeft: 10,
  },
  tradeItem: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 20,
  },
  tradeButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  tradeButtonContainer: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 25,
  },
  tradeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
  resourcesSection: {
    marginBottom: 30,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  resourceCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resourceContainer: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  resourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  resourceValue: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  resourceInfo: {
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  resourceInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  resourceInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
