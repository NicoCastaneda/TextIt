import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Modal, TextInput } from 'react-native';
import { ChatCard, ChatCardProps } from '../components/ChatCard';
import { NavigationFooter } from '../components/NavigationFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ navigation, route }: any) {

  const [chats, setChats] = useState<ChatCardProps[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    const loadChats = async () => {
      const storedChats = await AsyncStorage.getItem('chats');

      if (storedChats) {
        setChats(JSON.parse(storedChats));
      }
      else{
        setChats([]);
      }
    };

    loadChats();
  }, []);

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {chats.map((chat, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('Chat', { chatId: index })}>
              <ChatCard
                sender={chat.sender}
                time={chat.time}
                message={chat.message}
                avatarSource={require('../assets/iconPerfil.png')}
              />
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Button title="+" onPress={() => setModalVisible(true)} />
      <NavigationFooter navigation={navigation} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              placeholder="Enter chat name"
              onChangeText={text => setChatName(text)}
            />
            <Button
              title="Add Chat"
              onPress={async () => {
                // Crea un nuevo chat con el nombre ingresado por el usuario
                const newChat = {
                  sender: chatName,
                  time: new Date().toISOString(),
                  message: '',
                  avatarSource: require('../assets/iconPerfil.png'),
                };

                // Añade el nuevo chat al estado
                const updatedChats = [...(chats || []), newChat];
                setChats(updatedChats);

                // Guarda los chats actualizados en AsyncStorage
                await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));

                // Limpia el nombre del chat y cierra el modal
                setChatName('');
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollContainer: {

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
