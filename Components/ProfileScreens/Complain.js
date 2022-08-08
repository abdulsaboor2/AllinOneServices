import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { ShowError, ShowSuccess } from "../../Style/ErrorMessage";
import { firebase } from "../firebaseConfig/Config";
import { Button, SocialIcon } from "react-native-elements";

export default function Complain({ navigation, route }) {
  const { id, name, email } = route.params;

  const [msg, setMsg] = useState();
  let userToken;
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its App", userToken);
  });

  const doneComplain = async () => {
    if (!msg) {
      ShowError("Please Enter your complain");
    } else {
      try {
        firebase
          .firestore()
          .collection("Complain")
          .doc(id)
          .set({
            id: id,
            fullName: name,
            email: email,
            message: msg,
            status:"Pending"
          })
          .then(() => {
           navigation.goBack();
           ShowSuccess("Complain Successfully Sended");
          })
          .catch((error) => {
            ShowError(error.toString());
          })
      } catch (error) {
        ShowError(error.toString());
      }
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 15,
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Complain
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.inputD}
            placeholder="Write your word for our Helper?"
            multiline={true}
            onChangeText={(t1) => {
              setMsg(t1);
            }}
          />
        </View>

        <Button buttonStyle={styles.loginButton} title="Submit" onPress={doneComplain} />
        <View style={{ height: 350 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  inputD: {
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    padding: 10,
    margin: 20,
    height: 200,
    borderRadius: 10,
    borderColor: "#aeaeae",
    paddingTop: 10,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,
    alignItems: "center",
    alignSelf: "center",
  },
  botonn: {
    backgroundColor: "green",
    borderRadius: 30,
    width: 120,
    height: 40,
    alignSelf: "center",
    alignContent: "center",
    padding: 10,
    marginTop: 50,
  },
});
