import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import React, { useState, useEffect } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Button, SocialIcon } from "react-native-elements";
import { firebase } from "../firebaseConfig/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
let coloure = "#fff";
const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating);
};

const HelperDetail = ({ route, navigation }) => {
  const {
    id,
    name,
    latis,
    longis,
    dis,
    lat2,
    lng2,
    count,
    photo,
    start,
    skill,
    email,
    phone
  } = route.params;
  const [loading, setLoading] = useState(false);
  let userToken;
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log(userToken + id);
  });

  const handleRequest = () => {
    // setLoading(true);
    firebase.firestore().collection("HelperRequest").doc(id).set({
      HelperId: id,
      CustomerId: userToken,
      Request: "pending",
      Status: "In Process",
    });
    navigation.replace("Wait Secreen", {
      id: id,
      name: name,
      latis: latis,
      longis: longis,
      dis: dis,
      lat2: lat2,
      lng2: lng2,
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const senIds = () => {
    firebase.firestore().collection("ChatIds").doc().set({
      HelperId: id,
      CustomerId: userToken
    });
    navigation.navigate("Chat",{id:id})
  }
  return ( 
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          marginTop: 20,
          
        }}
      >
         <ImageBackground source={require("../../assets/EXtraUsepictures/Person.png")} resizeMode="cover" style={{width: 90, height: 90, borderRadius: 90/2}}>
        <Image
          source={{ uri: photo }}
          style={{ width: 90, height: 90, borderRadius: 90 / 2 }}
          />
          </ImageBackground>
        <View style={{ marginLeft: 15,width:"65%" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text>{skill}</Text>
          <Text><Text style={{fontSize:16,color:"green",fontWeight:"bold"}}>{dis}</Text><Text style={{fontSize:14,color:"green"}}>km Away</Text></Text></View>
          <View pointerEvents="none">
            <Rating
              onFinishRating={ratingCompleted}
              style={{ alignSelf: "flex-start" }}
              imageSize={18}
              type="custom"
              tintColor={coloure}
              ratingCount={start * 2}
            />
          </View>
          <Text>Reviewed by ({count})</Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            {email}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Phone: </Text>
            <Text style={{color:"green"}}>{phone==""?"N/A":phone}</Text>
          </Text>
        </View>
      </View>

      <View style={{ padding: 15 }}>
        <Text style={{ fontWeight: "bold" }}>Helper information</Text>
        <Text style={{ textAlign: "justify", marginTop: 5 }}>
          Helper fit and maintain water systems in buildings. This includes
          toilets, baths, showers, sinks, washing machines and dishwashers. They
          can also install central heating systems but need additional
          qualifications to work with gas boilers.
        </Text>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <View>
              <Ionicons name="timer" size={37} color="green" />
              <Text style={styles.ttx}>20 min</Text>
            </View>

            <View>
              <MaterialIcons name="attach-money" size={37} color="green" />
              <Text style={styles.ttx}>200 Rs</Text>
            </View>
            <View>
              <Entypo name="direction" size={37} color="green" />
              <Text style={styles.ttx}>{dis} km</Text>
            </View>
            <TouchableOpacity onPress={senIds}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={37}
                color="green"
              />
              <Text style={styles.ttx}> Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Button
            buttonStyle={styles.loginButton}
            onPress={handleRequest}
            title="Send Request"
          />
        </View>
      </View>
    </View>
  );
};

export default HelperDetail;
const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,
    alignSelf: "center",
  },
});
