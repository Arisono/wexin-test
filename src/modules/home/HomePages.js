/**
 * Created by Arison on 2018/10/25.
 */
import React from 'react';
import { Button, Icon, Row, Col } from 'antd';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppHomePage from "./AppHomePage";

/**
 * Created by Arison on 17:45.
 */
class HomePages extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'HomePages'
        };
    }
    
    
    componentDidMount(){

    }
   
    render(){
        return <div>
            <Router>
                    <Route  exact path="/" component={AppHomePage}/>

            </Router>
        </div>
    }
}

export  default HomePages;