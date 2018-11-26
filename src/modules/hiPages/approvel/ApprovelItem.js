/**
*   Created by FANGlh on 2018/11/26 12:41.
*   Desc:
*/

import React,{Component} from 'react';
import './Approvel.css';

export default class ApprovelItem extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
    render(){
        return(
            <div className="item-Style">
                <div style={{width:76,height:'100%'}}>
                    <img src={this.props.itemata.img} className="img_sty"/>
                </div>
                <div></div>
                <div></div>
            </div>
        )
    }
}