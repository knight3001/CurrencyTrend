import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    browserHistory,
    Redirect,
    withRouter
} from 'react-router-dom';

import { AuthButton, PrivateRoute, Login } from './auth/auth';
import Trend from './trend/Trend';
import History from './history/History';
import Store from './redux/index';
import Reddit from './reddit/index';

import { BaseUrl } from './globals';

const ListItemLink = ({ to, text }) => (
    <Route exact path={to} children={({ match }) => (
        <li role="presentation" className={match ? 'active' : ''}>
            <Link to={to}>{text}</Link>
        </li>
    )} />
)

class BasicRouter extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="header col-md-4 col-md-offset-4">
                        <ul className="nav nav-pills">
                            <ListItemLink to={BaseUrl} text="Current Rates" />
                            <ListItemLink to={BaseUrl + "history/"} text="Historical Data" />
                            <ListItemLink to={BaseUrl + "redux/"} text="Redux" />
                            <ListItemLink to={BaseUrl + "reddit/"} text="Reddit" />
                            <AuthButton />
                        </ul>
                    </div>

                    <div className="clear"></div>

                    <Route exact path={BaseUrl} component={Trend} />
                    <Route path={BaseUrl + "login/"} component={Login}/>
                    <PrivateRoute path={BaseUrl + "history/"} component={History} />
                    <Route path={BaseUrl + "redux/"} component={Store} />
                    <PrivateRoute path={BaseUrl + "reddit/"} component={Reddit} />
                </div>
            </Router>
        )
    }
}

export default BasicRouter;