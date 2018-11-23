/**
 * Created by RaoMeng on 2018/11/23
 * Desc: 班级交费列表
 */

import React, {Component} from 'react'
import 'css/payment.css'
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import ClassRechargeItem from 'components/ClassRechargeItem'
import ClassRechargeBean from 'model/ClassRechargeBean'

export default class ClassRechargeList extends Component {

    constructor() {
        super()

        this.state = {
            rechargeList: [],
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '班级收费'

        Toast.loading('努力加载中...', 0)
    }

    componentWillUnmount() {

    }

    render() {
        const {rechargeList, hasMoreData, isLoading} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2', padding: '0 10px'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadRechargeList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={rechargeList}
                              renderItem={(item, index) => (
                                  <ClassRechargeItem
                                      classRecharge={item}
                                      onItemClick={this.onItemClick.bind(this)}
                                      index={index}/>
                              )}/>
                    </Skeleton>
                </InfiniteScroll>

                <Icon type="plus-circle" theme='filled' className='common-add-icon'
                      onClick={this.onAddRecharge}/>
            </div>
        )
    }

    loadRechargeList = () => {
        setTimeout(() => {
            Toast.hide()
            const {rechargeList} = this.state
            for (let i = 0; i < 10; i++) {
                let rechargeBean = new ClassRechargeBean()
                if (i % 2 == 0) {
                    rechargeBean.title = '学费'
                    rechargeBean.status = '收款中'
                    rechargeBean.percapita = '200'
                    rechargeBean.endTime = '2018-08-20 12:00'
                    rechargeBean.remarks = '上交学费'
                    rechargeBean.money = '10000.00'
                    rechargeBean.totalPerson = 50
                    rechargeBean.paid = 25
                } else {
                    rechargeBean.title = '学费'
                    rechargeBean.status = '已收款'
                    rechargeBean.percapita = '1000'
                    rechargeBean.endTime = '2018-08-20 12:00'
                    rechargeBean.remarks = '上交学费'
                    rechargeBean.money = '40000.00'
                    rechargeBean.totalPerson = 40
                    rechargeBean.paid = 32
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

    onItemClick = index => {
        this.props.history.push('/classRechargeDetail')
    }
}
