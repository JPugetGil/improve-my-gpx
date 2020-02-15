import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import rootReducers from "./rootReducers";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    rootReducers: rootReducers
});

export default createRootReducer