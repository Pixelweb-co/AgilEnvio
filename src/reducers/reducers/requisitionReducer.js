const initialState = {
    requisition: {
        origin:null,
        destinations:[],
        client_id:null,
        status:'NEW',
        driver_id:null,
        dateAdd:"",
        priceService:0
    },
  };

 
   
  export default (state = initialState, action) => {
    console.log("initial s ",state)
    switch (action.type) {
      case 'CHANGE_ORIGIN':
        console.log("payload ",action.payload.coords)
        return {...state.requisition, 
            origin: {...state.requisition.origin,title:"from redux xx ", coords:action.payload.coords}
        };
          
      case 'ADD_DESTINATION':
        return {
            ...state.requisition,
            destinations: state.destinations.push(action.payload.destination),
          };
      default:
        return state;
    }
  };