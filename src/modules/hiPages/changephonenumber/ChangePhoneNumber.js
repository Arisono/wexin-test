/**
*   Created by FANGlh on 2019/1/16 14:18.
*   Desc:
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import './ChangePhoneNumber.css';


 class ChangePhoneNumber extends Component{
   constructor(props){
        super(props);
        this.state = {
            
        }
    }
     render(){
        return(
            <div className="common-column-layout" style={{height:"100vh",backgroundColor:"#F6F6F6"}}>

                {/*<view className="">+86</view>*/}
                <view style={{backgroundColor:"#F6F6F6"}}>
                <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6',height:"100vh"}} />}
                    message="更换手机号成功"
                />
                </view>
            </div>
        )
    }
    componentWillMount() {
       document.title='更换手机号码'
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhoneNumber)