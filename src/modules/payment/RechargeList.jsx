/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 充值缴费
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import RechargeBean from 'model/RechargeBean'
import RechargeItem from 'components/RechargeItem'

export default class RechargeList extends Component {

    constructor() {
        super()

        this.state = {
            rechargeList: [],
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '充值缴费'

        Toast.loading('努力加载中...', 0)
    }

    render() {
        const {rechargeList, hasMoreData, isLoading} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadRechargeList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={rechargeList}
                              renderItem={(item, index) => (
                                  <RechargeItem rechargeBean={item}/>
                              )}/>
                    </Skeleton>
                </InfiniteScroll>

                <Icon type="plus-circle" theme='filled' className='recharge-add-icon'
                      onClick={this.onAddRecharge}/>
            </div>
        )
    }

    loadRechargeList = () => {
        setTimeout(() => {
            Toast.hide()
            const {rechargeList} = this.state
            for (let i = 0; i < 10; i++) {
                let rechargeBean = new RechargeBean()
                if (i % 2 == 0) {
                    rechargeBean.type = '学费'
                    rechargeBean.name = '李泞'
                    rechargeBean.endTime = '2018-20-20  12:00'
                    rechargeBean.remarks = '三年级上学期学费'
                    rechargeBean.amount = '1000.00'
                    rechargeBean.status = '去交费'
                } else {
                    rechargeBean.type = '表演'
                    rechargeBean.name = '赖思睿'
                    rechargeBean.endTime = '2018-03-11  21:00'
                    rechargeBean.remarks = '服装费'
                    rechargeBean.amount = '1232.00'
                    rechargeBean.status = '已支付'
                }
                rechargeList.push(rechargeBean)
            }

            this.setState({
                rechargeList,
                isLoading: false
            })
        }, 1500)
    }

    onAddRecharge = () => {
        this.props.history.push('/rechargeRelease')
    }
}