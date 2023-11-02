import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import MiCuenta from "../screens/MiCuenta";
import Configuracion from "../screens/Configuracion";
import PaginaPrincipal from "../screens/PaginaPrincipal";
import ServicioSelectedDriver from "../screens/ServicioSelectedDriver";

//async storage

import AsyncStorage from "@react-native-async-storage/async-storage";

//socket.io
import { io } from "socket.io-client";

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
  changeDriverPos
} from "../reducers/actions/RequsitionActions";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { store } from "../reducers/store";
import { useSelector, useDispatch } from "react-redux";

import { connect } from "react-redux";

function Menu({ navigation }) {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("Principal")}
      >
        <Text>Pantalla Principal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("Micuenta")}
      >
        <Text>Mi cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("Configuración")}
      >
        <Text>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator();
 
const AppNavigator = ({ store }) => {
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [socket, setSocket] = useState(null);
  const [screenDefault, setScreenDefault] = useState("Principal")
  const [defaultScreen,setDefaultScreen] = useState("Principal")

  const dispatch = useDispatch();

  const setReduxOffers = (offers) => {
    dispatch(setOffers(offers));
  };

const setLocationDriver = (location)=>{

  dispatch(changeDriverPos(location))
}

  const setSolicitud = (solicitud, offers) => {
    dispatch(setRequisition(solicitud));
  };

  const setValorSolicitud = (solicitud) => {
    dispatch(setValorSol(solicitud));
  };

  const setDriverListServices = (requisitions) => {
    dispatch(setDriverList(requisitions));
  };

  useEffect(() => {
    const checkLoginCredentials = () => {
      AsyncStorage.getItem("flowerCribCredentials")
        .then((result) => {
          if (result !== null) {
            //      console.log("storedCredentials ",result)
            setStoredCredentials(JSON.parse(result));
          } else {
            setStoredCredentials(null);
          }
        })
        .catch((error) => console.log(error));
    };

    checkLoginCredentials();




  }, []);

  useEffect(()=>{



    if(store.appMode === "client"){

      if(store.requisition.status === "NEW"){
        
        setScreenDefault('Nuevo Servicio')   
        
      } 

    if(store.requisition.status === "PENDING"){
      
    setScreenDefault('Servicio en espera de ofertas')    
    
    }

    if(store.requisition.status === "Abierta"){

      setScreenDefault('Servicio en Curso')

    }


    if(store.requisition.status === "Cerrada"){

      setScreenDefault('Servicio Terminado')
      
    }

    }
    
      
    
    if(store.appMode === "driver" && store.requisition.status === "NEW"){

      setScreenDefault('Listado de servicios')

    }

    if(store.appMode === "driver" && store.requisition.status === "Abierta"){

      setScreenDefault('Servicio en Curso')

    }

    if(store.appMode === "driver" && store.requisition.status === "Cerrada"){

      setScreenDefault('Servicio Terminado')

    }

  },[store.requisition.status])

  useEffect(() => {
    if (storedCredentials !== null) {
      if (storedCredentials.tipo == "contratista") {
        console.clear();
        console.log("------------------driver-------------------");
        setAppModeD("driver");
      }

      if (storedCredentials.tipo == "cliente") {
        console.clear();
        console.log("------------------cliente-------------------");

        setAppModeD("client");
      }

      console.log("Connect to socket ");

      const socketConnection = io.connect("http://192.168.0.2:4488/socket", { 
        query: {
          tipo: storedCredentials.tipo,
          cliente: storedCredentials._id,
          username: storedCredentials.nombres,
        },
      });

      setSocket(socketConnection);
    }
  }, [storedCredentials]);

  useEffect(() => {
    console.log("socket load ",socket)
    if (socket !== null) {
      socket.on("connect", () => {
        console.log("conectado socket...");

        // Enviar un mensaje al servidor cada 30 segundos
            setInterval(() => {
              socket.emit('keep-alive');
            }, 25000);

        socket.emit("solicitudPendiente", storedCredentials);


        //buscar solicitudes abiertas
        socket.on("seTsolicitud", function (sol, socketId) {
         
          //console.log("solicitud pendiente from socket : "+storedCredentials.tipo, sol);
          
          if (
            (sol.sol.status === "Abierta" || sol.sol.status === "PENDING") &&
            storedCredentials.tipo === "cliente"
          ) {
                   console.log("solicitudes pendientes cliente join ")
            socket.emit("joinRequisition", {
              requisitionId: sol.sol._id,
              contratante: storedCredentials._id,
            }); 
          }

          if (
            (sol.sol.status === "Abierta" ) &&
            storedCredentials.tipo === "contratista"
          ) {
            //        console.log("solicitudes pendientes cliente join ")
            // socket.emit("joinRequisition", {
            //   requisitionId: sol.sol._id,
            //   contratista: storedCredentials._id,
            // });
          }
          console.log("sol antes de enviar a redux "+storedCredentials.tipo,sol.sol)
          
          setSolicitud(sol.sol);

          //console.log("ofertas ",sol.offers)
          setReduxOffers(sol.offers);

          
        });

        socket.on("solicitudes_abiertas", function (solicitudes, socketId) {
          if (store.appMode === "driver") {
          //  console.log("soles sockets "+store.appMode,solicitudes)
            setDriverListServices(solicitudes);
          }
        });

        socket.on("seToffers", function (data, socketId) {
          //Alert.alert("Notificacion","Han ofertado su servicio.") 
          setReduxOffers(data.offers);
        });

        socket.on("valorSolicitudActualizado", (data, socketID) => {
           
          if (data) {
            setSolicitud(data.requisition);
          
            if (store.appMode === "driver") {
          
            setValorSolicitud(data.requisition);

          
            Alert.alert("Notificacion de el cliente","Ha cambiado la tarifa.") 
           
          }
        }

        });



      socket.on("offerAccept",function(data,socketId){
        

        console.log("oferta Aceptada "+storedCredentials.tipo,data)
        
        if(storedCredentials.tipo=="cliente"){
          Alert.alert(
            "Ha iniciado su servicio",
            "Se ha notificado al condutor, espere hasta que llegue a recojerlo/a",
            [
              {
                text: "Cerrar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ]
          );

        }
        
        
        if(storedCredentials.tipo==="contratista"){

          if(data.offer.contratista === storedCredentials._id){
        
            Alert.alert(
            "Han aprobado su oferta",
            "Dirijase al punto de recojida",
            [
              {
                text: "Cerrar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ]
          );
        }
        
      }

//console.log("trayendo sol nueva ",storedCredentials.tipo)
      //  socket.emit("solicitudPendiente", storedCredentials);
      setSolicitud(data.sol);
  

      })

      socket.on("terminateService",(data)=>{
        console.log("servicioTerminado "+storedCredentials.tipo+' ',data.sol)
      setSolicitud(data.sol);
        
      })

      if(storedCredentials.tipo === 'cliente'){
        socket.on("locationDriverLoad",(location,socketId)=>{
        console.log("location recive driver",location)
        if(location){  
        setLocationDriver(location)
        }  
      })
      }

        socket.on("notification", (notification, socketId) => {
          if (notification.type == "driverOfferSend") {
          }

          if (notification.type == "driverOfferAccept") {
          }

          if (notification.type == "driverCancelRequisition") {
          }

          if (notification.type == "terminateRequisition") {
          }
        });
      });
    }
  }, [socket]);

  const setAppModeD = (data) => {
    dispatch(changeAppMode(data));
  };

  return (
    <Drawer.Navigator
     initialRouteName={defaultScreen}
     drawerContent={(props) => <Menu {...props} />}
     >
      <Drawer.Screen name="Principal"
      options={{
        title: screenDefault,
        headerStyle: {
              backgroundColor: 'royalblue'
           },
        headerTintColor:"white"     
       }}
      >
        {(props) => {
          return (
            <PaginaPrincipal
              {...props}
              navigation={props.navigation}
              offers={store.requisition.offers}
              requisition={store.requisition}
              appMode={store.appMode}
              socket={socket}
              user={storedCredentials}
            />
          );
        }}
      </Drawer.Screen>
      <Drawer.Screen name="Micuenta" component={MiCuenta} />
      <Drawer.Screen name="Configuración" component={Configuracion} />
      <Drawer.Screen name="Servicio" component={ServicioSelectedDriver} />
      
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.reducers,
  };
};

export default connect(mapStateToProps)(AppNavigator);
