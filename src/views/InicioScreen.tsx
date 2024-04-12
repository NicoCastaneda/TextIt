//rnf

import { View, Text, Image, ScrollView, Modal, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
const poppinsFont = 'Poppins-Regular';

export default function InicioScreen({ navigation, route }: any) {
    return (
        <ImageBackground source={require('../assets/InicioScreenBackground.png')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.welcomeTitle}>¡Welcome to Text It!</Text>
                    <Text style={styles.title}>Connect friends easily & quickly</Text>
                    <Text style={styles.description}>Our chat app is the perfect way to stay connected with friends and family.</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.version}>v1.0.0</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
    },
    content: {
        alignItems: 'flex-start',
    },
    welcomeTitle: {
        fontSize: 50,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 25,
    },
    title: {
        fontFamily: poppinsFont,
        fontSize: 65,
        color: '#FFFFFF',
        textAlign: 'left',
        marginBottom: 25,
    },
    description: {
        fontFamily: poppinsFont,
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'left',
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 12,
        paddingHorizontal: 150,
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
    },
    buttonText: {
        fontFamily: poppinsFont,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
    },
    version: {
        fontFamily: poppinsFont,
        fontSize: 14,
        color: '#FFFFFF',
    },
});
