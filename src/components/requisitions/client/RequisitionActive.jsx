import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapComponent from "../../maps/MapComponent";
import DestinationsRequisition from "../../requisitions/driver/DestinationsRequisition";
import NegotiateRequisitionClient from "./NegotiateRequisitionClient";

import { useSelector } from "react-redux";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

export default function RequisitionActive({ requisition, offers, socket }) {
  const [requsitionSl, setRequisition] = useState(null);

  const offersStore = useSelector((state) => state.reducers.offers);

  useEffect(() => {
    setRequisition(requisition);
  }, [requisition]);

  const AcceptRequisition = async (offer) => {
    console.log("accept ", offer);

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
        console.log("Result solicitud ", data);
        if (data.result === "SUCCESS") {
          dispatch(
            setRequisition({
              ...requisition.reducers.requisition,
              status: "Active",
              id_driver: offer.contratista,
            })
          );
        }

      })
      .catch(error => console.error(error));
  };

  return (
    <>
      {requsitionSl !== null && (
        <>
          <View style={{ height: height }}>
            <View style={{ backgroundColor: "#7cb48f", flex: 0.7 }}>
              <Text>
                Con el fin de brindar seguridad , este servicio sera rastreado
                por GPS y su ubicación sera confidencial. Solo revelará por una
                orden judicial.
              </Text>
            </View>
            <View style={{ backgroundColor: "#7CA1B4", flex: 5.5 }}>
              <MapComponent
                type="viewDriver"
                requisitionSelected={requsitionSl}
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
                    console.log("ofc ", item);
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
                              onPress={() => AcceptRequisition()}
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
            <View style={{ backgroundColor: "#FFFFFF", flex: 5 }}>
              <DestinationsRequisition requisition={requsitionSl} />
              <NegotiateRequisitionClient
                requisition={requsitionSl}
                socket={socket}
              />

              <View style={styles.container}>
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
    flex: 0.4,
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
