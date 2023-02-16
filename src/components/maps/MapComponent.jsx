import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker,Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
  


const MapComponent = ({ navigation,type,requisitionSelected }) => {
    const [showOrigin,setShowOrigin]=useState(true)
    let HomeMarker = null; 
    const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

const locations = useSelector(state => state.reducers.requisitionListPending);
const Appmode = useSelector(state => state.reducers.appMode);
const requisition = useSelector(state => state.reducers.requisition)

  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { longitude, latitude } = position.coords;
    //     setRegion(prevRegion => ({ ...prevRegion, latitude, longitude }));
    //   },
    //   error => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );

    getLocation() 
    console.log("type ",type)
    
  }, []);

  useEffect(()=>{
     //   console.log("locations: map ",locations)
    
  },[locations])

  
  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    //console.log(location);
    const { longitude, latitude } = location.coords;
    
    setRegion(prevRegion => ({ ...prevRegion, latitude, longitude }));
  }

  const handleMarkerPress = (requisitionId) => {
    navigation.navigate('requisitionDetail', { requisitionId });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsScale={true}
         zoomControlEnabled={true}
         zoomEnabled={true}
         zoomTapEnabled={true}
      >
 
        {type=== "driverList" && locations && locations.map((item,index)=>{

            return (
                <Marker.Animated
                  ref={marker => {
                  HomeMarker = marker;
                  }}
                  key={index}
                  coordinate={item.origin.coords}
                  />
        
            )

        })
        }

        {type==="viewDriver" && requisitionSelected.origin &&

    <Marker.Animated
      ref={marker => {
      HomeMarker = marker;
      }}
      coordinate={requisitionSelected.origin.coords}
      />
            }


        {type==="viewDriver" && requisitionSelected.destinations && requisitionSelected.destinations.map((item,index)=>{

            return (
                <Marker.Animated
                  key={index}  
                  ref={marker => {
                  HomeMarker = marker;
                  }}
                  coordinate={item.coords}
                  />
        
            )
        })}

        {type==="viewDriver" && requisitionSelected.destinations.length > 0 && requisitionSelected.origin.coords != null &&

<Polyline
        coordinates={[requisitionSelected.origin.coords, requisitionSelected.destinations[0].coords]}
        strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={['#7F0000']}
        strokeWidth={6}
      /> 
}
            
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
