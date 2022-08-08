import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  Image,
  View,
  ActivityIndicator
} from "react-native";
//import { DATA } from "../../Style/DATA";
import { Rating, AirbnbRating } from "react-native-ratings";
import { firebase } from "../firebaseConfig/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

let coloure = "";
const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating);
};
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ChatHelperside({navigation}) {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedId, setSelectedId] = useState(null);
    let userToken;
    const DATA = [];
    useEffect(async () => {
      DATA.length = 0;
      userToken = await AsyncStorage.getItem("xyz");
      console.log("hello i am chat");
    getIds();
      console.log("hello i am useState", DATA)
    },[]); 
  
    const getIds = async () => {
     
     await firebase
        .firestore() 
        .collection("ChatIds")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            console.log("hello its data", doc.data());
            doc.data().HelperId;
           
            firebase
              .firestore()
              .collection("Users") 
              .doc(doc.data().CustomerId)
              .get()
              .then((docs) => {
                // setDATa(docs.data())
                //   console.log("its inner loop",docs.data())
                if (doc.data().HelperId == userToken) { 
                  DATA.push({
                    id: docs.data().id,
                    helperfullName: docs.data().fullName,
                      email: docs.data().email,
                      photo: docs.data().images,
                  
                  })
                }
                setLoading(false);
                console.log("LOG 2", DATA);
              });
          
         //   console.log("LOG 1", doc.data())
         //   
          });
        });
        
    };
    if (loading) {
      return (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="gray" bool="false" />
        </View>
      );
    }
    const onRefresh = React.useCallback(() => {
      console.log(DATA, "refresg bab");
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
      const handlerLongClick = () => {
        //handler for Long Click
        alert('In Future Add some more Functionalities');
      };
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Customer Chat",{id:item.id,name:item.helperfullName,picture:item.photo})}
        style={[styles.item, backgroundColor]}
        onLongPress={handlerLongClick}
      >
         <ImageBackground source={require("../../assets/EXtraUsepictures/Person.png")} resizeMode="cover" style={{width: 60, height: 60, borderRadius: 60/2}}>
          <Image
            source={{ uri: item.photo }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </ImageBackground>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <View style={{ justifyContent: "space-around", paddingLeft: 15,alignSelf:"baseline",width:210 }}>
          <Text style={styles.title}>{item.helperfullName}</Text>
  
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "72%",
            }}
          >
            <Text style={styles.title2}>{item.email}</Text>
           
          </View>
   
          </View>
          <View style={{paddingTop:15}}>
          <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "green",
              textAlign: "center",
               
              }}
            >Chat
            </Text>
            </View>
        </View>
        
      </TouchableOpacity>
    );
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#039be5" : "#ffff";
      const color = item.id === selectedId ? "white" : "black";
      //if (item.id === selectedId) { navigation.navigate('Chat ') }
      coloure = item.id == selectedId ? "#039be5" : "#ffFf";
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
    const ListEmptyView = () => {
      return (
        <View style={styles.headerText}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            {" "}
            Scroll down...
          </Text>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyView}
          keyExtractor={(item) => item.id} 
          extraData={selectedId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></FlatList>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e0e0e0",
      //  marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 20,
      flexDirection: "row",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    title2: {
      fontSize: 11,
      fontWeight: "bold",
    },
  });
  