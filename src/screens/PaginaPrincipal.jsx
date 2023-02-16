import React, { useEffect } from "react";
import { View, Text } from "react-native";

import RequisitionActive from "../components/requisitions/client/RequisitionActive";
import NewRequisition from "../components/requisitions/client/NewRequistion";
import RequisitionList from "../components/requisitions/driver/RequisitionList";

const PaginaPrincipal = ({
  offers,
  requisition,
  appMode,
  socket,
  navigation,
}) => {
  useEffect(() => {
   
    
  }, []);

  return (
    <View>
      {/* <Text>Estado : {requisition.status} </Text> 
     <Text>Modo aplicacion {appMode && appMode}</Text> */}

      {/* <Text>Elige un servicio</Text>

     <Text>Alimentacion y bebidas</Text>

     <Text>Transporte</Text>

     <Text>Servicios de emergencia</Text> */}

      {requisition.status === "PENDING" && <RequisitionActive offers={offers} socket={socket} requisition={requisition} />}

      {appMode === "client" && requisition.status === "NEW" && (
        <NewRequisition socket={null} />
      )}

      {appMode === "driver" && requisition.status === "NEW" && (
        <RequisitionList
          socket={socket}
          offers={offers}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default PaginaPrincipal;
