import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
// ==========COMPONENTS============
import Index from './components/Index/index';

export default class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Index} />
                </Switch>
            </BrowserRouter>
        );
    }
}