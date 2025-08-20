import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  MainTab: undefined;
};

type TradeResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTab'>;

interface TradeResultScreenProps {
  navigation: TradeResultScreenNavigationProp;
  route: {
    params: {
      planet: Planet;
      tradeResult: TradeResult;
    };
  };
}

interface Planet {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface TradeResult {
  profit: number;
  itemsTraded: TradeItem[];
  newCredits: number;
  newCargo: number;
}

interface TradeItem {
  name: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
}

export default function TradeResultScreen({ navigation, route }: TradeResultScreenProps) {
  const { planet, tradeResult } = route.params;

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? '#4ECDC4' : '#FF6B6B';
  };

  const getProfitIcon = (profit: number) => {
    return profit >= 0 ? '📈' : '📉';
  };

  const getTradeTypeIcon = (type: 'buy' | 'sell') => {
    return type === 'buy' ? '🛒' : '💰';
  };

  const getTradeTypeColor = (type: 'buy' | 'sell') => {
    return type === 'buy' ? '#FF6B6B' : '#4ECDC4';
  };

  const handleContinueTrading = () => {
    navigation.navigate('MainTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TRADE COMPLETE</Text>
          <Text style={styles.headerSubtitle}>{planet.name}</Text>
        </View>

        {/* Result Summary */}
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>TRADE SUMMARY</Text>
          
          <View style={styles.profitSection}>
            <Text style={styles.profitLabel}>Net Profit</Text>
            <View style={styles.profitDisplay}>
              <Text style={styles.profitIcon}>{getProfitIcon(tradeResult.profit)}</Text>
              <Text style={[styles.profitAmount, { color: getProfitColor(tradeResult.profit) }]}>
                {tradeResult.profit >= 0 ? '+' : ''}{tradeResult.profit.toLocaleString()} Credits
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>New Credits</Text>
              <Text style={styles.statValue}>{tradeResult.newCredits.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>New Cargo</Text>
              <Text style={styles.statValue}>{tradeResult.newCargo}</Text>
            </View>
          </View>
        </View>

        {/* Trade Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRADE DETAILS</Text>
          
          {tradeResult.itemsTraded.length > 0 ? (
            <View style={styles.tradeDetailsContainer}>
              {tradeResult.itemsTraded.map((item, index) => (
                <View key={index} style={styles.tradeItem}>
                  <View style={styles.tradeItemHeader}>
                    <Text style={styles.tradeTypeIcon}>{getTradeTypeIcon(item.type)}</Text>
                    <Text style={styles.tradeItemName}>{item.name}</Text>
                    <Text style={[styles.tradeType, { color: getTradeTypeColor(item.type) }]}>
                      {item.type.toUpperCase()}
                    </Text>
                  </View>
                  
                  <View style={styles.tradeItemDetails}>
                    <View style={styles.tradeDetailRow}>
                      <Text style={styles.tradeDetailLabel}>Quantity:</Text>
                      <Text style={styles.tradeDetailValue}>{item.quantity}</Text>
                    </View>
                    <View style={styles.tradeDetailRow}>
                      <Text style={styles.tradeDetailLabel}>Price per Unit:</Text>
                      <Text style={styles.tradeDetailValue}>{item.price} Credits</Text>
                    </View>
                    <View style={styles.tradeDetailRow}>
                      <Text style={styles.tradeDetailLabel}>Total Value:</Text>
                      <Text style={styles.tradeDetailValue}>
                        {(item.quantity * item.price).toLocaleString()} Credits
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noTradesContainer}>
              <Text style={styles.noTradesText}>No items were traded</Text>
            </View>
          )}
        </View>

        {/* Performance Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERFORMANCE ANALYSIS</Text>
          
          <View style={styles.performanceContainer}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Trade Efficiency</Text>
              <Text style={styles.performanceValue}>
                {tradeResult.profit >= 0 ? 'Profitable' : 'Loss'}
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Risk Level</Text>
              <Text style={styles.performanceValue}>
                {Math.abs(tradeResult.profit) > 5000 ? 'High' : 
                 Math.abs(tradeResult.profit) > 1000 ? 'Medium' : 'Low'}
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Market Insight</Text>
              <Text style={styles.performanceValue}>
                {tradeResult.profit >= 0 ? 'Good Timing' : 'Poor Timing'}
              </Text>
            </View>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECOMMENDATIONS</Text>
          
          <View style={styles.recommendationsContainer}>
            {tradeResult.profit >= 0 ? (
              <>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>✅</Text>
                  <Text style={styles.recommendationText}>
                    Continue trading with {planet.name} - profitable market conditions
                  </Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>💡</Text>
                  <Text style={styles.recommendationText}>
                    Consider increasing trade volume for better profits
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>⚠️</Text>
                  <Text style={styles.recommendationText}>
                    Market conditions on {planet.name} are unfavorable
                  </Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationIcon}>🔄</Text>
                  <Text style={styles.recommendationText}>
                    Wait for better prices or try different trade routes
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueTrading}
          >
            <Text style={styles.continueButtonText}>CONTINUE TRADING</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>BACK TO PLANET</Text>
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#B0C4DE',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 3)',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  profitSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profitLabel: {
    fontSize: 16,
    color: '#B0C4DE',
    marginBottom: 10,
  },
  profitDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  profitAmount: {
    fontSize: 28,
    fontWeight: 'bold',
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
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  tradeDetailsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  tradeItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  tradeItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tradeTypeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  tradeItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  tradeType: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tradeItemDetails: {
    marginLeft: 34,
  },
  tradeDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tradeDetailLabel: {
    fontSize: 14,
    color: '#B0C4DE',
  },
  tradeDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  noTradesContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  noTradesText: {
    fontSize: 16,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  performanceContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  performanceLabel: {
    fontSize: 16,
    color: '#B0C4DE',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recommendationsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  recommendationIcon: {
    fontSize: 20,
    marginRight: 15,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 22,
  },
  actionButtonsContainer: {
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 1,
  },
});
