import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const RootContainer = require('./App').default;
        render(
            <AppContainer>
                <RootContainer />
            </AppContainer>,
            document.getElementById('root')
        );
    });
};*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
