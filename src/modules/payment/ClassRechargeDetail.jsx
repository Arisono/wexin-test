/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 班级交费详情
 */

import React, {Component} from 'react'
import 'css/payment.css'
import PhonesItem from "../../components/PhonesItem";
import {List} from 'antd'
import PhonesBean from 'model/PhonesBean'

export default class ClassRechargeDetail extends Component {

    constructor() {
        super()

        this.state = {
            phonesList: [],
        }
    }

    componentDidMount() {
        document.title = ''

        for (let i = 0; i < 3; i++) {
            let phoneBean = new PhonesBean()
            phoneBean.name = '李泞家长'
            phoneBean.phone = '13632423333'
            phoneBean.claName = ""
            phoneBean.children = [
                '李泞'
            ]

            this.state.phonesList.push(phoneBean)
        }

        this.setState({
            phonesList: this.state.phonesList
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='class-page-layout'>
                <div style={{flex:'1'}}>
                    <div className='gray-line'></div>
                    <div className='class-recharge-detail-header'>
                        <div style={{flex:'1'}}>
                            <span className='class-recharge-detail-title'>学费</span>
                            <span className='class-recharge-detail-person'>(40/43人)</span>
                        </div>
                        <span className='class-recharge-detail-status-todo'>收款中</span>
                    </div>
                    <div className='gray-line' style={{height: '1px'}}></div>
                    <div className='class-recharge-detail-content'>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>人均收费：</div>
                            <div className='class-recharge-detail-value'>1000</div>
                        </div>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>截止日期：</div>
                            <div className='class-recharge-detail-value'>2018-20-20  12:00</div>
                        </div>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>备注：</div>
                            <div className='class-recharge-detail-value'>学费</div>
                        </div>
                    </div>
                    <div className='class-recharge-detail-menu'>
                        <div className='class-recharge-detail-money'>￥4000.00</div>
                        <div className='class-recharge-detail-stop'>停止收款</div>
                    </div>
                    <div className='gray-line'></div>
                    <div className='class-recharge-detail-not'>未付款3人</div>
                    <div className='gray-line' style={{height: '1px'}}></div>
                </div>

                <List className='no-list-layout'
                      dataSource={this.state.phonesList}
                      renderItem={phonesBean => (
                          <List.Item>
                              <PhonesItem phonesBean={phonesBean}/>
                          </List.Item>
                      )}/>
            </div>
        )
    }
}
