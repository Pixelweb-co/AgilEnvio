import React, { useState, useEffect,useContext, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Dimensions,Button, Platform, Text, View, StyleSheet } from 'react-native';
import ServicesMenu from '../menu';
import { NavigationContainer } from '@react-navigation/native';
import NavigationTabs from '../../navigation/NavigationTabs';
import { useSelector, useDispatch } from 'react-redux';
import {GoogleKey} from "@env";
import { changeOrigin,addDestination,addLocation,openSheet,closeSheet,changeStatus,setRequisition } from '../../../reducers/actions/RequsitionActions';
import DestinationsSheetModal from '../modals/DestinationsSheetModal';
//import iconDestination from '../assets/img/markerMenu.png'
import axios from 'axios';
import MapView , {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
  MapEvent
} from 'react-native-maps';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../CredentialsContext.jsx';

import * as Location from "expo-location";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;


export default function Requisition({navigation }) {
 
  const requisition = useSelector((store) => store);
  const [disabledRegister,setDisabledRegister]=useState(true)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [numDest, setNumDest] = useState(0);
  const [modalDestinos,setModalDestinos]=useState(false)
  const [showOrigin,setShowOrigin]=useState(false)
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const dispatch = useDispatch();
 
  const handleIncrement = () => {
    dispatch(increment());
  };
 
  const handleDecrement = () => {
    dispatch(decrement());
  };

  const openSheet = ()=>{
    dispatch(openSheet(true));
  }

  const setPending = ()=>{
    
    dispatch(changeStatus('PENDING'));

  }

  const handleChangeOrigin = async(origin) => {

    //  const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', { params:  });   
      
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
        axios
          .get(url, {params:{ key: GoogleKey,latlng:origin.coords.latitude.toString()+','+origin.coords.longitude.toString() }})
          .then((response) => {
            const result = response;
            setLocation(origin);
            setShowOrigin(true);
            dispatch(changeOrigin({
              title:result.data.results[0].address_components[1].short_name+' '+result.data.results[0].address_components[0].short_name+' '+result.data.results[0].address_components[2].short_name+' '+result.data.results[0].address_components[3].short_name+' '+result.data.results[0].address_components[4].short_name,
              coords:origin.coords
            }));
          })
          .catch((error) => {
  //          handleMessage('An error occurred. Check your network and try again');
            console.log(error);
          });
      };
      
  
  
  const handleAddLocation = (location) => {
    dispatch(addLocation({order: numDest,title:"loc "+numDest.toString(), coords:location,id:numDest}))
    setNumDest(numDest + 1);
  }
  
  const handleAddDestination = (destination) =>{
   // console.log("pick destination ",destination)
    //dispatch(addDestination({order: numDest,title:"loc "+numDest.toString(), coords:destination,id:numDest}))
    

  }  
  const loadDestinations = () => {

  }

  const getMapRegion = () => {
  
  if(requisition.reducers.requisition.origin.coords != null){
   return {
    latitude: requisition.reducers.requisition.origin.coords.latitude,
    longitude: requisition.reducers.requisition.origin.coords.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }

  }
  

  } ;

  


  useEffect(()=>{
      let errors = 0;
      if(requisition.reducers.requisition.origin === null){
        errors += 1

      }
  
      if(requisition.reducers.requisition.destinations.length === 0){
        errors += 1
        
      }
  
      if(requisition.reducers.requisition.type === null){
        //errors += 1
        
      }
  
      if(requisition.reducers.requisition.tarifa.valor === 0){
        errors += 1
        
      }
  
      
      if(requisition.reducers.requisition.comments.serviceTypeOptions === null){
        //errors += 1
        
      }

    //  console.log("errors ",errors)
  
      if(errors===0){
      setDisabledRegister(false)
      } else{
        setDisabledRegister(true)  
      }
      
  },[requisition.reducers])

  useLayoutEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      //console.log("permiso ubicacion ",status)

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

     
      let locationF = await Location.getCurrentPositionAsync({});
      //console.log("mi ubucacion ",locationF) 
      
      handleChangeOrigin(locationF);

    })();

    (async ()=>{
      try {
        await AsyncStorage.setItem('@ModalSheet', 'hide')
      } catch (e) {
        // saving error
      }
    })();

 /*    (async ()=>{
      try {
        
        const url = 'http://192.168.0.2:4488/api/solicitudes_user';
        await axios
          .post(url,{status:"PENDING",id_client:storedCredentials._id})
          .then((response) => { 
            const result = response;
            console.log("cliente "+storedCredentials.nombres+' - '+storedCredentials._id)
            console.log("solicitudes pendientes ",result.data)
            if(result.data.length>0){
              dispatch(setRequisition(result.data[0])) 
            }else{
              dispatch(setRequisition({
                id:null,
                id_client:null,
                client_data:null,
                id_driver:null,
                origin:{title:"initial",coords:null},
                destinations:[],
                status:"NEW",
                tarifa:{valor:0,formaPago:"efectivo"},
                type:null,
                comments:{notes:"",serviceTypeOptions:null}
              })) 
      
            }
 
          })
          .catch((error) => {
        //          handleMessage('An error occurred. Check your network and try again');
          //  console.log(error);
          });

      } catch (error) {
        
      }

    })() */
    console.log("Req en reg ",requisition.reducers.requisition)  
    
  
  }, []);

  useEffect(()=>{

   //console.log("initial location changed ",location)

  },[location])

  useEffect(()=>{

    //console.log("origin location changed redux ",requisition.reducers.requisition.origin)
    setLocation(requisition.reducers.requisition.origin)

  },[requisition.reducers.requisition.origin])

  useLayoutEffect(()=>{
    //console.log("status ",requisition.reducers.requisition.status)
    if(requisition.reducers.requisition.status === "PENDING" || requisition.reducers.requisition.status === "Abierta"){
    //alert("pendiente")
    navigation.navigate("SolicitudActiva",{requisition:requisition.reducers.requisition,offers:requisition.reducers.offers});
    }

  },[requisition.reducers.requisition.status])


  let text = 'Waiting..';
  let HomeMarker = null;


  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // const onLocationSelect23 = (event: MapEvent) => {
  //   console.log(event.nativeEvent.coordinate);
  //   handleAddLocation(event.nativeEvent.coordinate);
  // }

  const registerRequisition = async()=>{
    
    let storedCredentials
    await AsyncStorage.getItem('flowerCribCredentials')
    .then((result) => {
       
      if (result !== null) {
      //  console.log("result crede from ",result)
        storedCredentials = JSON.parse(result);


      } else {
        storedCredentials = null;
      }
    })
    .catch((error) => console.log(error));

    const url = 'http://192.168.0.2:4488/api/solicitudes';

    const requisition_send = {...requisition.reducers.requisition,status:"PENDING",id_client:storedCredentials._id,client_data:storedCredentials}

    //console.log("new to senf ",requisition_send)

    await axios
      .post(url, {requisition:requisition_send})
      .then((response) => {
        const result = response;
        dispatch(setRequisition(result.data))
        //console.log("FRom backend solicitud ",result.data)

      })
      .catch((error) => {
//          handleMessage('An error occurred. Check your network and try again');
        console.log(error);
      });

  }  


  const onLocationSelect = (place: MapEvent) => {
    //console.log("Add place ",place.nativeEvent.coordinate);
   handleAddLocation(place.nativeEvent.coordinate);
  }

  const onPlaceSelect = (place) =>{

    handleAddDestination(place)
  }

  const CloseModalStore = async ()=>{
    try {
      await AsyncStorage.setItem('@ModalSheet', 'hide')
      
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>

      {location !== null  && 
      <MapView 
         style={styles.map}
         provider={PROVIDER_GOOGLE}
         showUserLocation
         followUserLocation
         loadingEnabled
        //  onPress={onLocationSelect}
         region={getMapRegion()}
         showsScale={true}
         zoomControlEnabled={true}
         zoomEnabled={true}
         zoomTapEnabled={true}
         >

           
          {showOrigin && 
                <Marker.Animated
                  ref={marker => {
                  HomeMarker = marker;
                  }}
                  coordinate={location.coords}
                  />
          }      




        {requisition.reducers.requisition.destinations && requisition.reducers.requisition.destinations.map((item,index)=>{

          return(
            <Marker.Animated
            key={index}
            coordinate={item.coords}
            // icon={iconDestination}
            />
          )

        })}

{requisition.reducers.requisition.destinations.length > 0 && requisition.reducers.requisition.origin.coords != null &&

              <Polyline
                      coordinates={[requisition.reducers.requisition.origin.coords, requisition.reducers.requisition.destinations[0].coords]}
                      strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                      strokeColors={['#7F0000']}
                      strokeWidth={6}
                    /> 
}

{requisition.reducers.requisition.destinations.length > 1 && requisition.reducers.requisition.destinations.map((item,index)=>{
          //console.log("item cords ",(index-1))
          if(item){
          let lasTcords = requisition.reducers.requisition.destinations[index > 0 ? index-1: 0]
          
          //console.log("lastCords ",lasTcords)
          let trace = [lasTcords.coords, item.coords]
          
          //console.log("trace ",trace)
        return(
          <Polyline
          key={index}
          coordinates={trace}
          strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />        )

        }

        })}

      </MapView>    
      }
      <StatusBar style="auto" />
      {/* <ServicesMenu/> */}
       {/* <Text style={styles.paragraph}>{text}</Text> */}
      <View style={{height:330}}> 
       <NavigationTabs store={requisition.reducers} changeLocation={(loc)=>console.log("to loc ch ",loc)}/>
       <Button
        disabled={disabledRegister}
        onPress={registerRequisition}
        title="Solicitar servicio"
        color="orange"
        style={{textColor:"green", width:200}}
        accessibilityLabel="Solicitar servicio"
        />
     </View>
     <DestinationsSheetModal visible={requisition.reducers.sheetMenu} closeModal={()=>{CloseModalStore()}} openModal={()=>{openSheet()}}/>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map:{
    width:"100%",
    height:400
  }
});
