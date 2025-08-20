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
  description: string;
  cost: number;
  currentLevel: number;
  maxLevel: number;
  effect: string;
  category: 'Engine' | 'Shield' | 'Weapon' | 'Cargo' | 'Navigation' | 'Life Support';
  isUnlocked: boolean;
}

// Mock ship upgrade data
const mockShipUpgrades: ShipUpgrade[] = [
  {
    id: '1',
    name: 'Quantum Drive',
    description: 'Advanced propulsion system for faster interstellar travel',
    cost: 5000,
    currentLevel: 2,
    maxLevel: 5,
    effect: '+20% Speed per level',
    category: 'Engine',
    isUnlocked: true,
  },
  {
    id: '2',
    name: 'Plasma Shields',
    description: 'Enhanced defensive systems for better protection',
    cost: 3000,
    currentLevel: 1,
    maxLevel: 3,
    effect: '+15% Defense per level',
    category: 'Shield',
    isUnlocked: true,
  },
  {
    id: '3',
    name: 'Laser Cannons',
    description: 'Offensive weaponry for self-defense and piracy',
    cost: 4000,
    currentLevel: 0,
    maxLevel: 4,
    effect: '+25% Attack per level',
    category: 'Weapon',
    isUnlocked: true,
  },
  {
    id: '4',
    name: 'Expanded Cargo Bay',
    description: 'Increased storage capacity for more goods',
    cost: 2500,
    currentLevel: 3,
    maxLevel: 5,
    effect: '+100 Cargo per level',
    category: 'Cargo',
    isUnlocked: true,
  },
  {
    id: '5',
    name: 'Advanced Navigation',
    description: 'Improved route planning and fuel efficiency',
    cost: 3500,
    currentLevel: 1,
    maxLevel: 3,
    effect: '+10% Fuel efficiency per level',
    category: 'Navigation',
    isUnlocked: true,
  },
  {
    id: '6',
    name: 'Life Support Systems',
    description: 'Enhanced crew comfort and mission duration',
    cost: 2000,
    currentLevel: 2,
    maxLevel: 4,
    effect: '+20% Crew morale per level',
    category: 'Life Support',
    isUnlocked: true,
  },
  {
    id: '7',
    name: 'Stealth Cloaking',
    description: 'Advanced stealth technology for covert operations',
    cost: 8000,
    currentLevel: 0,
    maxLevel: 2,
    effect: '+30% Stealth per level',
    category: 'Shield',
    isUnlocked: false,
  },
  {
    id: '8',
    name: 'Teleporter',
    description: 'Instant matter transportation technology',
    cost: 15000,
    currentLevel: 0,
    maxLevel: 1,
    effect: 'Instant cargo transfer',
    category: 'Navigation',
    isUnlocked: false,
  },
];

