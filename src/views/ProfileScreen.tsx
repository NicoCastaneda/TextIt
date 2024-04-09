import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { NavigationFooter } from '../components/NavigationFooter';

export default function ProfileScreen({ navigation, route }: any) {
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Your TextIt Profile</Text>
        <Image source={require('../assets/iconPerfil.png')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{state.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Number</Text>
          <Text style={styles.value}>{state.phone}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{state.email}</Text>
        </View>
      </ScrollView>
      <NavigationFooter navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#0C1033'
  },
  infoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0C1033'
  },
  value: {
    fontSize: 25,
    color: 'black',
  },
});
