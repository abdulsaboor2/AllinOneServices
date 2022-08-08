import { StyleSheet, Text, TouchableOpacity,Image,ImageBackground, View } from "react-native";

export const RoundedButton = ({...props}) => {
  
    return (
<>
        <TouchableOpacity
        onPress={props.onPress}
        style={{
             backgroundColor: "#1565c0",
            width: 40 && props.widt,
            height: 40 && props.heigh,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40 / 2 && props.borderRad,
            backgroundColor: props.color,
             marginHorizontal: 5,
            borderWidth: props.BorderRadius,
            borderColor:props.Bordercolor
          
        }}>
              
        {/* <ImageBackground source={require('../assets/HomeSc.png')} /> */}
        
                
        <Text style={styles.SoTextDesign}>{props.Txt}</Text>
            </TouchableOpacity>
            
            <Image onPress={ props.onPress} />
         </>
            
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    SoTextDesign: {
        fontSize: 20,
        fontWeight: "bold",
        // color: "#fff",
      },
   
  });