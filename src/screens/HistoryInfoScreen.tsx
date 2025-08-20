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
  origin: string;
  acquisitionDate: string;
  condition: 'Perfect' | 'Good' | 'Fair' | 'Poor';
  marketDemand: 'High' | 'Medium' | 'Low';
  legalStatus: 'Legal' | 'Restricted' | 'Illegal';
}

// Mock cargo item data
const mockCargoItem: CargoItem = {
  id: '1',
  name: 'Quantum Processors',
  quantity: 25,
  price: 2500,
  weight: 0.2,
  category: 'Technology',
  rarity: 'Exotic',
  description: 'Next-generation computing units with quantum capabilities. These processors represent the cutting edge of computational technology, capable of performing complex calculations that would take traditional computers years to complete.',
  origin: 'Quantum Station',
  acquisitionDate: '2025-01-15',
  condition: 'Perfect',
  marketDemand: 'High',
  legalStatus: 'Legal',
};

export default function CargoDetailsScreen() {
  const [selectedTab, setSelectedTab] = useState<'info' | 'market' | 'history'>('info');

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#B0C4DE';
      case 'Uncommon': return '#32CD32';
      case 'Rare': return '#FFD700';
      case 'Exotic': return '#FF69B4';
      default: return '#FFFFFF';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Perfect': return '#4ECDC4';
      case 'Good': return '#32CD32';
      case 'Fair': return '#FFD700';
      case 'Poor': return '#FF6B6B';
      default: return '#FFFFFF';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return '#4ECDC4';
      case 'Medium': return '#FFD700';
      case 'Low': return '#FF6B6B';
      default: return '#FFFFFF';
    }
  };

  const getLegalStatusColor = (status: string) => {
    switch (status) {
      case 'Legal': return '#32CD32';
      case 'Restricted': return '#FFD700';
      case 'Illegal': return '#FF4500';
      default: return '#FFFFFF';
    }
  };

  const handleSellItem = () => {
    Alert.alert(
      'Sell Cargo',
      `Sell ${mockCargoItem.quantity}x ${mockCargoItem.name} for ${(mockCargoItem.price * mockCargoItem.quantity).toLocaleString()} credits?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sell', style: 'default', onPress: () => {
          Alert.alert('Cargo Sold', `Sold ${mockCargoItem.quantity}x ${mockCargoItem.name} for ${(mockCargoItem.price * mockCargoItem.quantity).toLocaleString()} credits.`);
        }},
      ]
    );
  };

  const handleJettisonItem = () => {
    Alert.alert(
      'Jettison Cargo',
      `Are you sure you want to jettison ${mockCargoItem.quantity}x ${mockCargoItem.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Jettison', style: 'destructive', onPress: () => {
          Alert.alert('Cargo Jettisoned', `${mockCargoItem.quantity}x ${mockCargoItem.name} has been jettisoned into space.`);
        }},
      ]
    );
  };

  const renderInfoTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>BASIC INFORMATION</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={[styles.infoValue, { color: getCategoryColor(mockCargoItem.category) }]}>
              {mockCargoItem.category}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rarity</Text>
            <Text style={[styles.infoValue, { color: getRarityColor(mockCargoItem.rarity) }]}>
              {mockCargoItem.rarity}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Condition</Text>
            <Text style={[styles.infoValue, { color: getConditionColor(mockCargoItem.condition) }]}>
              {mockCargoItem.condition}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Legal Status</Text>
            <Text style={[styles.infoValue, { color: getLegalStatusColor(mockCargoItem.legalStatus) }]}>
              {mockCargoItem.legalStatus}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>PHYSICAL PROPERTIES</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Quantity</Text>
            <Text style={styles.infoValue}>{mockCargoItem.quantity}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{mockCargoItem.weight} Tons</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Total Weight</Text>
            <Text style={styles.infoValue}>{(mockCargoItem.weight * mockCargoItem.quantity).toFixed(1)} Tons</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Unit Price</Text>
            <Text style={styles.infoValue}>{mockCargoItem.price.toLocaleString()} Credits</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>DESCRIPTION</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{mockCargoItem.description}</Text>
        </View>
      </View>
    </View>
  );

  const renderMarketTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.marketSection}>
        <Text style={styles.sectionTitle}>MARKET ANALYSIS</Text>
        
        <View style={styles.marketInfo}>
          <View style={styles.marketItem}>
            <Text style={styles.marketLabel}>Market Demand</Text>
            <Text style={[styles.marketValue, { color: getDemandColor(mockCargoItem.marketDemand) }]}>
              {mockCargoItem.marketDemand}
            </Text>
          </View>
          
          <View style={styles.marketItem}>
            <Text style={styles.marketLabel}>Total Value</Text>
            <Text style={styles.marketValue}>
              {(mockCargoItem.price * mockCargoItem.quantity).toLocaleString()} Credits
            </Text>
          </View>
          
          <View style={styles.marketItem}>
            <Text style={styles.marketLabel}>Price per Unit</Text>
            <Text style={styles.marketValue}>
              {mockCargoItem.price.toLocaleString()} Credits
            </Text>
          </View>
        </View>

        <View style={styles.marketTips}>
          <Text style={styles.marketTipsTitle}>MARKET TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📈</Text>
            <Text style={styles.tipText}>
              High demand items can fetch premium prices on specialized markets
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚠️</Text>
            <Text style={styles.tipText}>
              Check local regulations before trading restricted or illegal items
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💰</Text>
            <Text style={styles.tipText}>
              Consider holding rare items for better market conditions
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>ACQUISITION HISTORY</Text>
        
        <View style={styles.historyInfo}>
          <View style={styles.historyItem}>
            <Text style={styles.historyLabel}>Origin Planet</Text>
            <Text style={styles.historyValue}>{mockCargoItem.origin}</Text>
          </View>
          
          <View style={styles.historyItem}>
            <Text style={styles.historyLabel}>Acquisition Date</Text>
            <Text style={styles.historyValue}>{mockCargoItem.acquisitionDate}</Text>
          </View>
          
          <View style={styles.historyItem}>
            <Text style={styles.historyLabel}>Time in Cargo</Text>
            <Text style={styles.historyValue}>2 days</Text>
          </View>
        </View>

        <View style={styles.historyNotes}>
          <Text style={styles.historyNotesTitle}>NOTES</Text>
          <Text style={styles.historyNotesText}>
            Acquired during a successful trade mission to {mockCargoItem.origin}. 
            The item was in perfect condition and represents a significant investment 
            in advanced technology. Market conditions are favorable for this type of cargo.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.cargoName}>{mockCargoItem.name}</Text>
          <View style={styles.cargoMeta}>
            <Text style={[styles.cargoCategory, { color: getCategoryColor(mockCargoItem.category) }]}>
              {mockCargoItem.category}
            </Text>
            <Text style={[styles.cargoRarity, { color: getRarityColor(mockCargoItem.rarity) }]}>
              {mockCargoItem.rarity}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.quickStatsContainer}
        >
          <View style={styles.quickStatsGrid}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatLabel}>Quantity</Text>
              <Text style={styles.quickStatValue}>{mockCargoItem.quantity}</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatLabel}>Total Value</Text>
              <Text style={styles.quickStatValue}>
                {(mockCargoItem.price * mockCargoItem.quantity).toLocaleString()}
              </Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatLabel}>Weight</Text>
              <Text style={styles.quickStatValue}>
                {(mockCargoItem.weight * mockCargoItem.quantity).toFixed(1)}T
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'info' && styles.activeTab]}
            onPress={() => setSelectedTab('info')}
          >
            <Text style={[styles.tabText, selectedTab === 'info' && styles.activeTabText]}>
              INFO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'market' && styles.activeTab]}
            onPress={() => setSelectedTab('market')}
          >
            <Text style={[styles.tabText, selectedTab === 'market' && styles.activeTabText]}>
              MARKET
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'history' && styles.activeTab]}
            onPress={() => setSelectedTab('history')}
          >
            <Text style={[styles.tabText, selectedTab === 'history' && styles.activeTabText]}>
              HISTORY
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'info' && renderInfoTab()}
        {selectedTab === 'market' && renderMarketTab()}
        {selectedTab === 'history' && renderHistoryTab()}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.sellButton}
            onPress={handleSellItem}
          >
            <Text style={styles.sellButtonText}>SELL CARGO</Text>
      </TouchableOpacity>

          <TouchableOpacity
            style={styles.jettisonButton}
            onPress={handleJettisonItem}
          >
            <Text style={styles.jettisonButtonText}>JETTISON</Text>
          </TouchableOpacity>
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
  cargoName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  cargoMeta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargoCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
    letterSpacing: 1,
  },
  cargoRarity: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  quickStatsContainer: {
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E2433',
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FFD700',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0C4DE',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    backgroundColor: '#1E2433',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  infoLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descriptionContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  marketSection: {
    marginBottom: 30,
  },
  marketInfo: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    marginBottom: 20,
  },
  marketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  marketLabel: {
    fontSize: 16,
    color: '#B0C4DE',
  },
  marketValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  marketTips: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  marketTipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
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
  historySection: {
    marginBottom: 30,
  },
  historyInfo: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  historyLabel: {
    fontSize: 16,
    color: '#B0C4DE',
  },
  historyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  historyNotes: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  historyNotesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  historyNotesText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 40,
  },
  sellButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  jettisonButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  jettisonButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    letterSpacing: 1,
  },
});
