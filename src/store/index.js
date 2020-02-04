import { createStore, applyMiddleware, compose } from 'redux'
import rootReducers from 'reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default (initialState = {}) => {
    const middlewares = [thunkMiddleware]

    let composeEnhancers = compose

    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

        const logger = createLogger({
            level: 'info',
            collapsed: true,
        })

        middlewares.push(logger)
    }

    return createStore(rootReducers, initialState, composeEnhancers(applyMiddleware(...middlewares)))
}
