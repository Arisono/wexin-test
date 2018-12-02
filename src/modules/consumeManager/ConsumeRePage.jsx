import React, {Component} from 'react';
import ConsumeBean from 'model/ConsumeBean';
import {List, Skeleton} from 'antd';
import ConsumeReItem from "../../components/ConsumeReItem";
import 'css/consume-re.css';
import {isObjEmpty} from "../../utils/common";
import {Toast} from "antd-mobile";
import InfiniteScroll from "react-infinite-scroller";
import LoadingMore from 'components/LoadingMore'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";


let ttype = 1
const mPageSize = 10
var mPageIndex = 0

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

        if (this.props.match.params.type) {

            ttype = this.props.match.params.type

        }

        if (ttype == 1) {
            console.log(this.props.match.params.type)
            document.title = '消费记录'

        } else {
            console.log(this.props.match.params.type)
            document.title = '充值记录'

        }

        Toast.loading('努力加载中...', 0)

    }

    componentWillUnmount() {
        Toast.hide();
    }

    loadReleaseList = () => {

        const {consumeList} = this.state;
        mPageIndex = mPageIndex + 1;

        fetchGet(API.rechargeRecord, {
            stuId: 10000,
            rankStatus: ttype,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {

            console.log(response);

            response.data.map((item, index) => {
                let consumeBean = new ConsumeBean()
                consumeBean.chargeName = item.rankName
                consumeBean.chargeTime = item.rankDate
                consumeBean.chargeAmount = item.rankTatal
                this.state.consumeList.push(consumeBean)
            })

            this.setState({
                consumeList,
                isLoading: false,
                hasMoreData: false

            })

            Toast.hide();
        }).catch(error => {
            Toast.hide();
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            }
        })

    }


    render() {

        const {consumeList, typeTitle, hasMoreData, isLoading} = this.state

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
    }
}