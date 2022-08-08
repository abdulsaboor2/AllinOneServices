import React, { useState, useRef } from "react";
import { firebase } from "../firebaseConfig/Config";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  StatusBar,
  Switch,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import RNPickerSelect from "react-native-picker-select";
import { Button, SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import { StyleSheet } from "react-native";
import { ShowError, ShowSuccess } from "../../Style/ErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { color } from "react-native-elements/dist/helpers";
import GoogleApi from "../Mapsource/GoogleApi";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");

  const [loading, setloading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [eye, setEye] = useState("eye-off");
  const [eye2, setEye2] = useState("eye-off");
  const [color, setColor] = useState("gray");
  const [color2, setColor2] = useState("gray");
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [count, setCount] = useState("0");
  const [star, setStar] = useState("");
  const [sum, setSet] = useState("");
  const [cnic, setCnic] = useState("");
  const [images, setImages] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [placeholder, setPlaceHolder] = useState({
    label: "Select Your Skills...",
    value: null,
    color: "#9EA0A4",
  });

  const CustomerSignup = () => {
    if (email == "" && pass == "" && fullName == "" && cpass == "") {
      ShowError("Please fill out all required fields");
    } else if (fullName == "" || email == "" || pass == "" || cpass == "") {
      if (fullName == "") {
        ShowError("Please inter your Fullname");
        return false;
      }
      if (email == "") {
        ShowError("Please inter your Email");
        return false;
      }

      if (pass == "") {
        ShowError("Please inter your Password");
        return false;
      }
      if (cpass == "") {
        ShowError("Please inter your Confirm Password");
        return false;
      }
    } else if (pass !== cpass) {
      ShowError("Password not matched");
      return false;
    } else {
      try {
        setloading(true);

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, pass)
          .then((response) => {
            const uid = response.user.uid;
            const data = {
              id: uid,
              email,
              fullName,
              phone,
              Address,
              lat,
              long,
              images,
            };
            firebase
              .firestore()
              .collection("Users")
              .doc(uid)
              .set(data)
              .then(() => {
                navigation.replace("Login");
                ShowSuccess("Signup successfuly");
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
        return false;
      }
    }
  };
  const HelperSignup = () => {
    if (email == "" && pass == "" && fullName == "" && cpass == ""&&phone==""&&cnic=="") {
      ShowError("Please fill out all required fields");
    } else if (fullName == "" || email == "" || pass == "" || cpass == ""||phone==""||cnic=="") {
      if (fullName == "") {
        ShowError("Please inter your Fullname");
        return false;
      }
      if (email == "") {
        ShowError("Please inter your Email");
        return false;
      }
      if (skills == "") {
        ShowError("Please select your skill");
        return false;
      }
      if (phone == "") {
        ShowError("Please select your phone no");
        return false;
      }
      if (cnic == "") {
        ShowError("Please select your CNIC");
        return false;
      }
      if (Address == "") {
        ShowError("Please get your Address");
        return false;
      }
      if (pass == "") {
        ShowError("Please inter your Password");
        return false;
      }

      if (cpass == "") {
        ShowError("Please inter your Confirm Password");
        return false;
      }
    } else if (pass !== cpass) {
      ShowError("Password not matched");
      return false;
    } else {
      try {
        setloading(true);

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, pass)
          .then((response) => {
            const uid = response.user.uid;
            const data = {
              id: uid,
              email,
              fullName,
              phone,
              Address,
              lat,
              long,
              skills,
              count,
              star,
              sum,
              images,
              cnic,
            };
            firebase
              .firestore()
              .collection("Helpers")
              .doc(uid)
              .set(data)
              .then(() => {
                setloading(false);
                navigation.replace("Login");
                ShowSuccess("Signup successfuly");
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
        return false;
      }
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
  const getLocation = async () => {
    console.log("hello its me");
    setLoadings(true);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLat(latitude);
      setLong(longitude);
      Geocoder.init(GoogleApi.Google_Api);
      Geocoder.from(latitude, longitude).then((json) => {
        var address_Component = json.results[2].formatted_address;
        console.log(address_Component);
        setAddress(address_Component);
        setLoadings(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const hello = () => {
    console.log("hello its me");
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.SwitchStyle}>
        <Switch
          trackColor={{ false: "#767577", true: "#1976d2" }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#aeaeae"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

      </View>
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={styles.logoText}>Signup</Text>
                {isEnabled ? <Text>(Helper)</Text> : null}
              </View>
              <TextInput
                placeholder="Full name"
                placeholderTextColor={"#c4c3cb"}
                style={styles.loginFormTextInput}
                keyboardType="email-address"
                onChangeText={(t1) => {
                  setFullname(t1);
                }}
              />

              <TextInput
                placeholder="Email"
                placeholderTextColor={"#c4c3cb"}
                style={styles.loginFormTextInput}
                keyboardType="email-address"
                onChangeText={(t1) => {
                  setEmail(t1);
                }}
              />
              {isEnabled ? (
                <>
                  <View>
                    <RNPickerSelect
                      placeholder={placeholder}
                      label="Select a sportdfgdfgdg bgd..."
                      onValueChange={(skil) => setSkills(skil)}
                      items={[
                        { label: "Electrician", value: "Electrician" },
                        { label: "Plumber", value: "Plumber" },
                        { label: "Car Repair", value: "Car Repair" },
                        { label: "Doctor", value: "Doctor" },
                        {
                          label: "Refrigerator Repair",
                          value: "Refrigerator Repair",
                        },
                        { label: "Tutor Service", value: "Tutor Service" },
                        { label: "Insurance", value: "Insurance" },
                        { label: "Ambulance", value: "Ambulance" },
                        { label: "Home Repair", value: "Home Repair" },
                      ]}
                      style={pickerSelectStyles}
                    />
                  </View>
                  <TextInput
                    placeholder="Phone: 03XXXXXXXXX"
                    placeholderTextColor={"#c4c3cb"}
                    style={styles.loginFormTextInput}
                    onChangeText={(t1) => {
                      setPhone(t1);
                    }}
                  />
                  <TextInput
                    placeholder="CNIC: XXXXXXXXXXXXX"
                    placeholderTextColor={"#c4c3cb"}
                    style={styles.loginFormTextInput}
                    onChangeText={(t1) => {
                      setCnic(t1);
                    }}
                  />
                </>
              ) : null}
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={"#c4c3cb"}
                  value={Address}
                  style={styles.loginFormTextInput2}
                  onChangeText={(t1) => {
                    setAddress(t1);
                  }}
                />
                {loadings ? (
                  <View
                    style={{
                      marginLeft: -47,
                      marginTop: 16,
                      width: 35,
                      height: 30,
                    }}
                  >
                    <ActivityIndicator
                      size="small"
                      color="gray"
                      visible={loadings}
                    />
                  </View>
                ) : (
                  <Ionicons
                    style={{ marginLeft: -38, marginTop: 13 }}
                    name="location"
                    size={27}
                    color={"gray"}
                    onPress={() => getLocation()}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"#c4c3cb"}
                  style={styles.loginFormTextInput2}
                  secureTextEntry={visible}
                  onChangeText={(t1) => {
                    setPass(t1);
                  }}
                />

                <Ionicons
                  style={{ marginLeft: -35, marginTop: 15 }}
                  onPress={showpass}
                  name={eye}
                  size={22}
                  color={color}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={"#c4c3cb"}
                  style={styles.loginFormTextInput2}
                  secureTextEntry={visible2}
                  onChangeText={(t2) => {
                    setCPass(t2);
                  }}
                />

                <Ionicons
                  style={{ marginLeft: -35, marginTop: 15 }}
                  onPress={showpass2}
                  name={eye2}
                  size={22}
                  color={color2}
                />
              </View>

              {isEnabled ? (
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => HelperSignup()}
                  title="Helper Signup"
                />
              ) : (
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => CustomerSignup()}
                  title="Signup"
                />
              )}
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text style={styles.createNewAccount}>
                  Already have account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </View>
        <View style={{height:60}}></View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    width: "97%",
    alignSelf: "center",
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
  },
  createNewAccount: {
    marginTop: 14,
    alignSelf: "center",
    fontSize: 14,
    color: "#3897f1",
    fontFamily: "bold",
  },
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
  createNewAccount: {
    marginTop: 14,
    alignSelf: "center",
    fontSize: 14,
    color: "#3897f1",
  },
  loginFormTextInput2: {
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
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,

    alignSelf: "center",
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    width: "97%",
    alignSelf: "center",
  },
  inputAndroid: {
    fontSize: 16,
    //  paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    //  borderRadius: 8,
    color: "black",
    //  paddingRight: 30, // to ensure the text is never behind the icon
  },
});
