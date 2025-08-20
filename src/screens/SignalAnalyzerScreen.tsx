import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SignalData {
  id: string;
  frequency: string;
  strength: number;
  source: string;
  type: 'Trade' | 'Distress' | 'Navigation' | 'Unknown';
  distance: number;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: string;
  decoded: boolean;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

interface DecodedSignal {
  id: string;
  originalSignal: SignalData;
  content: string;
  tradeOpportunity?: {
    item: string;
    quantity: number;
    price: number;
    planet: string;
  };
  threatLevel?: 'None' | 'Low' | 'Medium' | 'High';
  reward?: number;
}

// Mock signal data
const mockSignals: SignalData[] = [
  {
    id: '1',
    frequency: '157.3 MHz',
    strength: 85,
    source: 'Unknown Origin',
    type: 'Trade',
    distance: 2.3,
    priority: 'High',
    description: 'Strong trade signal detected with potential high-value cargo',
    timestamp: '2025-01-15 14:32:15',
    decoded: false,
    coordinates: { x: 45.2, y: -12.8, z: 78.9 },
  },
  {
    id: '2',
    frequency: '89.7 MHz',
    strength: 62,
    source: 'Nebula Sector',
    type: 'Distress',
    distance: 5.1,
    priority: 'Medium',
    description: 'Distress beacon from merchant vessel, possible rescue opportunity',
    timestamp: '2025-01-15 14:28:42',
    decoded: false,
    coordinates: { x: 23.1, y: 67.4, z: -34.2 },
  },
  {
    id: '3',
    frequency: '234.1 MHz',
    strength: 78,
    source: 'Core Systems',
    type: 'Navigation',
    distance: 1.8,
    priority: 'High',
    description: 'Navigation beacon indicating safe trade route to wealthy planets',
    timestamp: '2025-01-15 14:25:18',
    decoded: false,
    coordinates: { x: 12.5, y: 89.3, z: 45.7 },
  },
  {
    id: '4',
    frequency: '67.9 MHz',
    strength: 45,
    source: 'Frontier Worlds',
    type: 'Unknown',
    distance: 8.7,
    priority: 'Low',
    description: 'Weak signal of unknown origin, possible hidden location',
    timestamp: '2025-01-15 14:22:05',
    decoded: false,
    coordinates: { x: -78.9, y: 34.6, z: 123.4 },
  },
  {
    id: '5',
    frequency: '189.3 MHz',
    strength: 91,
    source: 'Outer Rim',
    type: 'Trade',
    distance: 3.2,
    priority: 'High',
    description: 'Exotic materials trade signal, extremely valuable cargo detected',
    timestamp: '2025-01-15 14:19:33',
    decoded: false,
    coordinates: { x: 156.7, y: -89.2, z: 23.1 },
  },
];

const { width } = Dimensions.get('window');

export default function SignalAnalyzerScreen() {
  const [signals, setSignals] = useState<SignalData[]>(mockSignals);
  const [decodedSignals, setDecodedSignals] = useState<DecodedSignal[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState<SignalData | null>(null);

  const filters = ['All', 'Trade', 'Distress', 'Navigation', 'Unknown'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setScanning(false);
            setScanProgress(0);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [scanning]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Trade': return '#32CD32';
      case 'Distress': return '#FF6B6B';
      case 'Navigation': return '#87CEEB';
      case 'Unknown': return '#FFD700';
      default: return '#B0C4DE';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#FF6B6B';
      case 'Medium': return '#FFD700';
      case 'Low': return '#32CD32';
      default: return '#B0C4DE';
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return '#32CD32';
    if (strength >= 60) return '#FFD700';
    return '#FF6B6B';
  };

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    // Simulate finding new signals
    setTimeout(() => {
      const newSignal: SignalData = {
        id: Date.now().toString(),
        frequency: `${Math.floor(Math.random() * 300)}.${Math.floor(Math.random() * 9)} MHz`,
        strength: Math.floor(Math.random() * 40) + 50,
        source: 'Deep Space',
        type: ['Trade', 'Distress', 'Navigation', 'Unknown'][Math.floor(Math.random() * 4)] as any,
        distance: Math.random() * 10 + 1,
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as any,
        description: 'New signal detected during deep space scan',
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        decoded: false,
        coordinates: {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          z: (Math.random() - 0.5) * 200,
        },
      };
      
      setSignals(prev => [newSignal, ...prev]);
      Alert.alert('New Signal Detected', `Found ${newSignal.type} signal from ${newSignal.source}`);
    }, 2000);
  };

  const decodeSignal = (signal: SignalData) => {
    if (signal.decoded) return;

    setScanning(true);
    setScanProgress(0);

    setTimeout(() => {
      const decodedSignal: DecodedSignal = {
        id: Date.now().toString(),
        originalSignal: signal,
        content: generateDecodedContent(signal),
        tradeOpportunity: signal.type === 'Trade' ? generateTradeOpportunity(signal) : undefined,
        threatLevel: signal.type === 'Distress' ? 'Medium' : 'None',
        reward: Math.floor(Math.random() * 5000) + 1000,
      };

      setDecodedSignals(prev => [...prev, decodedSignal]);
      setSignals(prev => prev.map(s => s.id === signal.id ? { ...s, decoded: true } : s));
      setScanning(false);
      setScanProgress(0);

      Alert.alert('Signal Decoded', `Successfully decoded ${signal.type} signal!`);
    }, 3000);
  };

  const generateDecodedContent = (signal: SignalData): string => {
    switch (signal.type) {
      case 'Trade':
        return `Merchant vessel ${signal.source} requesting trade. Cargo includes exotic materials and technology. Coordinates: ${signal.coordinates.x.toFixed(1)}, ${signal.coordinates.y.toFixed(1)}, ${signal.coordinates.z.toFixed(1)}`;
      case 'Distress':
        return `Distress call from ${signal.source}. Vessel damaged, crew requires assistance. Medical supplies and repair materials needed. Coordinates: ${signal.coordinates.x.toFixed(1)}, ${signal.coordinates.y.toFixed(1)}, ${signal.coordinates.z.toFixed(1)}`;
      case 'Navigation':
        return `Navigation beacon from ${signal.source}. Safe route identified with multiple trade opportunities. Estimated travel time: ${signal.distance * 2} hours. Coordinates: ${signal.coordinates.x.toFixed(1)}, ${signal.coordinates.y.toFixed(1)}, ${signal.coordinates.z.toFixed(1)}`;
      case 'Unknown':
        return `Mysterious signal from ${signal.source}. Pattern suggests hidden location or encrypted message. Coordinates: ${signal.coordinates.x.toFixed(1)}, ${signal.coordinates.y.toFixed(1)}, ${signal.coordinates.z.toFixed(1)}`;
      default:
        return 'Signal content could not be fully decoded.';
    }
  };

  const generateTradeOpportunity = (signal: SignalData) => {
    const items = ['Quantum Processors', 'Plasma Crystals', 'Neural Networks', 'Exotic Alloys', 'Energy Cores'];
    const planets = ['Nova Prime', 'Quantum Station', 'Crystal World', 'Tech Hub', 'Resource Center'];
    
    return {
      item: items[Math.floor(Math.random() * items.length)],
      quantity: Math.floor(Math.random() * 100) + 10,
      price: Math.floor(Math.random() * 5000) + 1000,
      planet: planets[Math.floor(Math.random() * planets.length)],
    };
  };

  const filteredSignals = selectedFilter === 'All' 
    ? signals 
    : signals.filter(signal => signal.type === selectedFilter);

  const getTotalSignals = () => signals.length;
  const getDecodedSignals = () => signals.filter(s => s.decoded).length;
  const getActiveThreats = () => signals.filter(s => s.type === 'Distress' && !s.decoded).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SIGNAL ANALYZER</Text>
          <Text style={styles.subtitle}>Scan and decode cosmic communications</Text>
        </View>

        {/* Scanner Status */}
        <LinearGradient
          colors={['#1E2433', '#2C3A5A']}
          style={styles.scannerContainer}
        >
          <Text style={styles.scannerTitle}>DEEP SPACE SCANNER</Text>
          
          {scanning ? (
            <View style={styles.scanProgressContainer}>
              <Text style={styles.scanStatus}>SCANNING IN PROGRESS...</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${scanProgress}%` }]} />
              </View>
              <Text style={styles.progressText}>{scanProgress}%</Text>
      </View>
          ) : (
          <TouchableOpacity
              style={styles.scanButton}
              onPress={startScan}
            >
              <Text style={styles.scanButtonText}>START SCAN</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Signals</Text>
            <Text style={styles.statValue}>{getTotalSignals()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Decoded</Text>
            <Text style={styles.statValue}>{getDecodedSignals()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Active Threats</Text>
            <Text style={styles.statValue}>{getActiveThreats()}</Text>
          </View>
            </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.activeFilterButton
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.activeFilterButtonText
                ]}>
                  {filter}
                </Text>
          </TouchableOpacity>
        ))}
          </ScrollView>
        </View>

        {/* Signals List */}
        <View style={styles.signalsContainer}>
          <Text style={styles.signalsTitle}>DETECTED SIGNALS</Text>
          
          {filteredSignals.map((signal) => (
            <TouchableOpacity
              key={signal.id}
              style={styles.signalCard}
              onPress={() => setSelectedSignal(signal)}
            >
              <View style={styles.signalHeader}>
                <View style={styles.signalInfo}>
                  <Text style={styles.signalFrequency}>{signal.frequency}</Text>
                  <View style={styles.signalMeta}>
                    <Text style={[styles.signalType, { color: getTypeColor(signal.type) }]}>
                      {signal.type}
                    </Text>
                    <Text style={[styles.signalPriority, { color: getPriorityColor(signal.priority) }]}>
                      {signal.priority}
                    </Text>
                  </View>
                </View>
                <View style={styles.signalStatus}>
                  <View style={[styles.strengthIndicator, { backgroundColor: getStrengthColor(signal.strength) }]}>
                    <Text style={styles.strengthText}>{signal.strength}%</Text>
                  </View>
                  {signal.decoded && (
                    <Text style={styles.decodedStatus}>DECODED</Text>
                  )}
                </View>
              </View>

              <Text style={styles.signalSource}>{signal.source}</Text>
              <Text style={styles.signalDescription}>{signal.description}</Text>
              
              <View style={styles.signalDetails}>
                <Text style={styles.signalDetail}>Distance: {signal.distance.toFixed(1)} LY</Text>
                <Text style={styles.signalDetail}>Time: {signal.timestamp}</Text>
              </View>

              <View style={styles.signalActions}>
                {!signal.decoded ? (
                  <TouchableOpacity
                    style={styles.decodeButton}
                    onPress={() => decodeSignal(signal)}
                    disabled={scanning}
                  >
                    <Text style={styles.decodeButtonText}>
                      {scanning ? 'DECODING...' : 'DECODE SIGNAL'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.decodedContainer}>
                    <Text style={styles.decodedText}>SIGNAL DECODED</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Decoded Signals */}
        {decodedSignals.length > 0 && (
          <View style={styles.decodedContainer}>
            <Text style={styles.decodedTitle}>DECODED SIGNALS</Text>
            
            {decodedSignals.map((decoded) => (
              <View key={decoded.id} style={styles.decodedCard}>
                <Text style={styles.decodedSignalType}>
                  {decoded.originalSignal.type} SIGNAL
                </Text>
                <Text style={styles.decodedContent}>{decoded.content}</Text>
                
                {decoded.tradeOpportunity && (
                  <View style={styles.tradeOpportunity}>
                    <Text style={styles.tradeTitle}>TRADE OPPORTUNITY</Text>
                    <Text style={styles.tradeItem}>
                      {decoded.tradeOpportunity.item} x{decoded.tradeOpportunity.quantity}
                    </Text>
                    <Text style={styles.tradePrice}>
                      Price: {decoded.tradeOpportunity.price.toLocaleString()} credits
                    </Text>
                    <Text style={styles.tradePlanet}>
                      Location: {decoded.tradeOpportunity.planet}
                    </Text>
                  </View>
                )}

                {decoded.threatLevel && decoded.threatLevel !== 'None' && (
                  <View style={styles.threatInfo}>
                    <Text style={styles.threatTitle}>THREAT LEVEL: {decoded.threatLevel}</Text>
                    <Text style={styles.threatDescription}>
                      Exercise caution when approaching this location
                    </Text>
                  </View>
                )}

                {decoded.reward && (
                  <View style={styles.rewardInfo}>
                    <Text style={styles.rewardTitle}>POTENTIAL REWARD</Text>
                    <Text style={styles.rewardAmount}>
                      {decoded.reward.toLocaleString()} credits
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>SIGNAL ANALYSIS TIPS</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📡</Text>
            <Text style={styles.tipText}>
              High-strength signals are easier to decode and often contain valuable information
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⚠️</Text>
            <Text style={styles.tipText}>
              Distress signals may indicate rescue opportunities but also potential threats
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💰</Text>
            <Text style={styles.tipText}>
              Trade signals often lead to profitable cargo and rare materials
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
  scannerContainer: {
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    alignItems: 'center',
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 1,
  },
  scanProgressContainer: {
    alignItems: 'center',
    width: '100%',
  },
  scanStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#2C3A5A',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scanButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#1E2433',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C3A5A',
    flex: 1,
    marginHorizontal: 5,
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#1E2433',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  activeFilterButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0C4DE',
  },
  activeFilterButtonText: {
    color: '#000000',
  },
  signalsContainer: {
    padding: 20,
  },
  signalsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 1,
  },
  signalCard: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  signalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  signalInfo: {
    flex: 1,
  },
  signalFrequency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  signalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalType: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 15,
  },
  signalPriority: {
    fontSize: 16,
    fontWeight: '600',
  },
  signalStatus: {
    alignItems: 'flex-end',
  },
  strengthIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  decodedStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  signalSource: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
    fontWeight: '600',
  },
  signalDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 15,
  },
  signalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  signalDetail: {
    fontSize: 14,
    color: '#B0C4DE',
  },
  signalActions: {
    alignItems: 'center',
  },
  decodeButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  decodeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  decodedContainer: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  decodedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  decodedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: 1,
  },
  decodedCard: {
    backgroundColor: '#1E2433',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C3A5A',
  },
  decodedSignalType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  decodedContent: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
  },
  tradeOpportunity: {
    backgroundColor: 'rgba(50, 205, 50, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  tradeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 10,
  },
  tradeItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tradePrice: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tradePlanet: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  threatInfo: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  threatDescription: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  rewardInfo: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  rewardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
