import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { HelperMapView } from "./HelperMapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../firebaseConfig/Config";
import CountDown from "react-native-countdown-component";
const HelperMapScreen = ({ navigation }) => {
  const [isEnable, setIsEnable] = useState("true");
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [req, setReq] = useState("");
  const [cusData, setCusData] = useState({});

  let userToken;
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its First map Secreen", userToken);
    const interval = setInterval(() => {
      getUserData();
     }, 3000);
     return () => clearInterval(interval);
  });

  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="gray" bool="false" />
      </View>
    );
  }
  const getUserData = async () => {
    try {
      await firebase
        .firestore()
        .collection("HelperRequest")
        .doc(userToken)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setCustomerId(data.CustomerId);
            setReq(data.Request);
            // getCustomerData(data.CustomerId);
            console.log(data);
          } else {
            //   alert("No such document!");
          }
        })
        .catch((error) => {
          //  alert("Error getting document:", error);
        });
    } catch (err) {
      alert(err);
    }
  };

  // const getCustomerData = async (idd) => {
  //   try {
  //     console.log("kkkkkkkkkkkkkkk" + idd);
  //     firebase
  //       .firestore()
  //       .collection("Users")
  //       .doc(idd)
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           const data = doc.data();
  //           setCusData(data);
  //           console.log("999999999999"+cusData);
  //         } else {
  //           //   alert("No such document!");
  //         }
  //       })
  //       .catch((error) => {
  //         //  alert("Error getting document:", error);
  //       });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  const action = () => {
    if (req == "pending") {
      navigation.navigate("Customer Requests", {
        customerid: customerId,
        helpe: userToken,
      });
    } else {
      alert("There is no request for you");
    }
  };

  // const Rejected = () => {
  //   setVisible(false);
  //   try {
  //     firebase
  //       .firestore()
  //       .collection("HelperRequest")
  //       .doc(userToken)
  //       .set({
  //         CustomerId: customerId,
  //         Request: "Reject",
  //         HelperId: userToken,
  //         Status:"Rejected"
  //       })
  //       .then((docRef) => {
  //         console.log(req);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         alert("Error: ", error);
  //         setLoading(false);
  //       });
  //   } catch (err) {
  //     setLoading(false);
  //     alert("Errors one: ", err);
  //   }
  // };
  // const Accepted = () => {
  //    setVisible(false);
  //   try {
  //     firebase
  //       .firestore()
  //       .collection("HelperRequest")
  //       .doc(userToken)
  //       .set({
  //         CustomerId: customerId,
  //         Request: "Accept",
  //         HelperId: userToken,
  //         Status:"In Process"
  //       })
  //       .then((docRef) => {
  //         console.log(req);
  //         navigation.navigate("Helper Map", {
  //           id: cusData.id,
  //           lat: cusData.lat,
  //           long: cusData.long,
  //         });
  //         //  setLoading(false);
  //       })
  //       .catch((error) => {
  //         alert("Error: ", error);
  //         //  setLoading(false);
  //       });
  //   } catch (err) {
  //     // setLoading(false);
  //     alert("Errors one: ", err);
  //   }
  // };
  return (
    <View>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 300 }}
        onPress={action}
      >
        <Text style={{ color: "blue", fontWeight: "bold" }}>
          Click me to Find Out New Request
        </Text>
      </TouchableOpacity>

      {/* <HelperMapView /> */}

      {/* <CountDown
        until={60 * 0 + 30}
        timeToShow={["M", "S"]}
        showSeparator
        onFinish={() => setVisible(false)}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        size={0}
      /> */}
    </View>
  );
};

export default HelperMapScreen;
