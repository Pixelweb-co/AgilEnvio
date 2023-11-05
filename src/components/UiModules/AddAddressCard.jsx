import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddressPicker from '../UiModules/AddressPicker';



const AddAddressCard = ({optionSet, user,cloaseAddressAdd,setAddress }) => {
  
  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity
          onPress={() => cloaseAddressAdd()}
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecciona {optionSet === 'address' ? "una direcciòn":""}{optionSet === 'home' ? "donde vives":""}{optionSet === 'study' ? "donde estudias":""}{optionSet === 'work' ? "donde trabajas":""}</Text>
      </View>
      <AddressPicker setDirection={setAddress}/>
      
{/*       
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        extraData={selectedAddress}
      /> */}
    </View>
  );
};

export default AddAddressCard;
