import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity,View } from "react-native";
import { NotiData } from "../../Style/NotiDtata";



export const Notifications= ({ navigation }) => {
  
  const [selectedId, setSelectedId] = useState(null);
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('Detail',{det:item.Skill})} style={[styles.item, backgroundColor,]}>
   
      <View style={{ paddingLeft: 15 }}>
        <View style={{flexDirection:"row"}}>
              <Text style={styles.title}>{item.name}</Text> 
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'green',marginLeft:140 }}>{item.Time}</Text>
              </View>
          <Text style={styles.title2}>{item.Skill}</Text>

        <View pointerEvents="none">
          </View>
          </View>
    </TouchableOpacity>
  );


    const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? "#039be5" : "#ffff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={NotiData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      
      >
        
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#e0e0e0",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20,
    flexDirection:"row",

  },
  title: {
    fontSize: 18,
    fontWeight:'bold'

  },
  title2: {
    fontSize: 12,
    fontWeight:'bold'

  },
});
