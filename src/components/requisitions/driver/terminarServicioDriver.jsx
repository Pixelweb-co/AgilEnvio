import React, { useEffect } from 'react';
import {Image, View, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useSelector,useDispatch } from 'react-redux';
import {setRequisition,setOffers} from '../../../reducers/actions/RequsitionActions'
import {GoogleKey, API_URL} from "@env";
const TerminarServicioDriver = ({ requisition,user }) => {
  
  const dispatch = useDispatch(); 


  useEffect(()=>{

    
  },[])

  const doCalificarServicio = (rating)=>{


    // Send login data to API endpoint
    const endpoint = API_URL+'/api/rating/setrating';
    
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        solicitud:requisition._id,
        tipo:user.tipo,
        user:user._id,
        calificacion:rating
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {


    dispatch(setRequisition({
      id:null,
      id_client:null,
      client_data:null,
      id_driver:null,
      origin:{title:"initial",coords:null},
      destinations:[],
      status:"NEW",
      tarifa:{valor:0,formaPago:"efectivo"},
      type:null,
      comments:{notes:"",serviceTypeOptions:null},
      ratedClient:null,
      ratedDriver:null
    }))

    dispatch(setOffers([]))

    })
    .catch(error => console.error(error));

  }

  var { height } = Dimensions.get("window");
  var box_count = 3;
  var box_height = height / box_count;
  


  return (
    <>
 <View style={{ height: height }}>
  
  <View style={{marginTop:15,  flex: 0.2,minHeight:100,alignContent:"center",alignItems:"center" }}>
              
              
      <Image
        source={{
          uri: API_URL+"/uploads/noPhoto.jpg",
        }}
        style={{ width: 75, height: 75, borderRadius: 25 }}
      />
              
              <Text style={{color:"black"}}>
                {requisition.client_data.nombres}
              </Text>

              <Text style={{color:"black",fontSize:16,fontWeight:"bold"}}>
                Valor por cobrar de el servicio 
              </Text>  

              <Text style={{color:"black",fontSize:16,fontWeight:"bold"}}>
                $ {requisition.tarifa.valor} {requisition.tarifa.formaPago}
              </Text>

  </View>
  <View style={{ flex: 0.8,minHeight:400}}>
        
      <View style={{padding:5}}>  
        <Text style={{fontWeight:"bold",color:"orange"}}>Detalles del el pago:</Text>
      </View>

    <View style={{borderRadius:5,borderWidth:1,borderColor:"orange", backgroundColor:"#FFF",minHeight:120,elevation:5,width:"90%",padding:5,marginTop:10,marginBottom:5,marginLeft:"5%"}}>




              {/* <View style={{flex:0.8,flexDirection:"column"}}>
                <View style={{flex:0.4,flexDirection:"row",padding:5}}>
                  <View style={{flex:1,alignContent:"flex-start",alignItems:"flex-start",padding:5}}>
                  
                  <Text style={{fontWeight:"500",fontSize:16}}>Valor servicio:</Text>
                  </View>  
                  <View style={{flex:1,alignContent:"flex-end",alignItems:"flex-end",padding:5}}>
                  <Text style={{fontWeight:"500",fontSize:16}}>${requisition.tarifa.valor}</Text>
                  </View>

                </View>

                
              </View> */}

  <View style={stylesTable.container}>
      <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Valor de el servicio</Text></View>
        <View style={stylesTable.cell}><Text style={[stylesTable.textColumn,stylesTable.rightColumn]}>{requisition.tarifa.valor} COP</Text></View>
      </View>
      <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Seguro</Text></View>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>$ 300</Text></View>
      </View>
      <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={[stylesTable.textColumn,stylesTable.subtotal]}>Subtotal</Text></View>
        <View style={stylesTable.cell}><Text style={[stylesTable.textColumn,stylesTable.subtotal]}>$ {(requisition.tarifa.valor + 300)} COP</Text></View>
      </View>
      {/* <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Columna 1, Fila 4</Text></View>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Columna 2, Fila 4</Text></View>
      </View> */}
    </View>


      </View>
            

      <View style={{padding:5}}>  
        <Text style={{fontWeight:"bold",color:"purple"}}>Deducciones:</Text>
      </View>



<View style={{borderRadius:5, borderWidth:1,borderColor:"purple", backgroundColor:"#FFF",minHeight:120,elevation:5,width:"90%",padding:5,marginTop:10,marginBottom:5,marginLeft:"5%"}}>

<View style={stylesDeductions.container}>
<View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Valor2 de el servicio</Text></View>
<View style={stylesDeductions.cell}><Text style={[stylesDeductions.textColumn,stylesDeductions.rightColumn]}>{requisition.tarifa.valor} COP</Text></View>
</View>
<View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Seguro</Text></View>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>$ 300</Text></View>
</View>
<View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={[stylesDeductions.textColumn,stylesDeductions.subtotal]}>Subtotal</Text></View>
<View style={stylesDeductions.cell}><Text style={[stylesDeductions.textColumn,stylesDeductions.subtotal]}>$ {(requisition.tarifa.valor + 300)} COP</Text></View>
</View>
{/* <View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Columna 1, Fila 4</Text></View>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Columna 2, Fila 4</Text></View>
</View> */}
</View>


</View>


<View style={{borderRadius:5,borderWidth:1,borderColor:"blue", backgroundColor:"#FFF",minHeight:40,elevation:5,width:"90%",padding:5,marginTop:10,marginBottom:10,marginLeft:"5%"}}>


<View style={stylesTable.container}>
<View style={stylesTable.row}>
<View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Nuevo saldo</Text></View>
<View style={stylesTable.cell}><Text style={[stylesTable.textColumn,stylesTable.rightColumn]}>$ 23.000 COP</Text></View>
</View>
</View>


</View>

<View style={{padding:5}}>  
        <Text style={{fontWeight:"bold",color:"blue"}}>Califica al cliente:</Text>
      </View>
<View style={{minHeight:100,width:"90%",padding:5,marginTop:10,marginBottom:10,marginLeft:"5%"}}>


<View style={stylesTable.container}>
<View style={stylesTable.row}>
<View style={stylesTable.cell}>
<AirbnbRating
  count={5}
  type='heart'
  reviews={["Mal servicio", "Regular", "Bueno", "Muy bueno", "Excelente"]}
  defaultRating={4}
  size={30}
  onFinishRating={doCalificarServicio}
/>
</View>
</View>
</View>

</View>
            </View>
           
          </View>
        </>
  );
};

