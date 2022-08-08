import { StyleSheet, Text, View, TouchableOpacity,StatusBar, Image,LogBox } from "react-native";
import { Boton } from "../../Style/Boton";
import { RoundedButton } from "../../Style/RoundedButton";
import { useEffect,useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewButton from "../../Style/NewButton";
import { firebase } from "../firebaseConfig/Config";
import Spinner from "react-native-loading-spinner-overlay";
//LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

export const HomeScreen = ({ navigation }) => {
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let abortController = new AbortController(); 
      getData();
      return isMounted = false;
    
    },[])
 
  // const getData = () => {
  //   try {
  //   AsyncStorage.getItem('xyz')
  //           .then(value => {
  //               if (value != null) {
  //                   navigation.replace('FrontScr');
  //               }
  //           })
  //       } catch (error) {
  //       console.log(error);
  //   }

  // }
  
  const getData = async() => {
      
    await AsyncStorage.getItem('xyz').then((userToken)=>{
      console.log("yeh "+ userToken)
      if (userToken != null) {
        setLoading(true);
        firebase.firestore().collection("Helpers").doc(userToken).get().then((doc)=>{
          if (doc.exists) {
            setLoading(false);
            navigation.replace('HelperFront');
          }
          else {
            setLoading(false);
            navigation.replace('FrontScr');
          }
        });
        console.log("5")          
      }
        else{
        console.log("Can't find user");
        }
    })
          
}
  return (
        
        <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
             textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
            <Image
                style={styles.SetImage}
                source = { require ("../../assets/EXtraUsepictures/HomeSc4.jpg")}
                />
            
            <Text style={styles.TextD}>Hello!</Text>
            <Text style={{ textAlign: "center" }}>
                This Service is For You Click on signup button and take the services
            </Text>
  
      <View style={{  marginTop: 10, paddingVertical: 20 }}>
        <NewButton title={"Login"} type={"solid"} color={"#3897f1"} onPress={() => navigation.replace("Login")} />
        <NewButton title={"Signup"} type={"clear"} color={"transparent"} onPress={() => navigation.replace("Signup")}/>
                {/* <Boton title={"Login"} onPress={() => navigation.replace("Login")} widt={150}/>
                <Boton title={"Sign Up"} onPress={() => navigation.replace("Signup")} widt={150} /> */}
            </View>
  
            {/* <Text style={{ fontSize: 16 }}>Or via social media</Text>
  
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <RoundedButton Txt={"f"} color={"#1976d2"} widt={40} heigh={40} borderRad={40/2}/>
                <RoundedButton Txt={"G"} color={"#ff5722"} widt={40} heigh={40} borderRad={40/2}/>
                <RoundedButton Txt={"t"} color={"#64b5f6"} widt={40} heigh={40} borderRad={40/2}/>

            </View> */}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
        justifyContent: "center",
      
      
    },
    SetImage: {
      width: "85%",
      height: 350,
    },
    TextD: {
      fontSize: 40,
      fontWeight: "bold",
    },
    sociaLDesign: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40 / 2,
      backgroundColor: "#1565c0",
      marginHorizontal: 5,
    },
    spinnerTextStyle: {
      color: "#FFF",
      fontSize:15
    },
  });
  