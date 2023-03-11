import React from "react";
import { View, Text,Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CarForm from "../requisitions/forms/CarForm";
import MotoForm from "../requisitions/forms/MotoForm";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import PaqueteForm from "../requisitions/forms/PaqueteForm";

const Tab = createMaterialTopTabNavigator();

export default function NavigationTabs({ store,user }) {
  useEffect(() => {
    console.log("navigation tabs user ", user);
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{ tabBarScrollEnabled: true,tabBarItemStyle: { width: 100 } }}
      style={{paddingTop: StatusBar.currentHeight }}
      onTabPress={() => {
        console.log("tabpress"); 
      }}
    >
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <View style={{alignContent:"center",alignItems:"center",borderRadius: 5,borderWidth:(focused ? 1 : 0),borderColor:"#CCC", backgroundColor:(focused ? "#AF9" : "white"),paddingLeft:15,paddingRight:15}}>
            <Image
        source={require("../../../assets/img/sportive-car.png")}
        style={{ width: 45, height: 45 }}
      />
      <Text>Carro</Text>
      </View>
          ),
        }}
        component={CarForm}
        initialParams={{ store: store,user:user }}
        name="Carro"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <View style={{alignContent:"center",alignItems:"center",borderRadius: 5,borderWidth:(focused ? 1 : 0),borderColor:"#CCC", backgroundColor:(focused ? "#AF9" : "white"),paddingLeft:15,paddingRight:15}}>
            <Image
        source={require("../../../assets/img/motorbike.png")}
        style={{ width: 45, height: 45 }}
      />
      <Text>Moto</Text>
      </View>
          ),
        }}
        component={MotoForm}
        initialParams={{ store: store,user:user }}
        name="Moto"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <View style={{alignContent:"center",alignItems:"center",borderRadius: 5,borderWidth:(focused ? 1 : 0),borderColor:"#CCC", backgroundColor:(focused ? "#AF9" : "white"),paddingLeft:15,paddingRight:15}}>
            <Image
        source={require("../../../assets/img/box.png")}
        style={{ width: 45, height: 45 }}
      />
      <Text>Paquete</Text>
      </View>
          ),
        }}
        component={PaqueteForm}
        initialParams={{ store: store,user:user }}
        name="Paquete"
      />

      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <View style={{alignContent:"center",alignItems:"center",borderRadius: 5,borderWidth:(focused ? 1 : 0),borderColor:"#CCC", backgroundColor:(focused ? "#AF9" : "white"),paddingLeft:15,paddingRight:15}}>
            <Image
        source={require("../../../assets/img/camion-grua.png")}
        style={{ width: 45, height: 45 }}
      />
      <Text>Grua</Text>
      </View>
          ),
        }}
        component={PaqueteForm}
        initialParams={{ store: store,user:user }}
        name="Grua"
      />
    </Tab.Navigator>
  );
}
