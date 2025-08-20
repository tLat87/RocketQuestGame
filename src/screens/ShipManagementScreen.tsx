import React, { useState, useEffect, useRef } from 'react';
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

interface ShipUpgrade {
  id: string;
  name: string;
  category: 'engine' | 'weapons' | 'shields' | 'cargo' | 'navigation';
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  effect: string;
}

// Mock ship upgrades data
const mockShipUpgrades: ShipUpgrade[] = [
  {
    id: '1',
    name: 'Quantum Engine',
    category: 'engine',
    description: 'Advanced propulsion system for faster travel',
    cost: 5000,
    level: 2,
    maxLevel: 5,
    unlocked: true,
    effect: '+20% Speed',
  },
  {
    id: '2',
    name: 'Plasma Cannons',
    category: 'weapons',
    description: 'High-energy weapon system for defense',
    cost: 8000,
    level: 1,
    maxLevel: 3,
    unlocked: true,
    effect: '+15% Damage',
  },
  {
    id: '3',
    name: 'Neutron Shields',
    category: 'shields',
    description: 'Advanced energy shielding technology',
    cost: 12000,
    level: 0,
    maxLevel: 4,
    unlocked: false,
    effect: '+25% Protection',
  },
  {
    id: '4',
    name: 'Expanded Cargo Bay',
    category: 'cargo',
    description: 'Increased storage capacity for goods',
    cost: 6000,
    level: 3,
    maxLevel: 5,
    unlocked: true,
    effect: '+30% Capacity',
  },
  {
    id: '5',
    name: 'AI Navigation',
    category: 'navigation',
    description: 'Intelligent route optimization system',
    cost: 15000,
    level: 0,
    maxLevel: 2,
    unlocked: false,
    effect: '+40% Efficiency',
  },
];

