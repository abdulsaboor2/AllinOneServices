import React, { useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
export const HelperHomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    wait(4000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          backgroundColor: "#ffff",
          height: 450,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.6,
          shadowRadius: 4.65,
        }}
      >
        <View
          style={{ alignSelf: "center", marginTop: 15, flexDirection: "row" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Deshboard</Text>
        </View>
        <View
          style={{
            backgroundColor: "skyblue",
            width: 43,
            height: 43,
            borderRadius: 43 / 2,
            alignSelf: "flex-end",
            marginRight: 15,
            marginTop: -15,
          }}
        >
          <ImageBackground
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: 43,
              height: 43,
              borderRadius: 43 / 2,
            }}
            source={require("../../../assets/EXtraUsepictures/user.png")}
          ></ImageBackground>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginTop: 20,
            shadowOffset: {
              width: 4,
              height: 5,
            },
            shadowOpacity: 0.7,
            shadowRadius: 4.65,
          }}
        >
          <AnimatedCircularProgress
            size={170}
            width={4}
            fill={30}
            tintColor="#76ff03"
            backgroundColor="#9fa8da"
            backgroundWidth={20}
          >
            {(fill) => (
              <>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {"50k"}
                </Text>
                <Text style={{ fontSize: 10 }}>{"Total Earning"}</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginTop: 20,
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          <View
            style={{
              marginLeft: 7,
              marginRight: 7,
              shadowOffset: {
                width: 4,
                height: 5,
              },
              shadowOpacity: 0.7,
              shadowRadius: 4.65,
            }}
          >
            <AnimatedCircularProgress
              size={110}
              width={7}
              fill={100}
              tintColor="#ffc400"
              backgroundColor="#9fa8da"
              backgroundWidth={4}
            >
              {(fill) => (
                <>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {"1.5k"}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{"Yesterday"}</Text>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
          <View
            style={{
              marginLeft: 7,
              marginRight: 7,
              shadowOffset: {
                width: 4,
                height: 5,
              },
              shadowOpacity: 0.7,
              shadowRadius: 4.65,
            }}
          >
            <AnimatedCircularProgress
              size={110}
              width={7}
              fill={100}
              tintColor="#1976d2"
              backgroundColor="#9fa8da"
              backgroundWidth={4}
            >
              {(fill) => (
                <>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {"38"}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{"Request"}</Text>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={{ marginLeft: 7, marginRight: 7,shadowOffset: {
              width: 4,
              height: 5,
            },
            shadowOpacity: 0.7,
            shadowRadius: 4.65, }}>
            <AnimatedCircularProgress
              size={110}
              width={7}
              fill={18}
              tintColor="#689f38"
              backgroundColor="#9fa8da"
              backgroundWidth={4}
            >
              {(fill) => (
                <>
                  <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                    {"18"}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{"Completed Work"}</Text>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginTop: 20,
          flexDirection: "row",
          marginTop: 40,
        }}
      >
        <View style={{ marginLeft: 7, marginRight: 7 }}>
          <AnimatedCircularProgress
            size={110}
            width={7}
            fill={10}
            tintColor="#8e24aa"
            backgroundColor="#9fa8da"
            backgroundWidth={4}
          >
            {(fill) => (
              <>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {"100"}
                </Text>
                <Text style={{ fontSize: 10 }}>{"Today Earning"}</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={{ marginLeft: 7, marginRight: 7 }}>
          <AnimatedCircularProgress
            size={110}
            width={7}
            fill={60}
            tintColor="red"
            backgroundColor="#9fa8da"
            backgroundWidth={4}
          >
            {(fill) => (
              <>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {"60%"}
                </Text>
                <Text style={{ fontSize: 10 }}>{"Profile Completed"}</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={{ marginLeft: 7, marginRight: 7 }}>
          <AnimatedCircularProgress
            size={110}
            width={7}
            fill={80}
            tintColor="#ff7043"
            backgroundColor="#9fa8da"
            backgroundWidth={4}
          >
            {(fill) => (
              <>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {"80%"}
                </Text>
                <Text style={{ fontSize: 10 }}>{"Chat Response"}</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </ScrollView>
  );
};
