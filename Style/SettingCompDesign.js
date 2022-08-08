import React from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
export default function SettingCompDesign({text,onPress}) {
    return (
      <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
          <Text style={{fontSize:15}}>{text}</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            </TouchableOpacity>
  )
}
