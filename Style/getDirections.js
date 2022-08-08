import { decode } from "@mapbox/polyline"; //please install this package before running!
import MapView, { Polyline } from "react-native-maps";
export const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = "AIzaSyBMLMjDyHL-q05Eiqv0upnqOZ7UPIfCoYs"; //put your API key here.
    //otherwise, you'll have an 'unauthorized' error.
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
   
    );
    console.log(startLoc,destinationLoc)
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};