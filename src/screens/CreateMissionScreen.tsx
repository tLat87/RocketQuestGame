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
  Alert,
} from 'react-native';


const { width, height } = Dimensions.get('window');

interface Planet {
  id: string;
  name: string;
  type: string;
  status: string;
  resources: string[];
  tradeGoods: string[];
  distance: number;
  population: number;
  block: string;
}

interface TradeItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  rarity: string;
}

export default function TradeScreen({ route, navigation }: any) {
  const { planet } = route.params;
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  
  // Mock data
  const [shipCredits] = useState(125000);
  const [shipCargo] = useState(850);
  const [maxCargo] = useState(1000);
  const [shipFuel] = useState(92);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const tabAnim = useRef(new Animated.Value(0)).current;
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

    // Continuous animations
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

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab as 'buy' | 'sell');
    
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

  const mockAvailableItems: TradeItem[] = [
    { id: '1', name: 'Quantum Processors', price: 2500, quantity: 100, category: 'Technology', rarity: 'Exotic' },
    { id: '2', name: 'Plasma Crystals', price: 1800, quantity: 75, category: 'Energy', rarity: 'Rare' },
    { id: '3', name: 'Neural Networks', price: 3200, quantity: 50, category: 'Technology', rarity: 'Exotic' },
    { id: '4', name: 'Exotic Alloys', price: 1200, quantity: 200, category: 'Materials', rarity: 'Uncommon' },
    { id: '5', name: 'Energy Cores', price: 950, quantity: 150, category: 'Energy', rarity: 'Common' },
  ];

  const mockShipCargo: TradeItem[] = [
    { id: '6', name: 'Raw Materials', price: 500, quantity: 300, category: 'Materials', rarity: 'Common' },
    { id: '7', name: 'Circuit Components', price: 800, quantity: 120, category: 'Technology', rarity: 'Uncommon' },
    { id: '8', name: 'Data Crystals', price: 1500, quantity: 80, category: 'Technology', rarity: 'Rare' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#B0C4DE';
      case 'Uncommon': return '#32CD32';
      case 'Rare': return '#FFD700';
      case 'Exotic': return '#FF69B4';
      default: return '#FFFFFF';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return '#8A2BE2';
      case 'Energy': return '#FF7F50';
      case 'Materials': return '#87CEEB';
      default: return '#B0C4DE';
    }
  };

  const renderShipStatus = () => (
    <Animated.View
      style={[
        styles.shipStatusContainer,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim,
          }],
        },
      ]}
    >
              <View style={styles.shipStatusContainer}>
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
            <Text style={styles.shipStatValue}>{shipCredits.toLocaleString()}</Text>
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
            <Text style={styles.shipStatValue}>{shipCargo}/{maxCargo}</Text>
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
            <Text style={styles.shipStatValue}>{shipFuel}%</Text>
          </Animated.View>
                  </View>
        </View>
    </Animated.View>
  );

  const renderTradeTab = () => (
    <Animated.View
      style={[
        styles.tradeTabContent,
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
        <Text style={styles.sectionTitle}>
          {selectedTab === 'buy' ? 'AVAILABLE GOODS' : 'SHIP CARGO'}
        </Text>
        
        <View style={styles.itemsGrid}>
          {(selectedTab === 'buy' ? mockAvailableItems : mockShipCargo).map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.itemCard,
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
                             <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={[styles.itemCategory, { color: getCategoryColor(item.category) }]}>
                      {item.category}
                    </Text>
                    <Text style={[styles.itemRarity, { color: getRarityColor(item.rarity) }]}>
                      {item.rarity}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemPrice}>{item.price.toLocaleString()} Credits</Text>
                  <Text style={styles.itemQuantity}>Stock: {item.quantity}</Text>
                </View>
                
        <TouchableOpacity
                  style={styles.tradeActionButton}
          onPress={() => {
                    Alert.alert(
                      selectedTab === 'buy' ? 'Buy Item' : 'Sell Item',
                      `${selectedTab === 'buy' ? 'Buy' : 'Sell'} ${item.name} for ${item.price.toLocaleString()} credits?`
                    );
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tradeActionText}>
                    {selectedTab === 'buy' ? 'BUY' : 'SELL'}
                  </Text>
        </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
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
                    scale: pulseAnim,
                  }],
                },
              ]}
            >
              <Text style={styles.planetIconText}>🌍</Text>
            </Animated.View>
            
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{
                    scale: scaleAnim,
                  }],
                },
              ]}
            >
              TRADE INTERFACE
            </Animated.Text>
            
            <Text style={styles.subtitle}>Trading with {planet.name}</Text>
          </Animated.View>

          {/* Ship Status */}
          {renderShipStatus()}

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
            {['buy', 'sell'].map((tab) => (
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

          {/* Trade Content */}
          {renderTradeTab()}

          {/* Trade Summary */}
          <Animated.View
            style={[
              styles.tradeSummaryContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
                         <View style={styles.tradeSummaryContainer}>
              <Text style={styles.tradeSummaryTitle}>TRADE SUMMARY</Text>
              <View style={styles.tradeSummaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total Value</Text>
                  <Text style={styles.summaryValue}>0 Credits</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Cargo Change</Text>
                  <Text style={styles.summaryValue}>0 Tons</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Net Profit</Text>
                  <Text style={styles.summaryValue}>0 Credits</Text>
                </View>
              </View>
              
        <TouchableOpacity
                style={styles.executeTradeButton}
          onPress={() => {
                  Alert.alert('Execute Trade', 'Trade executed successfully!');
          }}
                activeOpacity={0.8}
        >
                                 <View style={styles.executeTradeButton}>
                   <Text style={styles.executeTradeText}>EXECUTE TRADE</Text>
                 </View>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
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
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
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
    justifyContent: 'space-around',
  },
  shipStatItem: {
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
  shipStatLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    fontWeight: '600',
  },
  shipStatValue: {
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
  tradeTabContent: {
    padding: 20,
  },
  tradeSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  itemContainer: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  itemHeader: {
    marginBottom: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategory: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemRarity: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemDetails: {
    marginBottom: 15,
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#B0C4DE',
  },
  tradeActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  tradeActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tradeSummaryContainer: {
    margin: 20,
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  tradeSummaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  tradeSummaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  summaryItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#B0C4DE',
    marginBottom: 5,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  executeTradeButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  executeTradeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
});
