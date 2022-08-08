import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../firebaseConfig/Config";
import { NotiData } from "../../../Style/NotiDtata";
const CustomerRequest = ({ navigation, route }) => {
  const { customerid, helpe } = route.params;
  console.log("gggggggg" + customerid + "yyy" + helpe);
  const DATA = [];
  const DATA2 = [];
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState({});
  const [isEnable, setIsEnable] = useState(false);
    const [loading,setLoading]=useState(false);
    let userToken;
  useEffect(async() => {
    userToken = await AsyncStorage.getItem("xyz");
    const controller = new AbortController();
    customerId();
      return () => {
        // cancel the request before component unmounts
        controller.abort();
      };
  },[]);
  console.log("ssssss" + userToken);
  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="gray" bool="false" />
      </View>
    );
  }
  const customerId = async () => {
    await firebase
      .firestore()
      .collection("HelperRequest")
      .where("HelperId", "==", helpe)
      .get()
      .then((e) => {
        e.forEach((obj) => {
          firebase
            .firestore()
            .collection("Users")
            .where("id", "==", obj.data().CustomerId)
            .get()
            .then((s) => {
              s.forEach((obj2) => {
                //  DATA2.push(obj2.data());

                setUser(obj2.data());
             
                setIsEnable(true);
              });
            });
        });
      });
  };
    const Accepted = () => {
        setLoading(true);
    try {
      firebase
        .firestore()
        .collection("HelperRequest")
        .doc(helpe)
        .set({
          CustomerId: customerid,
          Request: "Accept",
          HelperId: helpe,
          Status: "In Process",
        })
          .then((docRef) => {
            console.log("11111111111111111111"+user)
          navigation.navigate("Helper Map", {
            id: user.id,
            lat: user.lat,
              long: user.long,
            helId: helpe
          });

           setLoading(false);
        })
        .catch((error) => {
          alert("Error: ", error);
          setLoading(false);
        });
    } catch (err) {
       setLoading(false);
      alert("Errors one: ", err);
    }
  };
    const Rejected = () => {
    try {
      firebase
        .firestore()
        .collection("HelperRequest")
        .doc(helpe)
        .set({
          CustomerId: customerid,
          Request: "Reject",
          HelperId: helpe,
          Status: "Rejected",
        })
        .then((docRef) => {
          navigation.goBack();
        })
        .catch((error) => {
          alert("Error: ", error);
        });
    } catch (err) {
      alert("Errors one: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isEnable == false ? null : (
        <View style={styles.firstblock}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                alignSelf: "baseline",
                color: "#00c853",
              }}
            >
              Customer Request
            </Text>
            <Text style={{ color: "green" }}>09:30:05</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 3 }}>
            {user.fullName}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold", marginTop: 5 }}>
              Phone: {user.phone}{" "}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity style={styles.btn} onPress={Rejected}>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Reject
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn2} onPress={Accepted}>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomerRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
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
    padding: 15,
  },
  btn: {
    fontSize: 16,
    backgroundColor: "red",
    height: 35,
    width: 70,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 100,
  },
  btn2: {
    fontSize: 16,
    backgroundColor: "#00c853",
    height: 35,
    width: 70,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00c853",
    borderRadius: 100,
    marginLeft: 5,
  },
});
