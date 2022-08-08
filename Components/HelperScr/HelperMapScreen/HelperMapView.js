import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  LogBox,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { firebase } from "../../firebaseConfig/Config";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import * as Location from "expo-location";
import GoogleApi from "../../Mapsource/GoogleApi";
import CountDown from 'react-native-countdown-component';
LogBox.ignoreLogs(["MapViewDirections Error: Error on GMAPS route request"]);
LogBox.ignoreLogs([
  "Failed prop type: Invalid prop `origin` supplied to `MapViewDirections`, expected one of type [string, number]",
]);
export const HelperMapView = ({ route, navigation }) => {

   const { id, lat, long,helId} = route.params;
 
  const [location, setLocation] = useState();
  const [loading, setloading] = useState(true);

  const [customer, setCustomer] = useState({
    latitude: Number(lat),
    longitude: Number(long),
    latitudeDelta: 0.00021269988751598446,
    longitudeDelta: 0.000999999,
  });
 
  useEffect(() => {
   // setloading(true);
    const interval = setInterval(() => {
      getLocation();
      setloading(false);
    }, 5000);
    return () => clearInterval(interval);
  });
  // if (loading) {
  //  return( <View style={{flexDirection:'row',marginTop:-970,marginRight:-200}}>
  //           <ActivityIndicator style={{marginRight:-390}} size="large" color="blue" />
  //           </View>)
  // }
  //Getting Current Location
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        // latitudeDelta: 0.000212699887515984465,
        // longitudeDelta: 0.000999999,
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Its current location", location);

  //Create dummy destinantion
  const [dummyDestination, setDummyDestination] = useState({
    latitude: 32.4884,
    longitude: 74.5236,
    latitudeDelta: 0.000212699887515984465,
    longitudeDelta: 0.000999999,
  });

  //for starting and ending point in written (Map view Direction)
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const fetchStartCords = (lat, lng) => {
    // console.log("latitude.....", lat)
    // console.log("latitude.....", lng)
    setStart({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.000212699887515984465,
      longitudeDelta: 0.000999999,
    });
  };
  
  const fetchDestinationCords = (lat, lng) => {
    // console.log("latitude.....", lat)
    // console.log("latitude.....", lng)
    setEnd({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.000212699887515984465,
      longitudeDelta: 0.000999999,
    });
  };
  console.log("Its for static picup===>   ", start);
  console.log("Its for static Distination===>    ", end);

  const mapRef = useRef(null);
  //const [coords, setCoords] = useState([]);

  //For setting Origion location its mean startup points
  const [mapOrigion, setMapOrigion] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.000212699887515984465,
    longitudeDelta: 0.000999999,
  });

  const [tmState, setTmState] = useState({
    Time: 0,
    distance: 0,
  });
  const fetchTimeDuration = (t, d) => {
    setTmState({
      Time: t.toFixed(0),
      distance: d.toFixed(1),
    });
  };

  const [pakkiKotli, setPakkiKotli] = useState({
    latitude: 32.47766203475993,
    longitude: 74.50725950002612,
  });

  const doneWork = () => {
    firebase.firestore().collection("HelperRequest").doc(helId).update({ Status: "complete" });
    navigation.navigate("Mapi");
  }

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      {/* <View style={{ flexDirection: "row" }}>
        <MapDirection
          placehol={"Enter Start Point"}
          fetchAddress={fetchStartCords}
        /> */}
      {/* <MapDirection
          placehol={"Enter Drop Point"}
          fetchAddress={fetchDestinationCords}
        />
      </View> */}
      <View style={{ marginBottom: -90 }}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          style={{ alignSelf: "stretch", height: "88%" }}
          initialRegion={location}
          followUserLocation={true}
          ref={mapRef}
          // onMapReady={goToInitialRegion.bind()}
          //  onRegionChangeComplete={(region) => setRegion(region)}
        >
          {/* <Marker
            coordinate={start}
            image={require("../assets/rec.png")}
            height={10}
            width={10}
          />*/}
          {Object.keys(dummyDestination).length > 0 && (
            <Marker
              coordinate={customer}
              image={require("../../../assets/HelperImageIcon/electrician11.png")}
              title="rawasiya"
              description="i am a electrician for Helper app"
            />
          )}
          {Object.keys(dummyDestination).length > 0 && (
            <MapViewDirections
              origin={location}
              destination={customer}
              apikey={GoogleApi.Google_Api}
              strokeWidth={6}
              strokeColor={"red"}
              optimizeWaypoints={true}
              onReady={(result) => {
                console.log(`Time is ===> ${result.distance} km`);
                console.log(`Time is ===> ${result.duration} min`);
                fetchTimeDuration(result.duration, result.distance);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgepedding: {
                    right: 30,
                    botton: 300,
                    left: 30,
                    top: 100,
                  },
                });
              }}
            />
          )}

          <View style={styles.TDSty}>
            <View
              style={{
                paddingLeft: 40,
                paddingTop: 20,
                justifyContent: "space-evenly",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Text style={styles.TextSty}>{tmState.Time} min's</Text>
              <Text style={styles.TextdarkSty}>Estimated Time</Text>
            </View>
            <View
              style={{
                paddingLeft: 240,
                paddingTop: 20,
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Text style={styles.TextSty}>{tmState.distance} Km's</Text>
              <Text style={styles.TextdarkSty}>Distance</Text>
            </View>
          </View>
        </MapView>
      </View>
      <View style={styles.mapbottom}>
        <View>
          <ScrollView
            style={{ height: 160 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignSelf: "baseline", marginLeft: 180 }}>
              <Ionicons
                style={{ alignSelf: "center" }}
                name="md-ellipsis-horizontal"
                size={34}
                color="gray"
              />
            </View>
           
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              <View>
                <Ionicons name="timer" size={37} color="green" />
                <Text style={styles.ttx}>{tmState.Time} min</Text>
              </View>

              <View>
                <MaterialIcons name="attach-money" size={37} color="green" />
                <Text style={styles.ttx}>150 Rs</Text>
              </View>
              <View>
                <Entypo name="direction" size={37} color="green" />
                <Text style={styles.ttx}>0.0 km</Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={37}
                  color="green"
                />
                <Text style={styles.ttx}> Chat</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botonn} onPress={doneWork}>
              <Text style={{ alignSelf: "center", color: "#fff" }}>
                Work Done
              </Text>
            </TouchableOpacity>
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botonn: {
    backgroundColor: "green",
    borderRadius: 30,
    width: 120,
    height: 40,
    alignSelf: "center",
    alignContent: "center",
    padding: 10,
    marginTop: 20,
  },
  mapbottom: {
    // borderStartColor: "blue",
    backgroundColor: "#ffff",
    height: 160,
    marginBottom: -100,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
  },
  ttx: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 12,
  },
  TDSty: {
    height: 60,
    backgroundColor: "#ffff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
  },
  TDSty2: {
    height: 50,
    backgroundColor: "#ffff",
    width: "30%",
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 500,
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    backgroundColor: "#00c853",
  },
  TextSty: {
    fontSize: 27,
    fontWeight: "bold",
    color: "green",
  },
  TextSty2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  TextdarkSty: {
    color: "gray",
    fontSize: 12,
  },
});
