import React, {useLayoutEffect, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import FavoritesCard from "../UiModules/FavoritesCard";
import AddAddressCard from "../UiModules/AddAddressCard";
import {GoogleKey} from "@env";

import * as Location from "expo-location";
import axios from "axios";


import { useSelector, useDispatch } from "react-redux";
import {
  changeOrigin,
  addDestination,
  addLocation,
} from "../../../reducers/actions/RequsitionActions";

import close from "../../../../assets/img/close.png";
import MapPickerAddress from "../UiModules/MapPickAddress";
import MapPickerCard from "../UiModules/MapPickerCard";

const AddressSelector = ({
  visible,
  fieldAddressSelected,
  closeModal,
  typeSelector,
  changeLocation,
  user,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAddressAdd, setAddressAdd] = useState(false);
  const [favoritesList,setFavoritesList]=useState([])
  const dispatch = useDispatch();
  const destinations = useSelector(
    (store) => store.reducers.requisition.destinations
  );

  const AppMode = useSelector((store)=>store.reducers.appMode)
  const [optionSet, setOptionSet] = useState("address");
  const [MyLocation,setMyLocation]=useState(null)  
  const [MyLastLocation,setMyLastLocation]=useState(null)  
  const [mapPicker,showMapPicker]=useState(null)

  const data = [];


  useEffect(() => {
   
    if(user !== undefined && AppMode === "client"){
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("permiso ubicacion ",status)

      if (status !== 'granted') {
    //    setErrorMsg('Permission to access location was denied');
        return;
      }

     
      let locationF = await Location.getCurrentPositionAsync({});
      
      
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
      axios
        .get(url, {params:{ key: GoogleKey,latlng:locationF.coords.latitude.toString()+','+locationF.coords.longitude.toString() }})
        .then((response) => {
        if(response.data.error_message){

        console.log("data rs ",response.data)

        }
          const result = {
            title:response.data.results[0].address_components[1].short_name+' '+response.data.results[0].address_components[0].short_name+' '+response.data.results[0].address_components[2].short_name+' '+response.data.results[0].address_components[3].short_name+' '+response.data.results[0].address_components[4].short_name,
            coords:locationF.coords,
            id:response.data.results[0].place_id
          }

          ///console.log("my location ",result)
          setMyLocation(result); 
      
        })
        .catch((error) => {
         // handleMessage('An error occurred. Check your network and try again');
          console.log("Error en consulta places dir init");
        });

      

    })();
  
     (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      //console.log("permiso ubicacion ",status)

      if (status !== 'granted') {
      //  setErrorMsg('Permission to access location was denied');
        return;
      }

     
      let locationF = await Location.getCurrentPositionAsync({});
      
      
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
      axios
        .get(url, {params:{ key: GoogleKey,latlng:locationF.coords.latitude.toString()+','+locationF.coords.longitude.toString() }})
        .then((response) => {
        //    console.log("data rs ",response.data)
          const result = {
            title:response.data.results[0].address_components[1].short_name+' '+response.data.results[0].address_components[0].short_name+' '+response.data.results[0].address_components[2].short_name+' '+response.data.results[0].address_components[3].short_name+' '+response.data.results[0].address_components[4].short_name,
            coords:locationF.coords,
            id:response.data.results[0].place_id
          }

          ///console.log("my location ",result)
          setMyLocation(result); 
      
        })
        .catch((error) => {
//          handleMessage('An error occurred. Check your network and try again');
          console.log(error);
        });

      

    })();

    (async () => {
     
      console.log("AppMode "+AppMode) 
      
    const endpoint = "http://192.168.0.2:4488/api/solicitud/lastlocation";
    console.log("user to last locations")  
  
    const postData = {
      user: user._id 
    };

    console.log("user id last loc ",user)
  
 

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("last location ")  
        
        setMyLastLocation(data)


      })
      .catch((error) => console.error(error));
  


    
    })();
 
 
  }


  }, [user]);


  const DoSendMyLocation = ()=>{

    console.log("send my location ",MyLocation)

    if (typeSelector === "origin") {
      dispatch(
        changeOrigin({
          order: 0,
          title: MyLocation.title,
          coords: {
            latitude: MyLocation.coords.latitude,
            longitude: MyLocation.coords.longitude,
          },
          id: MyLocation.id,
        })
      );
    }

    if (typeSelector === "destinations") {
      dispatch(
        addDestination({
          order: destinations.length + 1,
          title: MyLocation.title,
          coords: {
            latitude: MyLocation.coords.latitude,
            longitude: MyLocation.coords.longitude,
          },
          id: MyLocation.id,
        })
      );
    }
    setShowFavorites(false);
    setSelectedAddress([]);
    setAddressAdd(false);
    closeModal();

  }

  const DoSendMyLastLocation = ()=>{

    console.log("send my location ",MyLastLocation)

    if (typeSelector === "origin") {
      dispatch(
        changeOrigin({
          order: 0,
          title: MyLastLocation.title,
          coords: {
            latitude: MyLastLocation.coords.latitude,
            longitude: MyLastLocation.coords.longitude,
          },
          id: MyLastLocation.id,
        })
      );
    }

    if (typeSelector === "destinations") {
      dispatch(
        addDestination({
          order: destinations.length + 1,
          title: MyLastLocation.title,
          coords: {
            latitude: MyLastLocation.coords.latitude,
            longitude: MyLastLocation.coords.longitude,
          },
          id: MyLastLocation.id,
        })
      );
    }
    setShowFavorites(false);
    setSelectedAddress([]);
    setAddressAdd(false);
    closeModal();

  }


  const DoSendMapPicker = (locationPicked)=>{

    console.log("send pick location ",locationPicked)

    if (typeSelector === "origin") {
      dispatch(
        changeOrigin({
          order: 0,
          title: locationPicked.title,
          coords: {
            latitude: locationPicked.coords.latitude,
            longitude: locationPicked.coords.longitude,
          },
          id: locationPicked.id,
        })
      );
    }

    if (typeSelector === "destinations") {
      dispatch(
        addDestination({
          order: destinations.length + 1,
          title: locationPicked.title,
          coords: {
            latitude: locationPicked.coords.latitude,
            longitude: locationPicked.coords.longitude,
          },
          id: locationPicked.id,
        })
      );
    }
    setShowFavorites(false);
    setSelectedAddress([]);
    setAddressAdd(false);
    closeModal();

  }

  const DoSendAddress = (destination, place) => {
    if (typeSelector === "origin") {
      dispatch(
        changeOrigin({
          order: 0,
          title: place.description,
          coords: {
            latitude: destination.geometry.location.lat,
            longitude: destination.geometry.location.lng,
          },
          id: place.place_id,
        })
      );
    }

    if (typeSelector === "destinations") {
      dispatch(
        addDestination({
          order: destinations.length + 1,
          title: place.description,
          coords: {
            latitude: destination.geometry.location.lat,
            longitude: destination.geometry.location.lng,
          },
          id: place.place_id,
        })
      );
    }
    setShowFavorites(false);
    setSelectedAddress([]);
    setAddressAdd(false);
    closeModal();
  };

  useEffect(()=>{
    if(user && AppMode === 'client'){
    console.log("cangando favoritos")
    load_favorites()  
    }
  },[user])

  const load_favorites = async ()=>{

    // Send load user from API endpoint
    
    console.log("api get fav")
    const endpoint = "http://192.168.0.2:4488/api/favoritos/obtenerFavoritos"; 

    const postData = {
      user: user._id
    };

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("favoritos ",data)
        setFavoritesList(data)


      })
      .catch((error) => console.error(error));
  


  }

  const DoSaveFavorite = async (destination, place) => {
    console.log("save ", optionSet);

    // Send load user from API endpoint
    const endpoint = "http://192.168.0.2:4488/api/setfavorite";

    const postData = {
      user: user._id,
      destination: destination,
      place: place,
      key: optionSet,
    };

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOptionSet("address");
        load_favorites() ;
        DoSendAddress(destination, place);
       
      })
      .catch((error) => console.error(error));
  };

  const handleAddDestination = (destination, place, type) => {
    console.log("destination Pick: ", destination);
    console.log("place Pick: ", place.description);

    console.log("type: ", typeSelector);
    console.log("optionSet ", optionSet);

    if (optionSet === "address") {
      DoSendAddress(destination, place);
    } else {
      DoSaveFavorite(destination, place);
    }
  };

  const renderSeparator = () => {
    return <View style={autoCompleteStyles.separator} />;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={autoCompleteStyles.itemContainer}>
        <Text style={autoCompleteStyles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const RenderAddressLabel = ({keyLabel }) => {
    var found = keyLabel.favoritesListD.find((item) => item.key === keyLabel.key)
    
    return(
    <React.Fragment>
    { found && 
    <Text style={styles.optionLabel}>{found.place.description}</Text>
    }
    </React.Fragment>
    )

  }

  return (
    <Modal visible={visible} onRequestClose={closeModal} animationType="slide">
      <View style={autoCompleteStyles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, left: "94%" }}
          onPress={() => closeModal()}
        >
          <Image
            source={close}
            style={{
              width: 32,
              height: 32,
            }}
          />
        </TouchableOpacity>


        {!showFavorites && !showAddressAdd && !mapPicker && (
          <View style={autoCompleteStyles.titleContainer}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Selecciona una direcciòn</Text>
          </View>
        )}

        {!showFavorites && !showAddressAdd && !mapPicker && (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => setShowFavorites(true)}
              >
                <Icon name="star" size={30} color="#F2C94C" />
                <Text style={styles.optionLabel}>Favoritos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setOptionSet("address");
                  setAddressAdd(true);
                }}
              >
                <Icon name="plus" size={30} color="#828282" />
                <Text style={styles.optionLabel}>Agregar nueva dirección</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.option} onPress={()=>{

                  if(MyLocation !== null){

                    DoSendMyLocation()

                  }

              }}>
                <Icon name="map-marker" size={30} color="#BB6BD9" />
                <Text style={styles.optionLabel}>Mi ubicación actual</Text>
                <Text style={styles.optionLabel}>{MyLocation && MyLocation.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={()=>{
                
                if(MyLastLocation!==null){
                  DoSendMyLastLocation()
                }

              }}>
                <Icon name="history" size={30} color="#6FCF97" />
                <Text style={styles.optionLabel}>Última ubicación</Text>
                <Text style={styles.optionLabel}>{MyLastLocation && MyLastLocation.title}</Text>
              
                
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  var search = favoritesList.find((item) => item.key === "work");
                  if (search) {

                    DoSendAddress(search.destination, search.place);
                  } else {
                   // console.log("no exs ", search);
                    setOptionSet("work");
                    setAddressAdd(true);
                  }
                }}
              >
                <Icon name="briefcase" size={30} color="#27AE60" />
                <Text style={styles.optionLabel}>Trabajo</Text>
              <RenderAddressLabel keyLabel={{key:"work",favoritesListD:favoritesList}}/>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  var search = favoritesList.find((item) => item.key === "study");
                  if (search) {
                    DoSendAddress(search.destination, search.place);
                  } else {
                //    console.log("no exs ", search);
                    setOptionSet("study");
                    setAddressAdd(true);
                  }
                }}
              >
                <Icon name="book" size={30} color="#EB5757" />
                <Text style={styles.optionLabel}>Estudio</Text>
                <RenderAddressLabel keyLabel={{key:"study",favoritesListD:favoritesList}}/>

              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  var search = favoritesList.find((item) => item.key === "home");
                  if (search) {
                    DoSendAddress(search.destination, search.place);
                  } else {
            //        console.log("no exs ", search);
                    setOptionSet("home");
                    setAddressAdd(true);
                  }
                }}
              >
                <Icon name="home" size={30} color="#F2994A" />
                <Text style={styles.optionLabel}>Casa</Text>
                <RenderAddressLabel keyLabel={{key:"home",favoritesListD:favoritesList}}/>

              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={()=>{

                  showMapPicker(true)

}}>
<Icon name="search" size={30} color="blue" />
<Text style={styles.optionLabel}>Buscar en el Mapa</Text>
<Text style={styles.optionLabel}>Mira donde...</Text>
</TouchableOpacity>

            </View>
          </View>
        )}

        
        {showAddressAdd && !showFavorites && !mapPicker && (
          <AddAddressCard
            user={user}
            optionSet={optionSet}
            cloaseAddressAdd={() => setAddressAdd(false)}
            setAddress={handleAddDestination}
          />
        )}
        
        
        {showFavorites && !showAddressAdd && !mapPicker && (
          <FavoritesCard
            user={user}
            closeFavorities={() => setShowFavorites(false)}
          />
        )}
 
        
      
        {!showAddressAdd && !showFavorites && mapPicker && (
          
          <MapPickerCard visible={mapPicker} pickAddress={DoSendMapPicker} close={()=>showMapPicker(false)}/>
          
        )} 
      
      </View>
    </Modal>
  );
};

const autoCompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  itemText: {
    fontSize: 16,
  },
});

const styles = {
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
  },
  optionLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  titleContainer: {
    fontSize: 16,
  },
};

export default AddressSelector;
