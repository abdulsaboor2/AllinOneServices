import { View,Text } from "react-native"
import { TouchableOpacity,Image } from "react-native"
import { StyleSheet } from "react-native"
import { AddCard } from "./AddCard"
import { useState } from "react"


export const Payment = () => {
    const [enable, setEnable] = useState("");
    const Addpayment = () => {
       
        setEnable('yes');
    }
    return (
       enable=="yes"?<AddCard />:<View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.paymentyle} onPress={Addpayment}>
                <Text style={styles.textsty}>+ADD NEW CARD</Text>
            </TouchableOpacity>
            <View>
                <Image style={{ width: 90, height: 90, marginTop: 400 }} source={require('../../assets/EXtraUsepictures/paymentsec.png')} />
                
            </View>
            <Text style={{marginTop:15,justifyContent:'center',fontWeight:'bold',color:"gray" }}>100% safe and secure payment</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    paymentyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#1976d2",
        borderWidth: 2,
        height: 60,
        width: "75%",
        borderRadius: 10,
        marginTop: 25
    },

    textsty: {
        fontSize: 25,
        color: '#1976d2',
        
    }


})