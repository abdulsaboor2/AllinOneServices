import { View, StyleSheet, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const BoxHelper = ({ onPress, imageUri, HelperType }, ...props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HelperContainer}>
      <Image style={{ width: 35, height: 35 }} source={imageUri} />
      <Text
        style={{
          marginTop: 15,
          fontWeight: "bold",
          color: "#1976d2",
                  fontSize: 11,
                
        }}
      >
        {HelperType}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    HelperContainer: {
        height: 90,
        width: 90,
        borderRadius: 20,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Platform.OS=="ios"? "#ffff":"#f5f5f5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    }
  
});
