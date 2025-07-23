import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform, // Для Platform.OS
} from 'react-native';
import { useDispatch } from 'react-redux';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Для выбора даты
import { StackNavigationProp } from '@react-navigation/stack'; // Типизация для навигации

// Предполагаем, что у вас есть корневой тип для вашего стека навигаторов
// Замените 'RootStackParamList' на имя вашего Root Stack ParamList
type RootStackParamList = {
  MainTab: undefined;
  RocketDetailsScreen: { rocketId: string };
  CreateMissionScreen: undefined;
  GameScreen: undefined;
  GameResultScreen: undefined;
  HistoryInfoScreen: undefined;
  MySpaceInfoScreen: undefined;
  // Добавьте другие экраны, если они есть в вашем RootStackParamList
};

type CreateMissionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateMissionScreen'
>;

interface CreateMissionScreenProps {
  navigation: CreateMissionScreenNavigationProp;
}

// Определим тип для данных экспедиции, который будет использоваться в Redux
interface Expedition {
  id: string; // Добавим ID для уникальности
  name: string;
  goal: string;
  purpose: string;
  rocket: string;
  reason: string;
  note: string;
  imageUri: string | null;
  launchDate: string | null; // Новое поле
  missionStatus: string; // Новое поле
  estimatedDuration: string; // Новое поле
  payload: string; // Новое поле
}

// Обновите импорт addExpedition, если он принимает объект с новыми полями.
// Предполагаем, что ваш 'createdExpeditionsSlice' будет обновлен для работы с этим типом.
// Пример: export const addExpedition = createAction<Expedition>('expeditions/addExpedition');
// Важно: если ваш `addExpedition` принимает только часть полей, убедитесь, что Redux slice корректно обрабатывает это.
import { addExpedition } from '../redux/slices/createdExpeditionsSlice';

