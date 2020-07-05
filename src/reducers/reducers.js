import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import rootReducers from './rootReducers'
import mapReducers from './mapReducers'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    rootReducers: rootReducers,
    mapReducers: mapReducers
})

export default createRootReducer
