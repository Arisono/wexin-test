/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 会议签到
 */

import React, {Component} from 'react'
import MeetingSignItem from 'components/MeetingSignItem'
import MeetingBean from "model/MeetingBean";
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {Icon} from 'antd'
import RefreshLayout from "../../components/RefreshLayout";
import {connect} from 'react-redux'

const mPageSize = 10
let mPageIndex = 0

class MeetingSignIn extends Component {

    constructor() {
        super()

        this.state = {
            meetingSignList: [],
            isRefreshing: false,
        }
    }

    componentDidMount() {
        document.title = '会议签到'

        Toast.loading('数据加载中...', 0)

        mPageIndex = 0
        this.loadMeetList()
    }

    render() {
        const {meetingSignList, isRefreshing} = this.state

        let meetingItems = []
        if (meetingSignList.length > 0) {
            for (let i = 0; i < meetingSignList.length; i++) {
                let meetingSignBean = meetingSignList[i];
                if (!isObjEmpty(meetingSignBean)) {
                    meetingItems.push(<MeetingSignItem
                        meetingBean={meetingSignBean}
                        index={i}
                        onMeetingSign={this.onMeetingSign.bind(this)}
                        onItemClick={this.onItemClick.bind(this)}/>)
                }
            }
        } else {
            meetingItems = <div className='common-column-layout' style={{height:'100vh',alignItems:'center',justifyContent:'center'}}>
                会议列表为空
            </div>
        }

        return (
            <div style={{background: '#F2F2F2'}}>
                <RefreshLayout
                    refreshing={isRefreshing}
                    onRefresh={this.loadMeetList}>
                    {meetingItems}
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

        fetchPost(API.GET_MEETING_LIST, {
            userId: 10008,
            notifyType: 6,
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

                    meetBean.meetId = getIntValue(item, 'notifyId')
                    meetBean.title = getStrValue(item, 'notifyName')
                    meetBean.meetStatusCode = getIntValue(item, 'notifyStatus')
                    if (meetBean.meetStatusCode === 2) {
                        meetBean.meetStatus = '未开始'
                    } else if (meetBean.meetStatusCode === 3) {
                        meetBean.meetStatus = '进行中'
                    } else if (meetBean.meetStatusCode === 4) {
                        meetBean.meetStatus = '已结束'
                    }
                    meetBean.meetDetail = getStrValue(item, 'notifyDetails')
                    meetBean.createTime = getStrValue(item, 'creatDate')
                    meetBean.startTime = getStrValue(item, 'startDate')
                    meetBean.endTime = getStrValue(item, 'endDate')
                    meetBean.remainTime = getStrValue(item, 'reminderDate')
                    meetBean.address = getStrValue(item, 'notifyAddress')
                    meetBean.sponsor = getStrValue(item, 'notifyCreatorName')
                    meetBean.sponsorId = getIntValue(item, 'notifyCreator')
                    meetBean.signStatusCode = getIntValue(item, 'signStatus')
                    if (meetBean.signStatusCode === 1) {
                        meetBean.signStatus = '签到'
                    } else if (meetBean.signStatusCode === 2) {
                        meetBean.signStatus = '已签到'
                    } else {
                        meetBean.signStatusCode = 1
                        meetBean.signStatus = '签到'
                    }
                    meetBean.remarks = getStrValue(item, 'notifyRemarks')

                    meetingSignList.push(meetBean)

                })
            }

            this.setState({
                meetingSignList: meetingSignList,
                isRefreshing: false,
            })
        }).catch(error => {
            Toast.hide()

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

    onMeetingSign = index => {
        const {meetingSignList} = this.state

        Toast.loading('', 0)
        fetchGet(API.MEETING_SIGN, {
            userId: this.props.userInfo.userId,
            notifyId: meetingSignList[index].meetId,
        }).then(response => {
            Toast.hide()
            Toast.success('签到成功')
            meetingSignList[index].signStatus = '已签到'
            meetingSignList[index].signStatusCode = 2

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
        this.props.history.push('/sendMeetting')
    }

    onItemClick = index => {
        const {meetingSignList} = this.state

        this.props.history.push('/meet-detail/' + meetingSignList[index].meetId)
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSignIn)

