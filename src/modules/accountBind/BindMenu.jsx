/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 绑定菜单
 */

import React, {Component} from 'react'
import 'css/account-bind.css'
import {Avatar, Input, Icon, Button} from 'antd'

export default class BindMenu extends Component {

    componentDidMount() {
        document.title = '账号绑定'
    }

    render() {
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
                            fontSize: '14px',border:'none'
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