import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesCard = ({ user,closeFavorities }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
   
    const fetchFavorites = async () => {
        console.log("obteniendo lista de favoritos")
        const response = await fetch(`http://api.agilenvio.co:2432/api/getfavoritos?user=${user._id}`);
      const data = await response.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, [user]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
      }}
      onPress={() => handleSelectAddress(item)}
    >
      <Ionicons name="md-pin" size={24} color="#333" style={{ marginRight: 12 }} />
      <Text style={{ fontSize: 16 }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity
          onPress={() => closeFavorities()}
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecciona un favorito</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        extraData={selectedAddress}
      />
    </View>
  );
};

export default FavoritesCard;
