import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatCradProps {
    sender: string;
    time: string;
    message: string;
    avatarSource: any;
    
}

export function ChatCard({ sender, time, message, avatarSource }: ChatCradProps) {
  return (
    <View style={styles.chat}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.messageContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.sender}>{sender}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
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
    fontSize: 16,
    color: 'black'
  },
  time: {
    fontSize: 12,
  },
  message: {
    fontSize: 14,
  },
});