import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ShipUpgrade {
  id: string;
  name: string;
  category: 'Engine' | 'Shield' | 'Weapon' | 'Cargo' | 'Navigation' | 'Life Support';
  description: string;
  currentLevel: number;
  maxLevel: number;
  cost: number;
  upgradeCost: number;
  unlocked: boolean;
  benefits: string[];
  requirements: string[];
}

// Mock ship upgrades data
const mockShipUpgrades: ShipUpgrade[] = [
  {
    id: '1',
    name: 'Quantum Drive Engine',
    category: 'Engine',
    description: 'Advanced propulsion system that allows faster-than-light travel with reduced fuel consumption.',
    currentLevel: 2,
    maxLevel: 5,
    cost: 15000,
    upgradeCost: 8000,
    unlocked: true,
    benefits: ['+25% Travel Speed', '+15% Fuel Efficiency', 'Reduced Travel Time'],
    requirements: ['Level 3: Requires Advanced Materials', 'Level 4: Requires Exotic Technology', 'Level 5: Requires Rare Crystals'],
  },
  {
    id: '2',
    name: 'Plasma Shield Generator',
    category: 'Shield',
    description: 'High-energy shield system that provides superior protection against space hazards and attacks.',
    currentLevel: 1,
    maxLevel: 4,
    cost: 12000,
    upgradeCost: 6000,
    unlocked: true,
    benefits: ['+30% Shield Strength', '+20% Damage Resistance', 'Enhanced Protection'],
    requirements: ['Level 2: Requires Shield Crystals', 'Level 3: Requires Energy Cores', 'Level 4: Requires Quantum Shards'],
  },
  {
    id: '3',
    name: 'Laser Cannon Array',
    category: 'Weapon',
    description: 'Multi-directional weapon system for self-defense and clearing space debris.',
    currentLevel: 0,
    maxLevel: 3,
    cost: 8000,
    upgradeCost: 4000,
    unlocked: false,
    benefits: ['Basic Defense', '+40% Damage Output', 'Multi-Target Capability'],
    requirements: ['Unlock: Requires Combat License', 'Level 2: Requires Weapon Parts', 'Level 3: Requires Advanced Targeting'],
  },
  {
    id: '4',
    name: 'Expanded Cargo Bay',
    category: 'Cargo',
    description: 'Increased storage capacity for more profitable trading missions.',
    currentLevel: 3,
    maxLevel: 5,
    cost: 10000,
    upgradeCost: 5000,
    unlocked: true,
    benefits: ['+50% Cargo Capacity', '+25% Weight Efficiency', 'Better Organization'],
    requirements: ['Level 4: Requires Structural Materials', 'Level 5: Requires Advanced Alloys'],
  },
  {
    id: '5',
    name: 'Neural Navigation System',
    category: 'Navigation',
    description: 'AI-powered navigation that calculates optimal routes and avoids hazards.',
    currentLevel: 1,
    maxLevel: 4,
    cost: 18000,
    upgradeCost: 9000,
    unlocked: true,
    benefits: ['+35% Route Efficiency', '+20% Hazard Avoidance', 'Automatic Route Planning'],
    requirements: ['Level 2: Requires AI Cores', 'Level 3: Requires Neural Networks', 'Level 4: Requires Quantum Processors'],
  },
  {
    id: '6',
    name: 'Advanced Life Support',
    category: 'Life Support',
    description: 'Enhanced environmental systems for extended space travel and crew comfort.',
    currentLevel: 0,
    maxLevel: 3,
    cost: 6000,
    upgradeCost: 3000,
    unlocked: false,
    benefits: ['Basic Life Support', '+40% System Efficiency', 'Extended Travel Range'],
    requirements: ['Unlock: Requires Life Support License', 'Level 2: Requires Environmental Controls', 'Level 3: Requires Advanced Filters'],
  },
];

