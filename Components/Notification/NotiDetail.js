import { View, Text } from 'react-native'
import React from 'react'

const NotiDetail = ({ route }) => {
    const { det } = route.params;
  return (
    <View>
          <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginTop: 20 }}>Notification Detail</Text>
          <Text style={{alignSelf:'center'}}>{det}</Text>
    </View>
  )
}

export default NotiDetail