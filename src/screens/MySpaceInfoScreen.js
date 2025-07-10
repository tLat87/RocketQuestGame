import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeExpedition} from '../redux/slices/createdExpeditionsSlice';

const MySpaceInfoScreen = ({route, navigation}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'←'}</Text>
        </TouchableOpacity>
        {/* The title for the screen itself can be dynamic or a fixed "My Expedition" */}
        {/* <Text style={styles.headerTitle}>{item.name || 'Expedition Details'}</Text> */}
      </View>

      {item.imageUri && <Image source={{uri: item.imageUri}} style={styles.image} />}

      <Text style={styles.title}>{item.name || 'Unnamed Expedition'}</Text>

      <Text style={styles.label}>Goal:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• {item.goal || 'No goal specified.'}</Text>
      </View>

      <Text style={styles.label}>Purpose:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• {item.purpose || 'No purpose specified.'}</Text>
      </View>

      <Text style={styles.label}>Rocket:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• {item.rocket || 'No rocket specified.'}</Text>
      </View>

      <Text style={styles.label}>Reason:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• {item.reason || 'No reason specified.'}</Text>
      </View>

      <Text style={styles.label}>Note:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• {item.note || 'No additional notes.'}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton} // Renamed for clarity
        onPress={() => {
          dispatch(removeExpedition(item.id));
          navigation.goBack();
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Expedition</Text>
      </TouchableOpacity>

      <View style={{marginBottom: 100}}/>{/* Adjusted marginBottom to accommodate the fixed button */}
    </ScrollView>
  );
};

export default MySpaceInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 60, // Adjusted for better header spacing
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    color: '#FFF176', // Bright yellow, similar to space highlights
    fontSize: 24, // Larger for better tap target and visibility
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 280, // Slightly increased height for more impact
    borderRadius: 15, // Softer, more modern rounded corners
    marginBottom: 20,
    resizeMode: 'cover', // Ensures image covers the area nicely
    // Add subtle shadow for depth
    shadowColor: '#A78BFA', // A subtle purple glow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10, // For Android shadow
  },
  title: {
    fontSize: 28, // Prominent title size
    color: '#FFA726', // Vibrant orange for main titles
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center', // Center the title for better presentation
    textShadowColor: 'rgba(255, 167, 38, 0.5)', // Orange glow
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  label: {
    color: '#ADD8E6', // Light blue for labels, like a subtle starlight
    fontWeight: '700', // Bolder labels
    marginTop: 18, // More spacing for better readability
    marginBottom: 6,
    fontSize: 17, // Slightly larger label text
    textTransform: 'uppercase', // Make labels uppercase for emphasis
    letterSpacing: 0.8, // Add slight letter spacing
  },
  list: {
    marginLeft: 15,
    borderLeftWidth: 2, // A thin line for visual structure
    borderLeftColor: '#444', // Dark grey for the border
    paddingLeft: 10,
    marginBottom: 5, // Small margin after each list
  },
  item: {
    color: '#E0E0E0', // Lighter grey for content, good contrast
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 22, // Improve readability for longer texts
  },
  deleteButton: {
    backgroundColor: '#DC3545', // Strong red for delete action, clearly indicates danger
    paddingVertical: 18, // More padding for a bigger button
    borderRadius: 10, // Rounded corners for a modern feel
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Fixed at the bottom
    bottom: 30, // Distance from the bottom
    left: 20,
    right: 20,
    zIndex: 999, // Ensure it's above other content
    // Add shadow to the button
    shadowColor: '#DC3545',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF', // White text for contrast on red button
    fontSize: 18, // Larger text for importance
    fontWeight: 'bold',
    textTransform: 'uppercase', // Emphasize the action
    letterSpacing: 1, // Add letter spacing
  },
  // Removed unused styles to keep it clean
  // badge: {},
  // badgeText: {},
  // switchGroup: {},
  // switchRow: {},
  // switchLabel: {},
  // text: {}, // The default text style is often sufficient for item text
});
