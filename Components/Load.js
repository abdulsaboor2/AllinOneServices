import React from "react";
import { TouchableOpacity, Text, Button, View } from "react-native";
import Geocoder from "react-native-geocoding";
import { Boton } from "../Style/Boton";
import GoogleApi from "./Mapsource/GoogleApi";
export default function Load() {

  const getNameLocation = () => {
    console.log("pressed",GoogleApi);
      Geocoder.init("AIzaSyBMLMjDyHL-q05Eiqv0upnqOZ7UPIfCoYs",{language : "en"});
      
    Geocoder.from({
        latitude : 32.4929,
        longitude :  74.5291
    })
    .then(json => {
            var address_Component = json.results[0].formatted_address;
             console.log(address_Component);
    })
    .catch(error => console.warn(error));
    };
    
  return (
    <View style={{marginTop:200}}>
      <Boton  onPress={getNameLocation} widt={150} />
    </View>
  );
}
