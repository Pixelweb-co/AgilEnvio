import React from 'react';
import {Image,View, Text, StyleSheet,useWindowDimensions,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Card, ListItem, Button,Input } from 'react-native-elements'

import AddressSelector from '../modals/AddressSelector';
import PriceSelector from '../modals/PriceSelector';
import DestinationsSheetModal from '../modals/DestinationsSheetModal';
import MarkerMenu from '../../../assets/img/markerMenu.png';
import MoneyMenu from '../../../assets/img/money.png';

import { useSelector, useDispatch } from 'react-redux';
import {changeOrigin, addDestination,compSheet,closeSheet,openSheet,setRequsitionType} from '../../../redux/actions/RequsitionActions'
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CarForm({store}) {
  const [visible,setVisible]=React.useState({visible:false,type:'origin'});
  const dispatch = useDispatch();
  const [showTarifaModal,setShowTarifaModal]=useState(false);
  const requisition = useSelector((store) => store.reducers);
  const [modalDestinos,setModalDestinos]=useState(false)


  const getModalStore = async ()=>{
    try {
    const value =  await AsyncStorage.getItem('@ModalSheet')
    
      console.log("from async storage ",value)
    } catch (e) {
      // saving error
    }
  };

  const OpenModalStore = async ()=>{
    try {
      await AsyncStorage.setItem('@ModalSheet', 'show')
    } catch (e) {
      // saving error
    }
  };

  const CloseModalStore = async ()=>{
    try {
      await AsyncStorage.setItem('@ModalSheet', 'hide')
    } catch (e) {
      // saving error
    }
  };


  const showComments = (payload)=>{
    
    console.log("change type")
    setTypeRequisition("Carro")
    openSheetCm(true)

  }

  const setVisibleList = (payload) =>{
    
    if(requisition.requisition.destinations.length>1){
      setModalDestinos(true)
      openSheetDa(true)
    
    }else{
      openSheetDa(false)
      setVisible(payload)
    }
    

  }

  
  const openSheetDa = (status)=>{
   console.log("open shhet")
    dispatch(openSheet(status));
    dispatch(compSheet('Destinos'))
  }

  const setTypeRequisition = (type)=>{
    dispatch(setRequsitionType(type))
  }
  
  const openSheetCm = (status)=>{
    console.log("open shhet")
     dispatch(openSheet(status));
     dispatch(compSheet('Comentarios'))
  }

  useEffect(()=>{
    console.log("requisition ccc ",requisition.sheetMenu)
    
  },[requisition.sheetMenu])

  useEffect(()=>{
    console.log("change type")
    setTypeRequisition("Carro")
  },[])
  return (
        
<View title="CARD WITH DIVIDER">
     <ListItem key={1} bottomDivider >

     <Icon
                            name="map-marker"
                            size={32}
                            color="lime"
                            />

        <ListItem.Content >
          <ListItem.Title onPress={()=>setVisible({visible:true,type:'origin'})}>{requisition.requisition.origin ? requisition.requisition.origin.title : 'Origen'}</ListItem.Title>
          <ListItem.Subtitle>Busca Origen</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem key={2} bottomDivider>
      <Icon
                            name="map-marker"
                            size={32}
                            color="red"
                            />
        <ListItem.Content style={{flex:1,flexDirection:"row"}}>
          
          <ListItem.Title style={styles.titleL}><TouchableOpacity style={{margin:0,padding:0}} onPress={()=>setVisibleList({visible:true,type:'destinations'})}><Text>{requisition.requisition.destinations.length} {requisition.requisition.destinations.length > 0 ? requisition.requisition.destinations[requisition.requisition.destinations.length-1].title : 'Destino'}</Text></TouchableOpacity>  </ListItem.Title>
           
          <Button
                        onPress={()=>setVisible({visible:true,type:'destinations'})}
                        icon={
                            <Icon
                            name="plus"
                            size={15}
                            color="white"
                            />
                        }
                                                
                        />
          
          
        </ListItem.Content>
      </ListItem>

      <ListItem key={3} bottomDivider>
      <Icon
                            name="money"
                            size={32}
                            color="blue"
                            />  
        <TouchableOpacity onPress={()=>setShowTarifaModal(true)}>  
        <ListItem.Content>
          <ListItem.Title >Tarifa</ListItem.Title>
          <ListItem.Subtitle>$ {requisition.requisition.tarifa.valor} - {requisition.requisition.tarifa.formaPago}</ListItem.Subtitle>
        </ListItem.Content>
        </TouchableOpacity>
      </ListItem>

      <ListItem key={4} bottomDivider>
      <Icon
                            name="comments"
                            size={32} 
                            color="pink"
                            />
        <TouchableOpacity onPress={()=>showComments(true)}>                      
        <ListItem.Content>
          <ListItem.Title>Comentarios -</ListItem.Title>
          <ListItem.Subtitle>Busca Comentarios</ListItem.Subtitle>
        </ListItem.Content>
        </TouchableOpacity>
      </ListItem>
            
            
            
<AddressSelector visible={visible.visible} typeSelector={visible.type} closeModal={()=>{setVisible({visible:false,type:'origin'})}}/>    
<PriceSelector visible={showTarifaModal} closeModal={()=>{setShowTarifaModal(false)}}/> 
            
            </View>

        
    );
}

export default CarForm;

const styles = StyleSheet.create({
  titleL:{
    width:"90%",
  },
  imageMenu:{
    width:32,
    height:32
  }
})