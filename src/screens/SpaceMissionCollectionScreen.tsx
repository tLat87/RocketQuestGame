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

interface CargoItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  weight: number;
  category: 'Raw Materials' | 'Manufactured Goods' | 'Technology' | 'Luxury Items' | 'Weapons';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Exotic';
  description: string;
}

// Mock cargo data
const mockCargo: CargoItem[] = [
  {
    id: '1',
    name: 'Iron Ore',
    quantity: 200,
    price: 200,
    weight: 1,
    category: 'Raw Materials',
    rarity: 'Common',
    description: 'Basic industrial material used in construction and manufacturing.',
  },
  {
    id: '2',
    name: 'Precious Gems',
    quantity: 50,
    price: 1500,
    weight: 0.1,
    category: 'Luxury Items',
    rarity: 'Rare',
    description: 'Beautiful crystals highly valued for jewelry and decoration.',
  },
  {
    id: '3',
    name: 'Scientific Equipment',
    quantity: 100,
    price: 800,
    weight: 2,
    category: 'Technology',
    rarity: 'Uncommon',
    description: 'Advanced research tools and laboratory instruments.',
  },
  {
    id: '4',
    name: 'Data Crystals',
    quantity: 150,
    price: 600,
    weight: 0.5,
    category: 'Technology',
    rarity: 'Uncommon',
    description: 'Information storage devices with massive data capacity.',
  },
  {
    id: '5',
    name: 'Quantum Processors',
    quantity: 25,
    price: 2500,
    weight: 0.2,
    category: 'Technology',
    rarity: 'Exotic',
    description: 'Next-generation computing units with quantum capabilities.',
  },
  {
    id: '6',
    name: 'Luxury Fabrics',
    quantity: 75,
    price: 1200,
    weight: 0.3,
    category: 'Luxury Items',
    rarity: 'Rare',
    description: 'Premium textiles for high-end clothing and furnishings.',
  },
  {
    id: '7',
    name: 'Energy Cells',
    quantity: 300,
    price: 150,
    weight: 0.8,
    category: 'Technology',
    rarity: 'Common',
    description: 'Portable power sources for various devices and equipment.',
  },
  {
    id: '8',
    name: 'Rare Metals',
    quantity: 80,
    price: 800,
    weight: 1.5,
    category: 'Raw Materials',
    rarity: 'Uncommon',
    description: 'Valuable metals used in advanced technology and construction.',
  },
];

