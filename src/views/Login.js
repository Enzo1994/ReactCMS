import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './Login.scss'
import LoginForm from '../components/Login/LoginForm'
import RegisterForm from '../components/Login/RegisterForm'


class Login extends Component {

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-mask"></div>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
            </div>
        )
    }
}

export default Login;
