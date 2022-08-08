import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
const PaymentsDetail = ({ navigation }) => {
    

      
    return (
    <>
    <TouchableOpacity style={styles.secondblock} onPress={()=>{navigation.navigate("Payments")}}>
    <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
        <Text style={{fontSize:15}}>Add Card</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
      </TouchableOpacity>
        <TouchableOpacity style={styles.secondblock} onPress={()=>{navigation.navigate("Pending Payments")}}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
            <Text style={{fontSize:15}}>Pending Payment</Text>
            <MaterialIcons name="navigate-next" size={24} color="black" />
              </View>
              </TouchableOpacity>
    </>
  )
}

export default PaymentsDetail
const styles = StyleSheet.create({
    secondblock: {
        height: 50,
        width: "95%",
        backgroundColor: "white",
        shadowColor: "#000",
        alignSelf:'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: "space-evenly",
        //paddingLeft: 10,
        textAlign: "left",
        padding:10
      },
})