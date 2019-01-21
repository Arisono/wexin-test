/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 会议签到
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MeetingSignItem from 'components/MeetingSignItem'
import MeetingBean from "model/MeetingBean";
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {List, Icon, Skeleton} from 'antd'
import RefreshLayout from "../../components/RefreshLayout";
import {connect} from 'react-redux'
import {saveListState} from "../../redux/actions/listState";

const mPageSize = 10
let mPageIndex = 0

class MeetingSignIn extends Component {

    constructor() {
        super()

        this.state = {
            meetingSignList: [],
            isRefreshing: false,
            isLoading: true
        }
    }

    componentDidMount() {
        document.title = '会议管理'
        console.log('listState', this.props.listState)
        if (this.props.listState && !isObjEmpty(this.props.listState.listData)) {
            this.setState({
                meetingSignList: this.props.listState.listData,
                isLoading: false,
            }, () => {
                ReactDOM.findDOMNode(this.container).scrollTop = this.props.listState.scrollTop
            })
            mPageIndex = this.props.listState.pageIndex
        } else {
            Toast.loading('数据加载中...', 0)
            mPageIndex = 0
            this.loadMeetList()
        }
    }

    render() {
        const {meetingSignList, isRefreshing, isLoading} = this.state

        return (
            <div className='recharge-page-layout' style={{background: '#F2F2F2'}}>
                <RefreshLayout
                    refreshing={isRefreshing}
                    ref={el => {
                        this.container = el
                    }}
                    onRefresh={this.loadMeetList}>
                    <Skeleton loading={isLoading} active paragraph={{rows: 3}}>
                        <List dataSource={meetingSignList}
                              renderItem={(item, index) => (
                                  <MeetingSignItem
                                      meetingBean={item}
                                      index={index}
                                      onMeetingSign={this.onMeetingSign.bind(this)}
                                      onItemClick={this.onItemClick.bind(this)}/>
                              )}/>
                    </Skeleton>
                </RefreshLayout>
                <Icon type="plus-circle" theme='filled' className='common-add-icon'
                      onClick={this.onAddMeet}/>
            </div>
        )
    }

    loadMeetList = () => {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }

        mPageIndex++
        console.log(mPageIndex)

        const {meetingSignList} = this.state
        if (mPageIndex === 1) {
            meetingSignList.length = 0
        }

        fetchPost(API.meetingList, {
            teacherId: this.props.userInfo.userId,
            // meetingStatus: 1,
            pageIndex: mPageIndex,
            pageSize: mPageSize
        }).then(response => {
            Toast.hide()
            if (isObjEmpty(response, response.data, response.data.notify)) {
                if (mPageIndex > 1) {
                    mPageIndex--
                }
            } else {
                response.data.notify.forEach((item, index) => {
                    let meetBean = new MeetingBean()

                    meetBean.meetId = getIntValue(item, 'meetingId')
                    meetBean.title = getStrValue(item, 'meetingName')
                    meetBean.meetStatusCode = getIntValue(item, 'meetingStatus')
                    if (meetBean.meetStatusCode === 2) {
                        meetBean.meetStatus = '未开始'
                    } else if (meetBean.meetStatusCode === 3) {
                        meetBean.meetStatus = '进行中'
                    } else if (meetBean.meetStatusCode === 4) {
                        meetBean.meetStatus = '已结束'
                    }
                    meetBean.meetDetail = getStrValue(item, 'meetingDetails')
                    meetBean.createTime = getStrValue(item, 'createDate')
                    meetBean.startTime = getStrValue(item, 'startDate')
                    meetBean.endTime = getStrValue(item, 'endDate')
                    meetBean.remainTime = getStrValue(item, 'reminderDate')
                    meetBean.address = getStrValue(item, 'meetingAddress')
                    meetBean.sponsor = getStrValue(item, 'teacherName')
                    meetBean.sponsorId = getIntValue(item, 'meetingCreator')
                    meetBean.signStatusCode = getIntValue(item, 'meetingSign')
                    if (meetBean.signStatusCode === 1 || meetBean.signStatusCode === 2) { //3.已签到
                        meetBean.signStatus = '签到'
                    } else if (meetBean.signStatusCode === 3) {
                        meetBean.signStatus = '已签到'
                    }
                    meetBean.remarks = getStrValue(item, 'meetingRemarks')

                    meetingSignList.push(meetBean)

                })
            }

            this.setState({
                meetingSignList: meetingSignList,
                isRefreshing: false,
                isLoading: false
            })
        }).catch(error => {
            Toast.hide()

            if (mPageIndex > 1) {
                mPageIndex--
            }
            this.setState({
                isRefreshing: false,
                isLoading: false
            })

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常')
            }
        })
    }

    onMeetingSign = index => {
        const {meetingSignList} = this.state

        Toast.loading('', 0)
        console.log("teacherId:",this.props.userInfo.userId)
        console.log("meetingId:",meetingSignList[index].meetId)
        fetchPost(API.MEETING_SIGN, {
            teacherId: this.props.userInfo.userId,
            meetingId: meetingSignList[index].meetId,
        }).then(response => {
            Toast.hide()
            Toast.success('签到成功')
            meetingSignList[index].signStatus = '已签到'
            meetingSignList[index].signStatusCode = 5

            this.setState({meetingSignList})
        }).catch(error => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据请求异常')
            }
        })
    }

    onAddMeet = () => {
        console.log("onAddMeet")
        saveListState({
            scrollTop: ReactDOM.findDOMNode(this.container).scrollTop,
            listData: this.state.meetingSignList,
            pageIndex: mPageIndex,
        })()
        this.props.history.push('/sendMeetting')
    }

    onItemClick = index => {
        console.log('listState', ReactDOM.findDOMNode(this.container).scrollTop)
        saveListState({
            scrollTop: ReactDOM.findDOMNode(this.container).scrollTop,
            listData: this.state.meetingSignList,
            pageIndex: mPageIndex,
            itemIndex: index,
        })()

        const {meetingSignList} = this.state
        this.props.history.push('/meet-detail/' + meetingSignList[index].meetId)
    }
}

let mapStateToProps = (state) => ({
    listState: {...state.redListState},
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSignIn)

