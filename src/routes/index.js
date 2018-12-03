import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Login from '../views/Login'


export const subjectRoute = (
    <BrowserRouter>
        <Route path="/" component={Login}></Route>
    </BrowserRouter>
)
