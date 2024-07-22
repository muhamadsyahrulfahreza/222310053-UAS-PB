import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Status = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/media/images.png')} style={styles.logo} />
            <View style={styles.status}>
                <Ionicons name="checkmark-circle" size={40} color="white" style={styles.icon} />
                <Text style={styles.statusText}>Selamat Anda Telah Diterima di Institut Bisnis dan Informatika Kesatuan!</Text>
            </View>
            <View style={styles.quote}>
                <Text style={styles.quoteText}>"Selamat atas pencapaianmu! Lulus dari Institut Bisnis dan Informatika Kesatuan adalah tonggak awal dari perjalananmu menuju impian yang lebih besar. Semangat untuk langkah-langkah selanjutnya!"</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 115,
    },
    logo: {
        marginTop: 20,
        width: 75,
        height: 75,
        marginBottom: 24,
    },
    status: {
        flex: 1,
        width: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#393C78',
        padding: 50,
        marginBottom: 30,
    },
    statusText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center', 
        width: '100%',
    },
    icon: {
        marginBottom: 10,
    },
    quote: {
        flex: 1,
        width: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#393C78',
        padding: 20,
        marginTop: 15
    },
    quoteText: {
        color: 'white',
        textAlign: 'center', // Menyelaraskan teks di tengah
    },
});

export default Status;