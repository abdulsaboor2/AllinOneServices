import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ShowError, ShowSuccess } from "../../Style/ErrorMessage";
import { firebase } from "../firebaseConfig/Config";
import { Button, SocialIcon } from "react-native-elements";

export const FeedBack = ({ route, navigation }) => {
  const { hellid } = route.params;
  console.log("00000000000" + hellid);

  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [images, setImage] = useState("");
  const [star, setStars] = useState("");
  const [counter, setCounter] = useState("");
  const [skills, setSkills] = useState("");
  const [id, setId] = useState();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [dat, setDat] = useState("");

  const store = [];
  const [comment, setComment] = useState("");
  const [loading, setloading] = useState(false);
  let userToken;
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its App", userToken);
    GetProfData();
    console.log("GGGGGGG===>>>" + star);
  });
  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="gray" bool="false" />
      </View>
    );
  }
  const GetProfData = () => {
    firebase
      .firestore()
      .collection("Helpers")
      .doc(hellid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          const data = doc.data();
          //  setToken(data)
          setCounter(data.count);
          setStars(data.star);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const updateUser = (sum, starC, count) => {
    //  console.log("TTTTTTTT------>>>>"+hellid)

    firebase
      .firestore()
      .collection("Helpers")
      .doc(hellid)
      .update({
        count: count,
        star: starC,
        sum: sum,
      })
      .then(() => {
        console.log("Update ok");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const dd = async () => {
    if (comment === "") {
      ShowError("Please Add your Review");
    } else {
      try {
        setloading(true);
        await fetch("http://192.168.10.15?q=" + comment, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // let sum = Number(star) + Number(responseJson);
            // let starC = (sum / 2).toFixed(1);
            let suum = Number(star) * Number(counter);
            console.log("Rating==>", star," Counter===>",counter)
            let store = suum + Number(responseJson);
            let starC = (store) / (Number(counter) + 1);
             console.log("This is real average", star);
            console.log(
              "res" +
                responseJson +
                " owais>" +
                suum +
                " ==>> " +
                starC +
                " ===>" +
                star
            );
            setStars(starC);
            setCounter(Number(counter) + 1);
            let count = Number(counter) + 1;
            updateUser(suum, starC, count);
            //    console.log("iiiiiiiii : ", avrge);
            submit(starC);
          })
          .catch((error) => {
            console.error(error);
            setloading(false);
          });

        //   console.log("jsons"+ resp)
        //   const dat = resp.json();
        //   setDat(dat)
        //   console.log("yeh hai dat " + dat.sentiment)
      } catch (err) {
        console.log("error  " + err);
        setloading(false);
      }
    }
  };

  const submit = (starC) => {
    firebase
      .firestore()
      .collection("Feedbacks")
      .doc(hellid)
      .set({
        customerId: userToken,
        HelperId: hellid,
        comment,
        star: starC,
      })
      .then(() => {
        console.log(store);
        ShowSuccess("Thank you for your Feedback");
        navigation.replace("payment", { idhelper: hellid,idcustomer:userToken });
        setloading(false);
        return false;
      })
      .catch((err) => {
        console.log("yeh  Err " + err);
        setloading(false);
      });
  };

  return (
    <View>
    
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 15,
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Feedback
          </Text>
        </View>
        <View >
          <TextInput
            style={styles.inputD}
            placeholder="Write your word for our Helper?"
            multiline={true}
            onChangeText={(t1) => {
              setComment(t1);
            }}
          />
        </View>

        <Button buttonStyle={styles.loginButton} onPress={dd} title="Submit" />
        <View style={{ height: 350 }}></View>
      
    </View>
  );
};
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
