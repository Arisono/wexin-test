/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 加载更多
 */

import React, {Component} from 'react'
import {Icon} from 'antd'

export default class LoadingMore extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='common-load-more'>
                <Icon type="loading" theme="outlined"/>
                <span style={{marginLeft: '10px'}}>加载更多</span>
            </div>
        )
    }
}