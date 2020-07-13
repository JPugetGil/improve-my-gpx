import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createRootReducer from '../reducers/reducers'

const loggerMiddleware = createLogger()

export const history = createBrowserHistory()

export default function configureStore (preloadedState) {
    return createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                loggerMiddleware,
            ),
        ),
    )
}
