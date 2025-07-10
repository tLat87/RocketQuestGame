import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Switch, TouchableOpacity} from 'react-native';

const RocketDetailsScreen = ({route, navigation}) => {
  const {rocket} = route.params;
  const [status, setStatus] = useState(rocket.status || 'Flying Now');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'〈 SYSTEMS'}</Text> {/* Thematic back button */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{rocket.name || 'Orbital Vehicle'}</Text> {/* Generic title if name missing */}
      </View>

      {rocket.image && <Image source={rocket.image} style={styles.heroImage} />} {/* Renamed for impact */}

      <View style={[styles.statusBadge, { backgroundColor: rocket.statusColor || '#A9A9A9' }]}> {/* Renamed and adjusted */}
        <Text style={styles.statusBadgeText}>{rocket.type || 'CLASSIFIED'}</Text>
      </View>

      <Text style={styles.rocketName}>{rocket.name || 'Unknown Rocket'}</Text> {/* Renamed for clarity */}

      <View style={styles.sectionDivider} /> {/* Visual divider */}

      {rocket.Country && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Origin:</Text>
          <Text style={styles.infoText}>{rocket.Country}</Text>
        </View>
      )}

      <Text style={styles.detailLabel}>ENGINEERING SPECS:</Text>
      <View style={styles.detailList}>
        {rocket.Specifications && rocket.Specifications.map((spec, index) => (
          <Text key={index} style={styles.detailItem}>• {spec}</Text>
        ))}
      </View>

      <View style={styles.sectionDivider} />

      <Text style={styles.detailLabel}>MISSION LOG:</Text>
      <View style={styles.detailList}>
        {rocket.Missions && rocket.Missions.map((mission, index) => (
          <Text key={index} style={styles.detailItem}>• {mission}</Text>
        ))}
      </View>

      <View style={styles.sectionDivider} />

      <Text style={styles.detailLabel}>DATA CHRONICLES:</Text>
      <View style={styles.detailList}>
        {rocket.interestingFacts && rocket.interestingFacts.map((fact, index) => (
          <Text key={index} style={styles.detailItem}>• {fact}</Text>
        ))}
      </View>

      <View style={styles.systemStatusPanel}>
        <Text style={styles.panelTitle}>STATUS MONITOR:</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Operational</Text>
          <Switch
            value={status === 'Flying Now'}
            onValueChange={() => setStatus('Flying Now')}
            thumbColor={status === 'Flying Now' ? '#32CD32' : '#767577'} // Lime Green for active
            trackColor={{ false: '#333', true: 'rgba(50, 205, 50, 0.5)' }} // Dark track, semi-transparent green
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Archived</Text>
          <Switch
            value={status === 'Retired'}
            onValueChange={() => setStatus('Retired')}
            thumbColor={status === 'Retired' ? '#FFA500' : '#767577'} // Orange for retired
            trackColor={{ false: '#333', true: 'rgba(255, 165, 0, 0.5)' }}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Pre-Launch Sequence</Text>
          <Switch
            value={status === 'Awaiting Launch'}
            onValueChange={() => setStatus('Awaiting Launch')}
            thumbColor={status === 'Awaiting Launch' ? '#00FFFF' : '#767577'} // Cyan for awaiting
            trackColor={{ false: '#333', true: 'rgba(0, 255, 255, 0.5)' }}
          />
        </View>
      </View>
      <View style={{marginBottom: 100}}/>
    </ScrollView>
  );
};

export default RocketDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505', // Very dark background, consistent
    padding: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25, // More spacing
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    color: '#00FFFF', // Cyan color for digital feel
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 255, 255, 0.5)', // Subtle cyan glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  headerTitle: {
    color: '#E0E0E0', // Light grey for the rocket name in header
    fontSize: 26, // Larger header title
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    letterSpacing: 0.8,
  },
  heroImage: { // Renamed from 'image' for more impact
    width: '100%',
    height: 320, // Taller image for better display
    borderRadius: 15, // More rounded corners
    marginBottom: 25,
    resizeMode: 'cover',
    borderWidth: 2, // Border around the image
    borderColor: '#00FFFF', // Cyan border
    shadowColor: '#00FFFF', // Matching cyan glow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  statusBadge: { // Renamed from 'badge'
    alignSelf: 'flex-start',
    borderRadius: 20, // Pill-shaped badge
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 25, // More space after badge
    // Background color set dynamically
    shadowColor: 'rgba(0,0,0,0.4)', // Subtle shadow for depth
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  statusBadgeText: { // Renamed from 'badgeText'
    color: '#050505', // Very dark text on colored badge for high contrast
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rocketName: { // Renamed from 'title'
    fontSize: 36, // Large and impactful rocket name
    color: '#FFA726', // Vibrant orange, consistent with previous screens
    fontWeight: '900', // Extra bold
    marginBottom: 25, // More space after the main name
    textAlign: 'center', // Center align the main name
    textShadowColor: 'rgba(255, 167, 38, 0.7)', // Orange glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15,
    letterSpacing: 1.5,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#333', // Subtle grey line
    marginVertical: 25, // More vertical space for dividers
    alignSelf: 'center',
    width: '80%',
  },
  infoRow: { // Style for the country/origin row
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)', // Subtle bottom border
    paddingBottom: 10,
  },
  infoLabel: {
    color: '#B0E0E6', // Light blue, consistent for info labels
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    color: '#E0E0E0', // Light grey for info
    fontSize: 16,
  },
  detailLabel: { // Renamed from 'label'
    color: '#ADD8E6', // Light blue for detailed section labels
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1, // Underline effect
    borderBottomColor: 'rgba(173, 216, 230, 0.3)', // Faded blue underline
    paddingBottom: 5,
  },
  detailList: { // Renamed from 'list'
    marginLeft: 15,
    borderLeftWidth: 2, // Consistent left border
    borderLeftColor: '#444',
    paddingLeft: 10,
  },
  detailItem: { // Renamed from 'item'
    color: '#E0E0E0', // Lighter text for list items
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24, // Improved readability for specs
  },
  systemStatusPanel: { // Renamed from 'switchGroup' for more thematic name
    marginTop: 40, // More spacing above the panel
    padding: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.8)', // Semi-transparent dark background for panel
    borderRadius: 15,
    borderWidth: 1, // Border around the panel
    borderColor: '#00FFFF', // Cyan border
    shadowColor: '#00FFFF', // Cyan glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  panelTitle: {
    color: '#00FFFF', // Cyan title for the panel
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 255, 255, 0.4)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10, // More vertical spacing for switches
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)', // Subtle separator
  },
  switchLabel: {
    color: '#E0E0E0', // Light grey for switch labels
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  // Switch thumb and track colors are handled inline based on status,
  // making them dynamic and consistent with the active/retired/awaiting palette
});
