import axios from "axios";
//import { isSpeakingAsync, speak, stop } from "expo-speech";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ChatBubble } from '../components/ChatBubble';

interface ChatMessage {
    role: string;
    parts: { text: string }[];
}

export default function ChatBot({ navigation, route }: any) {
    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    const API_KEY = 'AIzaSyBD9a96gRkiTsbnL9ExCBRVyLJaotFGvL8';
    
    const instruccion = "toma el rol de mi vecina lucia, actua como tal en el chat. Solo debes responder con lo que responderia esa persona, con respuestas muy cortas y simples.";

    const handleUserInput = async () => {
        const userInputWithInstruction = instruccion + userInput;
        const updatedChatWithUserInput: ChatMessage[] = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }], 
            },
        ];
   
        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: userInputWithInstruction }], 
                        }      
                    ]
                }
            );

            const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (modelResponse) {
                const updatedChatWithModel: ChatMessage[] = [
                    ...updatedChatWithUserInput,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updatedChatWithModel);
                setUserInput("");
            }
        } catch (error: any) {
            console.error("Error from Gemini pro", error);
            console.error("Error response:", error.response);
            setError("An error occurred. Please try again");
        } finally {
            setLoading(false);
        }
    };

    /*const handleSpeech = async (text: string) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };*/

    const renderChatItem = ({ item }: { item: ChatMessage }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat</Text>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={userInput}
                    onChangeText={setUserInput}
                    placeholder="Type here..."
                />
                <TouchableOpacity style={styles.button} onPress={handleUserInput} disabled={!userInput}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator style={styles.loading} color="#333" />}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: "#f9f9f9",
    },
    button: {
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 25,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    loading: {
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});
