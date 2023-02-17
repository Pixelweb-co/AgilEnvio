import {React,useEffect,useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';

const alphabet = ["B","C","D","F","G","H","I","J"]

const DestinationsRequisition = ({requisition}) =>{

   

  return (
    
<View style={styles.container}>
<View style={styles.row}>
  <View style={[styles.column, { flex: 1 }]}>
  
       
    </View>
  <View style={[styles.column, { flex: 12 }]}>
  <Text>{requisition.origin.title}</Text>
  </View>
</View>
<View style={styles.row}>
  <View style={[styles.column, { flex: 1 }]}>
    {/* Columna 1 de la segunda fila */}
  </View>
  <View style={[styles.column, { flex: 12 }]}>
  <Text>{requisition.destinations[requisition.destinations.length-1].title}</Text>
       
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
    },
      row: {
        flex: 1,
        flexDirection: 'row',
      },
      column: {
        borderWidth: 0,
        borderColor: '#000',
      }
  });
  