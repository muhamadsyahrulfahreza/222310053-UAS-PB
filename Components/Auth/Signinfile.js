import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New state for password visibility

  const handleSignIn = () => {
    // Validasi email dan password
    if (!email || !password) {
      Alert.alert('Error', 'Silakan isi email dan password');
      return;
    }

    // Proses autentikasi
    if (email === 'user' && password === '123') {
      Alert.alert('Success', 'Sign in berhasil');
      navigation.navigate('Home'); // Pastikan nama route sama dengan yang ada di navigator
    } else {
      Alert.alert('Error', 'Email atau password salah');
    }
  };

  const handleForgotPassword = () => {
    // Aksi ketika tombol lupa kata sandi ditekan
    console.log('Forgot Password pressed');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ImageBackground source={require('../../assets/media/image.png')} style={styles.container}>
      <Image source={require('../../assets/media/IBIK.png')} style={styles.logo} />
      <Text style={styles.perintah}>Masukkan akun kamu!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey" 
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="grey" 
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on state
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
          <Ionicons 
            name={isPasswordVisible ? 'eye-off' : 'eye'} 
            size={20} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.text}>Lupa kata sandi?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
        <Text style={{ color: 'white', textAlign: 'center', lineHeight: 25 }}>Sign In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    resizeMode: 'cover', 
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#393C78',
    borderRadius: 15,
    color: 'white'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#393C78',
  },
  inputPassword: {
    height: 40,
    flex: 1,
    padding: 10,
    color: 'white',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#393C78',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  btn: {
    width: 100, // Adjusted button width for better touchable area
    height: 50, // Adjusted button height for better touchable area
    backgroundColor:'#393C78',
    borderRadius: 10,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    marginTop: 20, // Adjusted margin for better layout
  },
  perintah: {
    fontWeight: '600', // Adjusted font weight for consistency
    fontSize: 20, // Adjusted font size for better readability
    color: 'black',
    marginBottom: 30
  },
  text: {
    color: 'red',
    marginBottom: 20, // Added margin for spacing
  }
});

export default SignInScreen;
