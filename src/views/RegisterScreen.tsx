import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen({ navigation, route }: any) {
    const { onChange } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secCode, setSecCode] = useState('');

    // crear un usuario y actualizar el estado
    const registro = async () => {
        onChange(name, phone, email, password, secCode)

        if (secCode !== '1234') {
            showAlert();
        }
        else {
            const newUser = { name, phone, email, password };
            const users = JSON.parse(await AsyncStorage.getItem('users') || '[]');
            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));

            navigation.navigate("Login")
        }
    };

    const isAnyFieldEmpty = () => {
        return !name || !phone || !email || !password;
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.description}>Enter your information to create an account</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} onChangeText={setName} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={setPhone} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} keyboardType="email-address" onChangeText={setEmail} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true} />
                </View>
                <TouchableOpacity style={[styles.button, isAnyFieldEmpty() && styles.disabledButton]}
                    onPress={() => setModalVisible(true)} disabled={isAnyFieldEmpty()} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>A 4-digit security code was sent to your phone</Text>
                        <Text style={styles.modalLabel}>Enter your security code:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSecCode}
                            placeholder="######"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={[styles.button, { marginTop: 40 }]}
                            onPress={registro}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 16,
        maxWidth: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    section: {
        marginBottom: 24,
    },
    description: {

        fontSize: 20,
        color: '#000000',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#000000',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#0C1033',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#0C1033',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#BDC3FF',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 40,
        shadowColor: '#000000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
    },
    modalLabel: {
        fontSize: 20,
        marginBottom: 40,
        marginTop: 15,
        color: '#000000',
        fontWeight: 'bold',
    },

});

const showAlert = () => {
    Alert.alert(
        'ERROR',
        'El código de seguridad es incorrecto',
        [
            { text: 'OK' }
        ]
    );
};