import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HistoryScreen( {navigation, route}: any) {
  return (
    <View>
      <Text>HistoryScreen</Text>

      <TouchableOpacity
            onPress={()=> navigation.navigate("Home")}>
                <View>
                    <Text style={{color: "white"}}>IR A HOME</Text>
                </View>
            </TouchableOpacity>
    </View>
  )
}