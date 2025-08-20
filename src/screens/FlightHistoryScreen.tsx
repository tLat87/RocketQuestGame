import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface TradeRecord {
  id: string;
  date: string;
  planet: string;
  planetType: string;
  profit: number;
  itemsTraded: number;
  tradeType: 'Profitable' | 'Loss' | 'Neutral';
}

// Mock trade history data
const mockTradeHistory: TradeRecord[] = [
  {
    id: '1',
    date: '2025-01-15',
    planet: 'Nova Prime',
    planetType: 'Trading Hub',
    profit: 2500,
    itemsTraded: 8,
    tradeType: 'Profitable',
  },
  {
    id: '2',
    date: '2025-01-14',
    planet: 'Crimson Forge',
    planetType: 'Mining Colony',
    profit: -800,
    itemsTraded: 5,
    tradeType: 'Loss',
  },
  {
    id: '3',
    date: '2025-01-13',
    planet: 'Quantum Station',
    planetType: 'Research Station',
    profit: 1200,
    itemsTraded: 6,
    tradeType: 'Profitable',
  },
  {
    id: '4',
    date: '2025-01-12',
    planet: 'Shadow Port',
    planetType: 'Military Base',
    profit: 3500,
    itemsTraded: 12,
    tradeType: 'Profitable',
  },
  {
    id: '5',
    date: '2025-01-11',
    planet: 'Paradise Resort',
    planetType: 'Tourist Resort',
    profit: 0,
    itemsTraded: 3,
    tradeType: 'Neutral',
  },
  {
    id: '6',
    date: '2025-01-10',
    planet: 'Void Gate',
    planetType: 'Research Station',
    profit: -1500,
    itemsTraded: 4,
    tradeType: 'Loss',
  },
  {
    id: '7',
    date: '2025-01-09',
    planet: 'Nova Prime',
    planetType: 'Trading Hub',
    profit: 1800,
    itemsTraded: 7,
    tradeType: 'Profitable',
  },
  {
    id: '8',
    date: '2025-01-08',
    planet: 'Crimson Forge',
    planetType: 'Mining Colony',
    profit: 900,
    itemsTraded: 6,
    tradeType: 'Profitable',
  },
];

export default function TradeHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'profitable' | 'loss' | 'neutral'>('all');

  const filteredHistory = mockTradeHistory.filter(record => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'profitable') return record.tradeType === 'Profitable';
    if (selectedFilter === 'loss') return record.tradeType === 'Loss';
    if (selectedFilter === 'neutral') return record.tradeType === 'Neutral';
    return true;
  });

  const getTradeTypeColor = (type: string) => {
    switch (type) {
      case 'Profitable': return '#4ECDC4';
      case 'Loss': return '#FF6B6B';
      case 'Neutral': return '#FFD700';
      default: return '#B0C4DE';
    }
  };

  const getTradeTypeIcon = (type: string) => {
    switch (type) {
      case 'Profitable': return '📈';
      case 'Loss': return '📉';
      case 'Neutral': return '➖';
      default: return '❓';
    }
  };

  const getTotalProfit = () => {
    return filteredHistory.reduce((total, record) => total + record.profit, 0);
  };

  const getTotalTrades = () => {
    return filteredHistory.length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>TRADE HISTORY</Text>

        {/* Statistics Summary */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.statsContainer}
        >
          <Text style={styles.statsTitle}>TRADING PERFORMANCE</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Profit</Text>
              <Text style={[styles.statValue, { color: getTotalProfit() >= 0 ? '#4ECDC4' : '#FF6B6B' }]}>
                {getTotalProfit() >= 0 ? '+' : ''}{getTotalProfit().toLocaleString()} Credits
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Trades</Text>
              <Text style={styles.statValue}>{getTotalTrades()}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>FILTER BY RESULT</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
              onPress={() => setSelectedFilter('all')}
            >
              <Text style={[styles.filterButtonText, selectedFilter === 'all' && styles.filterButtonTextActive]}>
                ALL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'profitable' && styles.filterButtonActive]}
              onPress={() => setSelectedFilter('profitable')}
            >
              <Text style={[styles.filterButtonText, selectedFilter === 'profitable' && styles.filterButtonTextActive]}>
                PROFITABLE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'loss' && styles.filterButtonActive]}
              onPress={() => setSelectedFilter('loss')}
            >
              <Text style={[styles.filterButtonText, selectedFilter === 'loss' && styles.filterButtonTextActive]}>
                LOSSES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'neutral' && styles.filterButtonActive]}
              onPress={() => setSelectedFilter('neutral')}
            >
              <Text style={[styles.filterButtonText, selectedFilter === 'neutral' && styles.filterButtonTextActive]}>
                NEUTRAL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trade History List */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>TRADE RECORDS</Text>
          
          {filteredHistory.length > 0 ? (
            filteredHistory.map((record) => (
              <View key={record.id} style={styles.tradeRecord}>
                <View style={styles.tradeRecordHeader}>
                  <View style={styles.tradeRecordLeft}>
                    <Text style={styles.tradeDate}>{formatDate(record.date)}</Text>
                    <Text style={styles.tradePlanet}>{record.planet}</Text>
                    <Text style={styles.tradePlanetType}>{record.planetType}</Text>
                  </View>
                  
                  <View style={styles.tradeRecordRight}>
                    <View style={styles.tradeTypeContainer}>
                      <Text style={styles.tradeTypeIcon}>{getTradeTypeIcon(record.tradeType)}</Text>
                      <Text style={[styles.tradeType, { color: getTradeTypeColor(record.tradeType) }]}>
                        {record.tradeType}
                      </Text>
                    </View>
                    
                    <Text style={[styles.tradeProfit, { color: getTradeTypeColor(record.tradeType) }]}>
                      {record.profit >= 0 ? '+' : ''}{record.profit.toLocaleString()} Credits
                    </Text>
                    
                    <Text style={styles.tradeItems}>
                      {record.itemsTraded} items traded
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyHistoryContainer}>
              <Text style={styles.emptyHistoryText}>No trade records found</Text>
              <Text style={styles.emptyHistorySubtext}>
                Try adjusting your filters or complete your first trade
              </Text>
            </View>
          )}
        </View>

        {/* Trading Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>TRADING TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              Monitor market trends and trade during favorable conditions
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚖️</Text>
            <Text style={styles.tipText}>
              Balance your cargo space and credits for optimal trading
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🎯</Text>
            <Text style={styles.tipText}>
              Focus on high-value goods and avoid overpaying
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
    fontSize: 20,
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
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#1E2433',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    minWidth: '48%',
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B0C4DE',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#000000',
  },
  historyContainer: {
    marginBottom: 25,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    letterSpacing: 1,
  },
  tradeRecord: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  tradeRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tradeRecordLeft: {
    flex: 1,
  },
  tradeDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tradePlanet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 3,
  },
  tradePlanetType: {
    fontSize: 14,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  tradeRecordRight: {
    alignItems: 'flex-end',
  },
  tradeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tradeTypeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tradeType: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tradeProfit: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tradeItems: {
    fontSize: 12,
    color: '#B0C4DE',
  },
  emptyHistoryContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 40,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: 18,
    color: '#B0C4DE',
    marginBottom: 10,
  },
  emptyHistorySubtext: {
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
