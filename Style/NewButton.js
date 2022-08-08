import { Button, SocialIcon } from "react-native-elements";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function NewButton({ title, onPress, color, type }) {
  return (
    <View>
      <Button
        buttonStyle={styles(color).loginButton}
        onPress={onPress}
        title={title}
        type={type}
      />
    </View>
  );
}
const styles = (color) =>
  StyleSheet.create({
    loginButton: {
      backgroundColor: color,
      borderRadius: 5,
      height: 45,
      marginTop: 15,
      width: 350,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#3897f1",
    },
  });
