import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Alert,  
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";


//reducers
import {
  changeOrigin,
  addDestination,
  addLocation,
  openSheet,
  closeSheet,
  changeStatus,
  setRequisition,
  setOffers,
  setReduxSocket,
  changeAppMode,
  setDriverList,
  setValorSol,
} from "../../reducers/actions/RequsitionActions";

import MapComponent from "../maps/MapComponent";
import DestinationsRequisition from "./DestinationsRequisition";
import NegotiateRequisitionClient from "./client/NegotiateRequisitionClient";

import { useSelector,useDispatch } from "react-redux";
import RequisitionList from "./driver/RequisitionList";
import UserBox from "../acounts/UserBox";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

export default function RequisitionActive({ requisition, offers, socket }) {
  const [requsitionSl, setRequisitionSl] = useState(null);

  const offersStore = useSelector((state) => state.reducers.offers);
  const appMode = useSelector((state) => state.reducers.appMode);

  const dispatch = useDispatch();


  const requisitionActiveNow = (requsitionSl,offer)=>{
    dispatch(setRequisition(requsitionSl)
    );
  }


  useEffect(() => {
    setRequisitionSl(requisition);
  }, [requisition]);



  const AcceptRequisition = async (offer) => {
    //console.log("accept ", offer);
    socket.emit("aceptar_solicitud_driver_oferta",offer)

  }

  const AcceptRequisition2 = async (offer) => {
    //console.log("accept ", offer);

    const url = "http://api.agilenvio.co:2042/api/aceptar_solicitud";

      // aceptar solicitud to API endpoint
      const endpoint = url;
      const data = {
        offer: offer,
      };
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
      //  console.log("Result solicitud ", data);
        if (data.result === "SUCCESS") {

          console.log("from backend active sol ",data)
          //alert("chg ",data.solicitud.status)
//          requisitionActiveNow(data.solicitud,data.offer)
        }

      })
      .catch(error => console.error(error));
  };


  const terminateRequisition = async () => {

    console.log("terminando servicio")
    socket.emit("terminar_soliitud",requisition)

  }

  const terminateRequisition2 = async()=>{


    const url = 'http://api.agilenvio.co:2042/api/terminar_solicitud';
        
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requisition:requisition
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Result solicitud ",data)
      if(data.result === "SUCCESS"){
        requisitionActiveNow({
          id:null,
          id_client:null,
          client_data:null,
          id_driver:null,
          origin:{title:"initial",coords:null},
          destinations:[],
          status:"NEW",
          tarifa:{valor:0,formaPago:"efectivo"},
          type:null,
          comments:{notes:"",serviceTypeOptions:null}
        }) 

        Alert.alert(
          "Ha termiado su servicio",
          "Gracias por preferrirnos",
          [
            {
              text: "Cerrar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ]
        );

    }})
    .catch(error => console.error(error));



  }

  const showFinishDialog = () => {
    return Alert.alert(
      "",
      "Desea finalizar ahora?",
      [
        // The "Yes" button
        {
          text: "Si",
          onPress: () => {
            terminateRequisition();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };


  return (
    <>
      {requsitionSl !== null && (
        <>
          <View style={{ height: height }}>
            <View style={{ backgroundColor: "blue", flex: 0.8,padding:((height / 70)) }}>
              <Text style={{color:"white"}}>
                Con el fin de brindar seguridad , este servicio sera rastreado
                por GPS y su ubicación sera confidencial. Solo revelará por una
                orden judicial.
              </Text>
            </View>
            <View style={{ backgroundColor: "#7CA1B4", flex: 5.5 }}>
              <MapComponent
                type="viewDriver"
                requisitionSelected={requsitionSl}
                socket={socket}
              />
              {requsitionSl.status === "PENDING" && (
                <View
                  style={{
                    padding: 10,
                    marginRight: 5,
                    marginLeft: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    position: "absolute",
                    top: 20,
                    width: "97%",
                    minHeight: 50,
                  }}
                >
                  <Text style={styles.textP}>
                    {offersStore.length === 0
                      ? "Ofreciendo su tarifa, un momento ..."
                      : "Conductores que han ofertado: "}
                  </Text>
                </View>
              )}

              {offersStore.length > 0 && requsitionSl.status === "PENDING" && (
                <View
                  style={{
                    padding: 10,
                    marginRight: 5,
                    marginLeft: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    position: "absolute",
                    top: 80,
                    width: "97%",
                    minHeight: 50,
                  }}
                >
                  {offersStore.map((item, index) => {
                  //  console.log("ofc ", item);
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#FFFFFF",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        {/* Columna izquierda */}
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{
                              uri: "http://api.agilenvio.co:2042/uploads/noPhoto.jpg",
                            }}
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                          />
                        </View>

                        {/* Columna central */}
                        <View style={{ flex: 3 }}>
                          {/* Fila 1 */}
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text>{item.contratista_name}</Text>
                          </View>

                          {/* Fila 2 */}
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text>
                              <Text>${item.valor}</Text>
                            </Text>
                          </View>
                        </View>

                        {/* Columna derecha */}
                        <View
                          style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "green",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => AcceptRequisition(item)}
                            >
                              <Text style={{ color: "white" }}>✓</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <View style={{ flex: 5 }}>
           
           
           <View >
            <Text style={{padding:4,alignContent:"center",alignItems:"center" ,backgroundColor:"blue", color:"#FFF"}}>COP ${requsitionSl.tarifa.valor} Forma de pago: {requsitionSl.tarifa.formaPago}</Text>
            </View>
            
            <DestinationsRequisition requisition={requsitionSl} />      

            {requsitionSl.status === 'PENDING' &&       
            <>
              <NegotiateRequisitionClient
                requisition={requsitionSl}
                socket={socket}
              />
            </> 
            }

            {requsitionSl.status === 'Abierta' &&
            <UserBox requisition={requsitionSl}/>
            }

              <View style={styles.container}>
               
               
               {requsitionSl.status === 'Abierta' && appMode === 'driver' &&
                <View style={styles.row}>
                  <View style={styles.singleColumn}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => showFinishDialog()}
                    >
                      <Text style={styles.buttonText}>Terminar Servicio</Text>
                    </TouchableOpacity>
                  </View>
                </View>
               }
               
                <View style={styles.row}>
                  <View style={styles.singleColumn}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => null}
                    >
                      <Text style={styles.buttonText}>Cancelar Servicio</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = new StyleSheet.create({
  button: {
    width: "95%",
    backgroundColor: "#1E88E5",
    padding: 9,
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
  container: {
    flex: 0.6,
    flexDirection: "column",
  },
  row: {
    flex: 0.4,
    flexDirection: "row",
  },
  column: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  singleColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
