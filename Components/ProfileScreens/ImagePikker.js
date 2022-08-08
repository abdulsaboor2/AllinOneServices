import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet,Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, ImageBackground } from "react-native";
import Dialog from "react-native-dialog";
import { firebase } from "../firebaseConfig/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ImagePikker() {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState("");
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

  let userToken;

  useEffect(async () => {
    try {
      userToken = await AsyncStorage.getItem("xyz");
      console.log("hello its front screen", userToken);
    } catch (e) {
      console.log(e);
    }
    let imageRef = firebase.storage().ref(userToken);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        wait(3000).then(() => setRefreshing(false));
        console.log("refress");
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  });

  const uploadImage = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(userToken);
    return ref.put(blob);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, Camera roll permissions are required to make this work!"
          );
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    setVisible(false);
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      try {
        uploadImage(result.uri);
      } catch (error) {
        alert(error);
      }
    }
    image == null;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      result.name;
      try {
        uploadImage(result.uri);
        handleAnimation();
      } catch (error) {
        alert(error);
      }
    }

    setVisible(false);
    pickedImagePath == null;
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={showDialog}>
          <Animated.View 
          style={{
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            height: 100,
            borderRadius: 100 / 2,
            borderColor: "#1976d2",
              borderWidth: 2,
              ...animatedStyle
          }}>
          <ImageBackground
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: 90,
              height: 90,
              borderRadius: 90 / 2,
            }}
            source={require("../../assets/EXtraUsepictures/user.png")}
          >
            <Dialog.Container visible={visible}>
              <Dialog.Title>Upload Photo</Dialog.Title>
              <Dialog.Description>
                Chose Your Profile Picture?
              </Dialog.Description>
              <Dialog.Button label="Camera" onPress={openCamera} />
              <Dialog.Button label="Cancel" onPress={handleCancel} />
              <Dialog.Button label="Gallery" onPress={pickImage} />
            </Dialog.Container>

            {/* { <Image
                style={{width: 95, alignItems: 'center', justifyContent: 'center', height: 95, borderRadius: 95 / 2 }}
          
          source={require("../assets/Camera.png")}/> } */}

            {(pickedImagePath !== "" && (
              <Image
                source={{ uri: pickedImagePath }}
                style={{ width: 90, borderRadius: 90 / 2, height: 90 }}
              />
            )) ||
              (image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 90, borderRadius: 90/ 2, height: 90 }}
                />
              ))}
            </ImageBackground>
            </Animated.View>
        </TouchableOpacity>
        <Button title="Upload Image" onPress={showDialog} />
      </View>

      <View style={styles.container}>
        {/* <Button title="Show dialog" onPress={showDialog} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
