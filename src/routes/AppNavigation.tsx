import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../views/InicioScreen';
import LoginScreen from '../views/LoginScreen';
import ProfileScreen from '../views/ProfileScreen';
import MainScreen from '../views/MainScreen';
import RegisterScreen from '../views/RegisterScreen';
import ChatScreen from '../views/ChatScreen';


const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>{
      <Stack.Navigator
        initialRouteName='Inicio'
      >
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Sign Up" }} />
        <Stack.Screen name="Chat" component={ChatScreen}  />

      </Stack.Navigator>
    }</NavigationContainer>
  );
}