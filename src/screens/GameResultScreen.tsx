import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions, // To get screen width for responsive design
  TouchableOpacity, // Added for potential future interactivity
} from 'react-native';

// Optional: If you want a real calendar view, you'd use a library like react-native-calendars
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// Define the interface for a single space mission event on the roadmap
interface SpaceEvent {
  id: string;
  type: 'Historical' | 'Upcoming' | 'Celestial'; // Categorize event types
  title: string;
  date: string; // Could be 'YYYY-MM-DD' or 'Month Day, Year'
  shortDescription: string; // Brief overview
  fullDescription?: string; // More detailed info (optional for list view)
  significance?: string; // Key takeaway
  targetEmoji?: string; // e.g., '🌕', '🪐', '🌟'
}

const spaceEvents: SpaceEvent[] = [
  // --- HISTORICAL MISSIONS ---
  {
    id: 'h-moon-1',
    type: 'Historical',
    title: 'Luna 2 First Lunar Impact',
    date: '1959-09-12',
    shortDescription: 'Soviet Union\'s Luna 2 became the first spacecraft to reach the Moon\'s surface.',
    significance: 'First human-made object to impact another celestial body.',
    targetEmoji: '🌕',
  },
  {
    id: 'h-apollo-11',
    type: 'Historical',
    title: 'Apollo 11 Moon Landing',
    date: '1969-07-20',
    shortDescription: 'NASA\'s Apollo 11 landed humans on the Moon for the first time.',
    significance: 'Fulfilled President Kennedy\'s challenge, a landmark in space exploration.',
    targetEmoji: '🌕',
  },
  {
    id: 'h-mariner-4',
    type: 'Historical',
    title: 'Mariner 4 Mars Flyby',
    date: '1964-07-15', // Corrected to flyby date
    shortDescription: 'NASA\'s Mariner 4 performed the first successful flyby of Mars, sending back initial close-up images.',
    significance: 'Provided humanity\'s first detailed look at Mars, dispelling notions of canals.',
    targetEmoji: '🪐',
  },
  {
    id: 'h-jwst-launch',
    type: 'Historical',
    title: 'James Webb Space Telescope Launch',
    date: '2021-12-25',
    shortDescription: 'The next-generation space observatory launched on an Ariane 5 rocket.',
    significance: 'Designed to observe the most distant events and objects in the universe.',
    targetEmoji: '🔭',
  },
  // --- UPCOMING LAUNCHES (Examples) ---
  {
    id: 'u-artemis-ii',
    type: 'Upcoming',
    title: 'Artemis II Crewed Lunar Flyby',
    date: '2025-09-01', // Example future date
    shortDescription: 'First crewed test flight of NASA\'s Orion spacecraft and SLS around the Moon.',
    significance: 'Paving the way for humanity\'s return to the lunar surface.',
    targetEmoji: '🚀🌕',
  },
  {
    id: 'u-mars-sample-return',
    type: 'Upcoming',
    title: 'Mars Sample Return Launch',
    date: '2028-01-01', // Example future date
    shortDescription: 'Future mission to retrieve samples collected by Perseverance rover from Mars.',
    significance: 'Crucial for detailed scientific analysis of Martian geology and potential ancient life.',
    targetEmoji: '🔬🪐',
  },
  // --- CELESTIAL EVENTS (Examples) ---
  {
    id: 'c-meteor-shower-1',
    type: 'Celestial',
    title: 'Perseid Meteor Shower Peak',
    date: '2025-08-12',
    shortDescription: 'One of the brightest and most active annual meteor showers.',
    significance: 'Visible without a telescope, great for stargazing.',
    targetEmoji: '✨',
  },
  {
    id: 'c-total-solar-eclipse',
    type: 'Celestial',
    title: 'Total Solar Eclipse',
    date: '2026-08-12', // Example future date
    shortDescription: 'The Moon will completely obscure the Sun, creating a rare celestial spectacle.',
    significance: 'A breathtaking astronomical event visible from specific locations on Earth.',
    targetEmoji: '☀️🌑',
  },
];

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const SpaceRoadmapScreen: React.FC = () => {
  // Sort events by date, assuming 'YYYY-MM-DD' format for easy comparison
  const sortedEvents = [...spaceEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group events by year and then month for calendar-like view
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    const month = new Date(event.date).toLocaleString('en-US', { month: 'long' });
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(event);
    return acc;
  }, {} as Record<string, Record<string, SpaceEvent[]>>);


  const renderSectionHeader = (year: string, month: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{month} {year}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const renderSpaceEventItem = ({ item }: { item: SpaceEvent }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventDay}>{new Date(item.date).getDate()}</Text>
        <Text style={styles.eventMonth}>{new Date(item.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title} {item.targetEmoji}</Text>
        <Text style={styles.eventDescription}>{item.shortDescription}</Text>
        {item.significance && (
          <Text style={styles.eventSignificance}>
            <Text style={{fontWeight: 'bold'}}>Impact:</Text> {item.significance}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>

      <ImageBackground
        source={require('../assets/img/game/dc196ae0e4a161b3ad4b074d993cc5809d267690.png')} // Your game background
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.headerTitle}>COSMIC ROADMAP</Text>

        {/*/!* Optional: Add a small calendar icon/button here if you want to link to a full calendar view *!/*/}
        {/*<TouchableOpacity style={styles.calendarButton} onPress={() => /!* navigate to full calendar *!/>*/}
        {/*  <Text style={styles.calendarButtonText}>View Calendar 📅</Text>*/}
        {/*</TouchableOpacity>*/}

    <FlatList
      data={Object.keys(groupedEvents).flatMap(year =>
        Object.keys(groupedEvents[year]).flatMap(month => [
          { id: `${year}-${month}-header`, type: 'header', year, month } as any, // Dummy item for header
          ...groupedEvents[year][month],
        ])
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (item.type === 'header') {
          return renderSectionHeader(item.year, item.month);
        }
        return renderSpaceEventItem({ item: item as SpaceEvent });
      }}
      contentContainerStyle={styles.flatListContent}
      ListEmptyComponent={() => (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No cosmic events found.</Text>
          <Text style={styles.emptyListSubText}>Stay tuned for future celestial happenings!</Text>
        </View>
      )}
    />
  </ImageBackground>
</>
);
};

export default SpaceRoadmapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 20,
    paddingTop: 60, // Consistent with other screens
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E0FFFF', // Cyan/Aqua for a futuristic feel
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 255, 255, 0.6)', // Matching glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  // Optional: Style for a calendar button if added
  calendarButton: {
    backgroundColor: 'rgba(0, 191, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  calendarButtonText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  flatListContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold for section headers
    marginRight: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 215, 0, 0.4)', // Faded gold line
    borderRadius: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 15, 30, 0.8)', // Dark blue-purple tint, semi-transparent
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 6, // Thick left border for accent
    borderColor: '#00BFFF', // Sky blue accent
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'flex-start', // Align items to the top
  },
  eventDateContainer: {
    backgroundColor: 'rgba(0, 191, 255, 0.1)', // Light blue background for date
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  eventDay: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0FFFF', // Cyan/Aqua
  },
  eventMonth: {
    fontSize: 12,
    color: '#B0C4DE', // Light grey-blue
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E0E0E0', // Light grey
    marginBottom: 5,
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  eventDescription: {
    fontSize: 14,
    color: '#B0C4DE', // Light grey-blue
    lineHeight: 20,
    marginBottom: 8,
  },
  eventSignificance: {
    fontSize: 14,
    color: '#FFD700', // Gold for significance
    fontStyle: 'italic',
    marginTop: 5,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    borderRadius: 15, // Rounded corners
    borderWidth: 1,
    borderColor: '#333',
  },
  emptyListText: {
    color: '#FFA726',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyListSubText: {
    color: '#E0E0E0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
