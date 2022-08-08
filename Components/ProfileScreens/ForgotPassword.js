import React from "react";
import { View, TextInput, Text, Image,StyleSheet } from "react-native";
import { useState } from "react";
import { Boton } from "../../Style/Boton";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../firebaseConfig/Config";
import { ShowError, ShowSuccess } from "../../Style/ErrorMessage";
import { Button, SocialIcon } from "react-native-elements";

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [valid1, setValid1] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [visib, setVisib] = useState(false);
  const [title, setTitle] = useState("Next");
  const emailRegex = /\S+@\S+\.\S+/;

  // const [color2, setColor2] = useState('gray');
  // const [pass2, setPass2] = useState("");
  // const [valid2, setValid2] = useState(null);
  // const [eye2, setEye2] = useState("eye-off");
  // const [visible2, setVisible2] = useState(true);

  // const [color3, setColor3] = useState('gray');
  // const [pass3, setPass3] = useState("");
  // const [valid3, setValid3] = useState(null);
  // const [eye3, setEye3] = useState("eye-off");
  // const [visible3, setVisibl3] = useState(true);
  const changeState = () => {
    if (email == "") {
      ShowError("Please inter your Email");
      return false;
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          // Email sent.
          console.log("send email");
          navigation.goBack();
          ShowSuccess("Send Link to your email.");
          return false;
        })
        .catch((error) => {
          ShowError(error.toString());
          console.log("not send");
          return false;
        });

      setTitle("Update");
    }
  };

  const showpass2 = () => {
    if (eye2 == "eye-off") {
      setEye2("eye");
      setColor2("green");
      setVisible2(false);
    } else if (eye2 == "eye") {
      setEye2("eye-off");
      setColor2("gray");
      setVisible2(true);
    }
  };
  const showpass3 = () => {
    if (eye3 == "eye-off") {
      setEye3("eye");
      setColor3("green");
      setVisibl3(false);
    } else if (eye3 == "eye") {
      setEye3("eye-off");
      setColor3("gray");
      setVisibl3(true);
    }
  };
  const validateEmail = () => {
    if (emailRegex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setValid1("Please enter a valid email!");
    }
  };

  const forgotPassword = () => {};

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 90, height: 90, marginTop: 100 }}
          source={require("../../assets/EXtraUsepictures/email2.png")}
        />
      </View>
      {/* {visib === false ? */}
      <View style={{marginTop:85,marginLeft:10,marginRight:10}}>
       
        <TextInput
                placeholder="Email"
                placeholderTextColor={"#c4c3cb"}
                style={styles.loginFormTextInput}
                keyboardType="email-address"
                onChangeText={(t1) => {
                  setEmail(t1);
                  setValid1("");
                }}
              />
      </View>
     
      <View style={{ alignItems: "center" }}>
        <Button
                  buttonStyle={styles.loginButton}
                  onPress={changeState}
                  title="Send Email"
                />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    width: "97%",
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,
   
    alignSelf:"center"
  },
})