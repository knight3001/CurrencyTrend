import 'babel-polyfill'

import React, { Component } from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { selectSubreddit, fetchPostsIfNeeded } from './actions/actions'
import rootReducer from './reducers/reducers'
import { logger, crashReporter } from './middleware'
import AsyncApp from './containers/AsyncApp'

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    )
}

/*store.dispatch(selectSubreddit('reactjs'))
store
    .dispatch(fetchPostsIfNeeded('reactjs'))
    .then(() => console.log(store.getState()))*/

const store = configureStore();

export class Reddit extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}
export default Reddit; 