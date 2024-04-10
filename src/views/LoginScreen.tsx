import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Image, Alert } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, route }: any) {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {state, onChange} = useContext(AuthContext);

  const showAuthAlert = () => {
    Alert.alert(
      "Error",
      "User not found. Please check your email and password or register a new account.",
      [{ text: "OK" }]
    );
  }

  const login = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
        onChange(user.name, user.phone, user.email, user.password, user.secCode);
        navigation.navigate("Main");
    } else {
        showAuthAlert();
    }
  };
  
  return (
          <View style={styles.container}>
            <Image
          source={require('../assets/logoTextit.png')}
          style={styles.logo}
        />
        
              <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Login</Text>
                  <Text style={styles.cardDescription}>Enter your email and password </Text>
              </View>
              <View style={styles.cardContent}>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.input}
                          onChangeText={setEmail}
                          placeholder='Email'
                          value={email}
                          placeholderTextColor={'gray'}
                      />
                      <TextInput
                          style={styles.input}
                          onChangeText={setPassword}
                          placeholder='Password'
                          value={password}
                          placeholderTextColor={'gray'}
                          secureTextEntry
                      />
                  </View>
              </View>
              <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.button}
                   onPress={login}>
                      <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
              </View>
              
              <View style={styles.buttonColumn}>
                 <Text style={styles.noAccLabel}>Don't have an account?</Text>
                  <TouchableOpacity style={styles.SignUpButton}
                  onPress={() => navigation.navigate("Register")}>
                      <Text style={styles.SUButtonText}>Sign up</Text>
                  </TouchableOpacity>
              </View>
                 
              
          </View>
  );
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch', // Cambiado a 'stretch' para que los elementos ocupen el ancho máximo
      paddingHorizontal: 30,
      backgroundColor: '#E8F0F1',
  },
  logo: {
    marginTop: -100,
    marginBottom: 5,
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  cardHeader: {
      alignItems: 'flex-start',
      marginBottom: 16,
  },
  cardTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: '#000000',
  },
  cardDescription: {
      fontSize: 18,
      textAlign: 'left',
      color: '#000000',
      marginBottom: 30,
  },
  cardContent: {
      marginBottom: 16,
  },
  inputContainer: {
      marginBottom: 30,
  },
  label: {
      fontSize: 18,
      marginBottom: 8,
      color: '#000000',
  },
  input: {
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#BDC3FF',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#000000',
      width: '100%', 
      marginBottom: 16,
  },
  cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  buttonColumn: {
    flexDirection: 'column',
  },
  button: {
      backgroundColor: '#0C1033',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
  },
  buttonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  SignUpButton:{
      backgroundColor: '#FFFFFF',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 20,
      borderColor: '#0C1033',
      borderWidth: 2,
  },
  SUButtonText:{
      fontSize: 18,
      color: '#0C1033',
      fontWeight: 'bold',
  
  },
  noAccLabel:{
      fontSize: 18,
      color: '#000000',
      marginBottom: -15,
      marginTop: 20
  },
});
