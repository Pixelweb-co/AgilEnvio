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
  
    const ResultRow = ({ result }) => {
        return (
          <View style={styles.result}>
            <Image
              source={require('../../../../assets/img/markerMenu.png')}
              style={styles.icon}
            />
             <Text style={styles.resultText}>{result.description}</Text>
           
          </View>
        );
      };
  
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
        style={{
        container: stylesInput.container,
        textInputContainer: stylesInput.textInputContainer,
        textInput: stylesInput.textInput,
        listView: stylesInput.listView,
        description: stylesInput.description,
        row: stylesInput.row,
        poweredContainer: stylesInput.poweredContainer,
        separator: stylesInput.separator,
      }}
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


        //    handleAddDestination(details.geometry.location,data)
        }}
        onFail={(error) => console.error(error)}
        renderRow={(result) => <ResultRow result={result} />}
        
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
      result: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
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


  const stylesInput = StyleSheet.create({
    container: {
      flex: 1,
      height:600
    },
    textInputContainer: {
      backgroundColor: '#fff',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    textInput: {
      height: 45,
      color: '#5d5d5d',
      fontSize: 16,
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderColor: '#d6d7da',
    },
    listView: {
      backgroundColor: '#fff',
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    description: {
      color: '#5d5d5d',
    },
    row: {
      padding: 10,
    },
    poweredContainer: {
      display: 'none',
    },
    separator: {
      height: 1,
      backgroundColor: '#c8c7cc',
    },
  });
  