export default function ShipManagementScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shipCredits] = useState(25000);

  const categories = ['All', 'Engine', 'Shield', 'Weapon', 'Cargo', 'Navigation', 'Life Support'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Engine': return '#FF7F50';
      case 'Shield': return '#87CEEB';
      case 'Weapon': return '#FF4500';
      case 'Cargo': return '#32CD32';
      case 'Navigation': return '#8A2BE2';
      case 'Life Support': return '#FFD700';
      default: return '#B0C4DE';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Engine': return '🚀';
      case 'Shield': return '🛡️';
      case 'Weapon': return '⚔️';
      case 'Cargo': return '📦';
      case 'Navigation': return '🧭';
      case 'Life Support': return '💚';
      default: return '🔧';
    }
  };

  const canAffordUpgrade = (upgrade: ShipUpgrade) => {
    if (!upgrade.unlocked) {
      return shipCredits >= upgrade.cost;
    }
    return shipCredits >= upgrade.upgradeCost;
  };

  const canUpgrade = (upgrade: ShipUpgrade) => {
    if (!upgrade.unlocked) return false;
    return upgrade.currentLevel < upgrade.maxLevel;
  };

  const getTotalUpgrades = () => {
    return mockShipUpgrades.reduce((total, upgrade) => total + upgrade.currentLevel, 0);
  };

  const getTotalCost = () => {
    return mockShipUpgrades.reduce((total, upgrade) => {
      if (upgrade.unlocked) {
        return total + (upgrade.cost + (upgrade.currentLevel * upgrade.upgradeCost));
      }
      return total;
    }, 0);
  };

  const handleUpgrade = (upgrade: ShipUpgrade) => {
    if (!canAffordUpgrade(upgrade)) {
      Alert.alert('Insufficient Credits', 'You need more credits to perform this upgrade.');
      return;
    }

    const cost = upgrade.unlocked ? upgrade.upgradeCost : upgrade.cost;
    const action = upgrade.unlocked ? 'upgrade' : 'unlock';

    Alert.alert(
      `${action.charAt(0).toUpperCase() + action.slice(1)} ${upgrade.name}`,
      `This will cost ${cost.toLocaleString()} credits. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action.charAt(0).toUpperCase() + action.slice(1), style: 'default', onPress: () => {
          Alert.alert('Success', `${upgrade.name} has been ${action === 'unlock' ? 'unlocked' : 'upgraded'}!`);
        }},
      ]
    );
  };

  const handleUnlock = (upgrade: ShipUpgrade) => {
    if (!canAffordUpgrade(upgrade)) {
      Alert.alert('Insufficient Credits', 'You need more credits to unlock this upgrade.');
      return;
    }

    Alert.alert(
      `Unlock ${upgrade.name}`,
      `This will cost ${upgrade.cost.toLocaleString()} credits. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Unlock', style: 'default', onPress: () => {
          Alert.alert('Success', `${upgrade.name} has been unlocked!`);
        }},
      ]
    );
  };

  const filteredUpgrades = selectedCategory === 'All' 
    ? mockShipUpgrades 
    : mockShipUpgrades.filter(upgrade => upgrade.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SHIP MANAGEMENT</Text>
          <Text style={styles.subtitle}>Upgrade your vessel for better performance</Text>
      </View>

        {/* Ship Overview */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.overviewContainer}
        >
          <Text style={styles.overviewTitle}>SHIP OVERVIEW</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Available Credits</Text>
              <Text style={styles.overviewValue}>{shipCredits.toLocaleString()}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Total Upgrades</Text>
              <Text style={styles.overviewValue}>{getTotalUpgrades()}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Total Investment</Text>
              <Text style={styles.overviewValue}>{getTotalCost().toLocaleString()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
          <TouchableOpacity
                key={category}
              style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.activeCategoryButtonText
                ]}>
                  {category}
              </Text>
          </TouchableOpacity>
        ))}
          </ScrollView>
        </View>

        {/* Available Upgrades */}
        <View style={styles.upgradesContainer}>
          <Text style={styles.upgradesTitle}>AVAILABLE UPGRADES</Text>
          
          {filteredUpgrades.map((upgrade) => (
            <View key={upgrade.id} style={styles.upgradeCard}>
              <View style={styles.upgradeHeader}>
                <View style={styles.upgradeInfo}>
                  <Text style={styles.upgradeName}>{upgrade.name}</Text>
                  <View style={styles.upgradeMeta}>
                    <Text style={[styles.upgradeCategory, { color: getCategoryColor(upgrade.category) }]}>
                      {getCategoryIcon(upgrade.category)} {upgrade.category}
                    </Text>
                    <Text style={styles.upgradeLevel}>
                      Level {upgrade.currentLevel}/{upgrade.maxLevel}
                    </Text>
                  </View>
                </View>
                <View style={styles.upgradeStatus}>
                  {!upgrade.unlocked ? (
                    <Text style={styles.lockedStatus}>LOCKED</Text>
                  ) : upgrade.currentLevel === upgrade.maxLevel ? (
                    <Text style={styles.maxedStatus}>MAXED</Text>
                  ) : (
                    <Text style={styles.availableStatus}>AVAILABLE</Text>
                  )}
                </View>
              </View>

              <Text style={styles.upgradeDescription}>{upgrade.description}</Text>

              <View style={styles.upgradeBenefits}>
                <Text style={styles.benefitsTitle}>Benefits:</Text>
                {upgrade.benefits.map((benefit, index) => (
                  <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
                ))}
              </View>

              {upgrade.requirements.length > 0 && (
                <View style={styles.upgradeRequirements}>
                  <Text style={styles.requirementsTitle}>Requirements:</Text>
                  {upgrade.requirements.map((requirement, index) => (
                    <Text key={index} style={styles.requirementItem}>• {requirement}</Text>
                  ))}
                </View>
              )}

              <View style={styles.upgradeActions}>
                {!upgrade.unlocked ? (
            <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.unlockButton,
                      !canAffordUpgrade(upgrade) && styles.disabledButton
                    ]}
                    onPress={() => handleUnlock(upgrade)}
                    disabled={!canAffordUpgrade(upgrade)}
                  >
                    <Text style={styles.unlockButtonText}>
                      UNLOCK ({upgrade.cost.toLocaleString()})
                    </Text>
            </TouchableOpacity>
                ) : upgrade.currentLevel === upgrade.maxLevel ? (
                  <View style={styles.maxedContainer}>
                    <Text style={styles.maxedText}>UPGRADE COMPLETE</Text>
          </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.upgradeButton,
                      !canAffordUpgrade(upgrade) && styles.disabledButton
                    ]}
                    onPress={() => handleUpgrade(upgrade)}
                    disabled={!canAffordUpgrade(upgrade)}
                  >
                    <Text style={styles.upgradeButtonText}>
                      UPGRADE ({upgrade.upgradeCost.toLocaleString()})
                    </Text>
                  </TouchableOpacity>
        )}
      </View>
    </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>SHIP MANAGEMENT TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🚀</Text>
            <Text style={styles.tipText}>
              Prioritize engine upgrades for faster travel and fuel efficiency
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🛡️</Text>
            <Text style={styles.tipText}>
              Shield upgrades are essential for safe travel through dangerous sectors
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📦</Text>
            <Text style={styles.tipText}>
              Cargo upgrades increase your trading capacity and profit potential
            </Text>
          </View>
        </View>
      </ScrollView>
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
  },
  header: {
    padding: 20,
    backgroundColor: '#1E2433',
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  overviewContainer: {
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#1E2433',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  activeCategoryButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0C4DE',
  },
  activeCategoryButtonText: {
    color: '#000000',
  },
  upgradesContainer: {
    padding: 20,
  },
  upgradesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 1,
  },
  upgradeCard: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  upgradeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeCategory: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 15,
  },
  upgradeLevel: {
    fontSize: 16,
    color: '#B0C4DE',
  },
  upgradeStatus: {
    alignItems: 'flex-end',
  },
  lockedStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  maxedStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#32CD32',
    backgroundColor: 'rgba(50, 205, 50, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  upgradeDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 15,
  },
  upgradeBenefits: {
    marginBottom: 15,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
    marginLeft: 10,
  },
  upgradeRequirements: {
    marginBottom: 15,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 5,
    marginLeft: 10,
  },
  upgradeActions: {
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: '#FFD700',
  },
  upgradeButton: {
    backgroundColor: '#32CD32',
  },
  disabledButton: {
    backgroundColor: '#666666',
    opacity: 0.6,
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  maxedContainer: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  maxedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  tipsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#2C3A5A',
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
});
