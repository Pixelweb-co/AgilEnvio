import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import {GoogleKey, API_URL} from "@env";

const MapPicker = ({pickAddress,close,visible}) => {
  const [location, setLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [draging, setDraging] = useState(false);
  const mapRef = useRef(null);

  useEffect(()=>{
    if(location !== null){
    console.log("location change")
    }

},[location])

  useEffect(() => {
    if(visible===true){
    (async () => {
      console.log("mapicker obteniedo cordenadas");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      console.log("coords ",coords);
      
      const url = "https://maps.googleapis.com/maps/api/geocode/json?";
      axios
        .get(url, {
          params: {
            key: GoogleKey,
            latlng:
              coords.latitude.toString() + "," + coords.longitude.toString(),
          },
        })
        .then((response) => {
          //    console.log("data rs ",response.data)
          const result = {
            title:
              response.data.results[0].address_components[1].short_name +
              " " +
              response.data.results[0].address_components[0].short_name +
              " " +
              response.data.results[0].address_components[2].short_name +
              " " +
              response.data.results[0].address_components[3].short_name +
              " " +
              response.data.results[0].address_components[4].short_name,
            coords: coords,
            id: response.data.results[0].place_id,
          };

        //  console.log("my location ", result);
          setSelectedAddress(result);
          setDraging(false);
          setLocation(coords);
        })
        .catch((error) => {
          //          handleMessage('An error occurred. Check your network and try again');
          console.log(error);
        });
    })();
    }
  }, [visible]);

  const handleMapDragEnd = async () => {
    const center = await mapRef.current.getCamera().then((data) => {
      return data.center;
    });

    console.log("center ", center);
    //return false
    const url = "https://maps.googleapis.com/maps/api/geocode/json?";
    axios
      .get(url, {
        params: {
          key: GoogleKey,
          latlng:
            center.latitude.toString() + "," + center.longitude.toString(),
        },
      })
      .then((response) => {
        //    console.log("data rs ",response.data)
        const result = {
          title:
            response.data.results[0].address_components[1].short_name +
            " " +
            response.data.results[0].address_components[0].short_name +
            " " +
            response.data.results[0].address_components[2].short_name +
            " " +
            response.data.results[0].address_components[3].short_name +
            " " +
            response.data.results[0].address_components[4].short_name,
          coords: {
            latitude: center.latitude, longitude: center.longitude ,
          },
          id: response.data.results[0].place_id,
        };

        console.log("my location ", result);

        setSelectedAddress(result);
        setDraging(false);
      })
      .catch((error) => {
        //          handleMessage('An error occurred. Check your network and try again');
        console.log(error);
      });
  };

  const mapRegion = {
    latitude: location?.latitude || 37.78825,
    longitude: location?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    zoom: 2,
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          ref={mapRef}
          zoomEnabled={true}
          onRegionChange={(region) => {
            setDraging(true);
          }}
          onRegionChangeComplete={handleMapDragEnd}
        ></MapView>
      )}

      <React.Fragment>
        <View
          style={{
            alignContent: "center",
            marginBottom: 25,
            alignItems: "center",
            borderRadius: 100,
            justifyContent: "center",
            backgroundColor: "red",
            width: 20,
            height: 20,
            position: "absolute",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
            X
          </Text>
        </View>
      </React.Fragment>

      {!draging && selectedAddress && (
        <React.Fragment>
          <TouchableOpacity
            style={{
              borderRadius: 30,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
              width: "80%",
              height: 35,
              top: Dimensions.get("window").height - 200,
              position: "absolute",
            }}
              onPress={()=>{
                pickAddress(selectedAddress)
                close() 
              }}  
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 16,
                fontWeight: "bold",
                elevation: 5,
              }}
            >
              Seleccionar ubicacion
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 10,
              alignContent: "center",
              elevation: 5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "lime",
              width: "95%",
              padding: 5,
              minHeight: 75,
              top: 25,
              position: "absolute",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "purple" }}>
              Ubicación Seleccionada
            </Text>
            <Text
              style={{
                borderRadius: 5,
                fontSize: 18,
                fontWeight: "bold",
                alignContent: "center",
                alignItems: "center",
                minHeight: 35,
                backgroundColor: "#FFF",
                padding: 4,
                marginBottom: 5,
              }}
            >
              {selectedAddress && selectedAddress.title}
            </Text>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderRadius:10    
},
});

export default MapPicker;
