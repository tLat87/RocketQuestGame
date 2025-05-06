import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView,
} from 'react-native';
import {addExpedition} from '../redux/slices/createdExpeditionsSlice';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateMissionScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [purpose, setPurpose] = useState('');
  const [rocket, setRocket] = useState('');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const dispatch = useDispatch();

  const [showRocketOptions, setShowRocketOptions] = useState(false);
  const [showMissionOptions, setShowMissionOptions] = useState(false);

  const rocketOptions = ['Falcon 9', 'Starship', 'Soyuz', 'Atlas V', 'New Glenn'];
  const missionOptions = ['Mars Exploration', 'Lunar Landing', 'ISS Supply', 'Satellite Launch', 'Space Tourism'];


  const handleSave = () => {
    dispatch(addExpedition({
      name,
      goal,
      purpose,
      rocket,
      reason,
      note,
      imageUri
    }));
     navigation.goBack()
  };

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.warn('ImagePicker Error: ', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Space Mission Collection</Text>

      <TouchableOpacity style={styles.imageBox} onPress={handlePickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imageText}>Add Picture</Text>
        )}
      </TouchableOpacity>


      <Text style={styles.labelRed}>Enter Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Goal"
        placeholderTextColor="#ccc"
        value={goal}
        onChangeText={setGoal}
      />

      <Text style={styles.label}>Purpose</Text>
      <TextInput
        style={styles.input}
        placeholder="Purpose"
        placeholderTextColor="#ccc"
        value={purpose}
        onChangeText={setPurpose}
      />

      <Text style={styles.label}>Rocket</Text>
      <TextInput
        style={styles.input}
        placeholder="Rocket"
        placeholderTextColor="#ccc"
        value={rocket}
        onChangeText={setRocket}
      />

      <Text style={styles.label}>Reason</Text>
      <TextInput
        style={styles.input}
        placeholder="Reason"
        placeholderTextColor="#ccc"
        value={reason}
        onChangeText={setReason}
      />


      <TouchableOpacity style={styles.selector} onPress={() => setShowRocketOptions(!showRocketOptions)}>
        <Text style={styles.selectorText}>{rocket || 'Select Rocket'}</Text>
        <Text style={styles.selectorArrow}>›</Text>
      </TouchableOpacity>

      {showRocketOptions && rocketOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionButton}
          onPress={() => {
            setRocket(item);
            setShowRocketOptions(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.selector} onPress={() => setShowMissionOptions(!showMissionOptions)}>
        <Text style={styles.selectorText}>{goal || 'Select Mission'}</Text>
        <Text style={styles.selectorArrow}>›</Text>
      </TouchableOpacity>

      {showMissionOptions && missionOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionButton}
          onPress={() => {
            setGoal(item);
            setShowMissionOptions(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}


      <Text style={styles.noteLabel}>Note</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Add text here"
        placeholderTextColor="#fff"
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateMissionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 100,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },

  header: {
    color: '#FFFF99',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },

  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  imageBox: {
    height: 200,
    backgroundColor: '#999',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#fff',
    fontSize: 16,
  },
  labelRed: {
    color: '#FFA14A',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  link: {
    color: '#59D0FF',
  },
  reason: {
    color: '#C4A4FF',
  },
  selector: {
    backgroundColor: '#FFD93D',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  selectorText: {
    color: '#000',
    fontWeight: '600',
  },
  selectorArrow: {
    fontSize: 18,
    color: '#000',
  },
  noteLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: '#B296F7',
    color: '#fff',
    borderRadius: 20,
    padding: 16,
    minHeight: 80,
  },
  saveButton: {
    backgroundColor: '#FF914D',
    padding: 16,
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
