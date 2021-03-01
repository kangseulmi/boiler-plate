import { combineReducers } from 'redux';
import user from './user_reducer';

const RootReducer = combineReducers({
    user
})

export default RootReducer;