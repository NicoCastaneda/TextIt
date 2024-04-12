import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface ChatCardProps {
  sender: string;
  time: string;
  message: string;
  lastMessage?: string;
  avatarSource: any;
  onDelete?: () => void;
}

export function ChatCard({ sender, time, message, lastMessage, avatarSource, onDelete }: ChatCardProps) {
  return (
    <View style={styles.chat}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.messageContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.sender}>{sender}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        {lastMessage && (
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        )}
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        {onDelete && <Image source={require('../assets/iconDelete.png')} style={styles.delIcon} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.9)',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  time: {
    fontSize: 12,
  },

  deleteButton: {
    backgroundColor: '#0C1033',
    padding: 8,
    borderRadius: 50,
    marginLeft: 15,
  },
  delIcon: {
    width: 20,
    height: 20,
  },
  message: {
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'rgba(128, 128, 128, 1)',
  },
});