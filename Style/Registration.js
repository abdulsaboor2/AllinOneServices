import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking, StatusBar, useColorScheme,ScrollView } from 'react-native'
import styles from './styles.js';
import { firebase } from '../Components/firebaseConfig/Config.js';


export default function Registration({navigation}) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const scheme = useColorScheme()

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    setSpinner(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          fullName,
          avatar: 'https://firebasestorage.googleapis.com/v0/b/reactnative-expo-boilerplate.appspot.com/o/icon.png?alt=media&token=61d19f36-d1b0-4965-92d5-400be6e03405',
          };
          
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Login', {user: data})
          })
          .catch((error) => {
            setSpinner(false)
            alert(error)
          });
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
      
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholder='Your Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType={'email-address'}
        />
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Agree and Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={scheme === 'dark' ? styles.darkfooterText : styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={styles.link} onPress={ ()=>console.log("pushed")}>Require agree EULA</Text>
      </ScrollView>
      
    </View>
  )
}