export default function CargoManagementScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Raw Materials' | 'Manufactured Goods' | 'Technology' | 'Luxury Items' | 'Weapons'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'weight' | 'rarity'>('name');

  const filteredCargo = mockCargo.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const sortedCargo = [...filteredCargo].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'value':
        return (b.price * b.quantity) - (a.price * a.quantity);
      case 'weight':
        return (b.weight * b.quantity) - (a.weight * a.quantity);
      case 'rarity':
        const rarityOrder = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Exotic': 4 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

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
      case 'Raw Materials': return '#FF7F50';
      case 'Manufactured Goods': return '#87CEEB';
      case 'Technology': return '#8A2BE2';
      case 'Luxury Items': return '#FFD700';
      case 'Weapons': return '#FF4500';
      default: return '#B0C4DE';
    }
  };

  const getTotalValue = () => {
    return sortedCargo.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalWeight = () => {
    return sortedCargo.reduce((total, item) => total + (item.weight * item.quantity), 0);
  };

  const getTotalItems = () => {
    return sortedCargo.reduce((total, item) => total + item.quantity, 0);
  };

  const handleJettisonItem = (item: CargoItem) => {
    Alert.alert(
      'Jettison Cargo',
      `Are you sure you want to jettison ${item.quantity}x ${item.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Jettison', style: 'destructive', onPress: () => {
          Alert.alert('Cargo Jettisoned', `${item.quantity}x ${item.name} has been jettisoned into space.`);
        }},
      ]
    );
  };

  const handleSellItem = (item: CargoItem) => {
    Alert.alert(
      'Sell Cargo',
      `Sell ${item.quantity}x ${item.name} for ${(item.price * item.quantity).toLocaleString()} credits?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sell', style: 'default', onPress: () => {
          Alert.alert('Cargo Sold', `Sold ${item.quantity}x ${item.name} for ${(item.price * item.quantity).toLocaleString()} credits.`);
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>CARGO MANAGEMENT</Text>

        {/* Cargo Statistics */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.statsContainer}
        >
          <Text style={styles.statsTitle}>CARGO OVERVIEW</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Value</Text>
              <Text style={styles.statValue}>{getTotalValue().toLocaleString()} Credits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Weight</Text>
              <Text style={styles.statValue}>{getTotalWeight().toFixed(1)} Tons</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Items</Text>
              <Text style={styles.statValue}>{getTotalItems()}</Text>
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
            {['Raw Materials', 'Manufactured Goods', 'Technology', 'Luxury Items', 'Weapons'].map((category) => (
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

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortTitle}>SORT BY</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'name', label: 'NAME' },
              { key: 'value', label: 'VALUE' },
              { key: 'weight', label: 'WEIGHT' },
              { key: 'rarity', label: 'RARITY' }
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[styles.sortButton, sortBy === option.key && styles.sortButtonActive]}
                onPress={() => setSortBy(option.key as any)}
              >
                <Text style={[styles.sortButtonText, sortBy === option.key && styles.sortButtonTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cargo List */}
        <View style={styles.cargoContainer}>
          <Text style={styles.cargoTitle}>CARGO INVENTORY</Text>
          
          {sortedCargo.length > 0 ? (
            sortedCargo.map((item) => (
              <View key={item.id} style={styles.cargoItem}>
                <View style={styles.cargoItemHeader}>
                  <View style={styles.cargoItemLeft}>
                    <Text style={styles.cargoItemName}>{item.name}</Text>
                    <View style={styles.cargoItemMeta}>
                      <Text style={[styles.cargoItemCategory, { color: getCategoryColor(item.category) }]}>
                        {item.category}
                      </Text>
                      <Text style={[styles.cargoItemRarity, { color: getRarityColor(item.rarity) }]}>
                        {item.rarity}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.cargoItemRight}>
                    <Text style={styles.cargoItemValue}>
                      {(item.price * item.quantity).toLocaleString()} Credits
                    </Text>
                    <Text style={styles.cargoItemQuantity}>
                      {item.quantity}x @ {item.price} Credits
                    </Text>
                    <Text style={styles.cargoItemWeight}>
                      Weight: {(item.weight * item.quantity).toFixed(1)} Tons
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.cargoItemDescription}>{item.description}</Text>
                
                <View style={styles.cargoItemActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSellItem(item)}
                  >
                    <Text style={styles.actionButtonText}>SELL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.jettisonButton]}
                    onPress={() => handleJettisonItem(item)}
                  >
                    <Text style={styles.jettisonButtonText}>JETTISON</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCargoContainer}>
              <Text style={styles.emptyCargoText}>No cargo found</Text>
              <Text style={styles.emptyCargoSubtext}>
                Try adjusting your filters or acquire some cargo through trading
              </Text>
            </View>
          )}
        </View>

        {/* Cargo Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>CARGO MANAGEMENT TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📦</Text>
            <Text style={styles.tipText}>
              Monitor cargo weight to maintain optimal ship performance
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💰</Text>
            <Text style={styles.tipText}>
              High-value items can be sold for significant profits
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚠️</Text>
            <Text style={styles.tipText}>
              Jettisoning cargo is permanent and cannot be undone
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
  statsContainer: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  statsGrid: {
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
  sortContainer: {
    marginBottom: 25,
  },
  sortTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  sortButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sortButton: {
    backgroundColor: '#1E2433',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    minWidth: '48%',
  },
  sortButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B0C4DE',
    textAlign: 'center',
  },
  sortButtonTextActive: {
    color: '#000000',
  },
  cargoContainer: {
    marginBottom: 25,
  },
  cargoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  cargoItem: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  cargoItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cargoItemLeft: {
    flex: 1,
  },
  cargoItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cargoItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cargoItemCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 1,
  },
  cargoItemRarity: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cargoItemRight: {
    alignItems: 'flex-end',
  },
  cargoItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 3,
  },
  cargoItemQuantity: {
    fontSize: 12,
    color: '#B0C4DE',
    marginBottom: 3,
  },
  cargoItemWeight: {
    fontSize: 12,
    color: '#B0C4DE',
  },
  cargoItemDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  cargoItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  jettisonButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  jettisonButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  emptyCargoContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 40,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  emptyCargoText: {
    fontSize: 18,
    color: '#B0C4DE',
    marginBottom: 10,
  },
  emptyCargoSubtext: {
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
