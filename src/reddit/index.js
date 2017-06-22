import React, { Component } from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { selectSubreddit, fetchPostsIfNeeded } from './actions/actions'
import rootReducer from './reducers/reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

store.dispatch(selectSubreddit('reactjs'))
store
    .dispatch(fetchPostsIfNeeded('reactjs'))
    .then(() => console.log(store.getState()))


export class Reddit extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    
                </div>
            </Provider>
        )
    }
}   
export default Reddit; 