export default TerminarServicioDriver;


const styles = new StyleSheet.create({
    button: {
      width: "95%",
      backgroundColor: "#1E88E5",
      padding: 9,
      alignItems: "center",
      borderRadius: 8,
    },
    button2: {
      width: "30%",
      backgroundColor: "red",
      padding: 5,
      alignItems: "center",
      borderRadius: 50,
    },
    button3: {
      width: "30%",
      backgroundColor: "green",
      padding: 5,
      alignItems: "center",
      borderRadius: 50,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    container: {
      flex: 0.6,
      flexDirection: "column",
    },
    row: {
      flex: 0.4,
      flexDirection: "row",
    },
    column: {
      flex: 0.4,
      alignItems: "center",
      justifyContent: "center",
    },
    singleColumn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  

  const stylesTable = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight:30
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  textColumn:{
    color:"black",
    fontWeight:"500",
    fontSize:14,
    height:20
  },
  rightColumn:{
    alignContent:"flex-end",
    alignItems:"flex-end"
  },
  subtotal:{
    color:"blue"
  }
});


const stylesDeductions = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight:30
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  textColumn:{
    color:"black",
    fontWeight:"500",
    fontSize:14,
    height:20
  },
  rightColumn:{
    alignContent:"flex-end",
    alignItems:"flex-end"
  },
  subtotal:{
    color:"blue"
  }
});
