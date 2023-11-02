import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function PanelConductor() {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image source={require('../../../assets/img/motorbike.png')} style={styles.image} />
        <Text style={styles.text2}>CBT74C</Text>
        <TouchableOpacity style={styles.buttonCV}>
        <Text style={styles.text3}>Cambiar</Text>            
        </TouchableOpacity>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.row}>
          <Text style={styles.text2}>Ganancias hoy</Text>
          <Text style={styles.text2_1}>$30,000</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.text}>Número de viajes</Text>
          <Text style={styles.text_1_2}>24</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.text}>Saldo para operar</Text>
          <Text style={styles.text_1_2}>$100,000</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10
  },
  leftColumn: {
    flex: 0.3,
    width:"25%",
    alignItems: 'center',
  },
  rightColumn: {
    flex: 0.7,
    paddingLeft: 10,
    paddingRight:15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    tintColor:"white",
    elevation:3
},
  text: {
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  text_1_2:{
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
},
  text2: {
    fontSize: 22,
    color:"white",
    fontWeight:"bold"
},
text3: {
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
},
  text2_1: {
    fontSize: 22,
    color:"white",
    fontWeight:"bold"
},
buttonCV:{
    marginTop:5,
    borderWidth:1,
    paddingVertical:5,
    paddingHorizontal:15,
    borderColor:"white",
    borderRadius:5
}
});
