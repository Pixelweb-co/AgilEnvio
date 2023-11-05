import React, { useState } from 'react';
import {Image,TouchableOpacity,Text, FlatList, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {GoogleKey, API_URL} from "@env";


const ITEM_HEIGHT = 50; // Altura fija de cada elemento

const OffersList = ({offersList,onSelect}) => {
  const [lastItemVisible, setLastItemVisible] = useState(false);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const isLastItemVisible = offsetY + layoutHeight >= contentHeight - ITEM_HEIGHT;

    setLastItemVisible(isLastItemVisible);
  };

  const renderItem = ({ item }) => {
    return (
        <View
        key={item._id}
        style={{
          flexDirection: "row",
          borderColor: "orange",
          borderWidth:2,
          backgroundColor:"#FFF",
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom:5,
          borderRadius:15,
          elevation:2
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: API_URL+"/uploads/noPhoto.jpg",
            }}
            style={{ elevation:3,width: 55, height: 55, borderRadius: 25 }}
          />
        </View>

        <View style={{ flex: 3 }}>
        <View style={stylesItem.contenedor}>
      <View style={stylesItem.fila}>
        <View style={stylesItem.columna}>
            <Text style={{fontSize:18,fontWeight:"bold"}}>{item.contratista_name}</Text>
        </View>
      </View>
      <View style={stylesItem.fila}>
        <View style={stylesItem.columna}>
        <Text style={{fontSize:20,fontWeight:"bold",color:"red"}}>$ {item.valor}</Text>
        </View>
      </View>
      <View style={stylesItem.filaTres}>
        <View style={stylesItem.columnaTres}>
        
        <View style={stylesItem.filaTres}>
        <Icon name="star" size={15} color="#ffd700" style={stylesItem.columnaTres}/>
        <Text style={stylesItem.columnaTres}>7.6</Text>
        
        </View>
        </View>
        
        <View style={stylesItem.columnaTres}>
        
        <View style={stylesItem.filaTres}>
        <Icon name="suitcase" size={15} color="pink" style={stylesItem.columnaTres}/>
        <Text style={stylesItem.columnaTres}>230 </Text>
        
        
        </View>
        </View>
        <View style={stylesItem.columnaTres}>
        <View style={stylesItem.filaTres}>
        <Icon name="map-marker" size={15} color="brown" style={stylesItem.columnaTres}/>
        <Text style={stylesItem.columnaTres}>10Km</Text>
        
        
        
        </View>
        </View>
      </View>
    </View>
        </View>

        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            paddingTop:5
          }}
        >
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 5,
              elevation:2  
            }}
            >
              <Text style={{ color: "white" }}>✓</Text>
            </TouchableOpacity>
         
        </View>
      </View>
    );
  };

  const animatedBorderStyle = lastItemVisible ? { borderColor: 'red', borderWidth: 2, borderStyle: 'solid' } : {};

  return (
    <FlatList
      data={offersList}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={[styles.listContainer, animatedBorderStyle]}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 300, // Altura fija del contenedor
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});



const stylesItem = StyleSheet.create({
    contenedor: {
      flex: 1,
      flexDirection: 'column',
    },
    fila: {
      flex: 1,
      flexDirection: 'column',
    },
    filaTres: {
      flex: 1,
      flexDirection: 'row',
      
    },
    columna: {
      flex: 1,
      alignContent:"center",
      alignItems:"center"
      
    },
    columnaTres: {
      flex: 1,
      
    },
  });

  
export default OffersList;
