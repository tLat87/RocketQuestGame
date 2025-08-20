import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CaptainStats {
  name: string;
  rank: string;
  experience: number;
  reputation: number;
  totalTrades: number;
  totalProfit: number;
  successfulMissions: number;
  failedMissions: number;
  favoritePlanet: string;
  tradingStyle: string;
  achievements: string[];
}

// Mock captain data
const mockCaptainStats: CaptainStats = {
  name: 'Captain Alexander Nova',
  rank: 'Master Trader',
  experience: 85,
  reputation: 92,
  totalTrades: 156,
  totalProfit: 125000,
  successfulMissions: 142,
  failedMissions: 14,
  favoritePlanet: 'Nova Prime',
  tradingStyle: 'Aggressive',
  achievements: [
    'First Million Credits',
    'Planetary Explorer',
    'Risk Taker',
    'Diplomatic Trader',
    'Cargo Master',
    'Speed Trader',
    'Luxury Specialist',
    'Technology Broker'
  ]
};

export default function CaptainProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Master Trader': return '#FFD700';
      case 'Expert Trader': return '#C0C0C0';
      case 'Advanced Trader': return '#CD7F32';
      case 'Intermediate Trader': return '#32CD32';
      case 'Novice Trader': return '#87CEEB';
      default: return '#FFFFFF';
    }
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 90) return '#4ECDC4';
    if (reputation >= 70) return '#32CD32';
    if (reputation >= 50) return '#FFD700';
    if (reputation >= 30) return '#FFA500';
    return '#FF6B6B';
  };

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 90) return 'Legendary';
    if (reputation >= 80) return 'Excellent';
    if (reputation >= 70) return 'Good';
    if (reputation >= 50) return 'Average';
    if (reputation >= 30) return 'Poor';
    return 'Terrible';
  };

  const getTradingStyleColor = (style: string) => {
    switch (style) {
      case 'Aggressive': return '#FF6B6B';
      case 'Conservative': return '#4ECDC4';
      case 'Balanced': return '#FFD700';
      case 'Opportunistic': return '#8A2BE2';
      default: return '#B0C4DE';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>CAPTAIN PROFILE</Text>

        {/* Captain Header */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.captainHeader}
        >
          <View style={styles.captainInfo}>
            <Text style={styles.captainName}>{mockCaptainStats.name}</Text>
            <Text style={[styles.captainRank, { color: getRankColor(mockCaptainStats.rank) }]}>
              {mockCaptainStats.rank}
            </Text>
          </View>
          
          <View style={styles.captainStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Experience</Text>
              <Text style={styles.statValue}>{mockCaptainStats.experience}%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Reputation</Text>
              <Text style={[styles.statValue, { color: getReputationColor(mockCaptainStats.reputation) }]}>
                {mockCaptainStats.reputation}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Trading Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRADING PERFORMANCE</Text>
          
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Total Trades</Text>
              <Text style={styles.performanceValue}>{mockCaptainStats.totalTrades}</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Total Profit</Text>
              <Text style={styles.performanceValue}>{mockCaptainStats.totalProfit.toLocaleString()}</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Success Rate</Text>
              <Text style={styles.performanceValue}>
                {Math.round((mockCaptainStats.successfulMissions / (mockCaptainStats.successfulMissions + mockCaptainStats.failedMissions)) * 100)}%
              </Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Favorite Planet</Text>
              <Text style={styles.performanceValue}>{mockCaptainStats.favoritePlanet}</Text>
            </View>
          </View>
        </View>

        {/* Reputation Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REPUTATION ANALYSIS</Text>
          
          <View style={styles.reputationContainer}>
            <View style={styles.reputationHeader}>
              <Text style={styles.reputationLevel}>
                {getReputationLevel(mockCaptainStats.reputation)}
              </Text>
              <Text style={[styles.reputationScore, { color: getReputationColor(mockCaptainStats.reputation) }]}>
                {mockCaptainStats.reputation}/100
              </Text>
            </View>
            
            <View style={styles.reputationBar}>
              <View 
                style={[
                  styles.reputationFill, 
                  { 
                    width: `${mockCaptainStats.reputation}%`,
                    backgroundColor: getReputationColor(mockCaptainStats.reputation)
                  }
                ]} 
              />
            </View>
            
            <Text style={styles.reputationDescription}>
              Your reputation determines trading prices, access to restricted areas, and the trust of planetary authorities.
            </Text>
          </View>
        </View>

        {/* Trading Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRADING STYLE</Text>
          
          <View style={styles.tradingStyleContainer}>
            <Text style={[styles.tradingStyleLabel, { color: getTradingStyleColor(mockCaptainStats.tradingStyle) }]}>
              {mockCaptainStats.tradingStyle.toUpperCase()}
            </Text>
            <Text style={styles.tradingStyleDescription}>
              {mockCaptainStats.tradingStyle === 'Aggressive' 
                ? 'You prefer high-risk, high-reward trades and are willing to take chances for maximum profit.'
                : mockCaptainStats.tradingStyle === 'Conservative'
                ? 'You prioritize safety and stability, preferring reliable but lower-profit trading opportunities.'
                : mockCaptainStats.tradingStyle === 'Balanced'
                ? 'You maintain a middle ground between risk and reward, adapting your strategy to market conditions.'
                : 'You seize opportunities as they arise, adapting your trading approach to maximize each situation.'}
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
          
          <View style={styles.achievementsContainer}>
            {mockCaptainStats.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🏆</Text>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          
          <View style={styles.settingsContainer}>
            
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Auto Save</Text>
              <Switch
                value={autoSaveEnabled}
                onValueChange={setAutoSaveEnabled}
                trackColor={{ false: '#2C3A5A', true: '#FFD700' }}
                thumbColor={autoSaveEnabled ? '#000000' : '#B0C4DE'}
              />
            </View>
            
            
          </View>
        </View>

        {/* Action Buttons */}
        
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
  captainHeader: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  captainInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  captainName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  captainRank: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  captainStats: {
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
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  performanceItem: {
    width: '48%',
    backgroundColor: '#1E2433',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    textAlign: 'center',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  reputationContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  reputationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reputationLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reputationScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reputationBar: {
    height: 8,
    backgroundColor: '#2C3A5A',
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden',
  },
  reputationFill: {
    height: '100%',
    borderRadius: 4,
  },
  reputationDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  tradingStyleContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  tradingStyleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tradingStyleDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  achievementsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  achievementText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  settingsContainer: {
    backgroundColor: '#1E2433',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A5A',
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    marginBottom: 40,
  },
  editProfileButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  editProfileButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  resetProgressButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  resetProgressButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    letterSpacing: 1,
  },
});
