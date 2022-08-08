import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  StatusBar,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ScrollView, RefreshControl,ActivityIndicator} from "react-native";
import { firebase } from "../firebaseConfig/Config";
import React, { useEffect } from "react";
import { BoxHelper } from "../../Style/BoxHelper";
import { useState } from "react";
import { Boton } from "../../Style/Boton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons,MaterialCommunityIcons,Feather  } from "@expo/vector-icons";
import SettingCompDesign from "../../Style/SettingCompDesign";



export const Settingprof = ({ navigation }) => {
  const [images, setImage] = useState();
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cuId, setCusId] = useState("");
  const onRefresh = React.useCallback(() => {
    wait(2000).then(() => setRefreshing(false));
  }, []);
  let userToken;
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    setLoading(true);
    setRefreshing(true);
      let abortController = new AbortController(); 
  
      ProfileData();
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      abortController.abort();
    }
  }, [])
  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="gray" bool="false" />
      </View>
    );
  }
   //Image getting code
//  const GettingImage= async() => {
//     setRefreshing(true);
//     try {
//       userToken = await AsyncStorage.getItem("xyz");
//       console.log("hello its pic sreen", userToken);
//     } catch (e) {
//       console.log(e);
//     }
//     setRefreshing(true);
//     let imageRef = firebase.storage().ref(userToken);
//     imageRef
//       .getDownloadURL()
//       .then((url) => {
//         setImage(url);
//         wait(3000).then(() => setRefreshing(false));
//         console.log("refress");
//       })
//       .catch((e) => console.log("getting downloadURL of image error => ", e));
//        wait(3000).then(() => setRefreshing(false));
//   };

//Profile Data getting code (Nmae and Email only)
 const ProfileData=async() => {
  userToken = await AsyncStorage.getItem("xyz");
  console.log("hello its pic sreen", userToken);
    firebase
      .firestore()
      .collection("Users")
      .doc(userToken)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const data = doc.data();
          //  setToken(data)
          setCusId(data.id);
          setFullName(data.fullName);
          setEmail(data.email);
          setLoading(false);
          setImage(data.images)
          setRefreshing(false);
        } else {
          console.log("No such document!");
          setLoading(false);
          setRefreshing(false);
        }
        
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setLoading(false);
      });
  };

  

  const backAction = () => {
    Alert.alert("Log Out!", "Are you sure to Log Out?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => { logout(); AsyncStorage.clear(); }},
    ]);
    return true;
  };



  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace("Login");
        AsyncStorage.clear();
      });
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ alignItems: "center" }}>
        <StatusBar barStyle="dark-content" />
        {/* 
         {/* <Text >Mail:</Text>
          {/* <Text >{user.email}</Text> 
          <Text>Expo push token:</Text>
          <Text >{token.token}</Text> 

      {/* <TextInput style={{ width: 100, height: 90, backgroundColor: "skyblue" }}
      
      onChangeText={(t)=>setLname(t)}
      />
      <Boton height={20}title={"submit"} onPress={FetchUserData}/> */}

        
        <View style={styles.firstblock}>

       <TouchableOpacity  onPress={()=>navigation.navigate("PictureView",{image:images})}>
          <View style={{ height: 110, width: 100, justifyContent: "center" }} >
            <Image style={styles.imgsty} source={{ uri: images }} />
            </View>
            </TouchableOpacity>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.textsty}>{fullname}</Text>
            <Text style={styles.textsty}>{email}</Text>
          
          </View>
          <View style={{ paddingBottom: 75,marginLeft:-10||0 }}>
            <Feather name="edit" size={32} color="gray" 
                onPress={() => navigation.navigate("Edit Profile")}
                
              />
             
          </View>
        </View>

        <View>
          <Text style={styles.catText}>General</Text>
        </View>
        <View style={styles.secondblock}>
          <SettingCompDesign text={"Payment"} onPress={()=>navigation.navigate("Payments Detail") }/>
        </View>
        <View>
          <Text style={styles.catText}>Settings</Text>
        </View>
        <View style={styles.thirdblock}>
          
          <SettingCompDesign text={"Change Password"} onPress={() => navigation.navigate("Change Password")} />
          <SettingCompDesign text={"Terms of services"} onPress={()=>navigation.navigate("Term and Condition")} />
          <SettingCompDesign text={"Help"} onPress={() => navigation.navigate("Video")} />
          <SettingCompDesign text={"Complain"} onPress={() => navigation.navigate("Complain",{id:cuId,email:email,name:fullname})}/>
          {/* <Text style={styles.cat2Text}>Contact Us</Text>
          <Text style={styles.cat2Text}>About Us</Text>
          <Text style={styles.cat2Text}>Privecy Policy</Text>
          <Text style={styles.cat2Text}>Terms of services</Text> */}
        </View>
        <View>
          <Text style={styles.catText}>Support</Text>
        </View>
        <View style={styles.thirdblock}>
          <SettingCompDesign text={"About Us"} onPress={()=>navigation.navigate("About")}/>
          <SettingCompDesign text={"Languages"}/>
          <Text style={styles.cat3Text} onPress={backAction}>
            Logout
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textsty: {
    color: "#454b4f",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  
  textsty2: {
    fontSize: 15,
    marginLeft: 10,
    
  },
  imgsty: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    borderColor: "gray",
    borderWidth: 2,
    marginLeft: 20,
  },
    catText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 20,
    marginRight: 300,
  },
  firstblock: {
    height: 120,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    
  },
  secondblock: {
    height: 50,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "#000",
    alignSelf:'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
    //paddingLeft: 10,
    textAlign: "left",
  },
  thirdblock: {
    height: 150,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "#000",
    alignSelf:'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
    //paddingLeft: 10,
    textAlign: "left",
  },
  cat2Text: {
    marginLeft:10,
    textAlign: "left",
    fontSize:15
  },
  cat3Text: {
    marginLeft:10,
    color: "red",
    fontSize:15
  },
});
