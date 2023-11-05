import React, { Component,useEffect,useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//componentes
import MapComponent from '../../maps/MapComponent';
import LocationServiceList from './LocationServiceList';


import {
  StyleSheet,
  View,
  Text,  
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import ServiceCash from './ServiceCash';
import PanelConductor from '../../UiModules/PanelConductor';

const Tab = createMaterialTopTabNavigator();

function MyTabs({navigationExt,socket}) {
  
  return (
    <Tab.Navigator tabBarPosition='top'>
      
      <Tab.Screen name="mapa">
      {(props)=>
          { 

          return <MapComponent {...props} navigation={props.navigation} type="driverList"/>}
          }
      </Tab.Screen>  

      <Tab.Screen name='Lista'>
      
      
      {()=><LocationServiceList navigation={navigationExt} socket={socket}/>}

      </Tab.Screen>

    </Tab.Navigator>
  ); 
}


var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

const RequisitionList =({socket,store,navigation})=> {
    
    useEffect(() => {
      
      if(socket!==null){
          console.log("buscando solicitudes")  
          socket.emit("solicitudes_get",{})
      }
      
    
    }, [socket])


    return (
      <View style={{height:height}}>
      <View style={{ backgroundColor: "white", flex: 1 }} >
        <Text>kerlin</Text>
      </View>
      <View style={{ backgroundColor: "#CCC",flex:15 }} >
        <MyTabs navigationExt={navigation} socket={socket}/>
      </View>
      <View style={{ backgroundColor: "royalblue",flex:5 }} >
        <PanelConductor/>
      </View>
    </View>
        )
  
}

export default RequisitionList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    header: {
      width: 100,
      backgroundColor: 'blue',
    },
    content: {
      flex: 1,
      backgroundColor: 'gray',
    },
    footer: {
      width: 100,
      backgroundColor: 'green',
    },
  });