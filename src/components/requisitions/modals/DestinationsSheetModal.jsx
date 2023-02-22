import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import DestinationsEdit from '../UiModules/DestinationsEdit';

import { useSelector,useDispatch } from 'react-redux';
import { setOpenSheet } from '../../../reducers/actions/RequsitionActions';

const DestinationsSheetModal = () => {
  // ref
  let bottomSheetRef = useRef();
  //destinations store
  const Destinations = useSelector((store)=>store.reducers.requisition.destinations)
  const opensheet = useSelector((store)=>store.reducers.sheetMenu)
  const dispatch = useDispatch()  
  // variables
  const snapPoints = useMemo(() => ['85%', '20%'], []);

  // callbacks 
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(()=>{

    console.log("into sheet ",opensheet)
    if(opensheet){ 


    bottomSheetRef.open()

    }

  },[opensheet])

  // renders
  return (
    <RBSheet
          ref={ref => {
            bottomSheetRef = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
          onClose={() => {
              console.log("coseddd")
              dispatch(setOpenSheet(false))
        
        }}
        >

        <DestinationsEdit destinations={Destinations}/>
            
        </RBSheet>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DestinationsSheetModal;