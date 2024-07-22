import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.profileText}>Profile</Text>
            <View style={styles.profilePict}>
                <Image source={require('../../assets/media/risma.jpeg')} style={styles.imageProf} />
                <Text style={styles.nameText}>Risma Handayani</Text>
                <Text style={styles.accountText}>risma1@gmail.com</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Ionicons name="person" size={24} color="#393C78" /> 
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoTitle}>Jenis Kelamin</Text>
                        <Text style={styles.infoText}>Perempuan</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <MaterialIcons name="cake" size={24} color="#393C78" />
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoTitle}>Tanggal Lahir</Text>
                        <Text style={styles.infoText}>24 - Juni - 2004</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Ionicons name="call" size={24} color="#393C78" />
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoTitle}>Telepon</Text>
                        <Text style={styles.infoText}>08571223456</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Ionicons name="location" size={24} color="#393C78" />
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoTitle}>Lokasi</Text>
                        <Text style={styles.infoText}>Kota Bogor</Text>
                    </View>
                </View>
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
    profilePict: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,

    },
    imageProf: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 15,
    },
    accountText: {
        fontSize: 15,
        color: '#393C78',
        paddingVertical: 5,
        textDecorationLine: 'underline',
        marginBottom: 28
        
    },
    nameText: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#393C78',
        paddingVertical: 5,
    },
    profileText: {
        fontSize: 30,
        // fontFamily: 'Times New Roman',
        fontStyle: 'italic',
        color: '#393C78',
        paddingVertical: 20,
        marginBottom: 15,
       
    },
    infoContainer: {
        width: '80%',
        height: '35%'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoColumn: {
        marginLeft: 10,
    },
    infoTitle: {
        fontSize: 16,
        color: '#393C78',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#393C78',
    },
    divider: {
        borderBottomColor: '#393C78',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});

export default Profile;
