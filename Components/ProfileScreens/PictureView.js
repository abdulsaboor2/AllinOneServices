import React, { useEffect,useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
export default function PictureView({ route }) {
    const { image } = route.params;
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
        <View style={{ marginTop: 200 }}>
          <Image style={styles.imgsty} source={{ uri: image }} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
  imgsty: {
    height: "80%",
    width: "100%",
  },
});
