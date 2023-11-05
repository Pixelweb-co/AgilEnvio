import React ,{useContext} from 'react';
import { View, TouchableOpacity, Image,Text } from 'react-native';
// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
function MiCuenta(props) {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const clearLogin = () => {
        AsyncStorage.removeItem('userCredentials')
          .then(() => {
            setStoredCredentials("");
          })
          .catch((error) => console.log("Error get credentials mi cuenta",error));
      };

    return (
        <View>
            <Text>Mi cuenta</Text>
            
        <TouchableOpacity onPress={()=>clearLogin()}>
        <Text>Salir</Text>
        </TouchableOpacity>

        </View>
    );
}

export default MiCuenta;