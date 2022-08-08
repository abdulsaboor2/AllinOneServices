import React from 'react'
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleApi from './GoogleApi';


export const MapDirection = ({fetchAddress,placehol}) => {
    
    const onPressAddress = (data,details) => {
        //console.log("detail===", details)
        const latitude = details.geometry.location.lat
      const longitude = details.geometry.location.lng
      const name = details.geometry.location;
      console.log(name);
        fetchAddress(latitude,longitude)
    }

  return (
 
    
  <GooglePlacesAutocomplete
    style={{zIndex:2}}
    placeholder={placehol}
    onPress={onPressAddress}
    fetchDetails={true}
    query={{
      key: GoogleApi.Google_Api,
      language: 'en',
    }}
          />
         
     
  )
}
