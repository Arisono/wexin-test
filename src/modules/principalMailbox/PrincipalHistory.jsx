/**
 * Created by RaoMeng on 2018/11/14
 * Desc: 投递记录
 */

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {List, Skeleton} from 'antd'
import PrincipalItem from 'components/PrincipalItem'
import {fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import RefreshLayout from "../../components/RefreshLayout";
import {isObjEmpty} from "../../utils/common";

const mPageSize = 10
let mPageIndex = 0
export default class PrincipalHistory extends Component {

    constructor() {
        super()

        this.state = {
            principalList: [],
            isRefreshing: false,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '历史投递'

        Toast.loading('努力加载中...', 0)
        mPageIndex = 0
        this.loadPrincipalList()
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {principalList, isLoading, isRefreshing} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>

                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadPrincipalList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List
                            dataSource={principalList}
                            renderItem={(item, index) => (
                                <PrincipalItem
                                    principalBean={item}
                                    deleteItem={this.onDeleteItem}
                                    index={index}/>
                            )}/>
                    </Skeleton>
                </RefreshLayout>
            </div>
        )
    }

    loadPrincipalList = () => {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }

        mPageIndex++
        console.log(mPageIndex)
        const {principalList} = this.state
        if (mPageIndex === 1) {
            principalList.length = 0
        }

        fetchPost(API.GET_MEETING_LIST, {
            userId: 10001,
            notifyType: 5,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide()

            if (isObjEmpty(response, response.data, response.creat)) {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            } else {
                response.data.creat.map((item, index) => {
                    let rechargeBean = {}

                    rechargeBean.time = item.creatDate
                    if (item.isRead == 1) {
                        rechargeBean.status = '已查阅'
                    } else {
                        rechargeBean.status = '未查阅'
                    }
                    rechargeBean.suggest = item.notifyDetails
                    rechargeBean.enclosure = item.notifyFiles


                    if (item.leaveMessages.length > 0) {
                        rechargeBean.reply = item.leaveMessages[0].messContent
                    }

                    principalList.push(rechargeBean)
                })
            }

            this.setState({
                principalList,
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
                isRefreshing: false,
            })

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常')
            }
        })

    }

    onDeleteItem = index => {
        const {principalList} = this.state
        principalList.splice(index, 1)
        this.setState({principalList})
        Toast.success('删除成功', 2)
    }
}