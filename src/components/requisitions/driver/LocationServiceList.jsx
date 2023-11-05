import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, FlatList, StyleSheet, Image } from "react-native";

import { TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { Gif } from 'react-native-gif';

import { connect } from "react-redux";
const { height } = Dimensions.get("window");

const LocationServiceList = ({ navigation,socket }) => {
  const [selectedRequisition, setSelectedRequistion] = useState(null);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const locations = useSelector(
    (state) => state.reducers.requisitionListPending
  );

  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { longitude, latitude } = position.coords;
    //     setRegion(prevRegion => ({ ...prevRegion, latitude, longitude }));
    //   },
    //   error => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );

   // getLocation();
   console.log("locatins__________>>>>>>>>>>>>><",locations)
  }, [locations]);

  useEffect(() => {
    if (selectedRequisition !== null) {
        
      navigation.navigate("Servicio", {
        requisition: selectedRequisition,
        socket:socket,
        navigationExt:navigation 
      });
    }
  }, [selectedRequisition]);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };
  //handling onPress action
  const getListViewItem = (item) => {
    //Alert.alert(item.key);
  };

  // const getLocation = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     console.log("Permission to access location was denied");
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   const { longitude, latitude } = location.coords;

  //   setRegion((prevRegion) => ({ ...prevRegion, latitude, longitude }));
  // };

  const renderItem = (item) => {
   
    return (
      
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            console.log("sitem ",item)
            setSelectedRequistion(item)}}
        >
          <Text style={styles.buttonText}>{item.client_data.nombres}</Text>
          <Text style={styles.buttonText}>Origen: {item.origin.title}</Text>
          <Text style={styles.buttonText}>
            Destino: {item.destinations[item.destinations.length - 1].title}
          </Text>
          <Text style={styles.buttonText}>
            Valor: {item.tarifa.valor} Forma de pago: {item.tarifa.formaPago}
          </Text>
        </TouchableOpacity>
          );
  };

  return (
    <View style={styles.container}>
      
      {locations.length > 0 &&
      <FlatList  data={locations} renderItem={({ item }) => renderItem(item)} />
      }

      {locations.length === 0 && 
      <View style={{width:"100%",flex:.6,elevation:3,alignContent:"center",alignItems:"center",justifyContent:"center"}}>
      <Image
      source={require('../../../../assets/img/505cd4e70a299298bf92eae900a7d6e8.gif')}
      style={{width: "90%", height: 300}}
    />
    <Text style={{marginTop:10,fontSize:18,fontWeight:"bold",color:"orange"}}>Esperando servicios...</Text>
    </View>
      }
      </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    width:"100%",
    alignContent:"center",
    alignItems:"center",
    height: height,
  },
  item: {
    marginVertical:2,
    paddingVertical:5,
    borderWidth:1,
    borderColor:"royalblue",
    borderRadius:5,
    elevation:3,
    paddingHorizontal:15,
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 100,
  },
  button: {
    paddingLeft: 2,
    width: "80%",
    backgroundColor: "#1E88E5",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default LocationServiceList;
