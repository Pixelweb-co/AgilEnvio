import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapPicker from './MapPickAddress';

const MapPickerCard = ({ pickAddress,close,visible }) => {
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity
          onPress={() => close()}
          style={{
            width: 32,
            height: 32,
            backgroundColor: '#f2f2f2',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons name="md-arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Busca en el mapa {visible ? ("visible") :("")}</Text>
      </View>

      <View style={{height:Dimensions.get("window").height}}>    
      <MapPicker pickAddress={pickAddress} close={close} visible={visible}/>
      </View>

    </View>
  );
};

export default MapPickerCard;
