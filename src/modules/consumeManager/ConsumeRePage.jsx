import React, {Component} from 'react';
import ConsumeBean from 'model/ConsumeBean';
import {List, Skeleton} from 'antd';
import ConsumeReItem from "../../components/ConsumeReItem";
import 'css/consume-re.css';
import {isObjEmpty} from "../../utils/common";
import {Toast} from "antd-mobile";
import InfiniteScroll from "react-infinite-scroller";
import LoadingMore from 'components/LoadingMore'
export default class ConsumeRePage extends Component {

    constructor() {
        super()

        this.state = {
            consumeList: [],
            typeTitle: '',
            hasMoreData: true,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '消费记录'
        Toast.loading('努力加载中...', 0)
        for (let i = 0; i < 20; i++) {
            let consumeBean = new ConsumeBean()
            consumeBean.chargeName = '线上充值'+i
            consumeBean.chargeTime = '2018-08-01 12:20:23'+i*i
            consumeBean.chargeAmount = '+200000'+i

            this.state.consumeList.push(consumeBean)
        }

        this.setState({
            consumeList: this.state.consumeList
        })
    }

    render() {
        const {consumeList, typeTitle,hasMoreData, isLoading} = this.state

        return (
            <div className='consume-select-root'>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'consume-list-header'}>{typeTitle}</div>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'gray-line'}></div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadReleaseList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                <List className='phones-list-layout' dataSource={consumeList} renderItem={consumeBean => (
                    <List.Item>
                        <ConsumeReItem consumeBean={consumeBean}/>
                    </List.Item>
                    )}/>
                    </Skeleton>
                </InfiniteScroll>
            </div>
        )
    }}