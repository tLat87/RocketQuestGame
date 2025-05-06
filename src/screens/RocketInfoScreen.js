import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Switch, TouchableOpacity} from 'react-native';

const RocketDetailsScreen = ({route, navigation}) => {
  const {rocket} = route.params;
  const [status, setStatus] = useState('Flying Now');

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Text style={styles.header}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{rocket.name}</Text>
      </View>

      <Image source={rocket.image} style={styles.image} />

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{rocket.type}</Text>
      </View>

      <Text style={styles.title}>Falcon 9</Text>

      <Text style={styles.label}>Country: <Text style={styles.text}>USA</Text></Text>

      <Text style={styles.label}>Specifications:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• Height: 70 m</Text>
        <Text style={styles.item}>• Mass: 549 t</Text>
        <Text style={styles.item}>• Payload to orbit: up to 22.8 t (LEO)</Text>
      </View>

      <Text style={styles.label}>Missions:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• Crew Dragon missions to the ISS</Text>
        <Text style={styles.item}>• Starlink satellite launches</Text>
        <Text style={styles.item}>• NASA, private, and military payload deployments</Text>
      </View>

      <Text style={styles.label}>Interesting facts:</Text>
      <View style={styles.list}>
        <Text style={styles.item}>• The first orbital-class rocket capable of reflight.</Text>
        <Text style={styles.item}>• Over 300 successful launches as of early 2025.</Text>
      </View>

      <View style={styles.switchGroup}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Flying Now</Text>
          <Switch
            value={status === 'Flying Now'}
            onValueChange={() => setStatus('Flying Now')}
            thumbColor={status === 'Flying Now' ? '#A78BFA' : '#fff'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Historic</Text>
          <Switch
            value={status === 'Historic'}
            onValueChange={() => setStatus('Historic')}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Awaiting Launch</Text>
          <Switch
            value={status === 'Awaiting Launch'}
            onValueChange={() => setStatus('Awaiting Launch')}
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
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 100,
  },
  header: {
    color: '#FFF176',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    // zIndex: 111,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  badgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    color: '#FFA726',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontWeight: 'normal',
  },
  list: {
    marginLeft: 10,
  },
  item: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  switchGroup: {
    marginTop: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
