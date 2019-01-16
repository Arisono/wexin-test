/**
 * Created by RaoMeng on 2019/1/14
 * Desc: 作业列表
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {saveListState} from 'action/listState'
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import RefreshLayout from "../../components/RefreshLayout";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import HomeWorkItem from 'components/HomeWorkItem'
import {clearListState} from "../../redux/actions/listState";

const mPageSize = 10
let mPageIndex = 0

class HomeWorkList extends Component {

    constructor() {
        super()

        this.state = {
            workList: [],
            isLoading: true,
            isRefreshing: false,
        }
    }

    componentWillMount() {
        this.role = this.props.match.params.role
        if ("teacher" == this.role) {
            document.title = "作业发布";
        } else {
            document.title = "作业通知";
        }
    }

    componentDidMount() {

        if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
            this.setState({
                workList: this.props.listState.listData,
                isLoading: false,
            }, () => {
                ReactDOM.findDOMNode(this.container).scrollTop = this.props.listState.scrollTop
            })
            mPageIndex = this.props.listState.pageIndex
        } else {
            Toast.loading('努力加载中...', 1)
            mPageIndex = 0
            this.loadWorkList()
        }
    }

    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        const {workList, isLoading, isRefreshing} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <RefreshLayout
                    refreshing={isRefreshing}
                    ref={el => {
                        this.container = el
                    }}
                    onRefresh={this.loadWorkList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={workList}
                              renderItem={(item, index) => (
                                  <HomeWorkItem
                                      homeWork={item}
                                      onItemClick={this.onItemClick.bind(this)}
                                      index={index}/>
                              )}/>
                    </Skeleton>
                </RefreshLayout>

                {this.role === "teacher" ? <Icon type="plus-circle" theme='filled' className='common-add-icon'
                                                 onClick={this.onAddHomeWork}/> : ""}
            </div>
        )
    }

    loadWorkList = () => {
        mPageIndex++
        console.log(mPageIndex)
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }
        const {workList} = this.state
        if (mPageIndex === 1) {
            workList.length = 0
        }

        fetchPost(API.homeWorkList, {
            userId: this.props.userInfo.userId,
            pageIndex: mPageIndex,
            pageSize: mPageSize,
            notifyType: '3',
        }).then((response) => {
            Toast.hide()

            if (response && response.data) {
                let listData
                if ("teacher" == this.role) {
                    listData = response.data.creat
                } else {
                    listData = response.data.notify
                }
                if (listData && listData.length > 0) {
                    for (let i = 0; i < listData.length; i++) {
                        let dataObject = listData[i]
                        if (dataObject) {
                            let workBean = {}

                            workBean.notifyId = getIntValue(dataObject, 'notifyId')
                            workBean.notifyName = getStrValue(dataObject, 'notifyName')
                            workBean.notifyType = getIntValue(dataObject, 'notifyType')
                            workBean.notifyDetails = getIntValue(dataObject, 'notifyDetails')
                            workBean.notifyCreatorName = getStrValue(dataObject, 'notifyCreatorName')

                            workBean.isRead = getIntValue(dataObject, 'isRead')
                            if ("teacher" == this.role) {
                                workBean.readStatus = ''
                            } else if (workBean.isRead === 1) {
                                workBean.readStatus = '未读'
                            } else {
                                workBean.readStatus = '已读'
                            }
                            workBean.endDate = getStrValue(dataObject, 'endDate')
                            workBean.creatDate = getStrValue(dataObject, 'creatDate')

                            workList.push(workBean)
                        }
                    }
                } else {
                    if (mPageIndex > 1) {
                        mPageIndex--
                    }
                }
            } else {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            }

            this.setState({
                workList,
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

    onItemClick = (index, notifyId) => {
        const {workList} = this.state

        workList[index].isRead = 2
        if ("teacher" == this.role) {
            workList[index].readStatus = ''
        } else {
            workList[index].readStatus = '已读'
        }

        this.setState({workList})

        saveListState({
            scrollTop: ReactDOM.findDOMNode(this.container).scrollTop,
            listData: this.state.workList,
            pageIndex: mPageIndex,
            itemIndex: index,
        })()
        this.props.history.push('/assignmentDetail/' + this.role + '/' + notifyId)
    }

    onAddHomeWork = () => {
        clearListState()()
        this.props.history.push("/releaseAssignment");
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
    listState: {...state.redListState}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorkList)