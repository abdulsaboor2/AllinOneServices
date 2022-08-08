import * as firebase from "firebase";
import { Platform } from "react-native";
const firebaseConfig = {
    apiKey: "AIzaSyB7P3dYzPZuN3ytQnP3uwE09gyP7SnIjCY",
    authDomain: "public-help-service-16f41.firebaseapp.com",
    databaseURL: "https://public-help-service-16f41-default-rtdb.firebaseio.com",
    projectId: "public-help-service-16f41",
    storageBucket: "public-help-service-16f41.appspot.com",
    messagingSenderId: "492924894175",
    appId: "1:492924894175:web:a71cd4a5ce4873c424626a"
};

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }else {
      firebase.app(); // if already initialized, use that one
    }
  const API_URL=Platform.OS==="android"?'http://10.0.2.2:19002':'http://192.168.10.7:19000'

export {firebase,API_URL}
