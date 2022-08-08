import React, { useState } from "react";
import { firebase } from "../firebaseConfig/Config";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  ActivityIndicator,
  LogBox,
  StatusBar,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import { StyleSheet } from "react-native";
import { ShowError } from "../../Style/ErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { color } from "react-native-elements/dist/helpers";
import { Ionicons } from "@expo/vector-icons";

const appId = "1047121222092614";
LogBox.ignoreAllLogs();
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setloading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [eye, setEye] = useState("eye-off");
  const [color, setColor] = useState("gray");
  const [visible, setVisible] = useState(true);

  const onLoginPress = () => {
    if (email == "" && pass == "") {
      ShowError("Please fill out all required fields");
    } else if (email == "" || pass == "") {
      if (email == "") {
        ShowError("Please enter your email");
      } else if (pass == "") {
        ShowError("Please inter your Password");
      }
    } else {
      try {
        setloading(true);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, pass)
          .then((response) => {
            const uid = response.user.uid;
            const user = firebase.firestore().collection("Users").doc(uid).get();
            const helper = firebase.firestore().collection("Helpers").doc(uid).get();

            user.then((doc) => {
                if (doc.exists) {
                  AsyncStorage.setItem("xyz", uid);
                  setloading(false);
                  navigation.replace("FrontScr");
                }
                else{
                  helper.then((doc) => {
                    if (doc.exists) {
                      AsyncStorage.setItem("xyz", uid);
                      setloading(false);
                      navigation.replace("HelperFront");
                    }
                    else{
                      ShowError("User does not exist anymore.");
                      setloading(false);
                      return;
                    }
                  })
                }
              })
              .catch((error) => {
                ShowError(error.toString());
                setloading(false);
              })
              .catch((error) => {
                ShowError(error.toString());
                setloading(false);
              });
          })
          .catch((error) => {
            ShowError(error.toString());
            setloading(false);
          });
      } catch (error) {
        ShowError(error.toString());
        setloading(false);
      }
    }
  };

  const onFbLoginPress = async () => {
    try {
      await Facebook.initializeAsync({
        appId,
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        const ss = await response.json();
        console.log(ss);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  const showpass = () => {
    if (eye == "eye-off") {
      setEye("eye");
      setColor("#3897f1");
      setVisible(false);
    } else if (eye == "eye") {
      setEye("eye-off");
      setColor("gray");
      setVisible(true);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" />
      {/* <View style={styles.SwitchStyle}>
        <Switch
          trackColor={{ false: "#767577", true: "#1976d2" }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#aeaeae"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}
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
            <View style={{flexDirection:"row",alignSelf:"center"}}>
              <Text style={styles.logoText}>Login</Text>
              </View>
              <TextInput
                placeholder="username"
                placeholderTextColor={"#c4c3cb"}
                style={styles.loginFormTextInput}
                keyboardType="email-address"
                onChangeText={(t1) => {
                  setEmail(t1);
                }}
              />
         
              <TextInput
                placeholder="Password"
                placeholderTextColor={"#c4c3cb"}
                style={styles.loginFormTextInput}
                secureTextEntry={visible}
                onChangeText={(t2) => {
                  setPass(t2);
                }}
              />
              <View
                style={{
                  alignSelf: "flex-end",
                  marginRight: 13,
                  marginTop: -35,
                }}
              >
                <Ionicons
                  onPress={showpass}
                  name={eye}
                  size={22}
                  color={color}
                />
              </View>

              <TouchableOpacity style={{ marginTop: 5, alignSelf: "flex-end" }}>
                <Text
                  style={{ color: "#3897f1", marginTop: 8 }}
                  onPress={() => navigation.navigate("Forgot Password")}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
                 <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => onLoginPress()}
                  title="Login"
                />

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => onFbLoginPress()}
                title="Login With Facebook"
              />
              <TouchableOpacity onPress={() => navigation.replace("Signup")}>
                <Text style={styles.createNewAccount}>Create new account?</Text>
              </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
    marginTop:90
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
  SwitchStyle: {
    marginTop: 65,
    alignSelf: "flex-end",
    marginRight: 25,
  },
});