export default function ShipManagementScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [shipCredits] = useState(25000);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
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
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'engine': return '#4ECDC4';
      case 'weapons': return '#FF6B6B';
      case 'shields': return '#45B7D1';
      case 'cargo': return '#96CEB4';
      case 'navigation': return '#FFEAA7';
      default: return '#B0C4DE';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'engine': return '🚀';
      case 'weapons': return '⚔️';
      case 'shields': return '🛡️';
      case 'cargo': return '📦';
      case 'navigation': return '🧭';
      default: return '⚙️';
    }
  };

  const canAffordUpgrade = (cost: number) => shipCredits >= cost;
  const canUpgrade = (upgrade: ShipUpgrade) => upgrade.unlocked && upgrade.level < upgrade.maxLevel;

  const getTotalUpgrades = () => mockShipUpgrades.filter(u => u.unlocked).length;
  const getTotalCost = () => mockShipUpgrades.filter(u => !u.unlocked).reduce((sum, u) => sum + u.cost, 0);

  const handleUpgrade = (upgrade: ShipUpgrade) => {
    if (canAffordUpgrade(upgrade.cost)) {
      Alert.alert(
        'Upgrade Confirmed',
        `Upgrade ${upgrade.name} to level ${upgrade.level + 1} for ${upgrade.cost} credits?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', style: 'default' },
        ]
      );
    } else {
      Alert.alert('Insufficient Credits', 'You need more credits to perform this upgrade.');
    }
  };

  const handleUnlock = (upgrade: ShipUpgrade) => {
    if (canAffordUpgrade(upgrade.cost)) {
      Alert.alert(
        'Unlock Confirmed',
        `Unlock ${upgrade.name} for ${upgrade.cost} credits?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Unlock', style: 'default' },
        ]
      );
    } else {
      Alert.alert('Insufficient Credits', 'You need more credits to unlock this upgrade.');
    }
  };

  const filteredUpgrades = selectedCategory === 'all' 
    ? mockShipUpgrades 
    : mockShipUpgrades.filter(u => u.category === selectedCategory);

  const renderShipOverview = () => (
    <Animated.View
      style={[
        styles.shipOverview,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim,
          }],
        },
      ]}
    >
      <Text style={styles.shipOverviewTitle}>SHIP OVERVIEW</Text>
      <View style={styles.shipStatsGrid}>
        <View style={styles.shipStatItem}>
          <Text style={styles.shipStatLabel}>Total Upgrades</Text>
          <Text style={styles.shipStatValue}>{getTotalUpgrades()}</Text>
        </View>
        <View style={styles.shipStatItem}>
          <Text style={styles.shipStatLabel}>Available Credits</Text>
          <Text style={styles.shipStatValue}>{shipCredits.toLocaleString()}</Text>
        </View>
        <View style={styles.shipStatItem}>
          <Text style={styles.shipStatLabel}>Unlock Cost</Text>
          <Text style={styles.shipStatValue}>{getTotalCost().toLocaleString()}</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderCategoryFilter = () => (
    <Animated.View
      style={[
        styles.categoryFilter,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim,
          }],
        },
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['all', 'engine', 'weapons', 'shields', 'cargo', 'navigation'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.activeCategoryButtonText,
            ]}>
              {category === 'all' ? 'ALL' : category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const renderUpgradeCard = (upgrade: ShipUpgrade, index: number) => (
    <Animated.View
      key={upgrade.id}
      style={[
        styles.upgradeCard,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30 + index * 20, 0],
            }),
          }],
        },
      ]}
    >
      <View style={styles.upgradeHeader}>
        <View style={styles.upgradeIconContainer}>
          <Text style={styles.upgradeIcon}>{getCategoryIcon(upgrade.category)}</Text>
        </View>
        <View style={styles.upgradeInfo}>
          <Text style={styles.upgradeName}>{upgrade.name}</Text>
          <Text style={styles.upgradeCategory}>{upgrade.category.toUpperCase()}</Text>
        </View>
        <View style={styles.upgradeLevel}>
          <Text style={styles.upgradeLevelText}>Lv.{upgrade.level}</Text>
          <Text style={styles.upgradeMaxLevel}>/ {upgrade.maxLevel}</Text>
        </View>
      </View>

      <Text style={styles.upgradeDescription}>{upgrade.description}</Text>
      <Text style={styles.upgradeEffect}>{upgrade.effect}</Text>

      <View style={styles.upgradeActions}>
        {upgrade.unlocked ? (
          <TouchableOpacity
            style={[
              styles.upgradeButton,
              !canUpgrade(upgrade) && styles.disabledButton,
            ]}
            onPress={() => handleUpgrade(upgrade)}
            disabled={!canUpgrade(upgrade)}
            activeOpacity={0.8}
          >
            <Text style={styles.upgradeButtonText}>
              {canUpgrade(upgrade) ? 'UPGRADE' : 'MAX LEVEL'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.unlockButton,
              !canAffordUpgrade(upgrade.cost) && styles.disabledButton,
            ]}
            onPress={() => handleUnlock(upgrade)}
            disabled={!canAffordUpgrade(upgrade.cost)}
            activeOpacity={0.8}
          >
            <Text style={styles.unlockButtonText}>UNLOCK</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.upgradeCost}>{upgrade.cost.toLocaleString()} Credits</Text>
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
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              SHIP MANAGEMENT
            </Animated.Text>
            <Text style={styles.subtitle}>Upgrade your vessel for better performance</Text>
          </Animated.View>

          {/* Ship Overview */}
          {renderShipOverview()}

          {/* Category Filter */}
          {renderCategoryFilter()}

          {/* Upgrades Grid */}
          <Animated.View
            style={[
              styles.upgradesContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>AVAILABLE UPGRADES</Text>
            {filteredUpgrades.map((upgrade, index) => renderUpgradeCard(upgrade, index))}
          </Animated.View>

          {/* Tips */}
          <Animated.View
            style={[
              styles.tipsContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: slideAnim,
                }],
              },
            ]}
          >
            <Text style={styles.tipsTitle}>UPGRADE TIPS</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>Focus on engine upgrades first for better travel efficiency</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>⚡</Text>
              <Text style={styles.tipText}>Weapons and shields are crucial for dangerous routes</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>💰</Text>
              <Text style={styles.tipText}>Save credits for high-tier upgrades that provide long-term benefits</Text>
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
    backgroundColor: '#0A0E1A',
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
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 215, 0, 0.4)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shipOverview: {
    margin: 20,
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  shipOverviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  shipStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shipStatItem: {
    alignItems: 'center',
  },
  shipStatLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 5,
  },
  shipStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryFilter: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(30, 36, 51, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeCategoryButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeCategoryButtonText: {
    color: '#000000',
  },
  upgradesContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  upgradeCard: {
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  upgradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  upgradeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  upgradeIcon: {
    fontSize: 24,
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  upgradeCategory: {
    fontSize: 12,
    color: '#B0C4DE',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  upgradeLevel: {
    alignItems: 'center',
  },
  upgradeLevelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  upgradeMaxLevel: {
    fontSize: 14,
    color: '#B0C4DE',
  },
  upgradeDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 10,
  },
  upgradeEffect: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  upgradeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upgradeButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  unlockButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#666666',
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unlockButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  upgradeCost: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  tipsContainer: {
    margin: 20,
    backgroundColor: 'rgba(30, 36, 51, 0.9)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
});
