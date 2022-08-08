import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Swiper from "react-native-web-swiper";

export const Slider= () => {
  return (
    <View style={{ height:220, marginTop: 10,paddingTop:10,borderWidth:0.3 }}>
      <View
        style={{
          height: 200,
          marginBottom:100,
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 4,
          // },
          // shadowOpacity: 0.4,
          // shadowRadius: 4.65,
        }}
      >
        <Swiper
          from={1}
           loop
          timeout={-5.5}
          minDistanceForAction={0.1}
          controlsProps={{
            dotsTouchable: true,
            prevPos: "left",
            nextPos: "right",
            nextTitle: ">",
            nextTitleStyle: { color: "red", fontSize: 0.1, fontWeight: "500" },
            PrevComponent: ({ onPress }) => (
              <TouchableOpacity onPress={onPress}>
                <Text
                  style={{ color: "white", fontSize: 0.1, fontWeight: "500" }}
                >
                  {"<"}
                </Text>
              </TouchableOpacity>
            ),
          }}
        >
          <View
            style={{alignItems: "center", justifyContent: "center"}}
          >
            <Image
              source={require("../../assets/BannerImage/banner104.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
          <View
            style={{  alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/BannerImage/banner103.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/BannerImage/banner107.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/BannerImage/banner105.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/BannerImage/banner106.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/BannerImage/banner107.jpg")}
              style={{ width: "98%", height: 195 }}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};
