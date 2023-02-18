import {React,useEffect,useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';

import iconDestination from '../../../assets/img/markerMenu.png'

const alphabet = ["B","C","D","F","G","H","I","J"]

const DestinationsRequisition = ({requisition}) =>{

   

  return (
    
<View style={styles.container}>
<View style={styles.row}>
  <View style={[styles.column, { flex: 1,alignContent:"center",alignItems:"center",paddingTop:5.5 }]}>
    <View style={{
          backgroundColor: "lime",
          padding: 5,
          borderRadius: (Math.round(12 + 12) / 2),
          width:(12*0.5),
          height:(12*0.5)
        }}></View>

    </View>
  <View style={[styles.column, { flex: 12 }]}>
  <Text style={styles.textDestination}>{requisition.origin.title}</Text>
  </View>
</View>
<View style={styles.row}>
  <View style={[styles.column, { flex: 1,alignContent:"center",alignItems:"center",paddingTop:5.5 }]}>
  <View style={{
          backgroundColor: "red",
          padding: 5,
          borderRadius: (Math.round(12 + 12) / 2),
          width:(12*0.5),
          height:(12*0.5)
        }}></View>
  </View>
  <View style={[styles.column, { flex: 12 }]}>
  <Text style={styles.textDestination}>{requisition.destinations[requisition.destinations.length-1].title}</Text>
       
  </View>
</View>
</View>
  )
}

export default DestinationsRequisition


const styles = StyleSheet.create({
    destinationIcon:{
        backgroundColor:"green",
        width:30,
        height:30,
    },
    container: {
        flex: .2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingTop:5,
        paddingBottom:5
    },
      row: {
        flex: 1,
        flexDirection: 'row',
      },
      column: {
        borderWidth: 0,
        borderColor: '#000',
      },
      textDestination:{
        fontSize:14,
        color:"blue",
        fontWeight:"bold"
      }
  });
  