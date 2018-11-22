/**
 * Created by RaoMeng on 2018/11/11
 * Desc: 使用帮助
 */

import React, {Component} from 'react'
import {Skeleton, List} from 'antd'
import {Toast} from 'antd-mobile'
import UseHelpItem from 'components/UseHelpItem'
import {fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'

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

    loadHelpList = () => {
        fetchPost(API.GET_MEETING_LIST, {
            userId: 10000,
            notifyType: 2,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
        }).catch(error => {
        })


        const {helpList} = this.state
        setTimeout(() => {
            Toast.hide()
            for (let i = 0; i < 8; i++) {
                helpList.push({
                    title: '如何开通智慧校园？',
                    content: '如果您是孩子家长，请向您孩子老师开通开通账号。如果您是任课老师，请向智慧校园系统管理员咨询开通'
                })
            }
            this.setState({
                helpList: helpList,
                isLoading: false
            })
        }, 2000)
    }
}