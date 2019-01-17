/**
*   Created by FANGlh on 2019/1/17 8:57.
*   Desc: 进出校通知详情
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import './AccessNoticeDetail.css';
import {isObjEmpty,getIntValue, getStrValue} from  '../../../utils/common';


class AccessNoticeDetail extends Component{
   constructor(props){
        super(props);
        this.state = {

        }
    }
     render(){
        return(
            <div>
                Hello AccessNoticeDetail
            </div>
        )
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')

        let stuId = this.props.match.params.stuId
        let role = this.props.match.params.role
        console.log("stuId",stuId)
        if (!isObjEmpty(stuId)){
            this.getleaveDetail(stuId)
        }
    }

}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AccessNoticeDetail)
