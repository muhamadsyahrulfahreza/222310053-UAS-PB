import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Validasi input
    if (!name || !email || !password) {
      Alert.alert('Error', 'Silakan lengkapi semua kolom');
      return;
    }

    // Proses pendaftaran (contoh sederhana, biasanya menggunakan API untuk pendaftaran)
    // Di sini bisa disimpan ke database atau melakukan pengiriman data ke server
    console.log('Username:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    Alert.alert('Success', 'Pendaftaran berhasil');
    // Setelah pendaftaran berhasil, bisa diarahkan ke halaman lain atau dilakukan aksi lainnya
    navigation.navigate('Verifikasi');
  };

  return (
    <ImageBackground source={require('../../assets/media/image.png')} style={styles.container}>
      <Image source={require('../../assets/media/images.png')} style={styles.logo} />
      <Text style={styles.perintah}>Buat akun kamu!</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setUsername(text)}
        value={name}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity >
        <Text style={styles.text}>Lupa kata sandi?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
        <Text style={{ color: 'white', textAlign: 'center', lineHeight: 25 }}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  perintah: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#393C78',
    color : 'white'
  },
  btn: {
    width: '80%',
    backgroundColor: '#393C78',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 12,
  },
  text: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignUpScreen;
