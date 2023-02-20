import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Button,
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
import ServicesMenu from "../menu";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "../../navigation/NavigationTabs";
import { useSelector, useDispatch } from "react-redux";

import {
  changeOrigin,
  addDestination,
  addLocation,
  openSheet,
  closeSheet,
  changeStatus,
  setRequisition,
  setNewStep
} from "../../../reducers/actions/RequsitionActions";
import DestinationsSheetModal from "../modals/DestinationsSheetModal";
//import iconDestination from '../assets/img/markerMenu.png'
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../CredentialsContext.jsx";
import MapComponent from "../../maps/MapComponent";

export default function Requisition({ navigation, socket }) {
  const requisition = useSelector((store) => store);
  const stepNew = useSelector((store) => store.reducers.stepNew);
  const [disabledRegister, setDisabledRegister] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [numDest, setNumDest] = useState(0);
  const [modalDestinos, setModalDestinos] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [wizardAddstep, setWizardAddstep] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };


  const setNewStepW = (step)=>{

    dispatch(setNewStep)

  }

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const openSheet = () => {
    dispatch(openSheet(true));
  };

  const setPending = () => {
    dispatch(changeStatus("PENDING"));
  };

  const handleChangeOrigin = async (origin) => {
    //  const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?', { params:  });

    const url = "https://maps.googleapis.com/maps/api/geocode/json?";
    axios
      .get(url, {
        params: {
          key: "AIzaSyDzQmRckek8ujCnLrYo_s35o0heMSPkY7s",
          latlng:
            origin.coords.latitude.toString() +
            "," +
            origin.coords.longitude.toString(),
        },
      })
      .then((response) => {
        const result = response;
        setLocation(origin);
        setShowOrigin(true);
        dispatch(
          changeOrigin({
            title:
              result.data.results[0].address_components[1].short_name +
              " " +
              result.data.results[0].address_components[0].short_name +
              " " +
              result.data.results[0].address_components[2].short_name +
              " " +
              result.data.results[0].address_components[3].short_name +
              " " +
              result.data.results[0].address_components[4].short_name,
            coords: origin.coords,
          })
        );
      })
      .catch((error) => {
        //          handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };

  const handleAddLocation = (location) => {
    dispatch(
      addLocation({
        order: numDest,
        title: "loc " + numDest.toString(),
        coords: location,
        id: numDest,
      })
    );
    setNumDest(numDest + 1);
  };

  const handleAddDestination = (destination) => {
    // console.log("pick destination ",destination)
    //dispatch(addDestination({order: numDest,title:"loc "+numDest.toString(), coords:destination,id:numDest}))
  };

  useEffect(() => {
    console.log("validate reducer data");
    let errors = 0;
    if (requisition.reducers.requisition.origin === null) {
      errors += 1;
    }

    if (requisition.reducers.requisition.destinations.length === 0) {
      errors += 1;
    }

    if (requisition.reducers.requisition.type === null) {
      //errors += 1
    }

    if (requisition.reducers.requisition.tarifa.valor === 0) {
      errors += 1;
    }

    if (requisition.reducers.requisition.comments.serviceTypeOptions === null) {
      //errors += 1
    }

    //  console.log("errors ",errors)

    if (errors === 0) {
      setDisabledRegister(false);
    } else {
      setDisabledRegister(true);
    }
  }, [requisition.reducers]);

  let text = "Waiting..";

  const registerRequisition = async () => {
    let storedCredentials;
    await AsyncStorage.getItem("flowerCribCredentials")
      .then((result) => {
        if (result !== null) {
          //  console.log("result crede from ",result)
          storedCredentials = JSON.parse(result);
        } else {
          storedCredentials = null;
        }
      })
      .catch((error) => console.log(error));

    const url = "http://api.agilenvio.co:2042/api/solicitudes";

    const requisition_send = {
      ...requisition.reducers.requisition,
      status: "PENDING",
      id_client: storedCredentials._id,
      client_data: storedCredentials,
    };

    //console.log("new to senf ",requisition_send)

    await axios
      .post(url, { requisition: requisition_send })
      .then((response) => {
        const result = response;
        dispatch(setRequisition(result.data));
        //console.log("FRom backend solicitud ",result.data)
      })
      .catch((error) => {
        //          handleMessage('An error occurred. Check your network and try again');
        console.log(error);
      });
  };

  const onPlaceSelect = (place) => {
    handleAddDestination(place);
  };

  const CloseModalStore = async () => {
    try {
      await AsyncStorage.setItem("@ModalSheet", "hide");
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    // console.log("socker requisition new ",socket)
  }, [socket]);

  return (
    <View style={styles.container}>
      {stepNew >= 0 &&
      <View style={styles.map}>
        <MapComponent type="viewNew" socket={socket} requisitionSelected={requisition.reducers.requisition}/>
      </View>
      }
      <StatusBar style="auto" />
      {/* <ServicesMenu/> */}
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      <View style={{ height: 330 }}>
        <NavigationTabs
          store={requisition.reducers}
          user={storedCredentials}
          wizardAddstep={wizardAddstep}
          setWizardAddstep={() => {
            setWizardAddstep(wizardAddstep + 1);
          }}
          changeLocation={(loc) => console.log("to loc ch ", loc)}
        />
        <Button
          disabled={disabledRegister}
          onPress={registerRequisition}
          title="Solicitar servicio"
          color="orange"
          style={{ textColor: "green", width: 200 }}
          accessibilityLabel="Solicitar servicio"
        />
      </View>
      <DestinationsSheetModal
        visible={requisition.reducers.sheetMenu}
        closeModal={() => {
          CloseModalStore();
        }}
        openModal={() => {
          openSheet();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: 400,
  },
});