const CreateMissionScreen: React.FC<CreateMissionScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [rocket, setRocket] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Новые состояния для дополнительных полей
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [missionStatus, setMissionStatus] = useState<string>('');
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);
  const [estimatedDuration, setEstimatedDuration] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const dispatch = useDispatch();

  const [showRocketOptions, setShowRocketOptions] = useState<boolean>(false);
  const [showGoalOptions, setShowGoalOptions] = useState<boolean>(false); // Изменено с missionOptions на goalOptions

  const rocketOptions: string[] = ['Falcon 9', 'Starship', 'Soyuz', 'Atlas V', 'New Glenn'];
  const goalOptions: string[] = ['Mars Exploration', 'Lunar Landing', 'ISS Supply', 'Satellite Launch', 'Space Tourism', 'Asteroid Mining'];
  const missionStatusOptions: string[] = ['Planned', 'Active', 'Completed', 'Failed', 'Aborted'];


  const handleSave = () => {
    const newExpedition: Expedition = {
      id: Math.random().toString(36).substring(2, 9), // Простой способ сгенерировать ID
      name,
      goal,
      purpose,
      rocket,
      reason,
      note,
      imageUri,
      launchDate: launchDate ? launchDate.toISOString().split('T')[0] : null, // Форматируем дату в строку 'YYYY-MM-DD'
      missionStatus,
      estimatedDuration,
      payload,
    };
    dispatch(addExpedition(newExpedition));
    navigation.goBack();
  };

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }
        if (response.errorCode) {
          console.warn('ImagePicker Error: ', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || launchDate;
    setShowDatePicker(Platform.OS === 'ios'); // Скрыть после выбора на iOS
    setLaunchDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create New Mission</Text>

      <TouchableOpacity style={styles.imageBox} onPress={handlePickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imageText}>Add Mission Image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.labelRed}>Mission Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Orion Belt Research"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Purpose of Mission</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Study cosmic dust composition"
        placeholderTextColor="#999"
        value={purpose}
        onChangeText={setPurpose}
      />

      <Text style={styles.label}>Reason for Mission</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Expand human knowledge"
        placeholderTextColor="#999"
        value={reason}
        onChangeText={setReason}
      />

      {/* New: Launch Date */}
      <Text style={styles.label}>Launch Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.selector}>
        <Text style={styles.selectorText}>
          {launchDate ? launchDate.toLocaleDateString() : 'Select Launch Date'}
        </Text>
        <Text style={styles.selectorArrow}>📅</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={launchDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          textColor="white" // Работает на iOS
        />
      )}

      {/* New: Estimated Duration */}
      <Text style={styles.label}>Estimated Duration</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30 days, 1 year"
        placeholderTextColor="#999"
        value={estimatedDuration}
        onChangeText={setEstimatedDuration}
        keyboardType="default"
      />

      {/* New: Payload */}
      <Text style={styles.label}>Payload</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Scientific instruments, Rover"
        placeholderTextColor="#999"
        value={payload}
        onChangeText={setPayload}
      />

      {/* Rocket Selector */}
      <Text style={styles.label}>Select Rocket</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowRocketOptions(!showRocketOptions)}>
        <Text style={styles.selectorText}>{rocket || 'Choose Rocket Type'}</Text>
        <Text style={styles.selectorArrow}>🚀</Text>
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

      {/* Goal/Mission Type Selector */}
      <Text style={styles.label}>Mission Type</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowGoalOptions(!showGoalOptions)}>
        <Text style={styles.selectorText}>{goal || 'Choose Mission Goal'}</Text>
        <Text style={styles.selectorArrow}>🛰️</Text>
      </TouchableOpacity>
      {showGoalOptions && goalOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionButton}
          onPress={() => {
            setGoal(item);
            setShowGoalOptions(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* New: Mission Status Selector */}
      <Text style={styles.label}>Mission Status</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowStatusOptions(!showStatusOptions)}>
        <Text style={styles.selectorText}>{missionStatus || 'Select Current Status'}</Text>
        <Text style={styles.selectorArrow}>✅</Text>
      </TouchableOpacity>
      {showStatusOptions && missionStatusOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionButton}
          onPress={() => {
            setMissionStatus(item);
            setShowStatusOptions(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.noteLabel}>Additional Notes</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Add any additional details or notes here..."
        placeholderTextColor="#ccc"
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Mission</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateMissionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 40, // Reduced top padding to make more space for content
    backgroundColor: '#000',
    flexGrow: 1,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Slightly rounded corners for images
    resizeMode: 'cover',
  },
  header: {
    color: '#FFD700', // Gold color for header
    fontSize: 26, // Larger header
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  optionButton: {
    backgroundColor: '#2A2A2A', // Darker background for options
    padding: 14, // Slightly more padding
    borderRadius: 8, // Rounded corners
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#444',
  },
  optionText: {
    color: '#E0E0E0', // Lighter text for options
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1E1E1E', // Very dark background for inputs
    color: '#E0E0E0', // Light text color
    borderRadius: 8, // Rounded corners
    padding: 14,
    marginBottom: 15, // More space between inputs
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444', // Subtle border
  },
  imageBox: {
    height: 180, // Slightly reduced height
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden', // Ensure image respects border radius
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border for image box
  },
  imageText: {
    color: '#FFD700', // Gold text for "Add Picture"
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelRed: {
    color: '#FF6347', // Tomato red for primary label
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    textTransform: 'uppercase', // Uppercase for labels
    letterSpacing: 0.5,
  },
  label: {
    color: '#B0C4DE', // Lighter grey/blue for general labels
    fontSize: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selector: {
    backgroundColor: '#FFD93D', // Original yellow for selector
    padding: 16,
    borderRadius: 8, // Rounded corners
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8, // Reduced margin top
    marginBottom: 15, // Add margin bottom for selector
    borderWidth: 1,
    borderColor: '#FFD700', // Gold border for selector
  },
  selectorText: {
    color: '#1A1A1A', // Darker text for better contrast on yellow
    fontWeight: '700', // Bolder
    fontSize: 16,
  },
  selectorArrow: {
    fontSize: 20,
    color: '#1A1A1A', // Darker arrow
  },
  noteLabel: {
    color: '#B0C4DE',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noteInput: {
    backgroundColor: '#36454F', // Charcoal grey for notes
    color: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    minHeight: 100, // Taller note input
    textAlignVertical: 'top', // For multiline text input on Android
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  saveButton: {
    backgroundColor: '#FF4500', // Orange-red for save button
    padding: 18, // More padding
    borderRadius: 8, // Rounded corners
    marginTop: 35, // More margin top
    alignItems: 'center',
    shadowColor: '#FF4500', // Reddish shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  saveText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
