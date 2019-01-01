/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 班级交费详情
 */

import React, {Component} from 'react'
import 'css/payment.css'
import PhonesItem from "../../components/PhonesItem";
import {List} from 'antd'
import {Toast, Modal} from 'antd-mobile'
import PhonesBean from 'model/PhonesBean'
import ClassRechargeBean from 'model/ClassRechargeBean'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {connect} from 'react-redux'
import {saveListState} from 'action/listState'

const {alert} = Modal

class ClassRechargeDetail extends Component {

    constructor() {
        super()

        this.state = {
            rechargeBean: new ClassRechargeBean(),
        }
    }

    componentWillMount() {
        this.payId = this.props.match.params.payId
    }

    componentDidMount() {
        document.title = '收费详情'

        Toast.loading('', 0)

        this.getPayDetail()
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {rechargeBean} = this.state

        const percapita = rechargeBean.percapita
        const totalPerson = rechargeBean.totalPerson.length
        const payedPerson = rechargeBean.paid.length
        const unpayPerson = rechargeBean.unPay
        let amount = 0
        try {
            amount = (percapita * totalPerson).toFixed(2)
        } catch (e) {
            amount = (percapita * totalPerson)
        }

        const phonesList = []
        if (unpayPerson && unpayPerson.length > 0) {
            unpayPerson.forEach((item, index) => {
                const phoneBean = new PhonesBean()

                phoneBean.icon = require('imgs/ic_head' + (index % 15 + 1) + '.png')
                phoneBean.claName = ''
                phoneBean.claId = ''
                phoneBean.name = getStrValue(item, 'stuName')
                phoneBean.phone = ''

                phonesList.push(phoneBean)
            })
        }

        return (
            <div className='class-page-layout'>
                <div style={{flex: '1'}}>
                    <div className='gray-line'></div>
                    <div className='class-recharge-detail-header'>
                        <div style={{flex: '1'}}>
                            <span className='class-recharge-detail-title'>{rechargeBean.title}</span>
                            <span className='class-recharge-detail-person'>({payedPerson}/{totalPerson}人)</span>
                        </div>
                        <span className={rechargeBean.statusCode === 4 ?
                            'class-recharge-detail-status-todo' : ''}>{rechargeBean.status}</span>
                    </div>
                    <div className='gray-line' style={{height: '1px'}}></div>
                    <div className='class-recharge-detail-content'>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>人均收费：</div>
                            <div className='class-recharge-detail-value'>{percapita}</div>
                        </div>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>截止日期：</div>
                            <div className='class-recharge-detail-value'>{rechargeBean.endTime}</div>
                        </div>
                        <div className='class-recharge-detail-line'>
                            <div className='class-recharge-detail-caption'>备注：</div>
                            <div className='class-recharge-detail-value'>{rechargeBean.remarks}</div>
                        </div>
                    </div>
                    <div className='class-recharge-detail-menu'>
                        <div className='class-recharge-detail-money'>￥{amount}</div>
                        {rechargeBean.statusCode === 4 ?
                            <div className='class-recharge-detail-stop'
                                 onClick={this.onEndPay}>停止收款
                            </div> : ''}

                    </div>
                    <div className='gray-line'></div>
                    <div className='class-recharge-detail-not'>未付款{totalPerson - payedPerson}人</div>
                    <div className='gray-line' style={{height: '1px'}}></div>
                </div>

                <List className='no-list-layout'
                      dataSource={phonesList}
                      renderItem={phonesBean => (
                          <List.Item>
                              <PhonesItem phonesBean={phonesBean}/>
                          </List.Item>
                      )}/>
            </div>
        )
    }

    getPayDetail = () => {
        fetchGet(API.PAYMENT_PAYMENT_DETAIL, {
            payId: this.payId
        }).then(response => {
            Toast.hide()

            if (response && response.data) {
                const {rechargeBean} = this.state
                let dataObject = response.data

                rechargeBean.payId = getIntValue(dataObject, 'payId')
                rechargeBean.title = getStrValue(dataObject, 'payName')
                rechargeBean.statusCode = getIntValue(dataObject, 'payStatus')
                if (rechargeBean.statusCode === 1) {
                    rechargeBean.status = '草稿'
                } else if (rechargeBean.statusCode === 2) {
                    rechargeBean.status = '已发布'
                } else if (rechargeBean.statusCode === 3) {
                    rechargeBean.status = '已结束'
                } else if (rechargeBean.statusCode === 4) {
                    rechargeBean.status = '收款中'
                } else if (rechargeBean.statusCode === 5) {
                    rechargeBean.status = '已支付'
                } else if (rechargeBean.statusCode === 6) {
                    rechargeBean.status = '已退款'
                } else if (rechargeBean.statusCode === 7) {
                    rechargeBean.status = '已收款'
                }

                rechargeBean.percapita = getIntValue(dataObject, 'payTotal')
                rechargeBean.endTime = getStrValue(dataObject, 'payEndDate')
                rechargeBean.remarks = getStrValue(dataObject, 'payRemarks')
                if (dataObject.userPayments) {
                    let userPay = dataObject.userPayments.userPay || []
                    let userUnPay = dataObject.userPayments.userUnPay || []
                    rechargeBean.totalPerson = userPay.concat(userUnPay)
                    rechargeBean.paid = userPay
                    rechargeBean.unPay = userUnPay

                    try {
                        rechargeBean.money = (getIntValue(dataObject, 'payTotal') * (rechargeBean.totalPerson.length)).toFixed(2)
                    } catch (e) {
                        rechargeBean.money = getIntValue(dataObject, 'payTotal') * (rechargeBean.totalPerson.length)
                    }
                }

                if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
                    if (this.props.listState.itemIndex >= 0) {
                        this.props.listState.listData[this.props.listState.itemIndex] = rechargeBean
                    }
                }
                saveListState({
                    listData: this.props.listState.listData,
                })()

                this.setState({rechargeBean})
            }
        }).catch(error => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常', 2)
            }
        })
    }

    onEndPay = () => {
        alert('提示', '确定结束此收费流程吗？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    Toast.loading('正在停止...', 0)
                    fetchGet(API.PAYMENT_ENTPAY, {
                        userId: this.props.userInfo.userId,
                        payId: this.payId
                    }).then(response => {
                        Toast.success(response.data)
                        this.state.rechargeBean.statusCode = 3
                        this.state.rechargeBean.status = '已结束'

                        this.setState({
                            rechargeBean: this.state.rechargeBean
                        })
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
        ])

    }
}

let mapStateToProps = (state) => ({
    listState: {...state.redListState},
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ClassRechargeDetail)
