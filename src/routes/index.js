import React from 'react';
import { Switch, Redirect, BrowserRouter, Route } from 'react-router-dom';

import Login from '../views/Login'
import LoginForm from '../components/Login/LoginForm'

// const Parent = () => (
//     <div>
//       <Route path='/login' component={Child} />
//       <Route path='other' component={Other} />
//     </div>
//   )

export const subjectRoute = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => (<Redirect from="/" to="/login" />)}></Route>

            <Route path="/login" component={Login} />
            <Route path="/register" component={Login} />


        </Switch>



    </BrowserRouter>
)
