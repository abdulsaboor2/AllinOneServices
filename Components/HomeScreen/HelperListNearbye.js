import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Platform,
  RefreshControl,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { DATA } from "../../Style/DATA";
import { Rating, AirbnbRating } from "react-native-ratings";
import { firebase } from "../firebaseConfig/Config";
import * as Location from "expo-location";

let coloure = "#fff";
const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating);
};
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const HelperListNearbye = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, lat, lng } = route.params;
  console.log("tttttttttttttttt", name, lat, lng);
  // const [lat1, setLat1] = useState(32.4756884);
  // const [lng1, setLng1] = useState(74.500916);
  let userToken;
  const DATA = [];
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("xyz");
    CheckIfLocationEnabled();
    helperData();
  });

  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const onRefresh = React.useCallback(() => {
    console.log(DATA, "refresg bab");
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("App-Prefs:Privacy&path=LOCATION");
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [
          {
            text: "OK",
            onPress: () => openSetting(),
          },
          { text: "Cancel" },
        ],

        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const helperData = () => {
    firebase
      .firestore()
      .collection("Helpers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().skills == name) {
            let getDistance = calculateDistance(
              documentSnapshot.data().lat,
              documentSnapshot.data().long,
              Number(lat),
              Number(lng)
            );

            if (getDistance <= 10) {
              DATA.push({
                id: documentSnapshot.data().id,
                helperfullName: documentSnapshot.data().fullName,
                skills: documentSnapshot.data().skills,
                lati: documentSnapshot.data().lat,
                Long: documentSnapshot.data().long,
                star: documentSnapshot.data().star,
                count: documentSnapshot.data().count,
                email: documentSnapshot.data().email,
                phone: documentSnapshot.data().phone,
                distance: getDistance,
                photo: documentSnapshot.data().images,
              });
            }
          }
        });

        console.log("ss", DATA);
      });
  };
  const calculateDistance = (latt1, lng11, lat22, lng22) => {
    const toRadian = (n) => (n * Math.PI) / 180;

    let lat2 = latt1;
    let lon2 = lng11;
    let lat1 = lat22;
    let lon1 = lng22;

    console.log(lat1, lon1 + "===" + lat2, lon2);
    let R = 8371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    console.log("distance==?", d);

    // if (d < 10) {
    //   setCondition(true)
    // }
    return d.toFixed(1);
  };

  const handleRequest = (id) => {
    setLoading(true);
    firebase.firestore().collection("HelperRequest").doc(id).set({
      HelperId: id,
      CustomerId: userToken,
      Request: "pending",
    });
    setLoading(false);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Helper Information", {
          id: item.id,
          name: item.helperfullName,
          latis: item.lati,
          longis: item.Long,
          dis: item.distance,
          lat2: lat,
          lng2: lng,
          skill: item.skills,
          start: item.star,
          count: item.count,
          photo: item.photo,
          email: item.email,
          phone: item.phone,
        });
        // handleRequest(item.id)
      }}
      style={[styles.item, backgroundColor]}
    >
      <ImageBackground source={require("../../assets/EXtraUsepictures/Person.png")} resizeMode="cover" style={{width: 60, height: 60, borderRadius: 60/2}}>
        <Image
          source={{ uri: item.photo }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      </ImageBackground>
      <View style={{ justifyContent: "space-around", paddingLeft: 15 }}>
        <Text style={styles.title}>{item.helperfullName}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "72%",
          }}
        >
          <Text style={styles.title2}>{item.skills}</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "green",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {item.distance} km
          </Text>
        </View>
        <View pointerEvents="none">
          <Rating
            onFinishRating={ratingCompleted}
            style={{ alignSelf: "flex-start" }}
            imageSize={18}
            type="custom"
            tintColor={coloure}
            ratingCount={item.star * 2}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 11 }}>Reviewed by </Text>
          <Text style={{ alignSelf: "baseline", fontSize: 11 }}>
            ({item.count})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item, colour }) => {
    const backgroundColor = item.id === selectedId ? "#039be5" : "#ffff";
    const color = item.id === selectedId ? "white" : "black";
    // coloure = item.id == selectedId ? "#039be5" : "#ffFf";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  const ListEmptyView = () => {
    return (
      <View style={styles.headerText}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          {" "}
          Scroll down...
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyView}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    //  marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
