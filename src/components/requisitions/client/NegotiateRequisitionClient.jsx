import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { React, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import AsyncStorage from "@react-native-async-storage/async-storage";

const NegotiateRequisitionClient = ({ requisition, driver,socket }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
  const [ValorOfecido, setValorOfrecido] = useState(0);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const storeData = useSelector((store) => store);
  const offers = useSelector((store) => store.reducers.offers)

  useEffect(() => {
    setValorOfrecido(parseInt(requisition.tarifa.valor) + 500);
  }, [requisition.tarifa.valor]);

  useEffect(() => {
    const checkLoginCredentials = () => {
      AsyncStorage.getItem("userCredentials")
        .then((result) => {
          if (result !== null) {
            setStoredCredentials(JSON.parse(result));
          } else {
            setStoredCredentials(null);
          }
        })
        .catch((error) => console.log(error));
    };

    checkLoginCredentials();
  
  
  }, []);

  const ofrecerTarfifa = async ()=>{
    //console.log("ofrecer tarifa cliente")
        
      socket.emit("setTarifaClient",{
          tarifa: {...requisition.tarifa, valor:ValorOfecido},
          cliente: storedCredentials._id,
          solicitud: requisition._id
      })
  
    }

  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <View style={styles.column}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              if (ValorOfecido > (parseInt(requisition.tarifa.valor) + 500)) {
                setValorOfrecido(ValorOfecido - 500);
              }
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.tarifa}>$ {ValorOfecido}</Text>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => {
              if (ValorOfecido >= parseInt(requisition.tarifa.valor && offers.length === 0) ) {
                setValorOfrecido(ValorOfecido + 500);
              }
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.singleColumn}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            if(offers.length === 0){
            ofrecerTarfifa()
            }
            
            }}>
            <Text style={styles.buttonText}>Ofrecer Tarifa</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default NegotiateRequisitionClient;

const styles = new StyleSheet.create({
  button: {
    width: "95%",
    backgroundColor: "#1E88E5",
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  button2: {
    width: "30%",
    backgroundColor: "red",
    padding: 5,
    alignItems: "center",
    borderRadius: 50,
  },
  button3: {
    width: "30%",
    backgroundColor: "green",
    padding: 5,
    alignItems: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tarifa: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    flex: 0.5,
    flexDirection: "column",
  },
  row: {
    flex: 0.6,
    flexDirection: "row",
  },
  row1: {
    marginBottom: 5,
    flex: 0.6,
    flexDirection: "row",
  },
  column: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  singleColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
