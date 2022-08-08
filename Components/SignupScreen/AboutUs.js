import React,{useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
    TouchableOpacity,
  Animated
} from "react-native";

export default function AboutUs() {
    const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 3,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: false
      }).start(() => {
        Animated.timing(animation, {
          toValue: 3,
          duration: 1000,
          useNativeDriver: false
        }).start(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }).start();
      });
      });
    });
  };
  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2,3],
    outputRange: ['rgb(90,210,244)', 'rgb(224,82,99)', 'rgb(0,255,0)',"rgb(154,205,50)"],
  });
  const animatedStyle = {
    borderColor: boxInterpolation,
    };
   

  return (
    <ScrollView>
      <Text style={styles.logoText}>About Us</Text>
      <TouchableOpacity onPress={handleAnimation}>
        <Animated.View style={{...styles.imgsty,...animatedStyle}}>
          <Image
            style={styles.imginter2}
            source={require("../../assets/EXtraUsepictures/owais2.jpeg")}
          />
              </Animated.View>
              
          </TouchableOpacity >
          <Text style={styles.emailText}>Muhammad Owais Butt</Text>
      
          <TouchableOpacity onPress={handleAnimation}>
        <Animated.View style={{...styles.imgsty,...animatedStyle}}>
          <Image
            style={styles.imginter2}
            source={require("../../assets/EXtraUsepictures/saboor.jpeg")}
          />
              </Animated.View>
              
          </TouchableOpacity >
          <Text style={styles.emailText}>Abdul Saboor</Text>
          <TouchableOpacity onPress={handleAnimation}>
        <Animated.View style={{...styles.imgsty,...animatedStyle}}>
          <Image
            style={styles.imginter2}
            source={require("../../assets/EXtraUsepictures/unaiza.jpg")}
          />
              </Animated.View>
              
          </TouchableOpacity>
          <Text style={styles.emailText}>Unaiza Sajid</Text>
          <View style={{height:100}}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 35,
    marginBottom: 30,
    marginLeft: 20,
  },
  imgsty: {
    borderWidth: 3,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignSelf: "center",
    marginTop: 25,
    justifyContent: "center",
  },
  imginter2: {
    height: 140,
    width: 140,
    borderRadius: 140 / 2,
    alignSelf: "center",
    },
    emailText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "bold",
        marginTop:10
  }
});
