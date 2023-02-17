import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MapComponent = ({ navigation, type, requisitionSelected }) => {
  const [showOrigin, setShowOrigin] = useState(true);
  const [permision, setPermission] = useState(false);
  const [zoom, setZoom] = useState(20); // nivel de zoom por defecto

  let HomeMarker = null;
  const [region, setRegion] = useState(null);

  const locations = useSelector(
    (state) => state.reducers.requisitionListPending
  );
  const Appmode = useSelector((state) => state.reducers.appMode);
  const requisition = useSelector((state) => state.reducers.requisition);

  useEffect(() => {
    requestLocationPermission();

    obtenerUbicacion();
  }, []);

  useEffect(() => {
    //   console.log("locations: map ",locations)
  }, [locations]);

  useEffect(() => {
    if (region) {
      console.log("ubicacion cambia ", region);
      //socket.emit('location', region);
    }
  }, [region]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        //console.log('Permiso concedido');
        //   setPermission(true)
        return true;
      } else {
        // setPermission(false)
        //console.log('Permiso denegado');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const obtenerUbicacion = async () => {
    const permission = await requestLocationPermission();
    if (permission) {
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleMarkerPress = (requisitionId) => {
    navigation.navigate("requisitionDetail", { requisitionId });
  };

  const onRegionChange = (newRegion) => {
    console.log("region chance gps");
    setRegion({
      ...newRegion,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      zoom: zoom, // establece el nivel de zoom actual
    });
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={{
            ...region,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            zoom: zoom, // establece el nivel de zoom actual
          }}
          onRegionChangeComplete={setRegion}
          showsScale={true}
          zoom={zoom}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          onRegionChange={onRegionChange}
          showsUserLocation={true}
        >
          {type === "driverList" &&
            locations &&
            locations.map((item, index) => {
              return (
                <Marker.Animated
                  ref={(marker) => {
                    HomeMarker = marker;
                  }}
                  key={index}
                  coordinate={item.origin.coords}
                />
              );
            })}

          {type === "viewDriver" && requisitionSelected.origin && (
            <Marker.Animated
              ref={(marker) => {
                HomeMarker = marker;
              }}
              coordinate={requisitionSelected.origin.coords}
            />
          )}

          {type === "viewDriver" &&
            requisitionSelected.destinations &&
            requisitionSelected.destinations.map((item, index) => {
              return (
                <Marker.Animated
                  key={index}
                  ref={(marker) => {
                    HomeMarker = marker;
                  }}
                  coordinate={item.coords}
                />
              );
            })}

          {type === "viewDriver" &&
            requisitionSelected.destinations.length > 0 &&
            requisitionSelected.origin.coords != null && (
              <Polyline
                coordinates={[
                  requisitionSelected.origin.coords,
                  requisitionSelected.destinations[0].coords,
                ]}
                strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={["#7F0000"]}
                strokeWidth={6}
              />
            )}
        </MapView>
      )}

      <View>
        <Text>
          <TouchableOpacity onPress={() => obtenerUbicacion()}>
            <Text>Actualizar ubicacion</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
