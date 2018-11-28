/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表item
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {Icon,Avatar} from 'antd'
import 'css/phones.css'

export default class PhonesItem extends Component {

    constructor() {
        super()

        this.state = {
            phonesBean: new PhonesBean()
        }
    }

    componentDidMount() {
        this.setState({
            phonesBean: this.props.phonesBean
        })
    }

    render() {
        const {phonesBean} = this.state
        return (
            <div className='common-flex-row-10' style={{padding: '0',width:'100%'}}>
                <Avatar size={40} icon='user'style={{marginLeft:'12px'}}/>
                <div className='phones-item-root'>
                    <div className='phones-item-top'>
                        <div className='phones-item-name'>{phonesBean.name}</div>
                        <a href={'tel:' + phonesBean.phone} style={{display: 'flex', alignItems: 'center'}}>
                            <div className='phones-item-phone'>{phonesBean.phone}</div>
                            <Icon type="phone" theme="filled"/>
                        </a>
                    </div>

                    <span className='phones-item-child'>{phonesBean.children.map(item => (
                        <span>{item}&nbsp;&nbsp;&nbsp;</span>
                    ))}</span>
                </div>
            </div>

        )
    }
}