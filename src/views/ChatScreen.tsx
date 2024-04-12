import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ChatBubble } from '../components/ChatBubble';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChatMessage {
    role: string;
    parts: { text: string }[];
}

export default function ChatScreen({ navigation, route }: any) {
    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>({});
    const [lastMessage, setLastMessage] = useState<string | undefined>(route.params.lastMessage);
    //const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const { chatId, chatTitle } = route.params;
    const API_KEY = 'AIzaSyBD9a96gRkiTsbnL9ExCBRVyLJaotFGvL8';

    useEffect(() => {
        if (route.params?.lastMessage !== undefined) {
            setLastMessage(route.params.lastMessage);
        }
    }, [route.params?.lastMessage]);

    useEffect(() => {
        const loadChatHistory = async () => {
            const storedChats = await AsyncStorage.getItem('chats');
            if (storedChats) {
                const chats = JSON.parse(storedChats);
                const chatHistory = chats[chatId];
                if (chatHistory) {
                    setChat(chatHistory);
                } else {
                    setChat([]);
                }
            } else {
                setChat([]);
            }
        };

        loadChatHistory();


    }, []);

    useEffect(() => {
        const saveChatToStorage = async () => {
            try {
                const storedChats = await AsyncStorage.getItem('chats');
                let chats = [];
                if (storedChats) {
                    chats = JSON.parse(storedChats);
                }
                chats[chatId] = chat;
                await AsyncStorage.setItem('chats', JSON.stringify(chats));
            } catch (error) {
                console.error('Error saving chat to AsyncStorage:', error);
            }
        };

        saveChatToStorage();
    }, [chat]);

    const instruccion = "Tomarás un rol aleatorio para un chat de las siguientes opciones 1.Amigos 2.Compañeros de trabajo 3.comercio 4.clientes 5.vecinos 6.novia/esposa 7.hijos 8.otra familia(tios, primos, etc). Solo debes responder únicamemte con lo que responderia esa persona, nunca un 'este es mi rol' o '(vecino)', etc. Deberán ser respuestas cortas y sencillas, a veces amigables, a veces seco, recuerda que lo importante es la espontaneidad. Deberás mantener tu rol durante toda la conversación. No debes cambiar de rol una vez lo escojas por primera vez, tampoco debes agregar quien eres y que rol tomaste a menos que te lo pregunte y de igual forma deberas responder de acuerdo al tono y el contexto de la conversación, puedes proponer tema de conversación simulando eventos pasados o futuros, o puedes simplemente responder al mensaje. Mensaje: ";
    const handleUserInput = async () => {
        const userInputWithInstruction = instruccion + userInput;
        const updatedChatWithUserInput: ChatMessage = {
            role: "user",
            parts: [{ text: userInput }],
        };

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
                setChat(prevChat => {
                    const updatedChat = Array.isArray(prevChat) ? [...prevChat, updatedChatWithUserInput, { role: "model", parts: [{ text: modelResponse }] }] : [updatedChatWithUserInput, { role: "model", parts: [{ text: modelResponse }] }];
                    const lastModelMessage = updatedChat.filter(message => message.role === "model").pop();
                    if (lastModelMessage) {
                        setLastMessages(lastModelMessage.parts[0].text);
                    }
                    return updatedChat;
                });
                setUserInput("");

                setLastMessages(prevLastMessages => ({
                    ...prevLastMessages,
                    [chatId]: modelResponse,
                }));
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

    const renderChatItem = ({ item }: { item: ChatMessage }) => {
        // Verificar que 'parts' sea un array y tenga al menos un elemento
        if (Array.isArray(item.parts) && item.parts.length > 0) {
            return (
                <ChatBubble
                    role={item.role}
                    text={item.parts[0].text}
                />
            );
        } else {
            // Manejar el caso en el que 'parts' no sea un array o esté vacío
            return null; // o un mensaje de error, según sea necesario
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main', { lastMessage: lastMessage, chatId: chatId })} style={styles.backButton}>
                    <Image source={require('../assets/iconBack.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Image source={require('../assets/iconMiPerfil.png')} style={styles.profileImage} />
                <View >
                    <Text style={styles.title}>{chatTitle}</Text>
                </View>
            </View>
            <Text style={styles.title}>{chatTitle}</Text>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 70,
        backgroundColor: '#0C1033',
    },
    backButton: {
        marginRight: 12,
    },
    backIcon: {
        width: 30,
        height: 20,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        padding: 15,
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
        backgroundColor: '#0C1033',
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
