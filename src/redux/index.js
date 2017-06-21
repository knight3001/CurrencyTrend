import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers/index'
import App from './components/App'

import {
    addTodo,
    toggleTodo,
    setVisibilityFilter
} from './actions/TodoActions';
import * as types from './constants/ActionTypes';

let store = createStore(rootReducer);

export class Store extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
export default Store;


// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)
/*
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(toggleTodo(0))
store.dispatch(setVisibilityFilter(types.VisibilityFilters.SHOW_COMPLETED))

// Stop listening to state updates
unsubscribe()
*/