import React,{useState,useRef} from 'react'
//import GoogleApi from "./GoogleApi";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
export const Mapp = () => {
    const mapRef = useRef(null);
    const [start, setStart] = useState({
        latitude: 32.4884,
        longitude: 74.5236,
        latitudeDelta: 0.000212699887515984465,
        longitudeDelta: 0.000999999,
    });
    const [mapOrigion, setMapOrigion] = useState({
        latitude: 30.3753,
        longitude: 69.3451,
        latitudeDelta: 0.000212699887515984465,
        longitudeDelta: 0.000999999,
      });
    return (
        <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        style={{ alignSelf: "stretch", height: "100%" }}
        initialRegion={mapOrigion}
        followUserLocation={true}
        ref={mapRef}
        // onMapReady={goToInitialRegion.bind()}
        //  onRegionChangeComplete={(region) => setRegion(region)}
        >
             <Marker
            coordinate={start}
          />
      </MapView>
  );
}
