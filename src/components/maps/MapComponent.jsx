import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MapComponent = ({ navigation, type, requisitionSelected,socket }) => {
  const [showOrigin, setShowOrigin] = useState(true);
  const [permision, setPermission] = useState(false);
  const [zoom, setZoom] = useState(20); // nivel de zoom por defecto
  const [cameraHeading, setCameraHeading] = React.useState(0);
  const [travelDestinationsComplete,setDestinationStep]=useState(0)


  let MapD = null;

  let HomeMarker = null;
  const [region, setRegion] = useState(null);

  const locations = useSelector(
    (state) => state.reducers.requisitionListPending
  );
  const Appmode = useSelector((state) => state.reducers.appMode);
  const requisition = useSelector((state) => state.reducers.requisition);
  const locationDriver = useSelector((state) => state.reducers.locationDriver);
  


  useEffect(() => {
    requestLocationPermission();

    obtenerUbicacion();

    setInterval(()=>{
      obtenerUbicacion();

    },15000)

  }, []);

  useEffect(()=>{

    if(locationDriver!==null && Appmode === "client" && requisition.origin.coords){
    //calcular segun paso distancia de la ubicacion de el driver y el origen de la solicitud
    const distance = getDistance(requisition.origin.coords.latitude,requisition.origin.coords.longitude,locationDriver.latitude,locationDriver.longitude)
    
    if(distance <= 10 && travelDestinationsComplete == 0){
    setDestinationStep(1)
    obtenerUbicacion();  
    Alert.alert("Notificacion de el servicio","Ha llegado el conductor")  
    } 

    
  }

  },[locationDriver])

  useEffect(() => {
    //   console.log("locations: map ",locations)
  }, [locations]);

  useEffect(() => {
    if (region) {

      if(region !== null && Appmode ==='driver' && requisition.origin.coords){
        //calcular segun paso distancia de la ubicacion de el driver y el origen de la solicitud
        const distance = getDistance(requisition.origin.coords.latitude,requisition.origin.coords.longitude,region.latitude,region.longitude)
        
        if(distance <= 10 && travelDestinationsComplete == 0){
        setDestinationStep(1)
    
        Alert.alert("Notificacion de el servicio","Has llegado al punto de recojida")  
        } 
    
    
        }
    

      //updateCameraHeading();
     if(Appmode === 'driver' && requisition.status === 'Abierta'){
     // console.log("Enviando ubicacion driver", region);
    
      if(socket){
      socket.emit('locationDriverSend', {location:region,requisition:requisition}); 
      }
    }
    
    }
  }, [region]);

  const UserLocationMarker = () => {
    return (
      <Image
        source={require("../../../assets/iconCar.png")}
        style={{ height: 30,width:15}}
      />
    );
  };

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radio de la tierra en metros
    const phi1 = lat1 * Math.PI / 180; // Convertir latitud a radianes
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;
  
    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distancia en metros
  
    // if (distance >= 1000) {
    //   return (distance / 1000).toFixed(2) + ' km';
    // } else {
    //   return distance.toFixed(2) + ' m';
    // }

    return distance.toFixed(2)
  }

  function updateCameraHeading() {
    const map = MapD;
    map.getCamera().then((info: Camera) => {
      setCameraHeading(info.heading);
    });
  }

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
      const { latitude, longitude, heading } = location.coords;
      setRegion({
        latitude,
        longitude,
        heading,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleMarkerPress = (requisitionId) => {
    navigation.navigate("requisitionDetail", { requisitionId });
  };

  const onRegionChange = (newRegion) => {
    console.log("region chance gps", newRegion);
    obtenerUbicacion();
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={(map) => {
            MapD = map;
          }}
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
          showsCompass={true}
          onRegionChange={onRegionChange}
          showsUserLocation={true}
          showsTraffic={true}
          showsBuildings={true}
          followsUserLocation={true}
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

          {type === "viewDriver" && travelDestinationsComplete == 0 && requisitionSelected.origin && (
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

          {/* marcador driver       */}
          {locationDriver !== null &&       
          <Marker.Animated coordinate={locationDriver}>
            <View
              style={{
                transform: [{ rotate: `${locationDriver.heading - cameraHeading}deg` }],
              }}
            >
              <UserLocationMarker />
            </View>
          </Marker.Animated>
        }
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
