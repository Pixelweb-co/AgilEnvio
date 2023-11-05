import React, {useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import {GoogleKey, API_URL} from "@env";
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Registro = () => {
  const [nombres, setNombres] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerOk,setRegisterOk]=useState(false);
  // credentials context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  const validatetelefono = async () => {
   if(telefono){ 
    const response = await fetch(API_URL+'/accounts/checktelefono', {
      method: 'POST',
      body: JSON.stringify({ telefono: telefono }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("chktl ",data)
    if (data.result === 'no_exist') {
      setTelefonoError('');
    } else {
      setTelefonoError('El número de teléfono ya existe, usa otro número');
    }
  }
  };

  const validateEmail = async () => {
    if(email){
    const response = await fetch(API_URL+'/accounts/checkemail', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("chkemail ",data)
    
    if (data.result === 'no_exist') {
      setEmailError('');
    } else {
      setEmailError('El correo electrónico ya esxiste, usa otra dirección');
    }
  }
  };

  const validatePassword = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

    // Persisting login after signup
    const persistLogin = (credentials, message, status,authToken) => {
      console.log("autoken login ",credentials.authToken)
      AsyncStorage.setItem('userCredentials', JSON.stringify(credentials))
      
      AsyncStorage.setItem('authToken', JSON.stringify(credentials.authToken))
        .then(() => {
          console.log("auto login ",credentials)
          setStoredCredentials(credentials);
        })
        .catch((error) => {
          console.log(error)
        });
    };

  const handleSignup = async () => {
    console.log("registrando ",{ nombres, telefono, email, password, confirmPassword })
    if (nombres && telefono && email && password && confirmPassword && !telefonoError && !emailError && !passwordError && !confirmPasswordError) {
      const response = await fetch(API_URL+'/accounts/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ nombres, telefono, email, password, confirmPassword }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // handle response data
      const { result, message,user,authToken } = data;
      if(result==="SUCCESS"){
        setRegisterOk(true)

        console.log("req user: ",{ ...user, message, result,authToken})

        persistLogin({ ...user, message, result,authToken});
      }else{
        
      }

    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignContent:'center',alignItems:'center',marginBottom:70}}>
        <Text style={{fontSize:35,fontWeight:"bold"}}>Registrate</Text>
      </View>
      <TextInput
      placeholder="Nombres y apellidos"
      style={styles.input}
        value={nombres}
        onChangeText={setNombres}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        onBlur={validatetelefono}
        keyboardType="numeric"
      />
      {telefonoError ? <Text style={styles.error}>{telefonoError}</Text> : null}
    
  <TextInput
    style={styles.input}
    value={email}
    placeholder="Dirección de email"
    onChangeText={setEmail}
    onBlur={validateEmail}
    keyboardType="email-address"
  />
  {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
  
  <TextInput
    style={[styles.input, passwordError && styles.error]}
    value={password}
    placeholder="Contraseña"
    onChangeText={setPassword}
    onBlur={validatePassword}
    secureTextEntry
  />
  {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
  <TextInput
    placeholder="Repetir contraseña"
    style={styles.input}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    onBlur={validateConfirmPassword}
    secureTextEntry
  />

  {registerOk ? <Text style={styles.ok}>Su registro fue exitoso, ingresando ...</Text> : null}
  

  {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
  <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>
      
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
  error:{
    color:"red",
    fontWeight:"bold"
  },
  ok:{
    color:"lime",
    fontWeight:"bold"
  }
});

export default Registro;
