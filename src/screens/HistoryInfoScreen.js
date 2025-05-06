import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Switch, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addMission} from '../redux/slices/savedMissionsSlice';

const HistoryInfoScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [status, setStatus] = useState('Flying Now');
  const dispatch = useDispatch();



  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Text style={styles.header}>{"< Back"}</Text>
        </TouchableOpacity>
        {/*<Text style={styles.header}>{item.title}</Text>*/}
      </View>

      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>


      <Text style={styles.label}>Info:</Text>
      <View style={styles.list}>
        {item.info.map((item, index) => (
          <Text style={styles.item}>• {item}</Text>
        ))}
      </View>


      <Text style={[styles.label, {color: '#FCD24D'}]}>Audio Fragments:</Text>
      <View style={styles.list}>
        {item.AudioFragments.map((item, index) => (
          <Text style={[styles.item, {color: '#FCD24D'}]}>• {item}</Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.createButton}
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
        <Text style={styles.createButtonText}>Add to Collection</Text>
      </TouchableOpacity>


      <View style={{marginBottom: 150}}/>
    </ScrollView>
  );
};

export default HistoryInfoScreen;

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
  createButton: {
    backgroundColor: '#F57C00',
    padding: 25,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
