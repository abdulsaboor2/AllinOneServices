import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
 ScrollView,
  View,

  StatusBar,
 
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import { StyleSheet } from "react-native";
import { firebase } from "../firebaseConfig/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import ImagePikker from "./ImagePikker";

let userToken;
export default function HelperProfileEdit({ navigation }) {
  const [loading, setloading] = useState(false);
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
    const [images, setImage] = useState("");
    const [Skills, setSkills] = useState("");
  const phoneRef = useRef(undefined);

  useEffect(async () => {
    setloading(true);
    userToken = await AsyncStorage.getItem("xyz");
    GetProfData();
    getpictureURL();
  }, []);

  //get image URL from firebase storege
  const getpictureURL = async() => {
    console.log("-------------------------->",userToken);
    try {firebase.storage().ref(userToken).getDownloadURL().then((url) => {
         setImage(url);
         console.log("refress");
         
       })
     }
       catch(e){
         console.log("getting downloadURL of image error => ", e)
       };
  }
  console.log("image------>>>>>>>" + images);
 
  const GetProfData = () => {
    console.log(userToken);
    firebase
      .firestore()
      .collection("Helpers")
      .doc(userToken)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const data = doc.data();
          //  setToken(data)
          setFullname(data.fullName);
          setEmail(data.email);
          setPhone(data.phone);
          setAddress(data.Address);
          setSkills(data.skills)
          setloading(false);
        } else {
          console.log("No such document!");
          setloading(false);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setloading(false);
      });
  };

  const updateUser =  () => {
     
    setloading(true);
    getpictureURL();
    console.log(userToken);
    firebase
      .firestore()
      .collection("Helpers")
      .doc(userToken)
      .update({
        fullName: fullName,
        email: email,
        Address: Address,
        images: images,
        skills: Skills,
        phone:phone 
      })
      .then(() => {
        navigation.goBack();
        setloading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setloading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Edit Profile</Text>
              <View style={styles.margin}>
                <ImagePikker ss={images}/>
              </View>
              <TextInput
                placeholder="Full name"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                value={fullName}
                onChangeText={(t1) => {
                  setFullname(t1);
                }}
              />
              <TextInput
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                keyboardType="email-address"
                value={email}
                onChangeText={(t1) => {
                  setEmail(t1);
                }}
                          />
               <TextInput
                placeholder="Address"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                value={Address}
                editable={false}
                onChangeText={(t1) => {
                  setFullname(t1);
                }}
                          />
                <TextInput
                placeholder="Skills"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                value={Skills}
                editable={false}
                onChangeText={(t1) => {
                  setFullname(t1);
                }}
              />
              <TextInput
                placeholder="Phone"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                value={phone}
                onChangeText={(t1) => {
                  setPhone(t1);
                }}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => updateUser()}
                title="Update"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
 
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 30,
    alignSelf:'flex-start'
  },
  loginFormView: {
    flex: 1,
  },
  createNewAccount: {
    marginTop: 14,
    alignSelf: "center",
    fontSize: 14,
    color: "#3897f1",
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,
    alignItems: "center",
  },
  margin: {
    marginBottom: 130,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    // backgroundColor: "#ecf0f1",
    padding: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
    fontSize: 15,
  },
  phoneInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});
