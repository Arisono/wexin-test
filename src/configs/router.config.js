import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AppHomePage from "../modules/home/AppHomePage";
import BindMenu from "../modules/accountBind/BindMenu";
import AccountBind from "../modules/accountBind/AccountBind";

export default class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={AppHomePage}/>
                    {/*<Route path='/bindMenu' component={BindMenu}/>*/}
                    {/*<Route path='/accountBind/:type?' component={AccountBind}/>*/}
                </div>
            </Router>
        );
    }
}