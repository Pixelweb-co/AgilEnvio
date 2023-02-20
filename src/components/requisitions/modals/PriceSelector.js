import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

//import { Button, SearchBar,ListItem  } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";

import { useSelector, useDispatch } from "react-redux";
import {
  changeTarifa,
  changeOrigin,
  addDestination,
  addLocation,
} from "../../../reducers/actions/RequsitionActions";

import close from "../../../../assets/img/close.png";

const formas_dePago = [
  { name: "efectivo", image: require("../../../../assets/img/efectivo.png" )},
  { name: "nequi", image: require("../../../../assets/img/nequi.jpg" )},
  { name: "bancolombia", image: require("../../../../assets/img/bancolombia.jpg") },
];

function PriceSelector({ visible, closeModal }) {
  const dispatch = useDispatch();
  const requisition = useSelector((store) => store.reducers.requisition);
  const [formaPago, setFormaPago] = useState("efectivo");
  const [tarifa, setTarifa] = useState(5000);

  const HandleChangeTarifa = (e) => {
    setTarifa(e);
    //dispatch(changeTarifa({valor:e,formaPago:formaPago}))
  };

  const HandleChangeFormaPago = (e) => {
    console.log("FP ", e);
    // dispatch(changeTarifa({valor:requisition.tarifa,formaPago:e}))
    setFormaPago(e);
  };

  const setTarifaRequisition = () => {
    dispatch(changeTarifa({ valor: tarifa, formaPago: formaPago }));
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      onDismiss={() => console.log("dimiss")}
      onShow={() => console.log("show")}
      transparent
      visible={visible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(1,1,1, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "80%",
            width: "100%",
            backgroundColor: "#FFF",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            marginTop: "41%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 45,
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 10,
              justifyContent: "flex-start",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Escribe una tarifa"
              onChangeText={(e) => HandleChangeTarifa(e)}
              keyboardType="numeric"
              value={tarifa}
            />

            <TouchableOpacity
              style={{ position: "absolute", top: 5, left: "94%" }}
              onPress={() => closeModal()}
            >
              <Image
                source={close}
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.5,
              marginTop: 35,
              height: 50,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Tarifa Seleccionada
            </Text>

            <Text style={{paddingTop:15,fontSize:30,fontWeight:"bold"}}>COP: {tarifa}</Text>
          </View>
          <View style={{ flex: 1, marginBottom: 10, height: "0%" }}>
            <Text
              style={{
                alignContent: "center",
                alignItems: "center",
                paddingLeft: 15,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Forma de pago
            </Text>
            <View style={stylesFp.container}>
              {formas_dePago &&
                formas_dePago.map((itemFP, keyP) => {
                  return (
                    
                    <TouchableOpacity  key={keyP} onPress={()=>setFormaPago(itemFP.name)}>
     
     <View style={{width:300,padding:10, alignContent:"center",alignItems:"center",borderRadius:5, backgroundColor:(formaPago === itemFP.name ? "orange":"#FFF")}}>
      <Image
     
        style={stylesFp.image}
        source={itemFP.image}
      />
     </View>
    
      <Text style={stylesFp.text}> {itemFP.name.toUpperCase()}</Text>
    
    </TouchableOpacity>
                    
                    
                    
                  );
                })}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setTarifaRequisition()}
            style={{
              height: 40,
              marginLeft: 15,
              marginBottom: 5,
              alignItems: "center",
              paddingTop: 10,
              width: "90%",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>
              Ofrecer tarifa y medio de pago
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default PriceSelector;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 45,
    padding: 10,
    marginTop: 10,
    marginLeft: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2, // Agrega sombra
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: "30%",
  },
});


const stylesFp = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 25,
    },
    image: {
      width: 50,
      height: 50,
    },
    text: {
      marginTop: 2,
      fontSize:16,
      textAlign: 'center',
    },
  });