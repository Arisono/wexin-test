/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 历史投递item
 */

import React, {Component} from 'react'

export default class PrincipalItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {principalBean} = this.props

        return (
            <div style={{padding: '10px'}}>
                <div className='principal-item-root'>
                    <div className='principal-item-top'>
                        <div className='principal-item-time'>{principalBean.time}</div>
                        <span className={principalBean.status == '已查阅' ?
                            'principal-item-status-done' :
                            'principal-item-status-todo'}>{principalBean.status}</span>
                    </div>

                    <div className='principal-item-content'>{principalBean.suggest}</div>
                    <div style={{textAlign: 'right'}}>
                        <span className='principal-item-delete'>删除</span>
                    </div>
                </div>
            </div>
        )
    }
}