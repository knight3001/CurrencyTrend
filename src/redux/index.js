import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistState } from 'redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import todoApp from './reducers';

import App from './components/App';
import DevTools from './containers/DevTools';

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore(initialState) {
    const store = createStore(todoApp, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)