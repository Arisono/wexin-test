/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 班级交费item
 */

import React, {Component} from 'react'
import 'css/payment.css'

export default class ClassRechargeItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        const {classRecharge} = this.props
        return (
            <div className='class-recharge-item-root' onClick={this.onItemClick}>
                <div className='class-recharge-detail-header'>
                    <div style={{flex: '1'}}>
                        <span className='class-recharge-detail-title'>{classRecharge.title}</span>
                        <span
                            className='class-recharge-detail-person'>({classRecharge.paid.length + '/'
                        + classRecharge.totalPerson.length}人)</span>
                    </div>
                    <span className={classRecharge.statusCode === 2 ?
                        'class-recharge-detail-status-todo' :
                        'class-recharge-detail-status-done'}>{classRecharge.status}</span>
                </div>
                <div className='gray-line' style={{height: '1px'}}></div>
                <div className='class-recharge-detail-content'>
                    <div className='class-recharge-detail-line'>
                        <div className='class-recharge-detail-caption'>人均收费：</div>
                        <div className='class-recharge-detail-value'>{classRecharge.percapita}</div>
                    </div>
                    <div className='class-recharge-detail-line'>
                        <div className='class-recharge-detail-caption'>截止日期：</div>
                        <div className='class-recharge-detail-value'>{classRecharge.endTime}</div>
                    </div>
                    <div className='class-recharge-detail-line'>
                        <div className='class-recharge-detail-caption'>备注：</div>
                        <div className='class-recharge-detail-value'>{classRecharge.remarks}</div>
                    </div>
                </div>
                <div className='class-recharge-detail-menu'>
                    <div className='class-recharge-detail-money'>￥{classRecharge.money}</div>
                    {/*<div className='class-recharge-detail-stop'>停止收款</div>*/}
                </div>
            </div>
        )
    }

    onItemClick = () => {
        this.props.onItemClick(this.props.index)
    }
}