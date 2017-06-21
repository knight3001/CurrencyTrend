import React, { Component } from 'react'
import { createStore, compose } from 'redux'
import { persistState } from 'redux-devtools';
import { Provider } from 'react-redux'

import rootReducer from './reducers/index'
import TodoApp from './components/App'
import DevTools from './containers/DevTools';

import {
    addTodo,
    toggleTodo,
    setVisibilityFilter
} from './actions/TodoActions';
import * as types from './constants/ActionTypes';

const enhancer = compose(
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

function configureStore(initialState) {
    const store = createStore(
        rootReducer, 
        initialState, 
        enhancer
        /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
    );

    return store;
}

export class Store extends Component {
    render() {
        const store = configureStore();
        return (
            <Provider store={store}>
                <div>
                    <TodoApp />
                    <DevTools />
                </div>
            </Provider>
        )
    }
}
export default Store;

/*
// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

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