/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 充值交费列表家长端
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {List, Skeleton} from 'antd'
import RechargeBean from 'model/RechargeBean'
import RechargeItem from 'components/RechargeItem'
import RefreshLayout from '../../components/RefreshLayout'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {getIntValue, getStrValue} from "../../utils/common";

const mPageSize = 10
let mPageIndex = 0
export default class RechargeList extends Component {

    constructor() {
        super()

        this.state = {
            rechargeList: [],
            isLoading: true,
            isRefreshing: true
        }
    }

    componentDidMount() {
        document.title = '收费通知'

        mPageIndex = 0
        Toast.loading('努力加载中...', 0)
        this.loadRechargeList()
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {rechargeList, isLoading, isRefreshing} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadRechargeList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={rechargeList}
                              renderItem={(item, index) => (
                                  <RechargeItem rechargeBean={item}/>
                              )}/>
                    </Skeleton>
                </RefreshLayout>
            </div>
        )
    }

    loadRechargeList = () => {
        mPageIndex++
        console.log(mPageIndex)
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {

        }

        const {rechargeList} = this.state
        if (mPageIndex === 1) {
            rechargeList.length = 0
        }

        fetchGet(API.PAYMENT_PAYMENTLIST, {
            stuId: 10001,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide()

            if (response && response.data && response.data.length > 0) {
                let dataArray = response.data
                for (let i = 0; i < dataArray.length; i++) {
                    let dataObject = dataArray[i]
                    if (dataObject) {
                        let rechargeBean = new RechargeBean()
                        rechargeBean.payId = getIntValue(dataObject, 'payId')
                        rechargeBean.payName = getStrValue(dataObject, 'payName')
                        rechargeBean.userName = getStrValue(dataObject, 'userName')
                        rechargeBean.endTime = getStrValue(dataObject, 'payEndDate')
                        rechargeBean.remarks = getStrValue(dataObject, 'payRemarks')
                        rechargeBean.amount = getStrValue(dataObject, 'payTotal')
                        rechargeBean.statusCode = getStrValue(dataObject, 'payStatus')
                        if (rechargeBean.statusCode === 3) {
                            rechargeBean.status = '已结束'
                        } else if (rechargeBean.statusCode === 4) {
                            rechargeBean.status = '去交费'
                        } else if (rechargeBean.statusCode === 5) {
                            rechargeBean.status = '已支付'
                        } else if (rechargeBean.statusCode === 6) {
                            rechargeBean.status = '已退款'
                        }

                        rechargeList.push(rechargeBean)
                    }
                }
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                rechargeList,
                isLoading: false,
                isRefreshing: false
            })
        }).catch(error => {
            Toast.hide()

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isLoading: false,
                isRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常', 2)
            }
        })

    }

}