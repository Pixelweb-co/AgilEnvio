import React, { useState, useEffect } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import {
  changeOrigin,
  addDestination,
  addLocation,
} from "../../../reducers/actions/RequsitionActions";

import close from "../../../../assets/img/close.png";

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
  const dispatch = useDispatch()
  
  const data = [
    { key: "favorite", label: "Favoritos" },
    { key: "lastLocation", label: "Última ubicación" },
    { key: "home", label: "Casa" },
    { key: "work", label: "Trabajo" },
    { key: "study", label: "Estudio" },
    { key: "currentLocation", label: "Mi ubicación actual" },
  ];

  useEffect(() => {
    if (user) {
      console.log("user un adrress", user);
    }
  }, [user]);

  const handleAddDestination = (destination,place) => {
    console.log("destination Pick: ", destination.geometry.location);
    console.log("place Pick: ", place.description);
    
    console.log("type: ", typeSelector);
    

    if (typeSelector === "origin") {
      dispatch(
        changeOrigin({
          order: 0,
          title: place.description,
          coords: { latitude: destination.geometry.location.lat, longitude: destination.geometry.location.lng },
          id: place.place_id,
        })
      );
    }

    if (typeSelector === "destinations") {
      dispatch(
        addDestination({
          order: locations.length + 1,
          title: place.description,
          coords: { latitude: destination.geometry.location.lat, longitude: destination.lng },
          id: place.place_id,
        })
      );
    }
    setShowFavorites(false)
    setSelectedAddress([])
    setAddressAdd(false)
    closeModal();
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
        {/* <View style={autoCompleteStyles.inputContainer}>
          
          
          
          <GooglePlacesAutocomplete
            placeholder="Buscar dirección"
            onPress={(data, details = null) => {
              setSelectedAddress(data.description);
            }}
            query={{
              key: "AIzaSyDzQmRckek8ujCnLrYo_s35o0heMSPkY7s",
              components: "country:CO",
              language: "es",
            }}
            styles={{
              textInput: autoCompleteStyles.input,
              listView: autoCompleteStyles.listView,
            }}
          />
        </View> */}

        {!showFavorites && !showAddressAdd && (
          <View style={autoCompleteStyles.titleContainer}>
            <Text>Selecciona una direcciòn</Text>
          </View>
        )}

        {!showFavorites && !showAddressAdd && (
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
                onPress={() => setAddressAdd(true)}
              >
                <Icon name="plus" size={30} color="#828282" />
                <Text style={styles.optionLabel}>Agregar nueva dirección</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.option}>
                <Icon name="map-marker" size={30} color="#BB6BD9" />
                <Text style={styles.optionLabel}>Mi ubicación actual</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Icon name="history" size={30} color="#6FCF97" />
                <Text style={styles.optionLabel}>Última ubicación</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.option}>
                <Icon name="briefcase" size={30} color="#27AE60" />
                <Text style={styles.optionLabel}>Trabajo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Icon name="book" size={30} color="#EB5757" />
                <Text style={styles.optionLabel}>Estudio</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.option}>
                <Icon name="home" size={30} color="#F2994A" />
                <Text style={styles.optionLabel}>Casa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showFavorites && !showAddressAdd && (
          <FavoritesCard
            user={user}
            closeFavorities={() => setShowFavorites(false)}
          />
        )}

        {showAddressAdd && !showFavorites && (
          <AddAddressCard
            user={user}
            cloaseAddressAdd={() => setAddressAdd(false)}
            setAddress={handleAddDestination}
          />
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
