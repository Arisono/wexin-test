/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 使用帮助
 */

import React, {Component} from 'react'
import {Skeleton, List} from 'antd'
import {Toast} from 'antd-mobile'
import UseHelpItem from 'components/UseHelpItem'
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'
import {getStrValue, isObjEmpty} from "../../utils/common";

const mPageSize = 10
let mPageIndex = 1

export default class UseHelp extends Component {

    constructor() {
        super()

        this.state = {
            helpList: [],
            isLoading: true,
            hasMoreData: true,
        }
    }

    componentDidMount() {
        document.title = '使用帮助'

        Toast.loading('数据加载中...', 0)
    }

    render() {
        const {helpList, isLoading, hasMoreData} = this.state
        return (
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadHelpList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={helpList} renderItem={
                            (item, index) => (
                                <UseHelpItem helpBean={item} index={index}/>
                            )
                        }/>
                    </Skeleton>
                </InfiniteScroll>
            </div>
        )
    }

    loadHelpList = (index) => {
        if (!this.dataLoading) {
            const {helpList} = this.state
            this.dataLoading = true

            fetchGet(API.SYSTEM_MESSAGE, {
                notifyType: 2,
                pageIndex: index,
                pageSize: mPageSize
            }).then(response => {
                Toast.hide()
                this.dataLoading = false
                if (response) {
                    let dataArray = response.data
                    if (!isObjEmpty(dataArray) && dataArray != []) {
                        dataArray.forEach((dataObject, index) => {
                            helpList.push({
                                title: getStrValue(dataObject, 'notify_name'),
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
                    helpList: helpList,
                    isLoading: false,
                })
            }).catch(error => {
                Toast.hide()
                this.dataLoading = false
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                }

                this.setState({
                    helpList: helpList,
                    isLoading: false,
                    hasMoreData: false
                })
            })

        }
    }
}