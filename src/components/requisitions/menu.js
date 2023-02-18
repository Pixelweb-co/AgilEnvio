import React from 'react';
import {Image,View, Text, StyleSheet,useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import Ionicons from '@expo/vector-icons/Ionicons';

import CarForm from './forms/CarForm';
import MotoForm from './forms/MotoForm';
import PaqueteForm from './forms/PaqueteForm';


const CarRoute = ({adressPicker,changeLocation}) => {
  console.log("car route")
  
  return  <CarForm changeLocation={changeLocation}/>
  };
  
  const MotoRoute = () => (
    <MotoForm/>
  );
  
  
  const PaqueteRoute = () => (
    <PaqueteForm/>
  );

  const renderScene = SceneMap({
    car: CarRoute,
    moto: MotoRoute,
    paquete:PaqueteRoute
  });


 const iconCar = ()=>(
    <Image
        source={require('../../../assets/icon.png')}
        fadeDuration={0}
        style={{ width: 50, height: 50 }}
      />
 ) 

function ServicesMenu(props) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'car', title: 'Carro',icon: <Ionicons name="md-checkmark-circle" size={32} color="green" /> },
      { key: 'moto', title: 'Moto' },
      { key: 'paquete', title: 'Paquete' },
    ]);
  
    return (
      
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    );
}

export default ServicesMenu;


const Styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%"
    },
    text:{
        color:"#CCCCCC"
    },
    menuItem:{
        width:"30%",
        marginRight:"1%",
        padding:"1%"
    }
    
})