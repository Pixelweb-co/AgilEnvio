import React, {useEffect, useState} from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, Modal,TextInput,TouchableOpacity  } from 'react-native'

//import { Button, SearchBar,ListItem  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';
import {changeTarifa, changeOrigin,addDestination,addLocation } from '../../../reducers/actions/RequsitionActions';



import close from "../../../../assets/img/close.png";


const formas_dePago = ['efectivo','nequi','bancolombia'];

function PriceSelector({visible, closeModal}) {
    const dispatch = useDispatch();
    const requisition = useSelector((store) => store.reducers.requisition);
    const [formaPago, setFormaPago] = useState('efectivo')
    const [tarifa, setTarifa] = useState(0)


    const HandleChangeTarifa=(e)=>{
            console.log("EE ",e)
            setTarifa(e) 
            //dispatch(changeTarifa({valor:e,formaPago:formaPago}))
    }

    const HandleChangeFormaPago=(e)=>{
        console.log("FP ",e) 
       // dispatch(changeTarifa({valor:requisition.tarifa,formaPago:e}))
       setFormaPago(e)     
    }

    const setTarifaRequisition = () =>{

        dispatch(changeTarifa({valor:tarifa,formaPago:formaPago}))
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
                            height:45,
                            flexDirection:"row",
                            alignItems:"flex-start",
                            paddingHorizontal:10,
                            justifyContent:"flex-start",
                            borderBottomColor:"#CCC",
                            borderBottomWidth:1
                            }}>


                            <TextInput
                                style={styles.input}
                                placeholder="Escribe una tarifa"
                                onChangeText={(e)=>HandleChangeTarifa(e)}    
                            />


                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={()=>closeModal()}
                                
                            >    
                            
                                        <Image source={close}
                                        style={{
                                        width:32,
                                        height:32,
                                        marginTop:5,
                                        flexDirection:"row",
                                            
                                        
                                        }}
                                        />
                            
                            </TouchableOpacity>

                        </View>    
                       
                <View
                    style={{
                    flex:1,
                    marginTop:7,
                    height:50,
                    alignItems:"center"
                }}
                >

<Text>Tarifa seleccionada: COP: {tarifa}</Text>

                </View> 
                <View style={{flex:1, marginBottom:10, height:"0%"}}>
                    <Text>Forma de pago</Text>
                    <View>
                   {formas_dePago && formas_dePago.map((itemFP,keyP)=>{
                   //console.log("itemFP ",itemFP)
                   return(<View key={keyP}>
                            <View>
                                <Text onPress={()=>HandleChangeFormaPago(itemFP)}>{itemFP}</Text>
                            </View>
                   </View>)
                   })}
                    </View>
                </View>

{/*                  
                <Button
                        onPress={()=>setTarifaRequisition()}
                        icon={
                            <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                            />
                        }
                        iconLeft
                        title="Ofrecer tarifa y medio de pago"
                        />        */}

                </View>
            </View>
        </Modal>
    );
}

export default PriceSelector;


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