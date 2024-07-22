import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, FlatList, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Pendaftaran = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hallo! Silahkan Pilih Pertanyaan: ', type: 'bot' },
    { id: '2', text: '1. Berapa Biaya Pendaftaran\n2. Kapan Batas Waktu Pendaftaran\n3. Isi Data Diri\n4. Pilih Jurusan\n', type: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isFillingData, setIsFillingData] = useState(false);
  const [isSelectingMajor, setIsSelectingMajor] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [remainingQuestions, setRemainingQuestions] = useState([
    { id: 1, text: 'Berapa Biaya Pendaftaran' },
    { id: 2, text: 'Kapan Batas Waktu Pendaftaran' },
    { id: 3, text: 'Isi Data Diri' },
    { id: 4, text: 'Pilih Jurusan' },
  ]);
  const [userData, setUserData] = useState({
    nama: '',
    tanggalLahir: '',
    jenisKelamin: '',
    nik: '',
    email: '',
    nomorTelepon: '',
    jurusan: '',
  });
  const flatListRef = useRef(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const questions = {
    1: 'Biaya Pendaftaraan: Rp.500.000',
    2: 'Batas waktu pendaftaran adalah 30 Agustus 2024',
    3: 'Anda memilih: Isi Data Diri\n\nSilakan masukkan data Anda:\nNama:\nTanggal Lahir:\nJenis Kelamin:\nNIK:\nEmail:\nNomor Telepon:',
    4: 'Anda memilih: Pilih Jurusan\n\nSilakan pilih jurusan yang diinginkan:'
  };

  const handleSend = () => {
    if (input.trim()) {
      const selectedQuestion = parseInt(input.trim());
      const newMessage = { id: Date.now().toString(), text: input, type: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      setTimeout(() => {
        let botResponseText;
        if (selectedQuestion === 3) {
          setIsFillingData(true);
          setIsSelectingMajor(false);
          botResponseText = questions[selectedQuestion];
        } else if (selectedQuestion === 4) {
          setIsSelectingMajor(true);
          setIsFillingData(false);
          botResponseText = questions[selectedQuestion];
        } else if (questions[selectedQuestion]) {
          botResponseText = questions[selectedQuestion];
        } else {
          botResponseText = 'Maaf, saya tidak mengerti. Silakan pilih salah satu dari opsi berikut:';
        }

        if (botResponseText) {
          const botResponse = { id: Date.now().toString(), text: botResponseText, type: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);

          const updatedRemainingQuestions = remainingQuestions.filter(q => q.id !== selectedQuestion);
          setRemainingQuestions(updatedRemainingQuestions);

          if (updatedRemainingQuestions.length > 0 && selectedQuestion !== 3 && selectedQuestion !== 4) {
            const remainingQuestionsMessage = {
              id: Date.now().toString(),
              text: updatedRemainingQuestions.map(q => `${q.id}. ${q.text}`).join('\n'),
              type: 'bot'
            };
            setMessages(prevMessages => [...prevMessages, remainingQuestionsMessage]);
          }
        }

        flatListRef.current.scrollToEnd({ animated: true });
      }, 1000);
    }
  };

  const handleFormSubmit = () => {
    let formattedData = '';

    if (isFillingData) {
      if (validateUserData()) {
        formattedData = `Nama: ${userData.nama}\nTanggal Lahir: ${userData.tanggalLahir}\nJenis Kelamin: ${userData.jenisKelamin}\nNIK: ${userData.nik}\nEmail: ${userData.email}\nNomor Telepon: ${userData.nomorTelepon}`;
        setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: formattedData, type: 'user' }]);
      } else {
        Alert.alert('Maaf', 'Anda belum mengisi semua data diri');
        return;
      }
    } else if (isSelectingMajor) {
      if (!selectedMajor) {
        Alert.alert('Maaf', 'Silakan pilih jurusan terlebih dahulu');
        return;
      }
      formattedData = `Jurusan: ${selectedMajor}`;
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: formattedData, type: 'user' }]);
    }

    setIsFillingData(false);
    setIsSelectingMajor(false);
    setUserData({
      nama: '',
      tanggalLahir: '',
      jenisKelamin: '',
      nik: '',
      email: '',
      nomorTelepon: '',
      jurusan: '',
    });
    setSelectedMajor('');

    setTimeout(() => {
      const botResponse = { id: Date.now().toString(), text: 'Data sudah tersimpan.', type: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);

      if (remainingQuestions.length > 0) {
        const remainingQuestionsMessage = {
          id: Date.now().toString(),
          text: remainingQuestions.map(q => `${q.id}. ${q.text}`).join('\n'),
          type: 'bot'
        };
        setMessages(prevMessages => [...prevMessages, remainingQuestionsMessage]);
      }

      flatListRef.current.scrollToEnd({ animated: true });
    }, 1000);
  };

  const validateUserData = () => {
    return (
      userData.nama !== '' &&
      userData.tanggalLahir !== '' &&
      userData.jenisKelamin !== '' &&
      userData.nik !== '' &&
      userData.email !== '' &&
      userData.nomorTelepon !== ''
    );
  };

  const onKeyboardShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const adjustedHeight = keyboardHeight - 175;
    setKeyboardOffset(adjustedHeight > 0 ? adjustedHeight : 0);
  };

  const onKeyboardHide = () => {
    setKeyboardOffset(0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={[styles.innerContainer, { paddingBottom: keyboardOffset }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.type === 'bot' ? styles.botMessage : styles.userMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        {isFillingData ? (
          <ScrollView style={styles.IsiDataDiri} keyboardShouldPersistTaps="handled">
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={userData.nama}
              onChangeText={(text) => setUserData({ ...userData, nama: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Tanggal Lahir"
              value={userData.tanggalLahir}
              onChangeText={(text) => setUserData({ ...userData, tanggalLahir: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis Kelamin"
              value={userData.jenisKelamin}
              onChangeText={(text) => setUserData({ ...userData, jenisKelamin: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="NIK"
              value={userData.nik}
              onChangeText={(text) => setUserData({ ...userData, nik: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nomor Telepon"
              value={userData.nomorTelepon}
              onChangeText={(text) => setUserData({ ...userData, nomorTelepon: text })}
            />
            <TouchableOpacity style={styles.sendButtonDataDiri} onPress={handleFormSubmit}>
              <Text style={styles.sendButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : isSelectingMajor ? (
          <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
            <Picker
              selectedValue={selectedMajor}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMajor(itemValue)}
            >
              <Picker.Item label="Pilih jurusan" value="" />
              <Picker.Item label="Teknologi Informasi" value="Teknologi Informasi" />
              <Picker.Item label="Sistem Informasi" value="Sistem Informasi" />
              <Picker.Item label="Manajemen" value="Manajemen" />
              {/* Tambahkan opsi jurusan lainnya di sini */}
            </Picker>
            <TouchableOpacity style={styles.sendButtonJurusan} onPress={handleFormSubmit}>
              <Text style={styles.sendButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 5,
    maxHeight: '100%'
  },
  botMessage: {
    backgroundColor: '#393C78',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: 'white', 
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#393C78',
    borderRadius: 5,
    marginLeft: 10,
    height: 50,
  },
  sendButtonDataDiri: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#393C78',
    borderRadius: 5,
    height: 30,
    marginBottom: 5,
    margin: 10,
  },
  sendButtonJurusan: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: '#393C78',
    borderRadius: 5,
    height: 30,
    margin: 10,
  },
  sendButtonText: {
    color: 'white',
  },
  formContainer: {
    flex: 1,
    paddingBottom: 110,
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
  },
  IsiDataDiri: {
    flex: 1,
    paddingBottom: 325,
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default Pendaftaran;
