import React, { useEffect, useState } from 'react';
import { View, Text,Image } from 'react-native';
import { useSelector } from 'react-redux';



export default function UserBox({requisition}) {
  const AppMode = useSelector((state) => state.reducers.appMode);  
  const [userData,setUserData]=useState(null) 

  useEffect(()=>{
    
    const getUser = async (requisition) => {

     
        console.log("get user state")
        let postData = {type:AppMode,user_id:null}

      if(AppMode==='driver'){
        postData.user_id = requisition.id_client
      }

      if(AppMode==='client'){
        postData.user_id = requisition.id_driver
      }


// Send load user from API endpoint
      const endpoint = 'http://api.agilenvio.co:2042/api/getuser';
      
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data)
      })
      .catch(error => console.error(error));



    }

    getUser(requisition)
    

  },[])
  
  
  
  return (
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
        <Text>{AppMode==='driver' ? ("Cliente"):("Conductor")} : {userData && userData.nombres}</Text>
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
          <Text>Tel: {userData && userData.telefono}</Text>
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
       <Text> ok</Text>
      </View>
    </View>
  </View>
  );
}
