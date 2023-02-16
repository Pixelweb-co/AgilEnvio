import React from 'react';


// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from '../screens/Login';
import Registro from '../screens/Registro';


//AppNavigator
import AppNavigator from "./AppNavigator"

//redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { store } from "../reducers/store";


const Stack = createStackNavigator();

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
  return (
  <Provider store={store}>
 
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
          <Stack.Navigator
              screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'blue',
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >
            {storedCredentials ? (
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="AppNavigator"
                component={AppNavigator}
              />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  </Provider>            
  );
};

export default RootStack;
