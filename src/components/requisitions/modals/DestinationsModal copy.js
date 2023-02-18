import React, {useEffect, useState} from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, Modal,TextInput,TouchableOpacity  } from 'react-native'

import { Button, SearchBar,ListItem  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';
import {changeTarifa, changeOrigin,addDestination,addLocation } from '../../../redux/actions/RequsitionActions';


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import close from "../../../assets/img/close.png";


function DestinationsModal({visible, closeModal}) {
    const dispatch = useDispatch();
    const requisition = useSelector((store) => store.reducers.requisition);
    const [formaPago, setFormaPago] = useState('efectivo')
    const [tarifa, setTarifa] = useState(0)

    useEffect(()=>{
        console.log("rqdm ",requisition.destinations)

    },[])

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

            
        const grid = 8;

        const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
        });

        const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
        });


        
    return (
        <Modal animationType='slide'
            onDismiss={() => console.log("dimiss")}
            onShow={() => console.log("show")}
            transparent
            visible={visible}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(1,1,1, 0.5)',
                    justifyContent:"center",
                    alignItems:"center"
                }}  >
                <View style={
                    { 
                        height: "50%",
                        width:"100%",
                        backgroundColor:"#FFF",
                        borderTopLeftRadius:18,
                        borderTopRightRadius:18,
                        marginTop:"100%" }}>
                        
                        <View style={{
                            width:"100%",
                            minHeight:"45%",
                            flexDirection:"row",
                            alignItems:"flex-start",
                            paddingHorizontal:10,
                            justifyContent:"flex-start",
                            borderBottomColor:"#CCC",
                            borderBottomWidth:1
                            }}>
                 <View style={{flex:1, marginTop:10, height:"100%"}}>               
                {requisition.destinations.map((destination,index)=>{
                   console.log("dst ",destination)
                   
                   return(
                    <ListItem>
                        
                    <ListItem.Content style={{flex:1,flexDirection:"row"}}>
          
                    <Button
                                  onPress={()=>console.log("w")}
                                  icon={
                                      <Icon
                                      name="plus"
                                      size={15}
                                      color="white"
                                      />
                                  }
                                                          
                                  />

                    <ListItem.Title style={styles.titleL}>{destination.title}</ListItem.Title>
                     
                    <Button       style={styles.deleteButton}
                                  onPress={()=>console.log("w")}
                                  icon={
                                      <Icon
                                      name="trash"
                                      size={15}
                                      color="white"
                                      />
                                  }
                                                          
                                  />
                    
                    
                  </ListItem.Content>
                </ListItem>
          
                    )
                   })}
                   
                   </View>

                        </View>    

                 
                <Button
                        onPress={()=>closeModal()}
                        icon={
                            <Icon
                            name="close"
                            size={15}
                            color="white"
                            />
                        }
                        iconLeft
                        title=" Cerrar"
                        />       

                </View>
            </View>
        </Modal>
    );
}

export default DestinationsModal;


const styles = StyleSheet.create({
    input: {
      width:"80%",
      height: 45,
      padding: 10,
    },
    deleteButton:{
        backgroundColor: "red"
    },
    closeButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop:"30%"
      },
      titleL:{
        marginLeft:5,
        width:"90%",
        paddingTop:5
      },
      imageMenu:{
        width:32,
        height:32
      }
  });

  