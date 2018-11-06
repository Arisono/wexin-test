import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AppHomePage from "../modules/home/AppHomePage";
import BindMenu from "../modules/accountBind/BindMenu";
import AccountBind from "../modules/accountBind/AccountBind";
import NewAlbum from "../modules/newAlbum/NewAlbum";
import UploadImage from "../modules/newAlbum/UploadImage";
import UploadVideo from "../modules/newAlbum/UploadVideo";

export default class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={AppHomePage}/>
                    <Route path='/bindMenu' component={BindMenu}/>
                    <Route path='/accountBind/:type?' component={AccountBind}/>
                    <Route path='/newAlbum' component={NewAlbum}/>
                    <Route path='/uploadImage' component={UploadImage}/>
                    <Route path='/uploadVideo' component={UploadVideo}/>
                </div>
            </Router>
        );
    }
}