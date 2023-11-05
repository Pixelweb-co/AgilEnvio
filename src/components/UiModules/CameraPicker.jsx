import React, { useState, useEffect } from 'react';
import { StyleSheet,Modal ,Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera,CameraType  } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function CameraPicker({closeModal,visible,setPicture,cameraTypeI}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);

useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    
    })();


}, []);


useEffect(()=>{

    console.log("usando camara ",cameraTypeI)

    if(cameraTypeI === "front"){
        
        setType(CameraType.front)
    }

    if(cameraTypeI === "back"){
        setType(CameraType.back)
    }


},[cameraTypeI])

  const takePicture = async () => {
    if(camera){
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await camera.takePictureAsync(options)
        
        setPicture(data.uri);
        closeModal();
        //setImage(data.uri);
    }
  }

  const handleFacesDetected = ({ faces }) => { 

    //console.log("faces detect ",faces)

  }; 

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (

<Modal visible={visible} onRequestClose={closeModal} animationType="slide">

            {type !== null && 
            
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'}
            autoFocus={true}
             />

        }

                
       <TouchableOpacity title="Tomar foto" onPress={() => takePicture()} style={{borderRadius:50,backgroundColor: 'rgba(42, 42, 142, 0.8)',top:"85%",left:"40%",position:"absolute", width:70,height:70,alignContent:"center",alignItems:"center",justifyContent:"center"}}>
       <Icon name="camera" size={40} color="white" />
       </TouchableOpacity>
  
        
  </Modal>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
})