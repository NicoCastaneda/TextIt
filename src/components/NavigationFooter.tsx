import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export function NavigationFooter() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Settings pressed')}>
        <Image source={require('../assets/iconSettings.png')} style={styles.icon} />
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Messages pressed')}>
        <Image source={require('../assets/iconMessage.png')} style={styles.icon} />
        <Text style={styles.text}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Profile pressed')}>
        <Image source={require('../assets/iconMiPerfil.png')} style={styles.iconProfile} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80, 
    borderTopWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#0C1033',
  },
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconProfile: {
    height: 35,
    width: 35,
    marginBottom: 4,
  },
  icon: {
    height: 30,
    width: 30,
    marginBottom: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});