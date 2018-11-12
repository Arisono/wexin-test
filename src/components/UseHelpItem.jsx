/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 使用帮助item
 */

import React, {Component} from 'react'

export default class UseHelpItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {helpBean, index} = this.props
        return (
            <div className='use-help-item-layout'>
                <div className='use-help-item-title'>{(index + 1) + '、' + helpBean.title}</div>
                <div className='use-help-item-content'>{helpBean.content}</div>
            </div>
        )
    }
}