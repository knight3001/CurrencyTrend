import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    browserHistory,
    Redirect,
    withRouter
} from 'react-router-dom';

import { BaseUrl } from '../globals';

const LoginUrl = BaseUrl + "login/";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

export const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <button type="button" className="btn btn-danger navbar-btn" onClick={() => {
            fakeAuth.signout(() => history.push(LoginUrl))
        }}>Sign out</button>
    ) : (
            <button type="button" className="btn btn-info navbar-btn" onClick={() => {
                history.push(LoginUrl)
            }}>Sign in</button>
        )
))

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: LoginUrl,
                    state: { referrer: props.location }
                }} />
            )
    )} />
)

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: "",
            password: "",
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    login = () => {
        const username = this.state.username;
        const password = this.state.password;
        if (username === "terry" && password === "admin") {
            fakeAuth.authenticate(() => {
                this.setState({ redirectToReferrer: true })
            })
        }
        else{
            this.setState({ error: true })
        }
    }

    handleChange() {
        this.setState({
            username: this.username.value,
            password: this.password.value
        })
    }

    render() {
        const { referrer } = this.props.location.state || { referrer: { pathname: BaseUrl } };
        const redirectToReferrer = this.state.redirectToReferrer;

        if (redirectToReferrer) {
            return (
                <Redirect to={referrer} />
            )
        }

        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
                    <form className="form-horizontal form-wrap">
                        <fieldset>
                            <div className={(this.state.error? "form-group has-error" : "form-group")}>
                                <label htmlFor="username" className="col-md-3 col-md-offset-1 control-label">Username</label>
                                <div className="input-group col-md-5">
                                    <input type="text" className="form-control" id="username" placeholder="terry" maxLength="50"
                                        value={this.state.username} ref={(input) => this.username = input} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className={(this.state.error? "form-group has-error" : "form-group")}>
                                <label htmlFor="password" className="col-md-3 col-md-offset-1 control-label">Username</label>
                                <div className="input-group col-md-5">
                                    <input type="password" className="form-control" id="password" placeholder="admin" maxLength="50"
                                        value={this.state.password} ref={(input) => this.password = input} onChange={this.handleChange} />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.login}>Log in</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}