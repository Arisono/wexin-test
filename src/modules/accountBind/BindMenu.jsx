/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 绑定菜单
 */

import React, {Component} from 'react'
import 'css/account-bind.css'
import {Redirect} from 'react-router-dom'
import {Avatar, Input, Icon, Button} from 'antd'
import {Toast} from 'antd-mobile'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";

export default class BindMenu extends Component {

    constructor() {
        super()

        this.state = {
            bindStatus: 0,
            errorMsg: '获取绑定信息中...'
        }
    }

    componentWillMount() {
        if (this.props.match.params.openid) {
            this.openid = this.props.match.params.openid
        } else {
            this.openid = 'raomengbindtest'
        }
    }

    componentDidMount() {
        document.title = '账号绑定'

        setTimeout(() => {
            this.obtainBindStatus()
        }, 2500)

    }

    render() {
        const {bindStatus} = this.state
        if (bindStatus === 0) {
            return this.getLoadingLayout()
        } else if (bindStatus === 1) {
            return this.getMenuLayout()
        } else if (bindStatus === 2) {
            return this.getRedirectMain()
        }

    }

    obtainBindStatus = () => {
        fetchGet(API.USER_ISBINDING, {
            userOpenid: this.openid
        }).then(response => {
            if (response.data) {
                this.setState({
                    bindStatus: 2
                })
            } else {
                this.setState({
                    bindStatus: 1
                })
            }
        }).catch(error => {
            if (typeof error === 'string') {
                this.setState({
                    errorMsg: error
                })
            } else {
                this.setState({
                    errorMsg: '数据请求异常'
                })
            }
        })
    }

    getRedirectMain = () => {
        return (
            <Redirect to='/homePage'></Redirect>
        )
    }

    getLoadingLayout = () => {
        return (
            <div className='bindParent' style={{justifyContent: 'center'}}>
                <Icon type="loading" spin style={{fontSize: '50px', color: '#3db1af'}}/>
                <span style={{marginTop: '14px', color: 'white'}}>{this.state.errorMsg}</span>
            </div>
        )
    }

    getMenuLayout = () => {
        return (
            <div className='bindParent'>
                <div className='bindTitleLayout'>
                    <Avatar size={50} src={require('imgs/ic_bind_menu_head.png')}/>
                    <span className='bindTitleText'>您好<br/>请选择您的身份进行绑定</span>
                </div>
                <Button type="primary" block
                        style={{
                            marginTop: '20px', letterSpacing: '10px',
                            borderRadius: '9px', fontSize: '14px'
                        }}
                        onClick={this.parentBind}>我是家长</Button>
                <Button type="primary" block
                        style={{
                            marginTop: '20px', letterSpacing: '10px',
                            background: '#05DC40', borderRadius: '9px',
                            fontSize: '14px', border: 'none'
                        }}
                        onClick={this.teacherBind}>我是老师</Button>
            </div>
        )
    }

    parentBind = () => {
        this.props.history.push('/accountBind/parents')
    }

    teacherBind = () => {
        this.props.history.push('/accountBind/teacher')
    }
}