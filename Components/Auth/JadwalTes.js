import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, ScrollView, Keyboard } from 'react-native';

const JadwalTes = ({ navigation }) => {
  // basicnya di react buat ngatur data butuh dua variable, buat get sama set
  // nah contohnya yg variable messages, input, isFillingData, isSelectingMajor, ini tuh variable buat get data
  // kalo yang setMessages, setInput, setIsFillingData, itu buat set datanya
  // variable set fungsinya buat memasukkan nilai ke varible get nya
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hallo!', type: 'bot' },
    { id: '2', text: 'Silakan pilih salah satu dari opsi berikut:\n1. Ketersediaan Jadwal Tes\n2. Lokasi Tes\n3. Apa Yang Perlu Dibawa Saat Tes Masuk', type: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [remainingQuestions, setRemainingQuestions] = useState([
    { id: 1, text: 'Ketersediaan Jadwal Tes' },
    { id: 2, text: 'Lokasi Tes' },
    { id: 3, text: 'Apa Yang Perlu Dibawa Saat Tes Masuk' },
  ]);

  const flatListRef = useRef(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const questions = {
    1: 'Jadwal tes yang tersedia:\nSenin, 1 Juli 2024\nPukul 07.30 WIB',
    2: 'Lokasi: IBI Kesatuan Bogor',
    3: 'Membawa alat tulis',
  };

   // function yang di gunakan untuk menghandle pertanyaan yg di input oleh user
  const handleSend = () => {
    if (input.trim()) {
      const selectedOption = parseInt(input.trim());
      const newMessage = { id: Date.now().toString(), text: input, type: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      // setTimeout ini function bawaan yang disini gunanya untuk menghandle balasan dari bot
      setTimeout(() => {
        let botResponseText;
        if (questions[selectedOption]) {
          botResponseText = questions[selectedOption];
          // Remove the selected question from remainingQuestions
          const updatedRemainingQuestions = remainingQuestions.filter(q => q.id !== selectedOption);
          setRemainingQuestions(updatedRemainingQuestions);
        } else {
          botResponseText = 'Maaf, saya tidak mengerti. Silakan pilih salah satu dari opsi berikut:';
        }

        const botResponse = { id: Date.now().toString(), text: botResponseText, type: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);

        const remainingOptions = remainingQuestions
          .filter(q => q.id !== selectedOption)
          .map(q => `${q.id}. ${q.text}`)
          .join('\n');

        if (remainingOptions && botResponseText !== 'Maaf, saya tidak mengerti. Silakan pilih salah satu dari opsi berikut:') {
          const remainingQuestionsMessage = {
            id: (Date.now() + 1).toString(),
            text: `Opsi pertanyaan tersisa:\n${remainingOptions}`,
            type: 'bot'
          };
          setMessages(prevMessages => [...prevMessages, remainingQuestionsMessage]);
        }

        flatListRef.current.scrollToEnd({ animated: true });
      }, 1000);
    }
  };

  // function ini gunanya untuk mengatur ketika keyboard dari hp muncul, agar si inputnya menyesuaikan dengan ukuran keyboard
  const onKeyboardShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const adjustedHeight = keyboardHeight - 175;
    // ternary (if else versi singkat) untuk mengatur tinggi nya colom input agar menyesuaikan tinggi keyboard hp
    // ini bisa di baca seperti jika adjustedHeight lebih besar dari 0 maka jalankan variable adjustedHeight yg sudah di atur di atas, apabila tidak lebih dari 0 maka value nya akan 0
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
      style={[styles.container, { paddingBottom: keyboardOffset }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.type === 'bot' ? styles.botMessage : styles.userMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.inputContainer}>
        <ScrollView>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
          />
        </ScrollView>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
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
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
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
    alignItems: 'center',
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
  sendButtonText: {
    color: 'white',
  },
});

export default JadwalTes;
