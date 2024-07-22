import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/media/IBIK.png')} style={styles.logo} />
            <Text style={styles.judul}>Hallo, Risma!</Text>
            <Text style={styles.subJudul}>Tanyakan apapun perihal pendaftaran IBI Kesatuan</Text>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Pendaftaran')}>
                        <View style={styles.overlay}>
                            <Text style={styles.btnText}>Pendaftaran</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Jadwal Tes')}>
                        <View style={styles.overlay}>
                            <Text style={styles.btnText}>Jadwal Tes</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Status')}>
                        <View style={styles.overlay}>
                            <Text style={styles.btnText}>Status</Text>
                        </View>
                </TouchableOpacity>
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
        width: 100,
        height: 100,
        marginBottom: 24,
        marginTop: 150,
    },
    judul: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    subJudul: {
        // fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        marginBottom: 30,
        textAlign: 'center',
        maxWidth: 300
    },
    menu: {
        flexDirection: 'colomn', // Membuat tombol menjadi baris
        justifyContent: 'space-around',
        margin: 5,
        width: '100%', // Membuat tombol menyebar sepanjang lebar layar
        alignItems: 'center',
    },
    btn: {
        width: 175, // Sesuaikan lebar tombol
        height: 75, // Sesuaikan tinggi tombol
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 10,
        backgroundColor: '#393C78',
        margin: 10
        // Jarak antara tombol
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.50,
        // shadowRadius: 10,
        // elevation: 5,
    },
    // btnBackground: {
    //     flex: 1,
    //     marginTop: 10,
    //     width: 100,
    //     height: 75,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    imageStyle: {
        borderRadius: 10,
    },
    // overlay: {
    //     ...StyleSheet.absoluteFillObject,
    //     backgroundColor: 'rgba(255, 255, 255, 0.6)', // Efek opacity putih
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    btnText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;