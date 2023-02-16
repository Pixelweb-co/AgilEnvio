import { createStore, combineReducers} from 'redux';
import reducers from './reducers/countReducer';
 
const rootReducer = combineReducers({
  reducers: reducers,
});
 
export const store = createStore(rootReducer);