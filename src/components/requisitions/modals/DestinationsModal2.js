import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PanResponder,
  PanResponderInstance,
  Animated,
  Modal
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import ListDragDestinations from "./ListDragDestinations";

const DestinationsModal = ({visible}) =>{
  const requisition = useSelector((store) => store.reducers.requisition);
  return(
    <Modal animationType='slide'
    onDismiss={() => console.log("dimiss")}
    onShow={() => console.log("show")}
    transparent
    visible={visible}>
    {requisition.destinations.length > 0 && 
   <ListDragDestinations data={requisition.destinations} visible={visible}/>
    }
    </Modal>
  )

}

export default DestinationsModal; 