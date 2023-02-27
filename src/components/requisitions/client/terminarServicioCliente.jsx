import React, { useEffect } from 'react';
import {Image, View, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useSelector,useDispatch } from 'react-redux';
import {setRequisition,setOffers} from '../../../reducers/actions/RequsitionActions'

const TerminarServicioCliente = ({ requisition,user }) => {
  const dispatch = useDispatch();
  useEffect(()=>{

    
  },[])

  const doCalificarServicio = (rating)=>{


    // Send login data to API endpoint
    const endpoint = 'http://api.agilenvio.co:2042/api/rating/setrating';
    
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
  
  <View style={{ flex: 0.8,minHeight:400}}>
        
      <View style={{padding:5}}>  
        <Text style={{fontWeight:"bold",color:"orange"}}>Detalles del el pago:</Text>
      </View>

    <View style={{borderRadius:5,borderWidth:1,borderColor:"orange", backgroundColor:"#FFF",minHeight:50,elevation:5,width:"90%",padding:5,marginTop:10,marginBottom:5,marginLeft:"5%"}}>


  <View style={stylesTable.container}>
      <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Total a pagar</Text></View>
        <View style={stylesTable.cell}><Text style={[stylesTable.textColumn,stylesTable.rightColumn]}>{requisition.tarifa.valor} COP</Text></View>
      </View>
      {/* <View style={stylesTable.row}>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Columna 1, Fila 4</Text></View>
        <View style={stylesTable.cell}><Text style={stylesTable.textColumn}>Columna 2, Fila 4</Text></View>
      </View> */}
    </View>


      </View>
            

<View style={{borderRadius:5, borderWidth:1,borderColor:"purple", backgroundColor:"#FFF",minHeight:50,elevation:5,width:"90%",padding:5,marginTop:10,marginBottom:5,marginLeft:"5%"}}>

<View style={stylesDeductions.container}>
<View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Forma de pago</Text></View>
<View style={stylesDeductions.cell}><Text style={[stylesDeductions.textColumn,stylesDeductions.rightColumn]}>{requisition.tarifa.formaPago}</Text></View>
</View>
{/* <View style={stylesDeductions.row}>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Columna 1, Fila 4</Text></View>
<View style={stylesDeductions.cell}><Text style={stylesDeductions.textColumn}>Columna 2, Fila 4</Text></View>
</View> */}
</View>


</View>


<View style={{padding:5}}>  
        <Text style={{fontWeight:"bold",color:"blue"}}>Califica al conductor:</Text>
      </View>
<View style={{minHeight:350,width:"90%",padding:5,marginTop:10,marginBottom:10,marginLeft:"5%"}}>


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

<View style={stylesTable.container}>
<View style={stylesTable.row}>
<View style={[stylesTable.cell,{alignContent:"center",alignItems:"center",marginTop:40}]}>
    <Text style={{fontSize:24,fontWeight:"bold",color:"blue"}}>Gracias por preferirnos!</Text>

  </View>
  </View>
</View>


</View>
            </View>
           
          </View>
        </>
  );
};

export default TerminarServicioCliente;


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
