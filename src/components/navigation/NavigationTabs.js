import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CarForm from '../requisitions/forms/CarForm';
import MotoForm from '../requisitions/forms/MotoForm';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useState,useEffect } from 'react';
import PaqueteForm from '../requisitions/forms/PaqueteForm';


const Tab = createMaterialTopTabNavigator();

export default function NavigationTabs({store}) {
  useEffect(() => {
    console.log("storen ",store)
   
  }, [])  
  return (
    <Tab.Navigator style={{ paddingTop: StatusBar.currentHeight }} onTabPress={()=>{console.log("tabpress")}} >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'home' : 'home-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={CarForm}
        initialParams={{store:store}}
        name='Carro'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'people-sharp' : 'people-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={MotoForm}
        name='Moto'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'people-sharp' : 'people-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={PaqueteForm}
        name='Paquete'
      />
     
    </Tab.Navigator>
  );
}
