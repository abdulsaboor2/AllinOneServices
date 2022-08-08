import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';


import PhoneInput from 'react-native-phone-input';


export default function Selector() {
  const [phoneNumber, setPhoneNumber] = useState(false)
  const phoneRef = useRef(undefined);

  return (
   <View>
       
      <PhoneInput
        style={styles.phoneInput} 
        ref={phoneRef}
        value={phoneNumber}
        onChangePhoneNumber={setPhoneNumber} 
      />
</View>
  );
}

const styles = StyleSheet.create({
 
  phoneInput: {
   height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});