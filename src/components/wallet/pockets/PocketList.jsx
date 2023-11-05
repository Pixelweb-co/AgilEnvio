import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Item = ({ item, onDelete, onUpload }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text>{item.title}</Text>
      <Text>{item.saldo}</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={{backgroundColor:"red", padding:5,borderRadius:5,elevation:3,width:30,height:30,alignContent:"center",alignItems:"center",justifyContent:"center"}}>
        <Icon name="trash"size={18} color="white"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onUpload(item.id)}  style={{ marginLeft: 10,backgroundColor:"orange", padding:5,borderRadius:5,elevation:3,width:30,height:30,alignContent:"center",alignItems:"center",justifyContent:"center" }}>
        <Icon name="upload" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const PocketList = ({data}) => {
  const [listData, setListData] = useState(data);

  const handleDelete = (id) => {
    const newData = listData.filter(item => item.id !== id);
    setListData(newData);
  };

  const handleUpload = (id) => {
    // TODO: Implement upload functionality
    console.log(`Upload item with id ${id}`);
  };

  const renderItem = ({ item }) => (
    <Item item={item} onDelete={handleDelete} onUpload={handleUpload} />
  );

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default PocketList;

const styles = new StyleSheet.create({
     optionsContainer: {
      flex: 1,
      justifyContent: "center",
    },
    optionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    option: {
      alignItems: "center",
      width: "48%",
      borderWidth: 1,
      padding: 6,
      borderColor: "#CCC",
      borderRadius: 5,
    },
    optionLabel: {
      marginTop: 10,
      fontSize: 12,
      color: "#333",
      textAlign: "center",
    },
    titleContainer: {
      fontSize: 16,
    }
})