import React, { useState,useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, ImagePicker, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import FaceDetector from '../components/UiModules/FaceDetector';
import Checkbox from 'expo-checkbox';
import Dropdown from '../components/UiModules/Dropdown';
import SelectDropdownWithSearch from 'react-native-select-dropdown-with-search'
import CameraPicker from '../components/UiModules/CameraPicker';

import {GoogleKey, API_URL} from "@env";

const dataR = [
    // "Amazonas",
    "Antioquia",
    // "Arauca",
    // "Atlántico",
    // "Bolívar",
    // "Boyacá",
    // "Caldas",
    // "Caquetá",
    // "Casanare",
    // "Cauca",
    // "Cesar",
    // "Chocó",
    // "Córdoba",
    // "Cundinamarca",
    // "Guainía",
    // "Guaviare",
    // "Huila",
    // "La Guajira",
    // "Magdalena",
    // "Meta",
    // "Nariño",
    // "Norte de Santander",
    // "Putumayo",
    // "Quindío",
    // "Risaralda",
    // "Santander",
    // "Sucre",
    // "Tolima",
    "Valle del Cauca",
    // "Vaupés",
    // "Vichada",
];


const ciudades = [{
    "id": "001",
    "nombre": "Abejorral",
    "departamento_id": "ANT"
},
{
    "id": "002",
    "nombre": "Abriaquí",
    "departamento_id": "ANT"
},
{
    "id": "004",
    "nombre": "Alejandría",
    "departamento_id": "ANT"
},
{
    "id": "021",
    "nombre": "Amagá",
    "departamento_id": "ANT"
},
{
    "id": "030",
    "nombre": "Amalfi",
    "departamento_id": "ANT"
},
{
    "id": "031",
    "nombre": "Andes",
    "departamento_id": "ANT"
},
{
    "id": "034",
    "nombre": "Angelópolis",
    "departamento_id": "ANT"
},
{
    "id": "036",
    "nombre": "Angostura",
    "departamento_id": "ANT"
},
{
    "id": "038",
    "nombre": "Anorí",
    "departamento_id": "ANT"
},
{
    "id": "040",
    "nombre": "Anzá",
    "departamento_id": "ANT"
},
{
    "id": "042",
    "nombre": "Apartadó",
    "departamento_id": "ANT"
},
{
    "id": "044",
    "nombre": "Arboletes",
    "departamento_id": "ANT"
},
{
    "id": "045",
    "nombre": "Argelia",
    "departamento_id": "ANT"
},
{
    "id": "051",
    "nombre": "Armenia",
    "departamento_id": "ANT"
},
{
    "id": "055",
    "nombre": "Barbosa",
    "departamento_id": "ANT"
},
{
    "id": "059",
    "nombre": "Belmira",
    "departamento_id": "ANT"
},
{
    "id": "079",
    "nombre": "Bello",
    "departamento_id": "ANT"
},
{
    "id": "086",
    "nombre": "Betania",
    "departamento_id": "ANT"
},
{
    "id": "088",
    "nombre": "Betulia",
    "departamento_id": "ANT"
},
{
    "id": "091",
    "nombre": "Briceño",
    "departamento_id": "ANT"
},
{
    "id": "093",
    "nombre": "Buriticá",
    "departamento_id": "ANT"
},
{
    "id": "101",
    "nombre": "Cáceres",
    "departamento_id": "ANT"
},
{
    "id": "107",
    "nombre": "Caicedo",
    "departamento_id": "ANT"
},
{
    "id": "113",
    "nombre": "Caldas",
    "departamento_id": "ANT"
},
{
    "id": "120",
    "nombre": "Campamento",
    "departamento_id": "ANT"
}]
const SolicitudDriver = ({user_id}) => {
    const [datosUsuario, setDatosUsuario] = useState({});
    const [datosVehiculo, setDatosVehiculo] = useState({});
    const [sexo, setSexo] = useState("Masculino");
    const [step, setStep] = useState(0);
    const [upIm,setUpIm] = useState(0);


    const [cedulaError, setCedulaError] = useState("");
    const [direccionError, setDireccionError] = useState("");
    const [departamentoError, setDepartamentoError] = useState("");
    const [ciudadError, setCiudadError] = useState("");
    const [selfie, setSelfie] = useState(null);
    const [cedula_front, setCedulaFront] = useState(null);
    const [cedula_back, setCedulaBack] = useState(null);
    
    const [matricula_front, setMatriculaFront] = useState(null);
    const [matricula_back, setMatriculaBack] = useState(null);

    const [errorSelfie, setErrorSelfie] = useState(false);
    const [errorCedulaFrontal, setErrorCedulaFrontal] = useState(false);
    const [errorCedulatrasera, setErrorCedulatrasera] = useState(false);
    const [placaError,setPlacaError]=useState("");

    const [errormatriculaFrontal, setErrorMatriculaFrontal] = useState(false)
    const [errormatriculatrasera, setErrorMatriculatrasera] = useState(false)

    const [cameraVisible, setCameraVisible] = useState(false);
    const [typePhoto, setTypePhoto] = useState("selfie");
    const [cameraUse, setCameraUse] = useState("front")

    const [marcaError, setMarcaError] = useState("")
    const [modeloError, setModeloError] = useState("")
    const [colorError, setColorError] = useState("")

    const limpiarTexto = (textoInput) => {
        const textoSinEspacios = textoInput.replace(/\s+/g, '');
        const textoMayusculas = textoSinEspacios.toUpperCase();
        console.log("mayusculas ",textoMayusculas)
        setDatosVehiculo({...datosVehiculo,placa:textoMayusculas})
    };

    const uploadPhotos = async (photos, i,user_id) => {
        if (i >= photos.length) {
          return;
        }
      
        const photo = photos[i];
        const data = new FormData();
        if(user_id){
        
        data.append('file',{
            uri:photo.uri,
            name:photo.name,
            type: `image/jpeg`,
            });
      
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        };
      
        try {
            console.log("url ",API_URL+'/uploadfiles/')
          const response = await fetch(API_URL+'/uploadfiles/', config);
          if (!response.ok) {
            throw new Error(`Error de estado HTTP: ${response.status}`);
          }
          
          const responseData = await response.json();
          console.log("Respuesta ",responseData);
          if(responseData.result=="SUCCESS"){
          // Llama a la función recursivamente para cargar el siguiente archivo
            console.log("imagen cargada en el servidor ")
            setUpIm(i+1)  
            await uploadPhotos(photos, i + 1,user_id);
               
            }
        } catch (error) {
          console.log("Error :: "+error);
        }

        }

      };
        

    useEffect(() => {
      


        if(step === 2){
            console.log("enviando solicitud driver...")
            handleSubmit()
        }

    }, [step])

    //conf photo Type and camera using
    const setPhoto = (type) => {

        setTypePhoto(type);

        switch (type) {
            case "selfie":
                console.log("camera front selfie");
                setCameraUse("front");
                setCameraVisible(true);
                break
            case "cedula_front":
                console.log("camera back cedula");
                setCameraUse("back");
                setCameraVisible(true);
                break
            case "cedula_back":
                console.log("camera back cedula2");
                setCameraUse("back");
                setCameraVisible(true);
                break
            case "matricula_front":
                console.log("camera back matricula");
                setCameraUse("back");
                setCameraVisible(true);
                break
            case "matricula_back":
                console.log("camera back matricula2");
                setCameraUse("back");
                setCameraVisible(true);
                break

        }

    }

    //get phto
    const setPhotoR = (image) => {

        switch (typePhoto) {
            case "selfie":
                setSelfie(image);
                setErrorSelfie(false);
                break;
            case "cedula_front":
                setCedulaFront(image);
                setErrorCedulaFrontal(false);
                break;
            case "cedula_back":
                setCedulaBack(image);
                setErrorCedulatrasera(false);
                break;
            case "matricula_front":
                setMatriculaFront(image);
                setErrorMatriculaFrontal(false);
                break;
            case "matricula_back":
                setMatriculaBack(image);
                setErrorMatriculatrasera(false);
                break;
        }

    }

    const handleSubmit = async () => {
        
            const toSend = {
                driver:{
                    data:datosUsuario,images:{selfie:'selfie-'+user_id,cedula_front:'cedula_front'+user_id,cedula_back:'cedula_back'+user_id}
                },
                vehiculo:{
                    data:datosVehiculo,
                    images:{
                        matricula_front:'matricula_front'+user_id,
                        matricula_back:'matricula_back'+user_id
                        } 
                    }, 
                user_id:user_id,
                fecha:new Date(), 
                estado:'PENDING' 
                }
            

                console.log("enviando ",toSend)
            
                const photos = [
                    {
                      uri: selfie,
                      name: 'selfie-'+user_id +'.jpg',
                      type: 'image/jpg',
                    },  
                    {
                        uri: cedula_front,
                        name: 'cedula_front-'+user_id +'.jpg', 
                        type: 'image/jpg', 
                      },   
                      { 
                          uri: cedula_back,
                          name: 'cedula_back-'+user_id +'.jpg',
                          type: 'image/jpg',
                        },
                        {
                            uri: matricula_front,
                            name: 'matricula_front-'+user_id +'.jpg',
                            type: 'image/jpg',
                          },
                          {
                              uri: matricula_back,
                              name: 'matricula_back-'+user_id +'.jpg',
                              type: 'image/jpg',
                            }
                  ];
    
    
                  await uploadPhotos(photos, 0,user_id);
    
                  const config = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toSend),
                  };
                          
                  
        try {
         console.log("url ",API_URL+'/contratistas/')

          const response = await fetch(API_URL+'/contratistas/setsolicitud', config); 
            console.log(response)  
          if (!response.ok) {
            throw new Error(`Error de estado HTTP: ${response.status}`);
          }
          
          const responseData = await response.json();
          console.log("Respuesta ",responseData);
          if(responseData.result=="SUCCESS"){
          // Llama a la función recursivamente para cargar el siguiente archivo
            console.log("imagen cargada en el servidor ")
            setUpIm(i+1)  
            await uploadPhotos(photos, i + 1,user_id);
               
            }
        } catch (error) {
          console.log("Error :: "+error);
        }
    }

    const validateCedula = async () => {
        console.log("cedula ", datosUsuario.cedula)

        if (!datosUsuario.cedula) {
            setCedulaError("El número de documento es obligatorio.")
        } else {

            const response = await fetch(API_URL + '/accounts/checkcedula', {
                method: 'POST',
                body: JSON.stringify({ cedula: datosUsuario.cedula }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("chkCD ", data)
            if (data.result === 'no_exist') {
                setCedulaError('');
            } else {
                setCedulaError('El número de dociumento ya existe, usa otro número');
            }

        }

    }


    const validatePlaca = async () => {
        console.log("placa ", datosVehiculo.placa)
            
        const textoSinEspacios = datosVehiculo.placa.replace(/\s+/g, '');
        const textoMayusculas = textoSinEspacios.toUpperCase();
        console.log("mayusculas ",textoMayusculas)
        setDatosVehiculo({...datosVehiculo,placa:textoMayusculas})
    


        if (!datosVehiculo.placa) {
            setPlacaError("El número placa de vehiculo es obligatorio.")
        } else {

            const response = await fetch(API_URL + '/accounts/checkplaca', {
                method: 'POST',
                body: JSON.stringify({ placa: textoMayusculas }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("chkPL ", data)
            if (data.result === 'no_exist') {
                setPlacaError('');
            } else {
                setPlacaError('El número placa del vehiculo ya existe, usa otro número');
            }

        }

    }



    const validateDireccion = () => {
        console.log("Direccion ", datosUsuario.direccion)

        if (!datosUsuario.direccion) {
            setDireccionError("La direccion de residencia es obligatoria.")
        } else {
            setDireccionError("")
        }

    }

    
    const validateMarca = () => {
        console.log("Marca ", datosVehiculo.marca)

        if (!datosVehiculo.marca) {
            setMarcaError("La Marca es obligatoria.")
        } else {
            setMarcaError("")
        }

    }

    
    const validateModelo = () => {
        console.log("Modelo ", datosVehiculo.modelo)

        if (!datosVehiculo.modelo) {
            setModeloError("El modelo es obligatorio.")
        } else {
            setModeloError("")
        }

    }

    
    const validateColor = () => {
        console.log("Color ", datosVehiculo.color)

        if (!datosVehiculo.color) {
            setColorError("El color es obligatorio.")
        } else {
            setColorError("")
        }

    }

    const backStepW = () => {

        if (step > 0) {
            const backStep = step - 1
            console.log("bk ", backStep)
            setStep(backStep)
        }
    }

    const setStepW = (step) => {


        switch (step) {
            case 0:
                if (!datosUsuario.departamento) {
                    setDepartamentoError("El departamento es obligatorio.")
                } else {
                    setDepartamentoError("")

                }

                if (datosUsuario.departamento && !datosUsuario.ciudad) {
                    setCiudadError("La ciudad es obligatoria");
                } else {
                    setCiudadError("")
                }

                if (!datosUsuario.cedula) {
                    setCedulaError("El número de documento es obligatorio.")
                } else {
                    setCedulaError("")
                }

                if (!datosUsuario.direccion) {
                    setDireccionError("La direccion de residencia es obligatoria.")
                } else {
                    setDireccionError("")
                }

                if (!selfie) {
                    setErrorSelfie(true)
                } else {
                    setErrorSelfie(false)
                }

                if (!cedula_front) {
                    setErrorCedulaFrontal(true)
                } else {
                    setErrorCedulaFrontal(false)
                }

                if (!cedula_back) {
                    setErrorCedulatrasera(true)
                } else {
                    setErrorCedulatrasera(false)
                }

               

                if (selfie && cedula_back && datosUsuario.departamento && datosUsuario.ciudad && datosUsuario.cedula && datosUsuario.direccion) {
                    setStep(1)
                }

                break;
            case 1:
                console.log("validando paso 1")
                
                if(!datosVehiculo.placa){
                    
                    setPlacaError("La placa es obligatoria!")
                }else{
                    setPlacaError("")
                }

                if(!datosVehiculo.marca){
                    setMarcaError("La marca es obligatoria!")
                }else{
                    setMarcaError("")
                }
                
                if(!datosVehiculo.modelo){
                    setModeloError("El modelo es obligatorio!")
                }else{
                    setModeloError("")
                }
               
                if(!datosVehiculo.color){
                    setColorError("El color es obligatorio!")
                }else{
                    setColorError("")
                }


                if (!matricula_front) {
                    setErrorMatriculaFrontal(true)
                } else {
                    setErrorMatriculaFrontal(false)
                }

                if (!matricula_back) {
                    setErrorMatriculatrasera(true)
                } else {
                    setErrorMatriculatrasera(false)
                }    
                

                setStep(2)

                if (datosVehiculo.tipoVehiculo && matricula_front && matricula_back && datosVehiculo.marca && datosVehiculo.modelo && datosVehiculo.placa && datosVehiculo.color) {
                  //  setStep(2)
                }else{
                    console.log("error de validacion")
                }
                break;
            }
    }

    return (
        <ScrollView style={styles.container}>

            {step === 0 &&
                <View style={{ marginTop: 25 }}>
                    <View style={{ backgroundColor: "royalblue", height: 35, padding: 4, width: "53%", marginTop: 5, elevation: 5, borderTopEndRadius: 10, borderBottomEndRadius: 10 }}>
                        <Text style={{ color: "white", fontSize: 24, marginLeft: 8, fontWeight: "400" }}>Datos de el condutor</Text>
                    </View>

                    <View style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <TextInput value={datosUsuario.cedula} onBlur={validateCedula} style={[styles.input, { borderColor: cedulaError ? "red" : "", borderWidth: cedulaError ? 1 : 0 }]} keyboardType="numeric" focusable={true} placeholder="Nro de cedula" onChangeText={text => setDatosUsuario({ ...datosUsuario, cedula: text })} />
                            {cedulaError ? <Text style={styles.error}>{cedulaError}</Text> : null}

                            <TextInput value={datosUsuario.direccion} style={styles.input} onBlur={validateDireccion} placeholder="Dirección de residencia" onChangeText={text => setDatosUsuario({ ...datosUsuario, direccion: text })} />
                            {direccionError ? <Text style={styles.error}>{direccionError}</Text> : null}

                            <SelectDropdownWithSearch
                                data={dataR}
                                buttonStyle={styles.input}
                                defaultButtonText={datosUsuario.departamento ? datosUsuario.departamento : "Departamento"}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setDatosUsuario({ ...datosUsuario, departamento: selectedItem })
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />
                            {departamentoError ? <Text style={styles.error}>{departamentoError}</Text> : null}


                            {datosUsuario.departamento &&
                                <SafeAreaView style={{ alignContent: "center", alignItems: "center" }}>
                                    <SelectDropdownWithSearch
                                        data={dataR}
                                        buttonStyle={styles.input}
                                        defaultButtonText={datosUsuario.ciudad ? datosUsuario.ciudad : "Ciudad"}
                                        onSelect={(selectedItem, index) => {
                                            setDatosUsuario({ ...datosUsuario, ciudad: selectedItem })
                                            console.log(selectedItem, index)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                    />
                                    {ciudadError ? <Text style={styles.error}>{ciudadError}</Text> : null}

                                </SafeAreaView>
                            }

                            <View style={styles.containerCheck}>
                                <View style={styles.columnCheck}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={sexo === "Masculino" ? true : false}
                                        onValueChange={(newValue) => setSexo("Masculino")}
                                        color={sexo === "Masculino" ? '#4630EB' : undefined}
                                    />
                                    <Text style={styles.label}>Masculino</Text>

                                </View>
                                <View style={styles.columnCheck}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={sexo === "Femenino" ? true : false}
                                        onValueChange={(newValue) => setSexo("Femenino")}
                                        color={sexo === "Femenino" ? '#4630EB' : undefined}
                                    />
                                    <Text style={styles.label}>Femenino</Text>

                                </View>
                            </View>



                        </View>

                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Toma una selfie de ti</Text>
                            <TouchableOpacity onPress={() => setPhoto("selfie")} style={{ width: "85%", alignContent: "center", alignItems: "center", justifyContent: "center", height: 200, borderRadius: 10, elevation: 3, backgroundColor: !selfie ? "white" : "#000", marginVertical: 10 }}>


                                <ImageBackground source={{ uri: selfie }} resizeMode="cover" style={styles.selfie}>


                                    <Text style={{ color: selfie ? "white" : "#000", fontSize: 16, fontWeight: 'bold' }}>Toca para tomar una foto</Text>


                                </ImageBackground>


                            </TouchableOpacity>

                        </View>

                        {errorSelfie &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold' }}>Foto de selfie es obligatoria!</Text>
                        }

                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Foto frontal de tu cédula de identidad</Text>
                            <TouchableOpacity onPress={() => setPhoto("cedula_front")} style={{ width: "85%", alignContent: "center", alignItems: "center", justifyContent: "center", height: 200, borderRadius: 10, elevation: 3, backgroundColor: !cedula_front ? "white" : "#000", marginVertical: 10 }}>


                                <ImageBackground source={{ uri: cedula_front }} resizeMode="cover" style={styles.selfie}>

                                    <Text style={{ color: cedula_front ? "white" : "#000", fontSize: 16, fontWeight: 'bold' }}>Toca para tomar una foto</Text>


                                </ImageBackground>


                            </TouchableOpacity>


                        </View>

                        {errorCedulaFrontal &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold' }}>Foto de cédula frontal es obligatoria!</Text>
                        }


                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Foto trasera de tu cédula de identidad</Text>
                            <TouchableOpacity onPress={() => setPhoto("cedula_back")} style={{ width: "85%", alignContent: "center", alignItems: "center", justifyContent: "center", height: 200, borderRadius: 10, elevation: 3, backgroundColor: !cedula_back ? "white" : "#000", marginVertical: 10 }}>


                                <ImageBackground source={{ uri: cedula_back }} resizeMode="cover" style={styles.selfie}>

                                    <Text style={{ color: cedula_back ? "white" : "#000", fontSize: 16, fontWeight: 'bold' }}>Toca para tomar una foto</Text>


                                </ImageBackground>


                            </TouchableOpacity>


                        </View>



                        {errorCedulatrasera &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold' }}>Foto de cedula trasera es obligatoria!</Text>
                        }


                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <TouchableOpacity style={styles.button} title="Siguiente" onPress={() => setStepW(0)} >
                                <Text style={styles.buttonText}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            }


            {step === 1 &&
                <View style={{ marginTop: 25 }}>

                    <View style={{ backgroundColor: "royalblue", height: 35, padding: 4, width: "52%", marginTop: 5, elevation: 5, borderTopEndRadius: 10, borderBottomEndRadius: 10 }}>
                        <Text style={{ color: "white", fontSize: 24, marginLeft: 8, fontWeight: "400" }}>Datos de el vehiculo</Text>
                    </View>


                    <View style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <View style={stylesCT.container}>
                                <View style={stylesCT.column}>

                                    <Checkbox
                                        style={styles.checkbox}
                                        value={datosVehiculo.tipoVehiculo === "AutoMovil" ? true : false}
                                        onValueChange={(newValue) => setDatosVehiculo({ ...datosVehiculo, tipoVehiculo: "AutoMovil" })}
                                        color={datosVehiculo.tipoVehiculo === "AutoMovil" ? '#4630EB' : undefined}
                                    />
                                    <Text style={styles.label}>Automovil</Text>
                                </View>
                                <View style={stylesCT.column}>

                                    <Checkbox
                                        style={styles.checkbox}
                                        value={datosVehiculo.tipoVehiculo === "Motocicleta" ? true : false}
                                        onValueChange={(newValue) => setDatosVehiculo({ ...datosVehiculo, tipoVehiculo: "Motocicleta" })}
                                        color={datosVehiculo.tipoVehiculo === "Motocicleta" ? '#4630EB' : undefined}
                                    />
                                    <Text style={styles.label}>Motocicleta</Text>
                                </View>

                                <View style={stylesCT.column}>

                                    <Checkbox
                                        style={styles.checkbox}
                                        value={datosVehiculo.tipoVehiculo === "Grua" ? true : false}
                                        onValueChange={(newValue) => setDatosVehiculo({ ...datosVehiculo, tipoVehiculo: "Grua" })}
                                        color={datosVehiculo.tipoVehiculo === "Grua" ? '#4630EB' : undefined}
                                    />
                                    <Text style={styles.label}>Grua</Text>

                                </View>

                            </View>
                            {!datosVehiculo.tipoVehiculo &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold', marginBottom:3 }}>Selecciona un tipo de vehiculo!</Text>
                            }    

                            <TextInput style={styles.input} placeholder="Marca" value={datosVehiculo.marca} onBlur={()=>validateMarca()} onChangeText={text => setDatosVehiculo({ ...datosVehiculo, marca: text })} />
                            {marcaError &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold', marginBottom:3 }}>La marca es obligatoria!</Text>
                            }

                            <TextInput style={styles.input} placeholder="Modelo" value={datosVehiculo.modelo} onBlur={()=>validateModelo()}  onChangeText={text => setDatosVehiculo({ ...datosVehiculo, modelo: text })} />
                            {modeloError &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold', marginBottom:3 }}>El modelo es obligatorio!</Text>
                            }
                            <TextInput style={styles.input} placeholder="Placa" value={datosVehiculo.placa} onBlur={()=>validatePlaca()} onChangeText={text => setDatosVehiculo({ ...datosVehiculo, placa: text })} />
                            {placaError &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold', marginBottom:3 }}>{placaError}</Text>
                            }
                            <TextInput style={styles.input} placeholder="Color" value={datosVehiculo.color} onBlur={()=>validateColor()} onChangeText={text => setDatosVehiculo({ ...datosVehiculo, color: text })} />
                            {colorError &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold', marginBottom:3 }}>El color es obligatorio!</Text>
                            }

                        </View>
                    </View>
                    <View style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Foto frontal de tu tarjeta de propiedad de el vehiculo</Text>
                            <TouchableOpacity onPress={() => setPhoto("matricula_front")} style={{ width: "85%", alignContent: "center", alignItems: "center", justifyContent: "center", height: 200, borderRadius: 10, elevation: 3, backgroundColor: !matricula_front ? "white" : "#000", marginVertical: 10 }}>


                                <ImageBackground source={{ uri: matricula_front }} resizeMode="cover" style={styles.selfie}>

                                    <Text style={{ color: matricula_front ? "white" : "#000", fontSize: 16, fontWeight: 'bold' }}>Toca para tomar una foto</Text>


                                </ImageBackground>


                            </TouchableOpacity>


                        </View>

                        {errormatriculaFrontal &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold' }}>Foto de matricula frontal es obligatoria!</Text>
                        }



                    </View>
                   
                    <View style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Foto trasera de tu tarjeta de propiedad de el vehiculo</Text>
                            <TouchableOpacity onPress={() => setPhoto("matricula_back")} style={{ width: "85%", alignContent: "center", alignItems: "center", justifyContent: "center", height: 200, borderRadius: 10, elevation: 3, backgroundColor: !matricula_back ? "white" : "#000", marginVertical: 10 }}>


                                <ImageBackground source={{ uri: matricula_back }} resizeMode="cover" style={styles.selfie}>

                                    <Text style={{ color: matricula_back ? "white" : "#000", fontSize: 16, fontWeight: 'bold' }}>Toca para tomar una foto</Text>


                                </ImageBackground>


                            </TouchableOpacity>


                        </View>

                        {errormatriculatrasera &&
                            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold' }}>Foto de matricula trasera es obligatoria!</Text>
                        }



                    </View>
                   
                   
                    <View style={{ alignContent: "center", alignItems: "center", marginBottom: 10 }}>

                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 10, paddingTop: 10, backgroundColor: "orange", padding: 2, width: "95%", elevation: 3, borderRadius: 10 }}>

                            <View style={styles.containerBt}>
                                <View style={styles.columnBt}>
                                    <TouchableOpacity style={styles.button} onPress={() => backStepW()} >
                                        <Text style={styles.buttonText}>Anterior</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.columnBt}>
                                    <TouchableOpacity style={styles.button} onPress={() => setStepW(1)} >
                                        <Text style={styles.buttonText}>Siguiente</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>


                        </View>
                    </View>


                </View>
            }
            {/* // ... repetir para cada paso del formulario */}

            {step === 2 &&
                <View style={{ marginTop: 25 }}>
                    <Text>Creando su solicitud ...</Text> 
                    {upIm > 0 && <Text>Subiendo imagenes {upIm} de 5 {(upIm === 5 ? 'Ok':' ...')}</Text>}
                    {(upIm === 5 && <Text>Creando Vehiculo ...</Text>)}    
            </View>
            }

            {step === 5 &&
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.stepTitle}>Resumen final:</Text>
                    <Text>{datosUsuario.nombre} {datosUsuario.apellido}</Text>
                    <Text>{datosVehiculo.marca} {datosVehiculo.modelo}</Text>
                    <Button title="Enviar solicitud" onPress={handleSubmit} />
                </View>
            }
            {cameraVisible && cameraUse &&
                <CameraPicker cameraTypeI={cameraUse} visible={cameraVisible} closeModal={() => setCameraVisible(false)} setPicture={(image) => setPhotoR(image)} />
            }
        </ScrollView>
    );
}

const styles = new StyleSheet.create({
    stepTitle: {
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 10
    },
    input: {
        width: "95%",
        backgroundColor: '#F2F2F2',
        marginBottom: 5,
        padding: 13,
        elevation: 3,
        borderRadius: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    },
    button: {
        width: "90%",
        borderRadius: 10,
        height: 40,
        backgroundColor: "royalblue",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        elevation: 3
    },
    containerCheck: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    columnCheck: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500"
    },
    error: {
        color: "red",
        fontWeight: "bold",
        marginTop: 1,
        marginBottom: 10
    },
    containerBt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    columnBt: {
        flex: 1,
        marginRight: 10,
    },
    selfie: {
        flex: 1,
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
        width: "95%"
    }

})

const stylesCT = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        elevation: 3
    },
});

export default SolicitudDriver;
