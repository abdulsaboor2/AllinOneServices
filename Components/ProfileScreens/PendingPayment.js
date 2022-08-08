import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
    View,
  ActivityIndicator,
   RefreshControl
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../firebaseConfig/Config";


export const PendingPayment = ({ route, navigation }) => {
    const [helpId, setHelperId] = useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [fullName, setFullname] = useState("");
    const [time, setTime] = useState("");
    
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
      };
    let userToken;
    const DATA = [];
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its App", userToken);
     GetPayLater()
    helperData();
 
  });
    
  const GetPayLater = () => {
    firebase
      .firestore()
      .collection("PendingPayments")
      .doc(userToken)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
            setHelperId(data.HelperId);
            setTime(data.time)
          console.log("Yes ma agaya" + data.HelperId);
          
        } else {
            console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    };
    let c = 0;
  const helperData = () => {
    firebase
    .firestore()
    .collection("Helpers")
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((documentSnapshot) => {
        if (documentSnapshot.data().id == helpId) {
         
            DATA.push({
                id: documentSnapshot.data().id,
              name: documentSnapshot.data().fullName,
                
                
            });
          setFullname(documentSnapshot.data().fullName)
          setIsEnable(true);
            c++;
            console.log("hello===>>>" + c);
         
          }
        //   if (documentSnapshot.data().id == "dswi14PUt3Qav6ZknaJyehpqQ8C2") {
        //       DATA.push({
        //         id: documentSnapshot.data().id,
        //         name: documentSnapshot.data().fullName,
        //       });
        //       c++;
        //       console.log("hello===>>>" + c);
        // }
      });

      console.log("ss", DATA);
   
    });
   
}

  const [isEnable, setIsEnable] = useState(false);
  const navigat = () => {
    navigation.navigat("AfterPandingPayment");
  }

  return (
     <SafeAreaView style={styles.container}>
    
      {isEnable==false?null:<View style={styles.firstblock}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{ fontSize: 15, fontWeight: "bold", backgroundColor: "yellow", alignSelf: "baseline" }}>Pending Payment</Text>
              <Text style={{color:"green"}}>{time}</Text></View>
              <Text style={{ fontSize: 18, fontWeight: "bold",marginTop:3 }}>{fullName}</Text>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                  <Text style={{fontWeight:"bold",marginTop:5 }}>RS 150.00</Text>
                  <TouchableOpacity onPress={()=>navigation.navigate("Pay Panding Payment")}><Text style={{fontSize:20,color:"blue"}}>Pay Now</Text></TouchableOpacity>
                  </View>
          </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "yellow",
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    },
    firstblock: {
        height: 100,
        width: "95%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        marginTop: 10,
        borderRadius: 10,
        alignSelf: "center",
        padding:15
        
      },
});
