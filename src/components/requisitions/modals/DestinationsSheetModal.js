import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
    Button,
    TextInput ,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState,useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ListDragDestinations from "./ListDragDestinations";


import { useSelector, useDispatch } from 'react-redux';
import { changeOrigin, addDestination, addLocation, openSheet, closeSheet } from '../../../reducers/actions/RequsitionActions';

export default function DestinationsSheetModal({ visible, closeModal, openModal }) {
    const [darkmode, setDarkmode] = useState(false);
    const [device, setDevice] = useState(false);
    const { width } = useWindowDimensions();
    const [theme, setTheme] = useState("dim");
    const [isOpen, setIsOpen] = useState(visible);
    const [modalHeight, setModalHeight] = useState("50%");
    const [text, onChangeText] = useState("");
    const dispatch = useDispatch();
    const requisition = useSelector((store) => store);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ['25%', modalHeight], []);

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {

            dispatch(openSheet(true))
        }, 100);
    }

    function handleCloseModal() {
        bottomSheetModalRef.current?.close();
        setTimeout(() => {

            dispatch(closeSheet())
        }, 100);
    }


    const closeSheet = () => {
        dispatch(openSheet(false));
    }


    useEffect(() => {
        console.log("sheet ", visible)
        
        if(requisition.reducers.sheetComponent === "Comentarios"){

                if(requisition.reducers.requisition.type === "Carro"){
                    setModalHeight("30%")
                }

                if(requisition.reducers.requisition.type === "Moto"){
                    setModalHeight("40%")
                }

        }

        if (visible) {

            bottomSheetModalRef.current?.present();

        } else {


            bottomSheetModalRef.current?.close();

        }
    }, [visible])

    useEffect(()=>{
        console.log("store in sheet ",requisition.reducers)
    },[])

    return (
        <BottomSheetModalProvider style={{padding:0}}>
            <View
                style={[
                    styles.container,
                    { backgroundColor: visible ? "gray" : "white" },
                ]}
            >
                <Button title="Present Modal" onPress={handlePresentModal} />
                <StatusBar style="auto" />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
                    onDismiss={() => {
                        closeSheet()
                    }}
                >
                    <View style={styles.contentContainer}>
                        <Text style={[styles.title, { marginBottom: 20 }]}>{requisition.reducers.sheetComponent}</Text>
                        
                        {requisition.reducers.requisition && requisition.reducers.sheetComponent === 'Destinos' && requisition.reducers.requisition && requisition.reducers.requisition.destinations.length > 0 &&
                       
                        
                        <ListDragDestinations data={requisition.reducers.requisition.destinations} visible={requisition.reducers.sheetMenu}/>
                         
                        }
                        
                        {requisition.reducers.sheetComponent === 'Comentarios' &&
                            <View style={styles.row}>
                                <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Escribe tus comentarios"
                            />
                            </View>    
                        }

                        {requisition.reducers.sheetComponent === 'Comentarios' && requisition.reducers.requisition.type === 'Carro' &&
                       
                        <View style={styles.row}>
                             <Text style={styles.subtitle}>Mas de 4 viajeros</Text>
                            <Switch
                                value={darkmode}
                                onChange={() => setDarkmode(!darkmode)}
                            />

                        </View>
                         
                        }

                        {requisition.reducers.sheetComponent === 'Comentarios' && requisition.reducers.requisition.type === 'Moto' &&
                       
                       <Text>Moto</Text>
                        
                       }

                    {requisition.reducers.sheetComponent === 'Comentarios' && requisition.reducers.requisition.type === 'Paquete' &&
                       
                       <Text>Paquete</Text>
                        
                       }
                        
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
       
    },
    contentContainer: {
        flex: 1,
        
        paddingHorizontal: 15,
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    title: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
    },
    subtitle: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold",
    },
    description: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
    },
    input: {
        height: 40,
        width:"90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});