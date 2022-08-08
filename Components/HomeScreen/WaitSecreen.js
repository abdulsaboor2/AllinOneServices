import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import { firebase } from "../firebaseConfig/Config";
const WaitSecreen = ({navigation,route}) => {
  const { id, latis, longis, dis, lat2, lng2 } = route.params;
  const [helperId, setHelperId] = useState();
  const [req, setReq] = useState("pending");

  useEffect(() => {
    const interval = setInterval(() => {
      getUserData();
      if (req == "Accept") {
        console.log("Accepted");
        alert("Now you are take service from this Helper");
        navigation.replace("Map Screen", {
          id: id,
          latis:latis,
          longis: longis,
          dis: dis,
          lat2: lat2,
          lng2: lng2
        })
      } else if (req == "Reject") {
        alert("Helper is busy with another work take help from another helper or try later");
        navigation.goBack();
      }
    }, 3000);

    
    return () => clearInterval(interval);
  });

  const getUserData = async () => {
    try {
      await firebase
        .firestore()
        .collection("HelperRequest")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setHelperId(data.HelperId);
            setReq(data.Request);
            console.log(data.HelperId, data.Request);
          } else {
            alert("No such document!");
          }
        })
        .catch((error) => {
          alert("Error getting document:", error);
        });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }} pointerEvents="none">
      <View style={{alignSelf: "center",justifyContent: "center",marginTop: "40%",padding:3}}>
        <Text style={{fontSize:23,fontWeight:'bold',textAlign:"center"}}>Helper will be available to you within 3 minutes.</Text>
      </View>
      <View
        style={{
          height: 200,
          width: 200,
          borderRadius: 200 / 2,
          alignSelf: "center",
          justifyContent: "center",
          borderWidth: 5,
          borderColor: "#1CC625",
          marginTop: "5%",
        }}
      >
        <CountDown
          until={60 * 3 }
          timeToShow={["M", "S"]}
          showSeparator
          onFinish={() => { navigation.goBack(); alert('Helper is Busy')}}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          size={30}
        />
      </View>
    </View>
  );
};

export default WaitSecreen;
