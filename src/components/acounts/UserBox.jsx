import React from 'react';
import { View, Text,Image } from 'react-native';

export default function UserBox({requisition,user,offer}) {
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
        <Text>Nombres</Text>
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
          <Text>$0</Text>
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
