import React, { useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { CredentialsContext } from '../components/CredentialsContext';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

  
  const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    
  // credentials context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);


    const handleEmailChange = (value) => {
      setEmail(value);
      if (!value) {
        setEmailError('El campo correo electrónico es requerido');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setEmailError('Ingrese un correo electrónico válido');
      } else {
        setEmailError('');
      }
    };
  
    const handlePasswordChange = (value) => {
      setPassword(value);
      if (!value) {
        setPasswordError('El campo contraseña es requerido');
      } else {
        setPasswordError('');
      }
    };
  
      // Persisting login
  const persistLogin = (credentials, message, status) => {
    console.log("user login ",credentials)
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        //handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        //handleMessage('Persisting login failed');
        console.log(error);
      });
  };

    const handleLogin = () => {
      if (!email || !password || emailError || passwordError) {
        return;
      }
  
      // Send login data to API endpoint
      const endpoint = 'http://192.168.0.2:4488/auth/login';
      const data = { email, password };
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {

        console.log("data usl ",data)
        if (data.message === 'Logued Ok') {
          // Navigate to Home screen if login is successful
        const { status, message,token,user } = data;
        console.log("user resl ",user)
        if (status !== 'SUCCESS') {
         // handleMessage(message, status);
        } else {
          persistLogin({ ...user }, message, status);
        }
        
        } else {
          setEmailError('Credenciales inválidas');
          setPasswordError('Credenciales inválidas');
        }
      })
      .catch(error => console.error(error));
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de sesión</Text>
        <TextInput
          style={[styles.input, emailError && styles.error]}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        <TextInput
          style={[styles.input, passwordError && styles.error]}
          placeholder="Contraseña"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      <View style={styles.links}>  
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 32,
    },
    form: {
      width: '80%',
    },
    input: {
      width:"80%",  
      backgroundColor: '#F2F2F2',
      marginBottom: 16,
      padding: 16,
      borderRadius: 8,
    },
    button: {
      width:"80%",  
      backgroundColor: '#1E88E5',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
     links: {
      marginTop: 26,
    },
    link: {
      color: '#1E88E5',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default LoginScreen;
