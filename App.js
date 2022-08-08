import { StyleSheet, Text, View,LogBox } from "react-native";
import { HomeScreen } from "./Components/FirstHomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FrontScreen } from "./Components/HomeScreen/FrontScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settingprof } from "./Components/ProfileScreens/Settingprof";
import { Payment } from "./Components/ProfileScreens/Payment";
import { useState } from "react";
import { ChangePassword } from "./Components/ProfileScreens/ChangePassword";
import { ForgotPassword } from "./Components/ProfileScreens/ForgotPassword";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { Reducer } from "react";
import { MapScreen } from "./Components/Mapsource/MapScreen";
import { MapDirection } from "./Components/Mapsource/MapDirection";
import FlashMessage from "react-native-flash-message";
import { HelperListNearbye } from "./Components/HomeScreen/HelperListNearbye";
import { ChatScreen } from "./Components/ChatScreen/ChatScreen";
import { HelperChat } from "./Components/ChatScreen/HelperChat";
import Pay from "./Components/Pay";
import { Helper_Profile } from "./Components/ProfileScreens/Helper_Profile";
import { HelperHomeScreen } from "./Components/HelperScr/HelperHomeScreen/HelperHomeScreen";
import { SearchScreen } from "./Components/HomeScreen/SearchScreen";

import { FeedBack } from "./Components/HomeScreen/FeedBack";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import SignupScreen from "./Components/SignupScreen/SignupScreen";
import PictureView from "./Components/ProfileScreens/PictureView";
import ProfileEdit from "./Components/ProfileScreens/ProfileEdit";

import TermCondition from "./Components/ProfileScreens/TermCondition";
import Video from "./Components/ProfileScreens/Video";
import AboutUs from "./Components/SignupScreen/AboutUs";
import { Notifications } from "./Components/Notification/Notifications";
import { NotiData } from "./Style/NotiDtata";
import NotiDetail from "./Components/Notification/NotiDetail";
import HelperProfileEdit from "./Components/ProfileScreens/HelperProfileEdit";
import HelperMapScreen from "./Components/HelperScr/HelperMapScreen/HelperMapScreen";
import { HelperMapView } from "./Components/HelperScr/HelperMapScreen/HelperMapView";
import { PendingPayment } from "./Components/ProfileScreens/PendingPayment";
import PaymentsDetail from "./Components/ProfileScreens/PaymentsDetail";
import AfterPandingPayment from "./Components/ProfileScreens/AfterPandingPayment";
import WaitSecreen from "./Components/HomeScreen/WaitSecreen";
import HelperDetail from "./Components/HomeScreen/HelperDetail";
import CustomerRequest from "./Components/HelperScr/HelperMapScreen/CustomerRequest";
import Complain from "./Components/ProfileScreens/Complain";
import ChatHelperside from "./Components/HelperScr/ChatHelperside";
import ChatViewHelperSide from "./Components/HelperScr/HelperMapScreen/ChatViewHelperSide";


