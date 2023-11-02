import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {Image, View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


import MiCuenta from "../screens/MiCuenta";
import Configuracion from "../screens/Configuracion";
import PaginaPrincipal from "../screens/PaginaPrincipal";
import ServicioSelectedDriver from "../screens/ServicioSelectedDriver";
import SolicitudDriver from "../screens/SolicitudDriver";
import Wallet from "../components/wallet/Wallet";

import {GoogleKey, API_URL} from "@env";

//async storage

import AsyncStorage from "@react-native-async-storage/async-storage";

//socket.io
import { io } from "socket.io-client";
import axios from "axios";
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

function Menu({ navigation,user }) {

  const storeLoad = useSelector((store) => store.reducers); 
  const dispatch = useDispatch();

  const setAppMode = (mode) =>{
    dispatch(changeAppMode(mode))
  }  

  return (
    <View style={{ paddingTop: 50,backgroundColor:"#CCAAFF",flex:1 }}>
     
    <View
      style={{
        
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth:1,
        borderColor:"#CCC"
      }}
    >

      {user && 
      <Image
        source={{
          uri: (user && user.avatar !== null ? API_URL+"/files/noPhoto.jpg" : `${API_URL}/files/${user._id}/300x300-${user.avatar}.jpg`),
        }}
        style={{ width: 100, height: 100, borderRadius: 25, elevation:2 }}
      />
    }

      <Text style={{fontSize:16,fontWeight:"bold",marginTop:10,marginBottom:10}}>{user && user.nombres}</Text>
    </View>

    <View> 
      
      <TouchableOpacity
        style={{ padding: 10, backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center'  }}
        onPress={() => navigation.navigate("Principal")}
      >
      <Icon name="home" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Principal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10,backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate("Micuenta")}
      >

        <Icon name="history" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Historial de viajes</Text>
      </TouchableOpacity>
      {storeLoad.appMode === 'driver' && 
      <TouchableOpacity
        style={{ padding: 10, backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate("Micuenta")}
      >
        <Icon name="money" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Ganancias</Text>
      </TouchableOpacity>
      }
      <TouchableOpacity
        style={{ padding: 10, backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate("Mi Billetera")}
      >
        <Icon name="cube" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Billetera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate("Micuenta")}
      >
        <Icon name="user" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Mi cuenta</Text>
      </TouchableOpacity>
      

      <TouchableOpacity
        style={{ padding: 10, backgroundColor:"#FFFFFF", margin:4,height:43,borderRadius:10,elevation:3,flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate("Configuración")}
      >
        <Icon name="cog" size={25} color="royalblue" style={{ marginRight: 10 }}/>
        <Text style={{fontSize:16,fontWeight:"400"}}>Configuración</Text>
      </TouchableOpacity>
    
    </View> 

    <View style={{marginTop:"80%",padding:10,marginBottom:5}}>
    
    
    {storeLoad.appMode === 'client' && 
    <TouchableOpacity
        style={{ padding: 10,backgroundColor:"pink",alignContent:"center",height:43,alignItems:"center",borderRadius:10, elevation:3 }}
        onPress={() => {
        
          if(user.tipo === 'cliente'){      
          navigation.navigate("SolicitudDriver")
          }else{
            setAppMode('driver')            
          } 

        }}
      >
        <Text>Modo Conductor</Text>
      </TouchableOpacity>
      }

    {storeLoad.appMode === 'driver' && 
    
      <TouchableOpacity
        style={{ padding: 14,backgroundColor:"royalblue",alignContent:"center",height:43,alignItems:"center",borderRadius:10, elevation:3 }}
        onPress={() => {
        
            setAppMode('client')            
       
        }}
      >
        <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>Modo Cliente</Text>
      </TouchableOpacity>

      }
    
      <View style={{marginTop:5,alignContent:"center",alignItems:"center"}}>  
      <Text style={{fontSize:10}}>Agilenvio V0.1 Beta</Text>
      </View> 
    </View>
    
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
      AsyncStorage.getItem("userCredentials")
        .then((result) => {
          if (result !== null) {
            //      console.log("storedCredentials ",result)
            setStoredCredentials(JSON.parse(result));
          } else {
            setStoredCredentials(null);
          }
        })
        .catch((error) => console.log("Error get credentials appnavigator",error));
    };

    const checkLoginCredentialsBE = async () => {

await  AsyncStorage.getItem("userCredentials")
      .then((result) => {
        if (result !== null) {
          user_local = JSON.parse(result);
          console.log("storedCredentials ",user_local._id)
      
    axios.post('http://192.168.0.2:4488/accounts/getuser',{user_id:user_local._id}).then((response) => {
    console.log("from users " , response.data)
    

    if(response.data){
    AsyncStorage.setItem("userCredentials",JSON.stringify(response.data))
    setStoredCredentials(response.data);  
    }else{
      alert("Hay problemas con la red reintente de nuevo")
      checkLoginCredentials()
    }

    }).catch(e=>console.log("error get user ",e))

  } else {
    setStoredCredentials(null);
  }
})
.catch((error) => console.log("Error get credentials appnavigator",error));


      };


    checkLoginCredentialsBE();




  }, []);

  useEffect(()=>{

    console.log("____________________________>>>>>>>>>>>>>",store.appMode) ;

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

  },[store.appMode])

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

      const socketConnection = io.connect(API_URL+"/socket", { 
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
        
        if (store.appMode === "driver") {
        socket.on("solicitudes_abiertas", function (solicitudes, socketId) {
         
           
           console.log("solicitudes para contratistas fromDESDE solicitudes_abiertas"+store.appMode,solicitudes)
            setDriverListServices(solicitudes);
        });
      }
        

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
    }else{
      Alert.alert("Error","No hay conexion con el servidor, reintanta mas tarde.")  
    }
  }, [socket]);

  const setAppModeD = (data) => {
    dispatch(changeAppMode(data));
  };

  return (
    <Drawer.Navigator
     initialRouteName={defaultScreen}
     drawerContent={(props) => <Menu {...props} user={storedCredentials} />}
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
      <Drawer.Screen name="SolicitudDriver" >
        
        {(props)=>{return(<SolicitudDriver {...props} user_id={storedCredentials._id}/>)}}
        

        </Drawer.Screen>

      <Drawer.Screen name="Mi Billetera" component={Wallet} />  
      
      
      
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.reducers,
  };
};

export default connect(mapStateToProps)(AppNavigator);
