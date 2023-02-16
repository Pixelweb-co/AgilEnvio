import {React,useEffect,useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';

const alphabet = ["B","C","D","F","G","H","I","J"]

const DestinationsRequisition = ({requisition}) =>{

   

  return (
    <View style={{marginBottom:15}}>

        <View>
        
            <Text>Punto de recojida: {requisition.origin.title}</Text>
        </View>

    {requisition.destinations.map((item,index)=>{
        
        return(
        <View key={index}>
            <Text>Destino: {item.title}</Text>
        </View>
        )
    
    })}


    </View> 
  )
}

export default DestinationsRequisition


const styles = StyleSheet.create({
    destinationIcon:{
        backgroundColor:"green",
        width:30,
        height:30,
    }
  });
  