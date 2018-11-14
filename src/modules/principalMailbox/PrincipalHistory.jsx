/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 投递记录
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import PrincipalItem from 'components/PrincipalItem'

export default class PrincipalHistory extends Component {

    constructor() {
        super()

        this.state = {
            principalList: [],
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '历史投递'
        Toast.loading('努力加载中...', 0)
    }

    componentWillUnmount() {

    }

    render() {
        const {principalList, hasMoreData, isLoading} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadPrincipalList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={principalList}
                              renderItem={(item, index) => (
                                  <PrincipalItem principalBean={item}/>
                              )}/>
                    </Skeleton>
                </InfiniteScroll>
            </div>
        )
    }

    loadPrincipalList = () => {
        setTimeout(() => {
            Toast.hide()
            const {principalList} = this.state
            for (let i = 0; i < 10; i++) {
                let rechargeBean = {}
                if (i % 2 == 0) {
                    rechargeBean.time = '2018-10-28 13:22:21'
                    rechargeBean.status = '已查阅'
                    rechargeBean.suggest = '张校长您好！我是二年级三班陈小龙的家长，我孩子的数学成绩最近下降好多，我了解的原因是我孩子的任何数学任何老师换了位新的老师。孩子反应不能适应新的数学老师的上课方式，恳请换回来之前的那位老师！ 谢谢'
                } else {
                    rechargeBean.time = '2018-02-11 23:12:24'
                    rechargeBean.status = '未查阅'
                    rechargeBean.suggest = '张校长您好！我是二年级三班陈小龙的家长，我孩子的数学成绩最近下降好多，我了解的原因是我孩子的任何数学任何老师换了位新的老师。孩子反应不能适应新的数学老师的上课方式，恳请换回来之前的那位老师！ 谢谢'
                }
                principalList.push(rechargeBean)
            }

            this.setState({
                principalList,
                isLoading: false
            })
        }, 1500)
    }
}