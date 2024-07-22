import React, { useState, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity, TextInput } from 'react-native';

const Verifikasi = ({ navigation }) => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleTextChange = (text, index) => {
        // Validate input to only accept numbers
        if (/^\d+$/.test(text) || text === '') {
            let updatedCodes = [...verificationCode];
            updatedCodes[index] = text;
            setVerificationCode(updatedCodes);

            // Move focus to next input
            if (index < 5 && text !== '') {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleLanjut = () => {
        // Here you can validate the verification code and proceed with navigation
        // For demo purpose, just navigate to SignIn screen
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/media/images.png')} style={styles.logo} />
            <Text style={styles.perintah}>Verifikasi Akun Anda!</Text>
            <Text style={styles.text}>Masukkan kode Verifikasi</Text>
            <View style={styles.innerContainer}>
                {verificationCode.map((item, index) => (
                    <TextInput
                        key={index}
                        ref={(input) => (inputs.current[index] = input)}
                        style={styles.box}
                        keyboardType="numeric"
                        maxLength={1}
                        value={item}
                        onChangeText={(text) => handleTextChange(text, index)}
                    />
                ))}
            </View>

            <Text style={styles.kata}>Belum mendapat kode? Kirim ulang!</Text>
            <TouchableOpacity style={styles.btn} onPress={handleLanjut}>
                <Text style={{ color: 'white', textAlign: 'center', lineHeight: 25 }}>Lanjut</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#393C78',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        // Reduce marginBottom to ensure button visibility
        marginBottom: 10,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    btn: {
        width: '80%',
        backgroundColor: '#393C78',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 12,
    },
    perintah: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        marginBottom: 30,
        textAlign: 'center', // Ensure perintah is centered
    },
    text: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        marginLeft: 25,
        alignSelf: 'flex-start',
    },
    kata: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        marginLeft: 25,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 170,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 24,
    },
});

export default Verifikasi;
