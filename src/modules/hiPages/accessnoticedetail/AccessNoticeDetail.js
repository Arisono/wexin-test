/**
*   Created by FANGlh on 2019/1/17 8:57.
*   Desc: 进出校通知详情
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import './AccessNoticeDetail.css';
import {isObjEmpty,getIntValue, getStrValue} from  '../../../utils/common';
import {getWeixinInfo} from '../../../utils/api.request'


class AccessNoticeDetail extends Component{
   constructor(props){
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        getWeixinInfo()
        let stuId = this.props.match.params.stuId
        let role = this.props.match.params.role
        console.log("stuId",stuId)
        if (!isObjEmpty(stuId)){
            this.getleaveDetail(stuId)
        }
    }
     render(){
        return(
            <div>
                Hello AccessNoticeDetail
                <div id="c1"></div>
            </div>
        )
    }
}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AccessNoticeDetail)
