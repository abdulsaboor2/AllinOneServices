import { StyleSheet, Text, TouchableOpacity, } from "react-native";

export const Boton = ({ navigation,...props }) => {
    return (

        <TouchableOpacity
        // onPress={()=> navigation.navigate("Login") }
            onPress={props.onPress}
        style={{
            width: props.widt,
            backgroundColor: "#0d47a1",
            padding: 10,
            borderRadius: 30,
            marginHorizontal: 6,
        }}
        >
             <Text style={{ textAlign: "center", color: "#fff", fontSize: 18 }}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
   
  });