/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 系统消息列表item
 */

import React, {Component} from 'react'
import {Avatar} from 'antd'
import 'css/message.css'

export default class SystemMsgItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {systemBean} = this.props
        return (
            <div className='system-msg-item-parent-layout'>
                <span className='system-msg-item-time'>{systemBean.time}</span>
                <div className='system-msg-item-content-layout'>
                    <span className='system-msg-item-header'>智慧<br/>校园</span>
                    <div className='system-msg-item-content-text'>
                        {systemBean.content}
                    </div>
                </div>
            </div>
        )
    }
}