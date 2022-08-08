import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ShowError ,ShowSuccess} from "../../Style/ErrorMessage";
//ADD localhost address of your server
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "../firebaseConfig/Config";
import { API_URL } from "../firebaseConfig/Config";
import { fetchPublishablekey } from "../Helper";
import { Button, SocialIcon } from "react-native-elements";

const AfterPandingPayment = ({ navigation }) => {
   
  let userToken;
  const [publishableKey, setpublishableKey] = useState("");
  const [currentDate, setCurrentDate] = useState('');


  useEffect(async() => {
    userToken = await AsyncStorage.getItem("xyz");
    console.log("hello its App", userToken);
  
    // async function init() {
    //   const publishableKey = await fetchPublishablekey();
    //   if (publishableKey) {
    //     setpublishableKey(publishableKey);
    //   }
    // }
    console.log("hello time "+currentDate)
  });


  const [email, setEmail] = useState("150");
  const [cardDetails, setCardDetails] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();

  // const fetchPaymentIntentClientSecret = async () => {
  //   const response = await fetch(`${API_URL}/create-payment-intent`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const { clientSecret, error } = await response.json();
  //   return { clientSecret, error };
  // };

  const handlePayPress = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
      }),
    });
    const { clientsecret } = await response.json();
    const { error, paymentIntent } = await confirmPayment(clientsecret, {
      type: "Card",
      billingDetails: { email },
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentIntent) {
      Alert.alert("Success", ` Payment successful: ${paymentIntent.id}`);
    }
  };
  const paid = () => {
    if (cardDetails === "") {
      ShowError("Please enter your Card No.");
    } else {
        firebase.firestore().collection("PendingPayments").doc(userToken).delete().then(() => {
            ShowSuccess("Payment successfuly sended")
          navigation.goBack();
          }).catch((error) => {
              ShowSuccess(error.toString());
          });



     
      
    }
  };
  
  const payLater = () => {
    firebase.firestore().collection("PendingPayments").doc(idcustomer)
    .set({
      HelperId: idhelper,
      CustomerId: idcustomer,
      time:currentDate,
  }).then(() => {
    ShowSuccess("Payment in Pending")
    navigation.goBack();
  }
    )
  }
  return (
    <StripeProvider publishableKey={publishableKey}>
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            fontSize: 35,
            marginLeft: 15,
            color: "#1976d2",
            fontWeight: "bold",
            marginBottom: 90,
          }}
        >
          Payment
        </Text>
      </View>
      <TextInput
        editable={false}
        value={email}
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <View style={{ alignSelf: "center", }}>
        <Button
          buttonStyle={styles.loginButton}
          onPress={paid}
          title="Pay Now"
        />
      </View>
     
    </View>
  </StripeProvider>
);
};
export default AfterPandingPayment;

const styles = StyleSheet.create({
container: {
  flex: 1,
  // justifyContent: "center",
  margin: 20,
  marginTop: 20,
},
input: {
  backgroundColor: "#e0e0e0",

  borderRadius: 8,
  fontSize: 20,
  height: 50,
  padding: 10,
},
card: {
  backgroundColor: "#e0e0e0",
},
cardContainer: {
  height: 50,
  marginVertical: 30,
},
loginButton: {
  backgroundColor: "#3897f1",
  borderRadius: 5,
  height: 45,
  marginTop: 30,
  width: 350,
  alignSelf:"center"
},
});
