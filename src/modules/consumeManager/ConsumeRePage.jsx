import React, {Component} from 'react';
import ConsumeBean from 'model/ConsumeBean';
import {List, Skeleton} from 'antd';
import ConsumeReItem from "../../components/ConsumeReItem";
import 'css/consume-re.css';
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {Toast} from "antd-mobile";
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import RefreshLayout from "../../components/RefreshLayout";

const mPageSize = 10
let mPageIndex = 0

export default class ConsumeRePage extends Component {

    constructor() {
        super()

        this.state = {
            consumeList: [],
            typeTitle: '',
            isLoading: true,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        if (this.props.match.params.type) {
            this.type = this.props.match.params.type
        }
        if (this.props.match.params.cardId) {
            this.cardId = this.props.match.params.cardId
        }

        if (this.type == 1) {
            document.title = '充值记录'
        } else {
            document.title = '消费记录'
        }

        Toast.loading('努力加载中...', 0)
        mPageIndex = 0
        this.loadReleaseList()
    }

    componentWillUnmount() {
        Toast.hide();
    }

    loadReleaseList = () => {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }

        mPageIndex = mPageIndex + 1;
        console.log(mPageIndex)
        const {consumeList} = this.state;
        if (mPageIndex == 1) {
            consumeList.length = 0
        }

        fetchGet(API.CONSUME_RECODE, {
            cardId: this.cardId,
            rankStatus: this.type,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide()
            if (response && response.data && response.data.length > 0) {
                response.data.forEach((item, index) => {
                    let consumeBean = new ConsumeBean()

                    consumeBean.chargeId = getIntValue(item, 'rankId')
                    consumeBean.chargeName = getStrValue(item, 'rankName')
                    consumeBean.chargeTime = getStrValue(item, 'rankDate')
                    consumeBean.chargeAmount = getStrValue(item, 'rankTatal')
                    consumeBean.chargeStatus = getIntValue(item, 'rankStatus')

                    this.state.consumeList.push(consumeBean)
                })
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                consumeList,
                isLoading: false,
                isRefreshing: false,
            })
        }).catch(error => {
            Toast.hide();

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isRefreshing: false,
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常')
            }
        })
    }


    render() {
        const {consumeList, typeTitle, isLoading, isRefreshing} = this.state

        return (
            <div className='consume-select-root'>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'consume-list-header'}>{typeTitle}</div>
                <div className={isObjEmpty(typeTitle) ? 'displayNone' : 'gray-line'}></div>

                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadReleaseList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List className='phones-list-layout' dataSource={consumeList}
                              renderItem={consumeBean => (
                                  <List.Item>
                                      <ConsumeReItem consumeBean={consumeBean}/>
                                  </List.Item>
                              )}/>
                    </Skeleton>
                </RefreshLayout>
            </div>
        )
    }
}