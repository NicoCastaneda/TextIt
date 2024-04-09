//rnf

import { View, Text, Image, ScrollView, Modal, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'




/*
const baseTranslateURL = "https://swift-translate.p.rapidapi.com/translate";

export default function InicioScreen( {navigation, route}: any) {

    //hooks
    //estructura: [variable, funcion]
    const [list, setList] = useState([] as Cat[]);
    const [isLoading, setIsLoading] = useState(false);
    const [numGatos, setNumGatos] = useState(10);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [dataModal, setDataModal] = useState({} as any);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('https://meowfacts.herokuapp.com/?count=' + numGatos);
            const response2 = await axios.get('https://api.thecatapi.com/v1/images/search?limit=' + numGatos);

            if (response.status == 200 && response2.status == 200) {
                const newList = []
                for (var i = 0; i < numGatos; i++) {
                    const newObj = {
                        id: i,
                        text: response.data.data[i],
                        url: response2.data[i].url
                    }
                    newList.push(newObj);
                }
                setList(newList);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getTranslation = async (itemText: String, idItem: number) => {
        const body = {
            text: itemText,
            sourceLang: "en",
            targetLang: "es"
        }
        const headers = {
            "X-RapidAPI-Key": "bd61e28000msh611526b6fc0c620p1155dejsnd52dce060b93",
            "X-RapidAPI-Host": "swift-translate.p.rapidapi.com"
        }

        try {
            const response = await axios.post(baseTranslateURL, body, { headers });

            if (response.status == 200) {
                setDataModal({
                    ...list[idItem],
                    translatedText: response.data.translatedText
                })
                setIsVisibleModal(true)
            }
        } catch (error) {
            console.log('Hubo un error al traducir: ', error);
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#0a151c',
                padding: 15,
            }}
        >

            <TouchableOpacity
            onPress={()=> navigation.navigate("Login")}>
                <View>
                    <Text style={{color: "white"}}>IR A LOGIN</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Profile")}>
                <View>
                    <Text style={{color: "white"}}>IR A PERFIL</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Favorites")}>
                <View>
                    <Text style={{color: "white"}}>IR A FAVORITOS</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate("History")}>
                <View>
                    <Text style={{color: "white"}}>IR A HISTORIAL</Text>
                </View>
            </TouchableOpacity>
        

            {
                list.map((item) => (
                    <CardCat
                        key={item.id} {...item}
                        onPress={() => getTranslation(item.text, item.id)}
                    />
                ))
            }

            <Modal visible={isVisibleModal} transparent animationType='fade'>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    alignItems: 'center',
                    padding: 20,
                    width: '95%',
                    minHeight: '90%',
                    position: 'relative',
                }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        marginBottom: 20,
                        marginTop: 20,
                        color: 'black',
                    }}>
                        Traducción
                    </Text>
                    <Image
                        style={{
                            width: 250,
                            height: 250,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        source={{ uri: dataModal.url }}
                    />
                    <Text style={{
                        fontSize: 18,
                        margin: 30,
                        color: 'black',
                        fontWeight: 'bold',
                    }}>
                        {dataModal.translatedText}
                    </Text>
        
                    <TouchableOpacity
                        onPress={() => setIsVisibleModal(false)}
                        style={{
                            position: 'absolute', 
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'blue',
                        }}>
                            ← Volver
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        


        </ScrollView>
    )
}
*/

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
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Login")}>
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
