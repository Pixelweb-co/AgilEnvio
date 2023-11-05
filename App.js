import React, { useState } from 'react';

// React navigation stack
import RootStack from './src/navigators/RootStack';

// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import { Text, StyleSheet, View } from 'react-native'


// credentials context
import { CredentialsContext } from './src/components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('userCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log("Error get cretendialss app.js",error));
  };

  if (!appReady) {
    return  <AppLoading
    startAsync={checkLoginCredentials}
    onFinish={() => setAppReady(true)}
    onError={console.warn}
  />
    
    
   
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
    
      <RootStack />
    </CredentialsContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