export default function ShipManagementScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Engine' | 'Shield' | 'Weapon' | 'Cargo' | 'Navigation' | 'Life Support'>('all');
  const [shipCredits, setShipCredits] = useState(25000);

  const filteredUpgrades = mockShipUpgrades.filter(upgrade => {
    if (selectedCategory === 'all') return true;
    return upgrade.category === selectedCategory;
  });

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
      case 'Life Support': return '❤️';
      default: return '🔧';
    }
  };

  const canAffordUpgrade = (upgrade: ShipUpgrade) => {
    return shipCredits >= upgrade.cost;
  };

  const canUpgrade = (upgrade: ShipUpgrade) => {
    return upgrade.isUnlocked && upgrade.currentLevel < upgrade.maxLevel;
  };

  const handleUpgrade = (upgrade: ShipUpgrade) => {
    if (!canAffordUpgrade(upgrade)) {
      Alert.alert('Insufficient Credits', 'You need more credits to purchase this upgrade.');
      return;
    }

    if (!canUpgrade(upgrade)) {
      Alert.alert('Cannot Upgrade', 'This upgrade is not available or already at maximum level.');
      return;
    }

    Alert.alert(
      'Confirm Upgrade',
      `Upgrade ${upgrade.name} to level ${upgrade.currentLevel + 1} for ${upgrade.cost} credits?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', style: 'default', onPress: () => {
          setShipCredits(prev => prev - upgrade.cost);
          upgrade.currentLevel += 1;
          Alert.alert('Upgrade Complete', `${upgrade.name} has been upgraded to level ${upgrade.currentLevel}!`);
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
      'Confirm Unlock',
      `Unlock ${upgrade.name} for ${upgrade.cost} credits?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Unlock', style: 'default', onPress: () => {
          setShipCredits(prev => prev - upgrade.cost);
          upgrade.isUnlocked = true;
          Alert.alert('Unlock Complete', `${upgrade.name} has been unlocked!`);
        }},
      ]
    );
  };

  const getTotalUpgrades = () => {
    return mockShipUpgrades.reduce((total, upgrade) => total + upgrade.currentLevel, 0);
  };

  const getTotalCost = () => {
    return mockShipUpgrades.reduce((total, upgrade) => {
      if (upgrade.isUnlocked) {
        return total + (upgrade.cost * upgrade.currentLevel);
      }
      return total;
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>SHIP MANAGEMENT</Text>

        {/* Ship Status */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.shipStatusContainer}
        >
          <Text style={styles.shipStatusTitle}>SHIP OVERVIEW</Text>
          <View style={styles.shipStatsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Available Credits</Text>
              <Text style={styles.statValue}>{shipCredits.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Upgrades</Text>
              <Text style={styles.statValue}>{getTotalUpgrades()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Investment</Text>
              <Text style={styles.statValue}>{getTotalCost().toLocaleString()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Category Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>FILTER BY CATEGORY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === 'all' && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === 'all' && styles.categoryButtonTextActive]}>
                ALL
              </Text>
            </TouchableOpacity>
            {['Engine', 'Shield', 'Weapon', 'Cargo', 'Navigation', 'Life Support'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                onPress={() => setSelectedCategory(category as any)}
              >
                <Text style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextActive]}>
                  {category.toUpperCase()}
                </Text>
        </TouchableOpacity>
            ))}
          </ScrollView>
      </View>

        {/* Upgrades List */}
        <View style={styles.upgradesContainer}>
          <Text style={styles.upgradesTitle}>AVAILABLE UPGRADES</Text>
          
          {filteredUpgrades.length > 0 ? (
            filteredUpgrades.map((upgrade) => (
              <View key={upgrade.id} style={styles.upgradeItem}>
                <View style={styles.upgradeHeader}>
                  <View style={styles.upgradeInfo}>
                    <View style={styles.upgradeTitleRow}>
                      <Text style={styles.upgradeCategoryIcon}>{getCategoryIcon(upgrade.category)}</Text>
                      <Text style={styles.upgradeName}>{upgrade.name}</Text>
                      <Text style={[styles.upgradeCategory, { color: getCategoryColor(upgrade.category) }]}>
                        {upgrade.category}
                      </Text>
      </View>
                    <Text style={styles.upgradeDescription}>{upgrade.description}</Text>
      </View>

                  <View style={styles.upgradeStats}>
                    <Text style={styles.upgradeLevel}>
                      Level {upgrade.currentLevel}/{upgrade.maxLevel}
                    </Text>
                    <Text style={styles.upgradeEffect}>{upgrade.effect}</Text>
                    <Text style={styles.upgradeCost}>
                      {upgrade.cost.toLocaleString()} Credits
                    </Text>
      </View>
      </View>

                <View style={styles.upgradeActions}>
                  {!upgrade.isUnlocked ? (
                    <TouchableOpacity
                      style={[styles.actionButton, !canAffordUpgrade(upgrade) && styles.actionButtonDisabled]}
                      onPress={() => handleUnlock(upgrade)}
                      disabled={!canAffordUpgrade(upgrade)}
                    >
                      <Text style={styles.actionButtonText}>UNLOCK</Text>
                    </TouchableOpacity>
                  ) : (
      <TouchableOpacity
                      style={[styles.actionButton, !canUpgrade(upgrade) && styles.actionButtonDisabled]}
                      onPress={() => handleUpgrade(upgrade)}
                      disabled={!canUpgrade(upgrade)}
                    >
                      <Text style={styles.actionButtonText}>
                        {canUpgrade(upgrade) ? 'UPGRADE' : 'MAXED'}
                      </Text>
      </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyUpgradesContainer}>
              <Text style={styles.emptyUpgradesText}>No upgrades found</Text>
              <Text style={styles.emptyUpgradesSubtext}>
                Try adjusting your filters or unlock new upgrade categories
              </Text>
            </View>
          )}
        </View>

        {/* Ship Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>SHIP MANAGEMENT TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🚀</Text>
            <Text style={styles.tipText}>
              Engine upgrades improve travel speed and fuel efficiency
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🛡️</Text>
            <Text style={styles.tipText}>
              Shield upgrades provide better protection in dangerous regions
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📦</Text>
            <Text style={styles.tipText}>
              Cargo upgrades allow you to carry more valuable goods
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
  shipStatusContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  shipStatusTitle: {
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
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 25,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#1E2433',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  categoryButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B0C4DE',
  },
  categoryButtonTextActive: {
    color: '#000000',
  },
  upgradesContainer: {
    marginBottom: 25,
  },
  upgradesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  upgradeItem: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  upgradeInfo: {
    flex: 1,
    marginRight: 15,
  },
  upgradeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  upgradeCategoryIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  upgradeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  upgradeCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
  },
  upgradeStats: {
    alignItems: 'flex-end',
  },
  upgradeLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 5,
  },
  upgradeEffect: {
    fontSize: 12,
    color: '#32CD32',
    marginBottom: 5,
    textAlign: 'right',
  },
  upgradeCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  upgradeActions: {
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#666666',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  emptyUpgradesContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 40,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  emptyUpgradesText: {
    fontSize: 18,
    color: '#B0C4DE',
    marginBottom: 10,
  },
  emptyUpgradesSubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  tipsContainer: {
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C3A5A',
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
