import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Components/Auth/Signinfile';
import SignUpScreen from './Components/Auth/SignUp';
import Verifikasi from './Components/Auth/Verifikasi';
import Home from './Components/Auth/Home';
import { Ionicons } from '@expo/vector-icons';
import Profile from './Components/Auth/Profile';
import Status from './Components/Auth/Status';
import Pendaftaran from './Components/Auth/Pendaftaran';
import JadwalTes from './Components/Auth/JadwalTes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        {/* <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{
            title: 'SignUp',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name="Verifikasi" 
          component={Verifikasi}  
          options={{
            title: 'Verifikasi',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }}
        /> */}
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}  
          options={{
            title: 'SignIn',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff',
            headerLeft: null,
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image source={require('./assets/media/risma.jpeg')} style={styles.imageProf} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile}  
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen 
          name="Status" 
          component={Status} 
          options={{
            title: 'Status',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name="Pendaftaran" 
          component={Pendaftaran} 
          options={{
            title: 'Pendaftaran',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name="Jadwal Tes" 
          component={JadwalTes} 
          options={{
            title: 'Jadwal Tes',
            headerStyle: {
              backgroundColor: '#393C78',
            },
            headerTintColor: '#fff'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  // buttonText: {
  //   color: '#393C78',
  //   fontSize: 16,
  // },
  imageProf: {
    width: 40, // tambahkan ukuran gambar
    height: 40, // tambahkan ukuran gambar
    borderRadius: 20, // membuat gambar menjadi lingkaran
    marginRight: 5
  },
});
