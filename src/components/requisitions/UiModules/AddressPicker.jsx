import React, { useState } from 'react';
import { View, TextInput, FlatList, Text,Image,TouchableOpacity ,StyleSheet} from 'react-native';

const AddressPicker = ({setDirection}) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    
    //console.log(text)
    setSearchText(text);

    if (text.length < 3) {
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:CO&types=address&key=AIzaSyDzQmRckek8ujCnLrYo_s35o0heMSPkY7s`;

    const response = await fetch(url);
    const data = await response.json();
    //console.log("google preds ",data)
    if (data.predictions.length>0) {
      setResults(data.predictions);
    }
  };


  const renderItem = ({ item }) => {
   
    return (
      
      <TouchableOpacity style={styles.result} onPress={()=>{
        
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=AIzaSyDzQmRckek8ujCnLrYo_s35o0heMSPkY7s`;
    fetch(detailsUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.result.name;
        const lat = data.result.geometry.location.lat;
        const lng = data.result.geometry.location.lng;
        console.log('Ubicación:', location);
        console.log('Latitud:', lat);
        console.log('Longitud:', lng);
      
        setDirection(data.result,item)
      
      
      
      });

        
        }}>
      
        <Image
          source={require('../../../../assets/img/markerMenu.png')}
          style={styles.icon}
        />
         <Text style={styles.resultText} onChangeText={handleSearch} value={searchText}>{item.description}</Text>
       
      </TouchableOpacity>

    );
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AddressPicker;


const styles = StyleSheet.create({
  input: {
    width: "98%",
    height: 45,
    padding: 10,
    marginTop: 10,
    marginLeft: 5,
    marginBottom:15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2, // Agrega sombra
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButton: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      marginTop:"30%"
    },
    result: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      height:50
    },
    resultText: {
      flex: 1,
      fontSize:16
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 6,
    },
});