import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Boton } from "../../Style/Boton";
import { NativeScreenNavigationContainer } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../firebaseConfig/Config";
import { ShowError, ShowSuccess } from "../../Style/ErrorMessage";
import NewButton from "../../Style/NewButton";
import Spinner from "react-native-loading-spinner-overlay";

export const ChangePassword = ({ navigation }) => {
  const [color1, setColor1] = useState("gray");
  const [pass1, setPass1] = useState("");
  const [valid1, setValid1] = useState(null);
  const [eye1, setEye1] = useState("eye-off");
  const [visible1, setVisible1] = useState(true);

  const [color2, setColor2] = useState("gray");
  const [Newpass2, setNewPass2] = useState("");
  const [valid2, setValid2] = useState("");
  const [eye2, setEye2] = useState("eye-off");
  const [visible2, setVisible2] = useState(true);

  const [color3, setColor3] = useState("gray");
  const [pass3, setPass3] = useState("");
  const [valid3, setValid3] = useState(null);
  const [eye3, setEye3] = useState("eye-off");
  const [visible3, setVisibl3] = useState(true);
  const [loading, setloading] = useState(false);

  const reauthenticate = (pass1) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, pass1);
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = () => {
    setloading(true);
    reauthenticate(pass1)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(Newpass2)
          .then(() => {
            setloading(true);
            // alert("Password updated!");
            if (pass1 == Newpass2) {
              setloading(false);
              ShowError("Used different password");
            } else {
              navigation.goBack();
              setloading(false);
              ShowSuccess("Password update successfully.");
            }
          })
          .catch(() => {
            if (Newpass2 == "") {
              // setValid2("Enter new pasword");
              ShowError("Please enter new pasword");
              setloading(false);
            } else {
              //  setValid2("The password must be 6 characters long or more");
              ShowError("The password must be 6 characters long or more");
              setloading(false);
            }
          });
      })
      .catch(() => {
        if (pass1 == "") {
          // setValid1("need current password to change the password");
          ShowError("Please fill out all required fields");
          setloading(false);
        } else {
          ShowError("The current password is invalid");
          setloading(false);
        }
      });
  };

  //   changeEmail = (currentPassword, newEmail) => {
  //     this.reauthenticate(currentPassword).then(() => {
  //       var user = firebase.auth().currentUser;
  //       user.updateEmail(newEmail).then(() => {
  //         console.log("Email updated!");
  //       }).catch((error) => { console.log(error); });
  //     }).catch((error) => { console.log(error); });
  //   }

  const showpass1 = () => {
    if (eye1 == "eye-off") {
      setEye1("eye");
      setColor1("#3897f1");
      setVisible1(false);
    } else if (eye1 == "eye") {
      setEye1("eye-off");
      setColor1("gray");
      setVisible1(true);
    }
  };
  const showpass2 = () => {
    if (eye2 == "eye-off") {
      setEye2("eye");
      setColor2("#3897f1");
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            marginTop: 35,
            marginBottom: 30,
            textAlign: "left",
            marginLeft: 10,
          }}
        >
          Change Password
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 90, height: 90, marginBottom: 10 }}
            source={require("../../assets/EXtraUsepictures/email22.png")}
          />
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 50,
          }}
        >
          <TextInput
            style={styles.PassTextInput}
            placeholder="Current Password"
            placeholderTextColor={"#c4c3cb"}
            secureTextEntry={visible1}
            onChangeText={(t2) => {
              setPass1(t2);
              setValid1("");
            }}
          />

          <View
            style={{ marginTop: -37, alignSelf: "flex-end", marginRight: 20 }}
          >
            <Ionicons
              onPress={showpass1}
              name={eye1}
              size={22}
              color={color1}
            />
          </View>

          <Text style={{ color: "red", marginTop: 5 }}>{valid1}</Text>
        </View>
        
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 30 }}>
          <TextInput
            style={styles.PassTextInput}
            placeholder="New Password"
            placeholderTextColor={"#c4c3cb"}
            secureTextEntry={visible2}
            onChangeText={(t2) => {
              setNewPass2(t2);
              setValid2("");
            }}
          />

          <View
            style={{ marginTop: -37, alignSelf: "flex-end", marginRight: 20 }}
          >
            <Ionicons
              onPress={showpass2}
              name={eye2}
              size={22}
              color={color2}
            />
          </View>
          <TouchableOpacity style={{ marginTop: 5, alignSelf: "flex-end" }}>
            <Text
              style={{ color: "#3897f1", marginTop: 10 }}
              onPress={() => navigation.navigate("Forgot Password")}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <NewButton
            title={"Update Password"}
            type={"solid"}
            color={"#3897f1"}
            onPress={changePassword}
          />
          <Text style={{ color: "red", marginTop: 6 }}>{valid2}</Text>
        </View>

        {/* <View style={{ marginTop: 50, alignItems: "center" }}>
        <Boton
          widt={200}
          height={30}
          title={"Update Password"}
          onPress={changePassword}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Forgot Password")}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity> */}
        <View style={{ height: 250 }}></View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  PassTextInput: {
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
});
