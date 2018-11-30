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
import {getStrValue, isObjEmpty} from "../../utils/common";

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

    loadSystemList = (index) => {
        if (!this.dataLoading) {
            const {systemMsgs} = this.state

            fetchGet(API.SYSTEM_MESSAGE, {
                notifyType: 1,
                pageIndex: index,
                pageSize: mPageSize
            }).then(response => {
                Toast.hide()
                this.dataLoading = false

                if (response) {
                    let dataArray = response.data
                    if (!isObjEmpty(dataArray) && dataArray != []) {
                        dataArray.forEach((dataObject, index) => {
                            systemMsgs.push({
                                time: getStrValue(dataObject, 'creat_date'),
                                content: getStrValue(dataObject, 'notify_details')
                            })
                        })
                    } else {
                        this.setState({
                            hasMoreData: false
                        })
                    }
                }

                this.setState({
                    systemMsgs,
                    isLoading: false
                })
            }).catch(error => {
                Toast.hide()
                this.dataLoading = false
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                }

                this.setState({
                    systemMsgs,
                    isLoading: false
                })
            })
        }
    }
}