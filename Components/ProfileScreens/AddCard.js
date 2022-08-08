import { View,Text,TextInput,Image } from "react-native"
import { StyleSheet } from "react-native"
import { useState } from "react"
import { Boton } from "../../Style/Boton"

export const AddCard = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');
   
    const [valid1, setValid1] = useState(null);
    const [valid2, setValid2] = useState(null);
    const [valid3, setValid3] = useState(null);
    const [valid4, setValid4] = useState(null);
    const [valid5, setValid5] = useState(null);
    
    const [color,setColor]=useState('green');
    const PaymentValidation = () => {
        if (text1 == "") {
            setValid1("*Required");
    
        } if (text2 == "") {
            setValid2("*Required");
        }
        if (text3 == "") {
            setValid3("*Required");
    
        } if (text4 == "") {
            setValid4("*Required");
        }
        if (text5 == "") {
            setValid5("*Required");
        }else {
             navigation.replace("FrontScr")
        }
    }
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textsty}>Please Add Your Card for payment</Text>
            
            <View style={styles.paymentyle} >
            <TextInput
            style={{fontSize: 16, color: 'black', borderBottomColor:text1==""?"#ddd":color||color, borderBottomWidth:1,paddingBottom:10,marginTop:10}}
                   placeholder="Enter Card Number"
                   onChangeText={t1 => {
                       setText1(t1)
                       setValid1("");
                   }}

               />
               <Text style={{color:"red"}}>{valid1}</Text>
               <TextInput
                style={{ fontSize: 16, color: 'black', borderBottomColor:text2==""?"#ddd":color, borderBottomWidth:1,paddingBottom:10,marginTop:10}}
                    placeholder="Enter Card Holder Name"
                        onChangeText={t2 => {
                            setText2(t2)
                            setValid2("");
                        }}
                    />
                <Text style={{ color: "red"}}>{valid2}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <TextInput
                style={{ fontSize: 16, color: 'black', borderBottomColor:text3==""?"#ddd":color,width:'25%', borderBottomWidth:1,paddingBottom:10,marginTop:10}}
                        placeholder="MM           "
                        maxLength={2}
                        onChangeText={t3 => {
                            setText3(t3)
                            setValid3("");
                        }}
                    />
                    
                    <TextInput
                style={{ fontSize: 16, color: 'black', borderBottomColor:text4==""?"#ddd":color,width:'25%', borderBottomWidth:1,paddingBottom:10,marginTop:10}}
                        placeholder="YY           "
                        maxLength={2}
                        onChangeText={t4 => {
                            setText4(t4)
                            setValid4("");
                        }}
                    />
                  
                    <TextInput
                style={{ fontSize: 16, color: 'black', borderBottomColor:text5==""?"#ddd":color,width:'25%', borderBottomWidth:1,paddingBottom:10,marginTop:10}}
                        placeholder="CVV           "
                        maxLength={3}
                        onChangeText={t5 => {
                            setText5(t5)
                            setValid5("");
                        }}
                    />
                
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <Text style={{ color: "red",width:'25%' }}>{valid3}</Text>
                <Text style={{ color: "red",width:'25%' }}>{valid4}</Text>
                <Text style={{ color: "red" ,width:'25%'}}>{valid5}</Text>
                </View>
                <View style={{marginTop:40,alignItems:'center'}} >
                    <Boton widt={120} title={'Add Card'} onPress={PaymentValidation} />
                    </View>
            </View>
            <View>
                <Image style={{ width: 90, height: 90, marginTop: 95 }} source={require('../../assets/EXtraUsepictures/paymentsec.png')} />
            </View>
            <Text style={{marginTop:15,justifyContent:'center',fontWeight:'bold',color:"gray" }}>100% safe and secure payment</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    paymentyle: {
        
        padding:20,
       
        
        height: 300,
        width: "90%",
        borderRadius: 10,
        marginTop: 35,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.9,
        shadowRadius: 4.65,
    },

    textsty: {
        fontSize: 20,
        color: '#1976d2',
        marginTop: 40,
        fontWeight:'bold'
    }


})