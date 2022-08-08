import React, {useState, useEffect, useCallback, useLayoutEffect,useRef} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '../../firebaseConfig/Config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotifierRoot } from 'react-native-notifier';
import { Notifier, NotifierComponents } from 'react-native-notifier';
export default function ChatViewHelperSide({ route }) {
  const notifierRef = useRef();
    const [messages, setMessages] = useState([]);
    const [tableName, setTableName] = useState();
  
    let userToken;
    let tName;
  
    const {id,name,picture} = route.params;
  useEffect(async () => {
    
        userToken = await AsyncStorage.getItem("xyz");
        console.log(userToken +" yehi hai " + id);
    const getHelperDta = async() => {
     
        await firebase.firestore().collection("Helpers").doc(userToken).get().then((doc) => {
            if (doc.exists) {
              tName = id + "-"+ userToken;
            } else {
              tName = userToken + "-"+ id;
            }
            getMsgData();
          }).catch((error) => {
            console.log("Error getting document:", error);
            setLoading(false);
          });
          console.log("tName "+tName)
  console.log("name "+tableName)
      };
      getHelperDta();
  
      const getMsgData = async() => {
        const unsubscribe = await firebase.firestore().collection(tName).orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
          notifi()
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    
        return unsubscribe;
      }
      getMsgData();
    
      }, []);
  
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        
        const { _id, createdAt, text, user } = messages[0];   
        firebase.firestore().collection(tName).doc(_id).set(messages[0])
      }, []);
  
  const notifi = () => {
    console.log("worked notification")
    Notifier.showNotification({
      title: name,
      description: 'Cool, right?',
      Component: NotifierComponents.Notification,
      componentProps: {
        imageSource: require('../../../assets/EXtraUsepictures/Person.png'),
      },
    })
    }
  return (
      <>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: firebase.auth()?.currentUser?.email,
        }}
      />
      <NotifierRoot ref={notifierRef} />
      </>
    )
  }