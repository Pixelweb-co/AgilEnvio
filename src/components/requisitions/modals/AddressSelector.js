import React, {useEffect, useState} from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, Modal,TextInput,TouchableOpacity  } from 'react-native'

//import { Button, SearchBar,ListItem  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';
import { changeOrigin,addDestination,addLocation } from '../../../reducers/actions/RequsitionActions';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import close from "../../../../assets/img/close.png";

function AddressSelector({visible,fieldAddressSelected, closeModal,typeSelector,changeLocation}) {
    const dispatch = useDispatch();
    const locations = useSelector((store) => store.reducers.locations);
  
    
  
    const handleAddDestination = (destination,place)=>{
        console.log("destination Pick: ",destination)
        console.log("type: ",typeSelector)
        console.log("data place ",place)

        if(typeSelector === 'origin'){
            dispatch(changeOrigin({order: 0,title:place.description, coords:{latitude:destination.lat,longitude:destination.lng},id:place.place_id}))
        }

        
        if(typeSelector === 'destinations'){
            dispatch(addDestination({order: (locations.length + 1),title:place.description, coords:{latitude:destination.lat,longitude:destination.lng},id:place.place_id}))
        }

        closeModal()
    }



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
                        height: "80%",
                        width:"100%",
                        backgroundColor:"#FFF",
                        borderTopLeftRadius:18,
                        borderTopRightRadius:18,
                        marginTop:"41%" }}>
                        
                        <View style={{
                            width:"100%",
                            height:310,
                            flexDirection:"row",
                            alignItems:"flex-start",
                            paddingHorizontal:10,
                            justifyContent:"flex-start",
                            borderBottomColor:"#CCC",
                            borderBottomWidth:1
                            }}>

<GooglePlacesAutocomplete
        placeholder="Escribe una dirección"
        minLength={4}
        autoFocus={true}
        style={{borderBottomWidth:1,
                height:25,
                backgroundColor:"#CCC"}}
        query={{
          key: "AIzaSyDzQmRckek8ujCnLrYo_s35o0heMSPkY7s",
          language: 'en', // language of the results,
        }}
        GooglePlacesDetailsQuery={{ 
            fields: 'geometry',
          }}
        fetchDetails={true}
        onPress={(data, details = null) => {
            console.log("loc rec ",details.geometry.location)
            //get coordinates


            handleAddDestination(details.geometry.location,data)
        }}
        onFail={(error) => console.error(error)}
        
      />        




                        </View>    
                       
                <View
                    style={{
                    flex:1,
                    marginTop:7,
                    height:50,
                    alignItems:"center"
                }}
                >
                    {/* <Button
                        onPress={()=>closeModal()}
                        icon={
                            <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                            />
                        }
                        iconLeft
                        title=" Buscar en el mapa"
                        /> */}


                </View> 

               
               
                        

                </View>
            </View>
        </Modal>
    );
}

export default AddressSelector;


const styles = StyleSheet.create({
    input: {
      width:"80%",
      height: 45,
      padding: 10,
    },
    closeButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop:"30%"
      },
  });