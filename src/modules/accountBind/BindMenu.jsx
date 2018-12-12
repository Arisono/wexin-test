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
import {switchUser} from 'action/userInfo'
import {getIntValue, getStrValue} from "../../utils/common";

export default class BindMenu extends Component {

    constructor() {
        super()

        this.state = {
            bindStatus: 0,
            errorMsg: ''
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = '账号绑定'
        if (this.props.match.params.openid) {
            this.setState({
                errorMsg: '获取绑定信息中...'
            })
            this.openid = this.props.match.params.openid

            setTimeout(() => {
                this.obtainBindStatus()
            }, 1000)
        } else {
            this.setState({
                errorMsg: ''
            })
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc1f8607137d3b8a&redirect_uri=https%3a%2f%2fwww.akuiguoshu.com%2fschool%2fuser%2fuserLogin&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect'
        }
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
                let role = 1//1:家长2:老师
                const userStation = getStrValue(response.data, 'userStation')
                if (userStation === '家长') {
                    role = 1
                } else {
                    role = 2
                }
                switchUser({
                    userId: getIntValue(response.data, 'userId'),
                    userName: getStrValue(response.data, 'userName'),
                    userOpenid: getStrValue(response.data, 'userOpenid'),
                    userPhone: getStrValue(response.data, 'userPhone'),
                    userRole: role
                })()

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