/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 校园卡充值
 */

import React, {Component} from 'react'
import {Icon, Button} from 'antd'
import 'css/payment.css'

export default class CampusCardRecharge extends Component {

    constructor() {
        super()

        this.state = {
            student: '饶猛',
            cardNum: '20193839839',
            balance: '38.00'
        }
    }

    componentDidMount() {
        document.title = '校园卡充值'
    }

    render() {
        const {student, cardNum, balance} = this.state

        return (
            <div className='campus-card-root'>
                <img className='campus-card-img' src={require('imgs/img_campus_card.png')} alt="校园卡"/>
                <div className='campus-card-student'>{student}</div>
                <div className='gray-line' style={{height: '1px', marginBottom: '10px'}}></div>
                <div className='campus-card-line'>
                    <div className='campus-card-caption'>卡号：</div>
                    <div className='campus-card-num'>{cardNum}</div>
                </div>
                <div className='campus-card-line'>
                    <div className='campus-card-caption'>余额：</div>
                    <div className='campus-card-balance'>{balance + '元'}</div>
                    <span className='campus-card-record' onClick={this.expensesRecord}>消费记录</span>
                    <Icon type="right" style={{color: '#C1C1C1'}}/>
                </div>
                <Button type="primary" className='campus-card-btn'>去充值</Button>
                <span className='common-record-text' onClick={this.rechargeRecord}>充值记录</span>
            </div>
        )
    }

    expensesRecord = () => {
        this.props.history.push('/consumeRePage')
    }

    rechargeRecord = () => {
        this.props.history.push('/consumeRePage')
    }
}