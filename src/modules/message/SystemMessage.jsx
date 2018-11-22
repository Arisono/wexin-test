/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 系统消息
 */

import React, {Component} from 'react'
import {List, Icon, Skeleton} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import 'css/message.css'
import SystemMsgItem from 'components/SystemMsgItem'
import {Toast} from 'antd-mobile'
import LoadingMore from 'components/LoadingMore'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";

const mPageSize = 10
let mPageIndex = 1
export default class SystemMessage extends Component {

    constructor() {
        super()

        this.state = {
            systemMsgs: [],
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '系统消息'

        Toast.loading('努力加载中...', 0)
    }

    render() {
        const {systemMsgs, hasMoreData, isLoading} = this.state
        return (
            <div className='message-page-layout' style={{background: '#F2F2F2'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadSystemList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={systemMsgs}
                              renderItem={(item, index) => (
                                  <SystemMsgItem systemBean={item}/>
                              )}/>
                    </Skeleton>
                </InfiniteScroll>

            </div>
        )
    }

    loadSystemList = () => {
        setTimeout(() => {
            Toast.hide()
            const {systemMsgs} = this.state
            for (let i = 0; i < 10; i++) {
                let systemBean = {}
                if (i % 2 == 0) {
                    systemBean.time = '2018-10-25 10:20'
                    systemBean.content = '智慧校园版本已更新至V2.0.1'
                } else {
                    systemBean.time = '2018-11-12 21:14'
                    systemBean.content = '最新的用户您好！最新系统升级，我们将在2018-10-28 停止系统服务，次日回复正常。给您带来不便我们深感歉意！'
                }
                systemMsgs.push(systemBean)
            }

            this.setState({
                systemMsgs,
                isLoading: false
            })

            fetchGet(API.SYSTEM_MESSAGE, {
                notifyType: 1,
                pageIndex: mPageIndex,
                pageSize: mPageSize
            }).then(response => {

            }).catch(error => {
                Toast.fail(error, 2)
            })
        }, 1500)
    }
}