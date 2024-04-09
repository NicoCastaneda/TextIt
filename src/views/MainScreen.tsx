
/*
return (
  <View>
    <Text style={{color: 'black', fontSize: 70}}>Main Screen</Text>

    <Text style={{color: 'black', fontSize: 30}}>nombre: {state.name}</Text>
    <Text style={{color: 'black', fontSize: 30}}>numero: {state.phone}</Text>
    <Text style={{color: 'black', fontSize: 30}}>email: {state.email}</Text>

    
  </View>
)*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChatCard } from '../components/ChatCard';
import { NavigationFooter } from '../components/NavigationFooter';

export default function Component({ navigation, route }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Login")}>
          <Image source={require('../assets/iconLogout.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chats</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Search pressed')}>
            <Image source={require('../assets/iconSearch.png')} style={styles.icon} />
          </TouchableOpacity>
         
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Chat")}>
            <Image source={require('../assets/iconSearch.png')} style={styles.icon} />
          </TouchableOpacity>
         
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.chatContainer}>
            <ChatCard
            sender="Alice"
            time="Now"
            message="Hey, how's it going?"
            avatarSource={require('../assets/iconPerfil.png')}
          />
          
          <ChatCard
            sender="Bob"
            time="2m ago"
            message="Did you see the game last night?"
            avatarSource={require('../assets/iconPerfil.png')}
          />
          <ChatCard
            sender="Charlie"
            time="5m ago"
            message="Ready for the meeting?"
            avatarSource={require('../assets/iconPerfil.png')}
          />
        </View>
      </View>
      <NavigationFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: '#0C1033',
  },
  titleContainer: {
    flex: 1, 
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
    padding: 7,
  },
  chatContainer: {
    padding: 16
  },
});
