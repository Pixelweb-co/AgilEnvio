import React from 'react';
import {ActivityIndicator, StyleSheet, Text,View} from 'react-native';

const ActivityIndicador = ({text}) => (
  <View style={[styles.container, styles.horizontal]}>
    
    <ActivityIndicator size="large" color="#0000ff"/>
    <Text>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center"
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ActivityIndicador;