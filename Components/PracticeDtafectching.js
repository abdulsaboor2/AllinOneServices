import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { firebase } from "./firebaseConfig/Config";
export const PracticeDtafectching = () => {

  const [lat1, setLat1] = useState(32.4756884);
  const [lng1, setLng1] = useState(74.500916);
 
  
  const myObjArray = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection("Helpers")
      .get()
      .then((querySnapshot) => {
        //  console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().skills);
          // setTotal(documentSnapshot.id)
          console.log(documentSnapshot.data().skills);
          if (documentSnapshot.data().skills == "Refrigerator Repair") {
            //  setTotal(documentSnapshot.id)

            let getting = calculateDistance(
              documentSnapshot.data().lat,
              documentSnapshot.data().long,
              lat1,
              lng1
            );
            console.log("disssssssss--------", getting);
            if (getting < 10) {
              myObjArray.push({
                id: documentSnapshot.data().id,
                name: documentSnapshot.data().helperfullName,
                skill: documentSnapshot.data().skills,
                lat: documentSnapshot.data().lat,
                long: documentSnapshot.data().long,
              });
            }
          }
        });

        //   console.log("iiiii=====>",i)
        //  console.log("hi---------->",total)
        console.log("ss", myObjArray);
      });
  }, []);

  const calculateDistance = (latt1, lng11, lat22, lng22) => {
    const toRadian = (n) => (n * Math.PI) / 180;

    let lat2 = latt1;
    let lon2 = lng11;
    let lat1 = lat22;
    let lon1 = lng22;

    console.log(lat1, lon1 + "===" + lat2, lon2);
    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    console.log("distance==?", d);

    // if (d < 10) {
    //   setCondition(true)
    // }
    return d.toFixed(1);
  };

  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};
