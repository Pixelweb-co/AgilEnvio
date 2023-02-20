export const changeOrigin = (origin) => {
    return {
      type: 'CHANGE_ORIGIN',
      payload:origin
    };
  };
   
  export const addDestination = (destination) => {
    return {
      type: 'ADD_DESTINATION',
      payload:destination
    };
  };  

  export const addLocation = (location) => {
    return{
      type:'ADD_LOCATION',
      payload:location
    }
  }

  export const changeTarifa = (tarifa) => {
    return {
      type: 'CHANGE_TARIFA',
      payload:tarifa
    };
  };

  export const openSheet = (status) => {
    return {
      type: 'OPEN_SHEET',
      payload:status
    };
  };

  export const closeSheet = () => {
    return {
      type: 'CLOSE_SHEET'
    };
  };

  export const compSheet = (comp) => {
    return {
      type: 'COMP_SHEET',
      payload:comp
    };
  };

  export const setRequsitionType = (type) => {
    return {
      type: 'SET_REQUISITION_TYPE',
      payload:type
    };
  };

  
  export const changeStatus = (status) => {
    return {
      type: 'SET_REQUISITION_STATUS',
      payload:status
    };
  };
  
  export const setRequisition = (requisition) => {
    return {
      type: 'SET_REQUISITION',
      payload:requisition
    };
  };

  export const changeAppMode = (appMode) => {
    return {
      type: 'CHANGE_APP_MODE',
      payload:appMode
    };
  };

  export const setReduxSocket = (socket) =>{
    return {
      type: 'SET_SOCKET',
      payload:socket
    };
  }

  export const setOffers = (offers)=>{
    return {
      type: 'SET_OFFERS',
      payload:offers
    };
  }

  export const setDriverList = (driverList)=>{
   
    return {
      type: 'SET_DRIVER_REQUISITIONS',
      payload:driverList
    }
  }

  export const setValorSol = (requisition) => {
    
    return {
      type: 'SET_REQUISITION_VALUE',
      payload:requisition
    };
  }; 

  export const changeDriverPos = (Remotelocation) => {
   return {
      type: 'SET_DRIVER_LOCATION',
      payload:Remotelocation
    };
  };

  export const setNewStep = (step) => {
    return {
       type: 'SET_STEP_NEW',
       payload:step
     };
   };
