import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons,FontAwesome,Entypo } from "@expo/vector-icons";
export const SearchScreen = ({ navigation, route }) => {
  const { lat, lng } = route.params;
    const [search, setSearch] = useState('');
    const DATA=[{
       
        "id": 1,
        "title": "Electrician",
        
      },
      {
       
        "id": 2,
        "title": "Plumber",
        },
        {
       
            "id": 3,
            "title": "Car Repair",
          },
          {
       
            "id": 4,
            "title": "Insurance",
          },
          {
       
            "id": 5,
            "title": "Doctor",
          },
          {
       
            "id": 6,
            "title": "Tutor Service",
          },
          {
       
            "id": 7,
            "title": "Ambulance",
          },
          {
       
            "id": 8,
            "title": "Refrigerator Repair",
          },
          {
       
            "id": 9,
            "title": "Home Repair",
          },
      ]
     
      const [filteredDataSource, setFilteredDataSource] = useState(DATA);
      const [masterDataSource, setMasterDataSource] = useState(DATA);
    
      // useEffect(() => {
      //   fetch('https://jsonplaceholder.typicode.com/posts')
      //     .then((response) => response.json())
      //     .then((responseJson) => {
      //       setFilteredDataSource(responseJson);
      //       setMasterDataSource(responseJson);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }, []);
    
      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = masterDataSource.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.title
              ? item.title.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };
    
      const ItemView = ({ item }) => {
        return (
          // Flat List Item
            <>
                <View style={{flexDirection:"row"}}>
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {/* {item.id}
            {'.'} */}
                {item.title.toUpperCase()}
            </Text>
             <View style={{marginLeft:310,position:'absolute'}}>
             <FontAwesome name="location-arrow" size={24} color="black" onPress={() => getItem(item)} />
                    </View>
                    </View>
                </>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
                    backgroundColor: '#C8C8C8',
         
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        //  alert('Id : ' + item.id + ' Title : ' + item.title);
       navigation.navigate('Helpers', { name: item.title,lat:lat,lng:lng })
        console.log("=====----=",item.title);
      };
    
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
                      placeholder="Search Here" />
                  
                  <View style={{alignSelf:'baseline',marginTop:-42,marginBottom:20,marginLeft:20}}>
                      <Ionicons onPress={()=>navigation.goBack()} name="chevron-back" size={32} color='black' />   
                  </View>
                  <View style={{ alignSelf: 'baseline', marginTop: -52,alignSelf:"flex-end",marginRight:25,marginBottom:20 }}>
                  <Entypo name="cross" size={32} color="black" onPress={()=>setSearch("")}  />   
                      </View>            
                  <FlatList
                      style={{paddingLeft:20}}
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              
            />
          </View>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
      //  backgroundColor: 'white',
      },
      itemStyle: {
          padding: 10,
          fontSize: 15,
          
      },
      textInputStyle: {
        height: 40,
      //  borderWidth: 1,
        paddingLeft: 35,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
        borderRadius:12,
         marginTop:25,
          width: "90%",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.2,
        shadowRadius: 3.65,
          alignSelf:"center"
        
        
      },
    });