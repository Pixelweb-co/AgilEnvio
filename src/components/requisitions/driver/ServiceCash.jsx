
import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default function ServiceCash() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Hoy  </Text>
      <Text style={styles.text}>$ 0</Text>
      <Text style={styles.text}>Mi saldo  </Text>
      <Text style={styles.text}>$ 0</Text>
    
     </View>
  );
}

const styles = new StyleSheet.create({
    container:{
        
        flexDirection:"row"
    },
    text:{
        flex:1,
        width:"50%"
    }
})