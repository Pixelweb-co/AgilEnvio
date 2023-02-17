const initialState = {
    count: 0,
    appMode:"client",
    sheetMenu:false,
    socket:null,
    sheetComponent:null,
    requisition:{
      id:null,
      id_client:null,
      client_data:null,
      id_driver:null,
      origin:{title:"initial",coords:null},
      destinations:[],
      status:"NEW",
      tarifa:{valor:0,formaPago:"efectivo"},
      type:null,
      comments:{notes:"",serviceTypeOptions:null}
    },
    offers:[],
    requisitionListPending:[],
    locations:[],
    requisitionNegotiate:null,
    locationDriver:null
  };
   
  export default (state = initialState, action) => {
    //console.log("pay load ",action.payload)
    switch (action.type) {
      case 'COMP_SHEET':
        return {
          ...state,
          sheetComponent: action.payload
      };
      case 'OPEN_SHEET':
        return {
          ...state,
          sheetMenu: action.payload
      };
      case 'CLOSE_SHEET':
        return {
          ...state,
          sheetMenu: false,
      };
      case 'SET_SOCKET':
        return {
          ...state,
          socket:action.payload
        };
      case 'SET_OFFERS':
        return {
          ...state,
          offers:action.payload
        };
        case 'SET_DRIVER_REQUISITIONS':
        return {
          ...state,
          requisitionListPending:[...action.payload]
        };
      case 'COUNT_INCRESE':
        return {
          ...state,
          count: state.count + 1,
        };
      case 'COUNT_DECRESE':
        return {
          ...state,
          count: state.count - 1,
        };
        case 'CHANGE_APP_MODE':
        return {
          ...state,
          appMode: action.payload,
        };
        case 'CHANGE_ORIGIN':
        let origTmp = {...state, requisition: {...state.requisition, origin:action.payload}};
        //console.log("origen temporal ",origTmp)
        return origTmp;
        case 'ADD_LOCATION':  
        let objL = {
          ...state,
          locations: state.locations.length > 0 ? [...state.locations, action.payload]:[action.payload],
        };
        return objL
        case 'ADD_DESTINATION': 
        let objD = { 
          ...state,
          requisition:{...state.requisition,destinations: state.requisition.destinations.length > 0 ? [...state.requisition.destinations, action.payload]:[action.payload],
        }};
        return objD
        case 'SET_REQUISITION_TYPE':
          let origTmp1 = {...state, requisition: {...state.requisition, type:action.payload}};
          //console.log("origen temporal ",origTmp1)
          return origTmp1;
        case 'SET_REQUISITION_STATUS':      
        let origTmp3 = {...state, requisition: {...state.requisition, status:action.payload}};
        //console.log("nuevo estado ",origTmp3)
        return origTmp3;
        case 'CHANGE_TARIFA':
          let origTmp2 = {...state, requisition: {...state.requisition, tarifa:action.payload}};
          //console.log("nueva tarifa ",origTmp2)
          return origTmp2;
          case 'SET_REQUISITION':
          let origTmp4 = {...state, requisition: action.payload};
          return origTmp4;            
        case 'SET_REQUISITION_VALUE':
          let origTmp5 = {...state, requisitionNegotiate: action.payload};
          console.log("nueva tarifa ",origTmp5.requisitionNegotiate)
          return origTmp5;
        case 'SET_DRIVER_LOCATION':
          let origTmp6 = {...state, locationDriver: action.payload};
          return origTmp6
        default:
          return state;
    }
  };