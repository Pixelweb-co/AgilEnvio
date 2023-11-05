import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions, Alert } from 'react-native';
import MapComponent from '../components/maps/MapComponent';
import DestinationsRequisition from '../components/requisitions/DestinationsRequisition'
import NegotiateRequisition from '../components/requisitions/driver/NegotiateRequisition';

import {useSelector} from 'react-redux'

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;


export default function ServicioSelectedDriver(props) {
    const [requsitionSl,setRequisition]=useState(null)
    
    const [socket,setSocket]=useState(null)
    const requisitionNegotiate = useSelector(state => state.reducers.requisitionNegotiate)
    const requisition = useSelector(state => state.reducers.requisition)
    const requisitionList = useSelector(state => state.reducers.requisitionListPending)


    useEffect(()=>{

      if(requisitionList.length>0 && requsitionSl.status==="PENDING"){
        const findR = requisitionList.find((r)=>r._id === props.route.params.requisition._id);
   
        console.log("cambio en la lista de solicitudes ",findR.tarifa.valor)

      if(findR){

        if(findR.tarifa.valor < props.route.params.requisition.tarifa.valor){
          Alert,alert("El cliente ha disminuido la tarifa de este servicio")
        }


        if(findR.tarifa.valor > props.route.params.requisition.tarifa.valor){
          Alert,alert("El cliente ha aumentado la tarifa de este servicio")
        }

        setRequisition(findR);

      }else{
        Alert.alert("Esta solicitud ya no esta disponible.")
        props.route.params.navigationExt.navigate("Principal")
      }

    }

    },[requisitionList])

    useEffect(()=>{

     if(props.route.params.requisition){ 
      console.log("requsition active ? ",props.route.params.requisition)
      if(requisition.status==='Abierta'){
        props.route.params.navigationExt.navigate("Principal")
      }
    }

    },[requisition,props.route.params.requisition])

    useEffect(()=>{
        
      
      if(props.route.params.requisition){
      console.log("change req status ",props.route.params.requisition.status)            
        if(requisitionNegotiate===null){
                console.log("neg empty")
            setRequisition(props.route.params.requisition)

        }

        if(requisitionNegotiate !==null && requisitionNegotiate._id === props.route.params.requisition._id){
           console.log("change tarifa ")
            setRequisition(requisitionNegotiate)
        }   

      }
      
    },[props.route.params.requisition,requisitionNegotiate])




  return (
    <>
    {requsitionSl !== null && <>
    <View style={{height:height}}>
    <View style={{ backgroundColor: "#7cb48f", flex: .7 }} >
    
    
    <Text>Cliente: {requsitionSl.client_data.nombres} Tel: {requsitionSl.client_data.telefono}</Text>
    <Text>Valor: {('$'+requsitionSl.tarifa.valor)+(' Forma de pago: '+requsitionSl.tarifa.formaPago)}</Text>
    

    </View>
    <View style={{ backgroundColor: "#7CA1B4",flex:5.5 }} >
     <MapComponent type="viewDriver" requisitionSelected={requsitionSl}/>
    </View>
    <View style={{ backgroundColor: "#FFFFFF",flex:5 }} >
    
    <DestinationsRequisition requisition={requsitionSl}/>
    
     <NegotiateRequisition requisition={requsitionSl} socket={props.route.params.socket}/>   
     <View style={styles.container}>   
     <View style={styles.row}>
      <View style={styles.singleColumn}>
      <TouchableOpacity style={styles.button} onPress={()=>props.route.params.navigationExt.navigate("Principal")}>
          <Text style={styles.buttonText}>Volver al Listado</Text>
      </TouchableOpacity>
      </View>
    </View>
    </View>

    </View>
  </View>
  </>}
  </> );
}


const styles = new StyleSheet.create({
    button: {
      width:"95%",  
      backgroundColor: '#1E88E5',
      padding: 5,
      alignItems: 'center',
      borderRadius:8
    },
    button2: {
      width:"30%",  
      backgroundColor: 'red',
      padding: 5,
      alignItems: 'center',
      borderRadius:50
    },
    button3: {
      width:"30%",  
      backgroundColor: 'green',
      padding: 5,
      alignItems: 'center',
      borderRadius:50
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  
    },
    container: {
      flex: .4,
      flexDirection: 'column'
    },
    row: {
      flex: .4,
      flexDirection: 'row'
    },
    column: {
      flex: .4,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    singleColumn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    
    }
  })