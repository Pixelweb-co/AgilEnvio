import React, { useEffect, useState } from 'react';
import { View, Text,Image } from 'react-native';
import { useSelector } from 'react-redux';
import {AntDesign} from '@expo/vector-icons';
import {GoogleKey, API_URL} from "@env";


export default function UserBox({requisition}) {
  const AppMode = useSelector((state) => state.reducers.appMode);  
  const [userData,setUserData]=useState(null) 

  useEffect(()=>{
    
    const getUser = async (requisition) => {

     
        let postData = {type:AppMode,user_id:null}

      if(AppMode==='driver'){
        postData.user_id = requisition.id_client
      }

      if(AppMode==='client'){
        postData.user_id = requisition.id_driver
      }


// Send load user from API endpoint
            
      const userId = postData.user_id; // Aquí debes insertar el ID del usuario que deseas obtener
       console.log("user get ",postData.user_id)
           
      
       axios.post(API_URL+'/accounts/getuser',{user_id:userId}).then((response) => {
        console.log("from users " , response.data)
        
        setUserData(response.data)
    
        }).catch(e=>console.log("error get user ",e))
      
      
    }

    if(requisition.id_client && requisition.id_driver){
    getUser(requisition)
    }
    

  },[requisition])
  
  
  
  return (
    
    <React.Fragment>
      {requisition.status === 'Abierta' &&
      
      
    <View
    
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
          uri: !userData.avatar ? API_URL+"/files/noPhoto.jpg" : `${API_URL}/files/${userData._id}/300x300-${userData.avatar}.jpg`,
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
        <Text>{AppMode==='driver' ? ("Cliente"):("Conductor")}:  {userData && userData.nombres}</Text>
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
          <Text>Telèfono:    {userData && userData.telefono}</Text>
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
          backgroundColor: "orange",
          padding: 10,
          borderRadius: 5,
        }}
      >
      <AntDesign name='wechat' size={32} color='#FFF' />
      </View>
    </View>
  </View>
}

</React.Fragment>

  );
}
