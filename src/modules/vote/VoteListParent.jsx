/**
 * Created by RaoMeng on 2019/1/13
 * Desc: 投票助手家长端列表
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import RefreshLayout from "../../components/RefreshLayout";
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import {saveListState} from 'action/listState'
import VoteItem from 'components/VoteItem'
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";

const mPageSize = 10
let mPageIndex = 0

class VoteListParent extends Component {

    constructor() {
        super()

        this.state = {
            voteList: [],
            isLoading: true,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        document.title = '投票'

        if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
            this.setState({
                voteList: this.props.listState.listData,
                isLoading: false,
            }, () => {
                ReactDOM.findDOMNode(this.container).scrollTop = this.props.listState.scrollTop
            })
            mPageIndex = this.props.listState.pageIndex
        } else {
            Toast.loading('努力加载中...', 1)
            mPageIndex = 0
            this.loadVoteList()
        }
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {voteList, isLoading, isRefreshing} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <RefreshLayout
                    refreshing={isRefreshing}
                    ref={el => {
                        this.container = el
                    }}
                    onRefresh={this.loadVoteList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={voteList}
                              renderItem={(item, index) => (
                                  <VoteItem
                                      voteBean={item}
                                      onItemClick={this.onItemClick.bind(this)}
                                      index={index}/>
                              )}/>
                    </Skeleton>
                </RefreshLayout>
            </div>
        )
    }

    loadVoteList = () => {
        mPageIndex++
        console.log(mPageIndex)
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }
        const {voteList} = this.state
        if (mPageIndex === 1) {
            voteList.length = 0
        }

        fetchGet(API.voteList, {
            userId: this.props.userInfo.userId,
            pageIndex: mPageIndex,
            pageSize: mPageSize,
            voteType: '1',
        }).then((response) => {
            Toast.hide()

            if (response && response.data && response.data.length > 0) {
                let dataArray = response.data
                for (let i = 0; i < dataArray.length; i++) {
                    let dataObject = dataArray[i]
                    if (dataObject) {
                        let voteBean = {}

                        voteBean.voteId = getIntValue(dataObject, 'voteId')
                        voteBean.voteName = getStrValue(dataObject, 'voteName')
                        voteBean.voteType = getIntValue(dataObject, 'voteType')
                        voteBean.voteStatusCode = getIntValue(dataObject, 'voteStatus')
                        if (voteBean.voteStatusCode === 1) {
                            voteBean.voteStatus = '进行中'
                        } else {
                            voteBean.voteStatus = '已投票'
                        }
                        voteBean.creatDate = getStrValue(dataObject, 'creatDate')
                        voteBean.voteEndDate = getStrValue(dataObject, 'voteEndDate')
                        voteBean.voteRemarks = getStrValue(dataObject, 'voteRemarks')

                        const topics = getStrValue(dataObject, 'topics')
                        if (!isObjEmpty(topics)) {
                            voteBean.options = topics[0].options
                        }

                        voteList.push(voteBean)
                    }
                }
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                voteList,
                isLoading: false,
                isRefreshing: false,
            })
        }).catch((error) => {
            Toast.hide()

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isLoading: false,
                isRefreshing: false
            })
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常', 2)
            }
        })
    }

    onItemClick = (index, voteId) => {
        const {voteList} = this.state
        saveListState({
            scrollTop: ReactDOM.findDOMNode(this.container).scrollTop,
            listData: voteList,
            pageIndex: mPageIndex,
            itemIndex: index,
        })()
        this.props.history.push('/voteDetail/' + voteId)
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    listState: {...state.redListState}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VoteListParent)
