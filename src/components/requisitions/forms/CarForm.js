import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
//import {Avatar, Card, ListItem, Button,Input } from 'react-native-elements'

import AddressSelector from "../modals/AddressSelector";
import PriceSelector from "../modals/PriceSelector";
import DestinationsSheetModal from "../modals/DestinationsSheetModal";
import MarkerMenu from "../../../../assets/img/markerMenu.png";
import MoneyMenu from "../../../../assets/img/money.png";

import { useSelector, useDispatch } from "react-redux";
import {
  changeOrigin,
  addDestination,
  compSheet,
  closeSheet,
  openSheet,
  setRequsitionType,
  setNewStep
} from "../../../reducers/actions/RequsitionActions";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CarForm({ route}) { 
  const [visible, setVisible] = React.useState({
    visible: false,
    type: "origin",
  });
  const dispatch = useDispatch();
  const [showTarifaModal, setShowTarifaModal] = useState(false);
  const requisition = useSelector((store) => store.reducers);
  const [modalDestinos, setModalDestinos] = useState(false);

  const newStep = useSelector((store) => store.reducers.newStep);
  

  const getModalStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@ModalSheet");

      console.log("from async storage ", value);
    } catch (e) {
      // saving error
    }
  };

  const OpenModalStore = async () => {
    try {
      await AsyncStorage.setItem("@ModalSheet", "show");
    } catch (e) {
      // saving error
    }
  };

  const CloseModalStore = async () => {
    try {
      await AsyncStorage.setItem("@ModalSheet", "hide");
    } catch (e) {
      // saving error
    }
  };

  const showComments = (payload) => {
    console.log("change type");
    setTypeRequisition("Carro");
    openSheetCm(true);
  };

  const setVisibleList = (payload) => {
    if (requisition.requisition.destinations.length > 1) {
      setModalDestinos(true);
      openSheetDa(true);
    } else {
      openSheetDa(false);
      setVisible(payload);
    }
  };

  const openSheetDa = (status) => {
    console.log("open shhet");
    dispatch(openSheet(status));
    dispatch(compSheet("Destinos"));
  };

  const setTypeRequisition = (type) => {
    dispatch(setRequsitionType(type));
  };

  const openSheetCm = (status) => {
    console.log("open shhet");
    dispatch(openSheet(status));
    dispatch(compSheet("Comentarios"));
  };

  useEffect(() => {
  }, [requisition.sheetMenu]);

  useEffect(() => {

    console.log("User en CarForm ",route.params.user)    
 
    setTypeRequisition("Carro");

  }, []);

  return (
    // <View title="CARD WITH DIVIDER">
    //      <ListItem key={1} bottomDivider >

    //      <Icon
    //                             name="map-marker"
    //                             size={32}
    //                             color="lime"
    //                             />

    //         <ListItem.Content >
    //           <ListItem.Title onPress={()=>setVisible({visible:true,type:'origin'})}>{requisition.requisition.origin ? requisition.requisition.origin.title : 'Origen'}</ListItem.Title>
    //           <ListItem.Subtitle>Busca Origen</ListItem.Subtitle>
    //         </ListItem.Content>
    //       </ListItem>

    //       <ListItem key={2} bottomDivider>
    //       <Icon
    //                             name="map-marker"
    //                             size={32}
    //                             color="red"
    //                             />
    //         <ListItem.Content style={{flex:1,flexDirection:"row"}}>

    //           <ListItem.Title style={styles.titleL}><TouchableOpacity style={{margin:0,padding:0}} onPress={()=>setVisibleList({visible:true,type:'destinations'})}><Text>{requisition.requisition.destinations.length} {requisition.requisition.destinations.length > 0 ? requisition.requisition.destinations[requisition.requisition.destinations.length-1].title : 'Destino'}</Text></TouchableOpacity>  </ListItem.Title>

    //           <Button
    //                         onPress={()=>setVisible({visible:true,type:'destinations'})}
    //                         icon={
    //                             <Icon
    //                             name="plus"
    //                             size={15}
    //                             color="white"
    //                             />
    //                         }

    //                         />

    //         </ListItem.Content>
    //       </ListItem>

    //       <ListItem key={3} bottomDivider>
    //       <Icon
    //                             name="money"
    //                             size={32}
    //                             color="blue"
    //                             />
    //         <TouchableOpacity onPress={()=>setShowTarifaModal(true)}>
    //         <ListItem.Content>
    //           <ListItem.Title >Tarifa</ListItem.Title>
    //           <ListItem.Subtitle>$ {requisition.requisition.tarifa.valor} - {requisition.requisition.tarifa.formaPago}</ListItem.Subtitle>
    //         </ListItem.Content>
    //         </TouchableOpacity>
    //       </ListItem>

    //       <ListItem key={4} bottomDivider>
    //       <Icon
    //                             name="comments"
    //                             size={32}
    //                             color="pink"
    //                             />
    //         <TouchableOpacity onPress={()=>showComments(true)}>
    //         <ListItem.Content>
    //           <ListItem.Title>Comentarios -</ListItem.Title>
    //           <ListItem.Subtitle>Busca Comentarios</ListItem.Subtitle>
    //         </ListItem.Content>
    //         </TouchableOpacity>
    //       </ListItem>

    // <AddressSelector visible={visible.visible} typeSelector={visible.type} closeModal={()=>{setVisible({visible:false,type:'origin'})}}/>
    // <PriceSelector visible={showTarifaModal} closeModal={()=>{setShowTarifaModal(false)}}/>

    //             </View>

    <>

    <View style={styles.container}>
    
      <View style={[styles.row, styles.firstRow]}>
        <View style={[styles.column, styles.firstColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setVisible({ visible: true, type: "origin" })}
          >
            <Icon name="map-marker" size={32} color="lime" />
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.secondColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              padding: 3,
            }}
            onPress={() => setVisible({ visible: true, type: "origin" })}
          >
            <Text>
              {requisition.requisition.origin
                ? requisition.requisition.origin.title &&
                  requisition.requisition.origin.title === "initial"
                  ? "A Donde te recojemos?"
                  : requisition.requisition.origin.title
                : "Origen"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.row, styles.secondRow]}>
        <View style={[styles.column, styles.firstColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={()=>setVisibleList({visible:true,type:'destinations'})}
          >
            <Icon name="map-marker" size={32} color="red" />
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.secondColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
            }}
            onPress={()=>setVisible({visible:true,type:'destinations'})}
          >
            <Text>
              {requisition.requisition.destinations.length}{" "}
              {requisition.requisition.destinations.length > 0
                ? requisition.requisition.destinations[
                    requisition.requisition.destinations.length - 1
                  ].title
                : "A donde vas?"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.thirdColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 25,
              }}
            >
              <Icon name="th-list" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.row, styles.thirdRow]}>
        <View style={[styles.column, styles.firstColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={()=>setShowTarifaModal(true)}
          >
            <Icon name="money" size={32} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.secondColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
            }}
            onPress={()=>setShowTarifaModal(true)}
          >
            <Text>
              
              {requisition.requisition.tarifa.valor > 0 ? (
              <>
              $ {requisition.requisition.tarifa.valor} -{" "}
              {requisition.requisition.tarifa.formaPago}
              </>
              ):("Cuanto ofreces por el servicio y como planeas pagar ?")}

            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.row, styles.fourthRow]}>
        <View style={[styles.column, styles.firstColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={()=>showComments(true)}
          >
            <Icon name="comments" size={32} color="pink" />
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.secondColumn]}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "#CCC",
              width: "100%",
              height: "100%",
            }}
            onPress={()=>showComments(true)}
          >
            <Text>Deja comentarios para tener en cuenta</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
 <AddressSelector user={route.params.user} visible={visible.visible} typeSelector={visible.type} closeModal={()=>{setVisible({visible:false,type:'origin'})}}/>
<PriceSelector visible={showTarifaModal} closeModal={()=>{setShowTarifaModal(false)}}/>

    </>
  );
}

export default CarForm;

const styles = StyleSheet.create({
  titleL: {
    width: "90%",
  },
  imageMenu: {
    width: 32,
    height: 32,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#FFF",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
  },
  secondRow: {
    flex: 1,
    flexDirection: "row",
  },
  thirdRow: {
    flex: 1,
    flexDirection: "row",
  },
  fourthRow: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  firstColumn: {
    flex: 0.3,
    width: "20%",
  },
  secondColumn: {
    flex: 2,
    width: "70%",
  },
  thirdColumn: {
    flex: 0.4,
    width: "25%",
  },
});
