import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    count: 0,
    requisition: {
        origin:{title:"DESDE REDUX",coords:null},
        destinations:[],
        client_id:null,
        status:'NEW',
        driver_id:null,
        dateAdd:'',
        priceService:0
    },
    user:null
  };

  const rootSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      fetchProgress(state) {
        state.loading = true
      },
      fetchSuccess(state, action) {
        state.loading = false
      },
      setUserData(state, action) {
        state.user = action.payload.data
        console.log(state.user)
      },
      changeOrigin(state,action){
         state.requisition.origin = {title:"Ubicacion Actual",coords:action.payload.coords}
      }
    }
  })
  
  const store = configureStore({
    reducer: rootSlice.reducer
  })

  export const {
    fetchProgress,
    fetchSuccess,
    setUserData,
    changeOrigin
    } = rootSlice.actions
  
  export default rootSlice.reducer

  export { store }
   