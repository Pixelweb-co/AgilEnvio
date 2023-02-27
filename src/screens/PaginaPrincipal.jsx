import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import RequisitionActive from "../components/requisitions/RequisitionActive";
import NewRequisition from "../components/requisitions/client/NewRequistion";
import RequisitionList from "../components/requisitions/driver/RequisitionList";
import Requisition from "../components/requisitions/client/Requisition"; 
import DestinationsSheetModal from "../components/requisitions/modals/DestinationsSheetModal";
import TerminarServicioDriver from "../components/requisitions/driver/terminarServicioDriver";
import TerminarServicioCliente from "../components/requisitions/client/terminarServicioCliente";

const PaginaPrincipal = ({
  offers,
  requisition,
  appMode,
  socket,
  navigation,
  user
}) => {
  
  const [requisitionLoad,setRequisitionLoad]=useState(null)
  
  useEffect(() => {

    if(user && requisition.status){
        console.log("change requisition page principal "+user.tipo,requisition)
        setRequisitionLoad(requisition)
    }

  }, [requisition,user]);

  return (
    <View>
       {/* <Text>Estado : {requisitionLoad && requisitionLoad.status} </Text> 
     <Text>Modo aplicacion {appMode && appMode}</Text>   */}

      {/* <Text>Elige un servicio</Text>

     <Text>Alimentacion y bebidas</Text>

     <Text>Transporte</Text>

     <Text>Servicios de emergencia</Text> */}

      {user && requisitionLoad && socket !== null && (requisitionLoad.status === "PENDING" || requisitionLoad.status === "Abierta") && 
        <RequisitionActive offers={offers} socket={socket} requisition={requisitionLoad} />
      }

      
      {user && requisitionLoad && socket !== null && appMode === "client" && requisitionLoad.status === "NEW" && (
        

        <Requisition socket={socket} navigation={navigation}/>
      )}

      {user && requisitionLoad && socket !== null && appMode === "driver" && requisitionLoad.status === "NEW" && (
        <RequisitionList
          socket={socket}
          offers={offers}
          navigation={navigation}
        />
      )}


      {user && socket !== null && appMode === "client" && requisitionLoad.ratedClient !== "rated" && requisitionLoad.status === "Cerrada" && 
        <TerminarServicioCliente user={user} requisition={requisitionLoad}/>
      }
   

      {user && requisitionLoad !== null && user && socket !== null && appMode === "driver" && requisitionLoad.ratedDriver !== "rated" && requisitionLoad.status === "Cerrada" && 
        <TerminarServicioDriver user={user} requisition={requisitionLoad}/>
      }
   
    </View>
  );
};

export default PaginaPrincipal;
