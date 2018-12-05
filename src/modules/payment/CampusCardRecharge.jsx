/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 校园卡充值
 */

import React, {Component} from 'react'
import {Icon, Button} from 'antd'
import {Modal, Grid, InputItem, List, Toast} from 'antd-mobile'
import 'css/payment.css'
import {isObjEmpty} from "../../utils/common";
import {fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {regExpConfig} from "../../configs/regexp.config";

const moneyList = [
    '50元', '100元', '150元', '200元', '300元'
]

const amountList = [50, 100, 150, 200, 300]
let mAmount = 50

export default class CampusCardRecharge extends Component {

    constructor() {
        super()

        this.state = {
            student: '饶猛',
            cardNum: '20193839839',
            balance: '38.00',
            rechargeVisible: false,
            moneySelect: 0,
            money: '',
            moneyFocus: false
        }
    }

    componentDidMount() {
        document.title = '校园卡充值'
    }

    render() {
        const {student, cardNum, balance} = this.state
        const rechargeModal = this.getRechargeModal()

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
                <Button type="primary" className='campus-card-btn' onClick={this.onRechargeClick}>去充值</Button>
                <span className='common-record-text' onClick={this.rechargeRecord}>充值记录</span>
                {rechargeModal}
            </div>
        )
    }

    getRechargeModal = () => {
        const {moneySelect, money, moneyFocus} = this.state
        return (
            <Modal
                popup
                visible={this.state.rechargeVisible}
                onClose={this.onModalClose}
                animationType="slide-up">
                <div className='recharge-modal-layout'>
                    <div className='recharge-modal-title'>校园卡在线充值</div>
                    <div style={{margin: '10px 0'}}>
                        <Grid data={moneyList}
                              columnNum={3}
                              square={false}
                              hasLine={false}
                              activeStyle={false}
                              onClick={this.onMoneyItemClick}
                              renderItem={(dataItem, index) => (
                                  <div
                                      className={moneySelect == index ?
                                          'recharge-modal-amount-select' :
                                          'recharge-modal-amount-normal'}>
                                      {dataItem}
                                      <div
                                          className={moneySelect == index ? 'recharge-modal-money-mark' : 'displayNone'}>
                                      </div>
                                      <div
                                          className={moneySelect == index ? 'recharge-modal-money-mark-layout' : 'displayNone'}>
                                          <div className='recharge-modal-money-mark-text'>√</div>
                                      </div>

                                  </div>
                              )}
                        />
                    </div>
                    <div className='recharge-modal-amount-layout'>
                        <div className='recharge-modal-title-text'>自定义金额：</div>
                        <InputItem
                            className='recharge-modal-amount-input'
                            type='digit' clear
                            moneyKeyboardAlign='left'
                            extra='元'
                            onFocus={this.onMoneyFocus}
                            onBlur={this.onMoneyBlur}
                            value={money}
                            onChange={this.onMoneyChange}
                            placeholder='请输入金额'/>
                    </div>
                    <div style={{padding: moneyFocus ? '50px 24px' : '50px 24px'}}>
                        <Button type="primary" className='commonButton' style={{width: '100%'}}
                                onClick={this.onRechargeEvent}>确认充值</Button>
                    </div>
                </div>
            </Modal>
        )
    }

    onMoneyBlur = () => {
        this.setState({
            moneyFocus: false
        })
    }

    onMoneyFocus = () => {
        this.setState({
            moneyFocus: true
        })
    }

    onMoneyChange = (value) => {
        console.log(value)
        mAmount = value
        this.setState({
            money: value,
            moneySelect: -1
        })
    }

    onMoneyItemClick = (el, index) => {
        mAmount = amountList[index]
        this.setState({
            moneySelect: index,
            money: ''
        })
    }
    //消费记录
    expensesRecord = () => {
        this.props.history.push('/consumeRePage/1')
    }
    //充值记录
    rechargeRecord = () => {
        this.props.history.push('/consumeRePage/2')
    }

    onRechargeClick = () => {
        this.setState({
            rechargeVisible: true
        })
    }

    onModalClose = () => {
        this.setState({
            rechargeVisible: false
        })
    }

    onRechargeEvent = () => {
        console.log(mAmount)
        if (isObjEmpty(mAmount) || mAmount === 0) {
            Toast.fail('请选择或输入您要充值的正确金额')
            return
        }
        if (!regExpConfig.float.test(mAmount)) {
            Toast.fail('请输入正确的充值金额')
            return
        }

        Toast.loading('正在充值中...', 0)

        fetchPost(API.RECHARGE_FORCARD, {
            cardId: 10001,
            amount: mAmount
        }).then(response => {
            Toast.hide()

            Toast.success('充值成功')
        }).catch(error => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常', 2)
            }
        })
    }
}