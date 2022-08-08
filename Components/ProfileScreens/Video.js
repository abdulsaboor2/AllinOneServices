import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Spinner from "react-native-loading-spinner-overlay";
export default function Video() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
      setTimeout(() => {
          setloading(false);
          }, 3000);
      
});
  return (
    <View style={styles.container}>
       <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
        //   textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      <View>
        <Text style={styles.logoText}>Video Guid</Text>
      </View>
      <View style={styles.playsty}>
        <YoutubePlayer height={300} play={true} videoId={"84WIaK3bl_s"} />
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
    backgroundColor:'black'
  },

  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 100,
    marginBottom: 30,
    textAlign: "center",
    color:"#fff"
    },
    playsty: {
      marginTop:25
  }
});
