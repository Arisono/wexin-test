/**
 * Created by RaoMeng on 2018/11/8
 * Desc: 通讯录列表item
 */

import React, {Component} from 'react'
import PhonesBean from 'model/PhonesBean'
import {Icon, Avatar} from 'antd'
import 'css/phones.css'
import {isObjEmpty} from "../utils/common";
import {Modal} from 'antd-mobile'

const {alert} = Modal

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
        console.log(phonesBean.icon)
        return (
            <div className='common-flex-row-10' style={{padding: '0', width: '100%'}}>
                {isObjEmpty(phonesBean.icon) ? <Avatar size={40} icon='user' style={{marginLeft: '12px'}}/> :
                    <Avatar size={40} src={phonesBean.icon} style={{marginLeft: '12px'}}/>}

                <div className='phones-item-root'>
                    <div className='phones-item-top'>
                        <div className='phones-item-name'>{phonesBean.name}</div>
                        {isObjEmpty(phonesBean.phone) ? '' : (
                            phonesBean.phone.length <= 1 ?
                                <a href={'tel:' + phonesBean.phone[0]} style={{display: 'flex', alignItems: 'center'}}>
                                    <div className='phones-item-phone'>{phonesBean.phone[0]}</div>
                                    <Icon type="phone" theme="filled"/>
                                </a> :
                                <div style={{display: 'flex', alignItems: 'center'}} onClick={this.onPhoneSelect}>
                                    <div className='phones-item-phone'>{phonesBean.phone[0]}</div>
                                    <Icon type="phone" theme="filled"/>
                                </div>)}
                    </div>

                    <span className='phones-item-child'>{phonesBean.children.map(item => (
                        <span>{item}&nbsp;&nbsp;&nbsp;</span>
                    ))}</span>
                </div>
            </div>

        )
    }

    onPhoneSelect = () => {
        const {phonesBean} = this.state

        const phonesItems = []
        phonesBean.phone.forEach((item, index) => {
            phonesItems.push(
                <a href={'tel:' + item} style={{display: 'flex', alignItems: 'center', margin: '10px auto'}}
                   onClick={this.onPhoneClick}>
                    <div className='phones-item-phone'>{item}</div>
                    <Icon type="phone" theme="filled"/>
                </a>
            )
        })

        this.alertClose = alert('请选择您要拨打的电话', <div
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {phonesItems}
        </div>)
    }

    onPhoneClick = () => {
        // console.log("alert",this.alertClose)
        this.alertClose.close()
    }
}