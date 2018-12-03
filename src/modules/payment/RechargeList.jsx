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

            let rechargeBean = new RechargeBean()
            rechargeBean.type = '学费'
            rechargeBean.name = '李泞'
            rechargeBean.endTime = '2018-20-20  12:00'
            rechargeBean.remarks = '三年级上学期学费'
            rechargeBean.amount = '1000.00'
            rechargeBean.status = '去交费'
            rechargeList.push(rechargeBean)


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