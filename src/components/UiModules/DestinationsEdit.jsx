import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { setRequisition } from "../../reducers/actions/RequsitionActions";

import { useDispatch, useSelector } from "react-redux";

export default function DestinationsEdit({ destinations }) {
  const [data, setData] = useState(destinations);
  const dispatch = useDispatch();

  //destinations store
  const requisition = useSelector((store) => store.reducers.requisition);
  const setDestinations = (listOrder) => {
    dispatch(
      setRequisition({
        ...requisition,
        destinations: listOrder,
      })
    );
  };

  useEffect(() => {
    if (data) {
    //  console.log("Destinos final ", data);
      setDestinations(data);
    }
  }, [data]);

  const deleteDestination = (id) => {
    const copy = [...data]; // Don't modify react data in-place
    // update order of items in the new list
    var newList = [];

    var order = 0

    const newData = copy.map((item, index) => {
     
     
      if (id !== item.id) {
        console.clear();
        order += 1
        newList.push({ ...item, order: order });
        
        return { ...item, order: order };
     
      }
    });

    console.log("delete data n ",newList);

    setData(newList)
  };

  function keyExtractor(item: any, index: number) {
    // console.log("id order ",item)
    return `item-${item.order}`;
  
  }

  function renderItem(info: DragListRenderItemInfo<string>) {
    const { item, onStartDrag, isActive } = info;
    // console.log("rit ",item)

    const itemStyle = isActive ? styles.activeItem : styles.inactiveItem;
    const itemText = isActive ? styles.activeText : styles.inactiveText;

    const titleFragments = item.title.split(",");

    return (
      //   <TouchableOpacity key={item.order}   onPressIn={onStartDrag}  style={styles.row}>
      //   <View style={styles.icon}>
      //     <MaterialCommunityIcons name="map-marker" size={24} color="blue" />
      //   </View>
      //   <View style={styles.title}>
      //     <Text>{titleFragments[0]} {titleFragments[1]} {titleFragments[2]}</Text>
      //   </View>
      //   <View style={styles.buttons}>
      //     <TouchableOpacity style={styles.deleteButton}>
      //       <MaterialCommunityIcons name="delete" size={24} color="black" />
      //     </TouchableOpacity>
      //     <TouchableOpacity style={styles.dragButton}>
      //       <MaterialCommunityIcons
      //         name="drag-vertical"
      //         size={24}
      //         color="black"
      //       />
      //     </TouchableOpacity>
      //   </View>
      // </TouchableOpacity>

      <View key={item.order}>
        <View style={[styles.row, itemStyle]}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="map-marker" size={24} color="blue" />
          </View>
          <View style={styles.title}>
            <Text style={itemText}>
              {titleFragments[0]} {titleFragments[1]} {titleFragments[2]}
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteDestination(item.id)}
            >
              <MaterialCommunityIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dragButton} onPressIn={onStartDrag}>
              <MaterialCommunityIcons
                name="drag-vertical"
                size={24}
                color="orange"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  async function onReordered2(fromIndex: number, toIndex: number) {
    const copy = [...requisition.destinations]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  async function onReordered(fromIndex, toIndex) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    console.log("____________________________");

    var newList = [];
    // update order of items in the new list
    const updatedList = copy.map((item, index) => {
      console.clear();
      //  console.log("item to order index "+index+" | ",item.title+' new order '+(index+1))
      //   console.log("____________________________")
      newList.push({ ...item, order: index + 1 });

      return { ...item, order: index + 1 };
    });
    //   console.log("lista ordenada ",newList)
    setData(newList);

    console.log("____________________________");
  }

  return (
    <View style={styles.container}>
      <View style={styles.row2}><Text style={styles.title2}>Mis Destinos</Text></View>
      <View style={styles.row2}>
      <DragList
        data={data}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
        activeItemStyle={styles.activeItem}
      />
    </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 4,
    width: "97%",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
    width: "100%",
  },
  row2:{
    
    flexDirection:"row"
  },
  activeItem: {
    backgroundColor: "#EEE",
    transform: [{ scale: 1.05 }],
  },
  inactiveItem: {},
  activeText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inactiveText: {
    fontSize: 18,
  },
  icon: {
    marginRight: 12,
  },
  title2: {
   fontSize:18,
   fontWeight:"bold"
  },
  title: {
    width: "67%",
    marginRight: 12,
  },
  buttons: {
    flexDirection: "row",
  },
  deleteButton: {
    marginLeft: 12,
  },
  dragButton: {
    marginLeft: 12,
  },
});
