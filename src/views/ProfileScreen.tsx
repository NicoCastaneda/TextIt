import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ProfileScreen( {navigation, route}: any) {
  return (
    <View>
      <Text>ProfileScreen</Text>

      <TouchableOpacity
            onPress={()=> navigation.navigate("Favorites")}>
                <View>
                    <Text style={{color: "white"}}>IR A FAVORITOS</Text>
                </View>
            </TouchableOpacity>
    </View>
  )
}