/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 充值缴费item
 */

import React, {Component} from 'react'
import RechargeBean from 'model/RechargeBean'
import 'css/payment.css'

export default class RechargeItem extends Component {

    constructor() {
        super()

        this.state = {
            rechargeBean: new RechargeBean()
        }
    }

    componentDidMount() {
        this.setState({
            rechargeBean: this.props.rechargeBean
        })
    }

    render() {
        const {rechargeBean} = this.state

        return (
            <div className='recharge-item-root'>
                <div className='recharge-item-type'>{rechargeBean.type}</div>
                <div className='gray-line' style={{height: '1px',marginBottom:'10px'}}></div>
                <div className='recharge-item-line'>
                    <div className='recharge-item-caption'>交费对象：</div>
                    <div className='recharge-item-value'>{rechargeBean.name}</div>
                </div>
                <div className='recharge-item-line'>
                    <div className='recharge-item-caption'>截止日期：</div>
                    <div className='recharge-item-value'>{rechargeBean.endTime}</div>
                </div>
                <div className='recharge-item-line'>
                    <div className='recharge-item-caption'>备注：</div>
                    <div className='recharge-item-value'>{rechargeBean.remarks}</div>
                </div>

                <div className='recharge-item-bottom'>
                    <div className={rechargeBean.status == '去交费' ?
                        'recharge-item-amount-todo' :
                        'recharge-item-amount-done'}>{'￥:' + rechargeBean.amount}</div>
                    <div className={rechargeBean.status == '去交费' ?
                        'recharge-item-btn-todo' :
                        'recharge-item-btn-done'}>{rechargeBean.status}</div>
                </div>
            </div>
        )
    }
}