const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
export default function App() {

  
  const Tab = createBottomTabNavigator();
  const [val, setVal] = useState();
 
  // let userToken;
  // userToken = null;
  // useEffect(async () => {
  //   try {
  //     userToken = await AsyncStorage.getItem('xyz')
  //     console.log("hello its App",userToken);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // })
  
  
  
  
  function Home() {
    return (
      // <FrontScreen />
      <Stack.Navigator>
        <Stack.Group>
        <Stack.Screen name="FrontScreen" component={FrontScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Map Screen" component={MapScreen} />
          <Stack.Screen name="Helpers" component={HelperListNearbye} />
             <Stack.Screen name="Helper Information" component={HelperDetail} />
          <Stack.Screen name="Wait Secreen" component={WaitSecreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={FeedBack} />
          <Stack.Screen name="payment" component={Pay}  />
          <Stack.Screen name="Pendings" component={PendingPayment} />
          </Stack.Group>
      </Stack.Navigator>
    
    );
  }

  function Notification() {

    return (
      <Stack.Navigator>
          <Stack.Screen name="Notifications" component={Notifications}   />
          <Stack.Screen name="Detail" component={NotiDetail}   />
          
        </Stack.Navigator>
    );
  }
  function Chat() {
    return (
    
      <Stack.Navigator>
          <Stack.Screen name="Halper Chat" component={HelperChat}   />
          <Stack.Screen name="Chat " component={ChatScreen}  />
          
        </Stack.Navigator>
    );
  }
 
 
  function Profile ({route}) {
    
    return (
     
      <Stack.Navigator >
        <Stack.Group>
          <Stack.Screen name="User Profile" component={Settingprof}/>
          <Stack.Screen name="Payments" component={Payment} />
         <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
          <Stack.Screen name="Edit Profile" component={ProfileEdit} />
          <Stack.Screen name="PictureView" component={PictureView} />
          <Stack.Screen name="Term and Condition" component={TermCondition}   />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Complain" component={Complain} />
          <Stack.Screen name="About" component={AboutUs} />
          <Stack.Screen name="Payments Detail" component={PaymentsDetail} />
          <Stack.Screen name="Pending Payments" component={PendingPayment} />
          <Stack.Screen name="Pay Panding Payment" component={AfterPandingPayment} />
          </Stack.Group>
        </Stack.Navigator>
    );

    
  }
  function FrontScr({route}) {
  
    
    return (
      
    <Tab.Navigator  
   // screenOptions={{  gesturesEnabled: false,route}}  
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Notificaton") {
              iconName = focused ? "ios-notifications" : "ios-notifications-outline";
            } else if (route.name === "Chat") {
              iconName = focused
                ? "ios-chatbox-ellipses"
                : "ios-chatbox-ellipses-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: "#1976d2",
          tabBarInactiveTintColor: "gray",
        })}
      >
     
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false}}/> 
        <Tab.Screen name="Notificaton" component={Notification} options={{ headerShown: false }}/>
        <Tab.Screen name="Chat" component={Chat}  options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Tab.Navigator>
       
    );
  }
  function HelperProfile() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Helper Profile" component={Helper_Profile} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="About us" component={AboutUs} />
        <Stack.Screen name="Term Condition" component={TermCondition} />
        <Stack.Screen name="Video Guid" component={Video} />
        <Stack.Screen name="Helper Edit" component={HelperProfileEdit} />
        </Stack.Navigator>
    )
  }
  function HelperHome() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HelperHomeScreen} />
        </Stack.Navigator>
    )
  }
  function HelperMap() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Mapi" component={HelperMapScreen}  />
        <Stack.Screen name="Customer Requests" component={CustomerRequest}  />
        <Stack.Screen name="Helper Map" component={HelperMapView}  />
        
        </Stack.Navigator>
    )
  }
  function Talk() {
    return (
      <Stack.Navigator>
        <Tab.Screen name="Talk" component={ChatHelperside}  />
        <Tab.Screen name="Customer Chat" component={ChatViewHelperSide}  />
        </Stack.Navigator>
  )}

  function HelperFront({route}) {
  
    
    return (
      
    <Tab.Navigator  
  //  screenOptions={{  gesturesEnabled: false,route}}  
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Helper Home") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
            } else if (route.name === "Map") {
              iconName = focused
                ? "ios-locate"
                : "ios-locate-outline";
            }
            else if (route.name === "Talk") {
              iconName = focused
                ? "ios-chatbox-ellipses"
                : "ios-chatbox-ellipses-outline";
            } 
            else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: "#1976d2",
          tabBarInactiveTintColor: "gray",
        })}
      >
     
        <Tab.Screen name="Helper Home" component={HelperHome} options={{ headerShown: false}}/> 
        <Tab.Screen name="Map" component={HelperMap} options={{ headerShown: false}}/>
        <Tab.Screen name="Talk" component={Talk} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={HelperProfile} options={{ headerShown: false }} />
      </Tab.Navigator>
       
    );
  }
  return (
    // <RealHomePage />
    //  <BoxHelper />
    // <HelperView/>
    
    <NavigationContainer>
      <Stack.Navigator >
      
   
      {/* <Stack.Screen name="caht" component={Chats} options={{ headerShown: false }} /> */}

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Nearbye Helpers" component={HelperListNearbye} options={{ headerShown: false }} />
  
        <Stack.Screen name="Map Screen" component={MapScreen} />
     
          <Stack.Screen name="Settingprof" component={Settingprof} />
     
        <Stack.Screen name="FrontScr" component={FrontScr} options={{ headerShown: false }} />
        <Stack.Screen name="FrontScreen" component={FrontScreen} />
       
        <Stack.Screen name="Forgot Password" component={ForgotPassword}/>
        <Stack.Screen name="HelperFront" component={HelperFront} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
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
