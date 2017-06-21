import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Trend from './trend/Trend';
import History from './history/History';
import Store from './redux/index';

import { BaseUrl } from './globals';

const ListItemLink = ({ to, text }) => (
    <Route exact path={to} children={({ match }) => (
        <li role="presentation" className={match ? 'active' : ''}>
            <Link to={to}>{text}</Link>
        </li>
    )} />
)

const BasicRouter = () => (
    <Router>
        <div className="App">
            <div className="header col-md-4 col-md-offset-4">
                <ul className="nav nav-pills">
                    <ListItemLink to={BaseUrl} text="Current Rates" />
                    <ListItemLink to={BaseUrl + "history/"} text="Historical Data" />
                    <ListItemLink to={BaseUrl + "redux/"} text="Redux" />
                </ul>
            </div>

            <div className="clear"></div>

            <Route exact path={BaseUrl} component={Trend} />
            <Route exact path={BaseUrl + "history/"} component={History} />
            <Route exact path={BaseUrl + "redux/"} component={Store} />
        </div>
    </Router>
)
export default BasicRouter;