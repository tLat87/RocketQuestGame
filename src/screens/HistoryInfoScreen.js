import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking} from 'react-native'; // Added Linking for audio fragments
import {useDispatch} from 'react-redux';
import {addMission} from '../redux/slices/savedMissionsSlice';

const HistoryInfoScreen = ({route, navigation}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  // Function to handle opening audio links
  const handleOpenAudioLink = (url) => {
    if (url && url.startsWith('http')) { // Basic check for valid URL
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'⟪ ARCHIVE'}</Text> {/* Unique back button text */}
        </TouchableOpacity>
      </View>

      {item.image && <Image source={item.image} style={styles.image} />}

      <Text style={styles.title}>{item.title || 'Historical Event'}</Text>

      <View style={styles.sectionDivider} /> {/* Visual divider */}

      <Text style={styles.label}>Chronicles:</Text>
      <View style={styles.list}>
        {item.info && item.info.map((infoItem, index) => (
          <Text key={index} style={styles.item}>• {infoItem}</Text>
        ))}
      </View>

      {item.AudioFragments && item.AudioFragments.length > 0 && (
        <>
          <View style={styles.sectionDivider} /> {/* Visual divider */}
          <Text style={[styles.label, styles.audioLabel]}>Transmissions:</Text>
          <View style={styles.list}>
            {item.AudioFragments.map((audioItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOpenAudioLink(audioItem.url)} // Assuming audioItem has a 'url' property
                style={styles.audioFragmentButton}
              >
                <Text style={styles.audioFragmentText}>▶ {audioItem.title || `Audio Fragment ${index + 1}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity
        style={styles.addToCollectionButton}
        onPress={() => {
          dispatch(addMission({
            id: item.id,
            name: item.title,
            image: item.image,
            info: item.info,
            AudioFragments: item.AudioFragments,
          }));
          navigation.goBack();
        }}
      >
        <Text style={styles.addToCollectionButtonText}>Add to Personal Archive</Text>
      </TouchableOpacity>

      <View style={{marginBottom: 100}}/>
    </ScrollView>
  );
};

export default HistoryInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F', // Very dark, almost black background for depth
    padding: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    color: '#00BFFF', // Deep sky blue, reminiscent of old digital interfaces
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 191, 255, 0.5)', // Subtle blue glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 300, // Taller image for a grander presentation
    borderRadius: 10, // Slight rounded corners
    marginBottom: 25,
    resizeMode: 'cover',
    borderWidth: 2, // A subtle border around the image
    borderColor: '#4CAF50', // A "retro-tech" green border
    shadowColor: '#4CAF50', // Matching green shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 15,
  },
  title: {
    fontSize: 32, // Large, impactful title
    color: '#FFD700', // Gold color, signifying importance or a "historical" feel
    fontWeight: '900', // Extra bold for maximum impact
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.7)', // Gold glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    textTransform: 'uppercase', // All caps for historical record feel
    letterSpacing: 1.5,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#333', // A subtle separator line
    marginVertical: 20,
    alignSelf: 'center',
    width: '80%', // Not full width to look more refined
  },
  label: {
    color: '#87CEFA', // Light sky blue, like a distant galaxy
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 8,
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1, // Underline effect for labels
    borderBottomColor: 'rgba(135, 206, 250, 0.3)', // Faded blue underline
    paddingBottom: 5,
  },
  audioLabel: {
    color: '#FCD24D', // A distinct warm yellow for audio sections
    borderBottomColor: 'rgba(252, 210, 77, 0.4)',
  },
  list: {
    marginLeft: 15,
    paddingLeft: 10,
    borderLeftWidth: 2, // A clear left border
    borderLeftColor: 'rgba(255, 255, 255, 0.1)', // Very subtle white line
  },
  item: {
    color: '#E0E0E0', // Light grey for standard text
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24, // Improved readability
  },
  audioFragmentButton: {
    backgroundColor: 'rgba(252, 210, 77, 0.1)', // Subtle yellow background for audio buttons
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#FCD24D', // Yellow border
  },
  audioFragmentText: {
    color: '#FCD24D', // Warm yellow text for audio items
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5, // Space after play icon
  },
  addToCollectionButton: {
    backgroundColor: '#4CAF50', // A vibrant green for the action button
    paddingVertical: 20,
    borderRadius: 12, // More rounded, modern button
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 999,
    shadowColor: '#4CAF50', // Matching green shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 12,
  },
  addToCollectionButtonText: {
    color: '#000', // Black text for high contrast on green
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
