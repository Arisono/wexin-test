/**
 * Created by RaoMeng on 2019/1/14
 * Desc: 作业详情
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {isObjEmpty} from "../../utils/common";
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";

class HomeWorkDetail extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        document.title = '作业详情'

        if (this.props.match.params) {
            this.workId = this.props.match.params.id
            this.role = this.props.match.params.role
        }

        this.obtainDetail()
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        return (
            <div className='common-flex-column'>
                <div className='common-flex-row-12'>
                    {isObjEmpty(userInfo.userAvatar) ?
                        <Avatar size={60} icon='user'/> :
                        <img
                            src={this.props.userInfo.userAvatar}
                            width={60} height={60} className="img-circle"
                            style={{border: '3px solid #ffffff'}}/>
                    }
                    <div className='common-flex-column-y-center'>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    }

    obtainDetail = () => {
        fetchGet(API.homeWorkDetail, {
            notifyId: this.workId,
            userId: this.props.userInfo.userId
        }).then(response => {

        }).catch(error => {

        })
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorkDetail)