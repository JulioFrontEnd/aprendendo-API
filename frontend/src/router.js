import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
// ==========COMPONENTS============
import Index from './components/Index/index';
import Create from './components/crud/create';
import Update from './components/crud/update';
import Logout from './components/login/logout';
import Login from './components/login'
export default class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route path='/add' component={Create} />
                    <Route path='/update/:id' component={Update} />
                    <Route path='/logout/' component={Logout} />
                    <Route path='/login/' component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}