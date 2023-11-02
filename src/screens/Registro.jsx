import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Registro = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePhone = async () => {
    const response = await fetch('http://192.168.0.2:4488/accounts/check_telefono', {
      method: 'POST',
      body: JSON.stringify({ telefono: phone }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.result === 'no_existe') {
      setPhoneError('El número de teléfono no existe');
    } else {
      setPhoneError('');
    }
  };

  const validateEmail = async () => {
    const response = await fetch('http://192.168.0.2:4488/accounts/check_email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.result === 'no_existe') {
      setEmailError('El correo electrónico no existe');
    } else {
      setEmailError('');
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

  const handleSignup = async () => {
    if (name && phone && email && password && confirmPassword && !phoneError && !emailError && !passwordError && !confirmPasswordError) {
      const response = await fetch('http://192.168.0.2:4488/accounts/singup', {
        method: 'POST',
        body: JSON.stringify({ name, phone, email, password, confirmPassword }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // handle response data
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombres *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Teléfono *</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        onBlur={validatePhone}
        keyboardType="numeric"
      />
      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
      <Text style={styles.label}>Email *</Text>
  <TextInput
    style={styles.input}
    value={email}
    onChangeText={setEmail}
    onBlur={validateEmail}
    keyboardType="email-address"
  />
  {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
  <Text style={styles.label}>Contraseña *</Text>
  <TextInput
    style={styles.input}
    value={password}
    onChangeText={setPassword}
    onBlur={validatePassword}
    secureTextEntry
  />
  {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
  <Text style={styles.label}>Confirmar contraseña *</Text>
  <TextInput
    style={styles.input}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    onBlur={validateConfirmPassword}
    secureTextEntry
  />
  {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
  <Button title="Registrarse" onPress={handleSignup} />
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20
},
label: {
fontSize: 16,
fontWeight: 'bold',
marginVertical: 10
},
input: {
height: 40,
borderColor: 'gray',
borderWidth: 1,
padding: 10,
marginBottom: 20
},
error: {
color: 'red',
marginBottom: 10
}
});

export default Registro;
