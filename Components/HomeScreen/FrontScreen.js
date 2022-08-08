import react, { useState } from "react";
import {
  SafeAreaView,
  BackHandler,
  Alert,
  View,
  StatusBar,
  Linking,
  AppState,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Slider } from "./Slider";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { BoxHelper } from "../../Style/BoxHelper";
import { ScrollView, Text, Image, StyleSheet } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeScreenNavigationContainer } from "react-native-screens";
import * as Location from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";
import Geocoder from "react-native-geocoding";
import GoogleApi from "../Mapsource/GoogleApi";
import { firebase } from "../firebaseConfig/Config";
export const FrontScreen = ({ user, navigation, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );

  const [loading, setLoading] = useState(false);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [location, setLocation] = useState();
  const [colo, setColo] = useState("black");
  const [geeti, setGeeti] = useState();

  let userToken;
  useEffect(async () => {
    setLoading(true);
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its User FrontScreen", userToken);
    CheckIfLocationEnabled();
    getLocation();

    console.log("opned");
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [userData, setUserData] = useState({});

  //Get Location Name
  const getNameLocation = () => {
    console.log("API : ", GoogleApi.Google_Api);
    Geocoder.init("AIzaSyD8P1F_dvcvHh_BNsBlgP-kHxUClIgyWrY");
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        var address_Component = json.results[0].formatted_address;
        console.log(address_Component);
        setGeeti(address_Component);
        setColo("green");
      })
      .catch((error) => console.warn(error));
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.000212699887515984465,
        longitudeDelta: 0.000999999,
      });

      Geocoder.init("AIzaSyD8P1F_dvcvHh_BNsBlgP-kHxUClIgyWrY");
      Geocoder.from(latitude, longitude).then((json) => {
        var address_Component = json.results[0].formatted_address;
        console.log(address_Component);
        setGeeti(address_Component);
        setColo("green");
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log("Its current location ff", location);

  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("App-Prefs:Privacy&path=LOCATION");
      setVisible(false);
      // } else {
      //   IntentLauncherAndroid.startActivityAsync(
      //     IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      //   );
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

  const backAction = () => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to close this application?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]
    );
    return true;
  };

  return (
    <View
      style={{ backgroundColor: "#fff" }}
      // pointerEvents="none"
      // onPress={() => {
      //   alert("Kindly pay you previous payment");
      // }}
    >
      <StatusBar barStyle="dark-content" />
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Getting Location..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <View
        style={{
          height: 60,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 17,
          paddingRight: 15,
          alignItems: "baseline",
          marginTop: Platform.OS == "ios" ? 50 : 30,
        }}
      >
        <Text
          style={{
            width: "90%",
            alignSelf: "baseline",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {geeti}
        </Text>
        <TouchableOpacity onPress={getLocation}>
          <Ionicons
            style={{ position: "relative" }}
            name="location"
            size={27}
            color={colo}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Search", {
            lat: location.latitude,
            lng: location.longitude,
          })
        }
      >
        <View pointerEvents="none">
          <SearchBar
            style={{ width: "95%" }}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#282828"
            cancelIconColor="#c6c6c6"
            //  backgroundColor="#353d5e"
            placeholder={"Search here"}
            onFocus={() =>
              navigation.navigate("Search", {
                lat: location.latitude,
                lng: location.longitude,
              })
            }
            //  onChangeText={(text) =>filterList(text)}
            onSearchPress={() => console.log("Search Icon is pressed")}
            //  onClearPress={(text) => filterList(text)}
            //   onPress={() => alert("onPress")}
          />
        </View>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff", marginTop: 1 }}
      >
        <View>
          <Slider />
        </View>
        <Text
          onPress={props.onPress}
          style={{
            color: "gray",
            fontWeight: "bold",
            fontSize: 14,
            marginLeft: 5,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          RECENTS
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: 70 }}
        >
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/carrepair.png")}
          />
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/electrician.png")}
          />
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/plumber.png")}
          />
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/insurance.png")}
          />
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/teacher.png")}
          />
          <Image
            style={styles.imgStyle}
            source={require("../../assets/HelperImageIcon/fridge.png")}
          />
        </ScrollView>

        <Text
          style={{
            color: "gray",
            fontWeight: "bold",
            fontSize: 14,
            marginLeft: 5,
            marginTop: 20,
          }}
        >
          ALL SERVICES
        </Text>

        <View
          style={{
            flexDirection: "row",
            height: 100,
            width: "100%",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Electrician",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Electrician"}
            imageUri={require("../../assets/HelperImageIcon/electrician.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Plumber",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Plumber"}
            imageUri={require("../../assets/HelperImageIcon/plumber.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Car Repair",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Car Repair"}
            imageUri={require("../../assets/HelperImageIcon/carrepair.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            width: "100%",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Insurance",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Insurance"}
            imageUri={require("../../assets/HelperImageIcon/insurance.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Doctor",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Doctor"}
            imageUri={require("../../assets/HelperImageIcon/doctor.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Tutor Service",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Tutor Service"}
            imageUri={require("../../assets/HelperImageIcon/teacher.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            width: "100%",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Ambulance",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Ambulance"}
            imageUri={require("../../assets/HelperImageIcon/ambulance.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Refrigerator Repair",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Refrigerator Repair"}
            imageUri={require("../../assets/HelperImageIcon/fridge.png")}
          />
          <BoxHelper
            onPress={() => {
              navigation.navigate("Helpers", {
                name: "Home Repair",
                lat: location.latitude,
                lng: location.longitude,
              });
            }}
            HelperType={"Home Repair"}
            imageUri={require("../../assets/HelperImageIcon/homereapir.png")}
          />
        </View>
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "red",
  },
  spinnerTextStyle: {
    color: "#FFF",
    fontSize: 15,
  },
});
