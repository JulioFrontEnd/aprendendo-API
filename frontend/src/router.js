import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
// ==========COMPONENTS============
import Index from './components/Index/index';
import Create from './components/crud/create'
export default class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route path='/add' component={Create} />
                </Switch>
            </BrowserRouter>
        );
    }
}