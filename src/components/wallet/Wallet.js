import React from 'react';
import {Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import PocketList from './pockets/PocketList';
import Icon from 'react-native-vector-icons/FontAwesome';
import WalletNavigationFloat from './navigation/WalletNavigationFloat';


const { height } = Dimensions.get('window');

const bolsillos = [
    {
    id:"334dc",    
    type:"general",
    title:"General",
    saldo:55000
    },{
        id:"334dc",
        type:"pocket",    
        title:"Ahorro",
        saldo:10000
    },
    {
        id:"345",
        type:"pocket",    
        title:"Vacaciones",
        saldo:8000
    },
    {
        id:"33a44d",
        type:"pocket",    
        title:"Agilenvio",
        saldo:25000
    }
]


const Wallet = () => {
  var saldoG = bolsillos.find(e=>e.type=='general');
  console.log("saldo g ",saldoG.saldo)
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.column, { height: height * 0.3 }]}>
          
        <View style={{backgroundColor:"royalblue",height:35,padding:4,width:"50%",marginTop:5,elevation:5,borderTopEndRadius:10,borderBottomEndRadius:10}}>
                <Text style={{color:"white",fontSize:24,marginLeft:8,fontWeight:"400"}}>Saldo Actual</Text>
            </View>
        <View style={{alignContent:"center",alignItems:"center"}}>
            
            <View style={{alignContent:"center",alignItems:"center",marginTop:60, backgroundColor:"#FFFFFF",padding:20,width:"80%",elevation:3,borderRadius:10}}>
                <Text style={{fontSize:36, fontWeight:"bold"}}>$ {saldoG.saldo}</Text>    

            </View> 
        </View>  

        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.column, { height: height * 0.3 }]}>

            <View style={{backgroundColor:"royalblue",height:35,padding:4,width:"50%",marginTop:5,elevation:5,borderTopEndRadius:10,borderBottomEndRadius:10}}>
                <Text style={{color:"white",fontSize:24,marginLeft:8,fontWeight:"400"}}>Mis Bolsillos</Text>
            </View>

            <TouchableOpacity style={{position:"absolute",width:35,height:35, alignContent:"center",alignItems:"center",justifyContent:"center",backgroundColor:"royalblue",top:5,left:"88%",elevation:5,borderRadius:50}}>
                    <Text style={{fontSize:18,fontWeight:"bold", color:"white"}}>+</Text>    
            </TouchableOpacity>    
            
            <View style={{marginTop:20, backgroundColor:"#FFFFFF",padding:20,width:"97%",marginLeft:5,elevation:3,borderRadius:10}}>

           

            <PocketList data={bolsillos}/>
                

  
            </View> 

        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.column, { height: height * 0.3 }]}>
        
        <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => console.log("ok")}
              >
                <Icon name="star" size={30} color="#F2C94C" />
                <Text style={styles.optionLabel}>Recibe dinero</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => console.log("ok")}
              >
                <Icon name="plus" size={30} color="#828282" />
                <Text style={styles.optionLabel}>Envia dinero</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.option} onPress={()=>console.log("ok")}>
                <Icon name="map-marker" size={30} color="#BB6BD9" />
                <Text style={styles.optionLabel}>Transacciones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={()=>console.log("ok")}>
                <Icon name="history" size={30} color="#6FCF97" />
                <Text style={styles.optionLabel}>Cargar Saldo</Text>
                
                
              </TouchableOpacity>
            </View>
        </View>
     
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      searchBar: {
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#BDBDBD",
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 20,
      },
      optionsContainer: {
        flex: 1,
        justifyContent: "center",
      },
      optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      },
      option: {
        alignItems: "center",
        width: "48%",
        borderWidth: 1,
        padding: 6,
        borderColor: "#CCC",
        borderRadius: 5,
        backgroundColor:"white",
        elevation:3
      },
      optionLabel: {
        marginTop: 10,
        fontSize: 12,
        color: "#333",
        textAlign: "center",
      },
      titleContainer: {
        fontSize: 16,
      }});

export default Wallet;
