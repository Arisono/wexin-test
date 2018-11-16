/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 会议签到
 */

import React, {Component} from 'react'
import MeetingSignItem from 'components/MeetingSignItem'
import MeetingBean from "model/MeetingBean";
import {isObjEmpty} from "../../utils/common";
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from 'components/LoadingMore'

export default class MeetingSignIn extends Component {

    constructor() {
        super()

        this.state = {
            meetingSignList: [],
            hasMoreData: true
        }
    }

    componentDidMount() {
        document.title = '会议签到'
    }

    render() {
        const {meetingSignList, hasMoreData} = this.state

        let meetingItems = []
        for (let i = 0; i < meetingSignList.length; i++) {
            let meetingSignBean = meetingSignList[i];
            if (!isObjEmpty(meetingSignBean)) {
                meetingItems.push(<MeetingSignItem meetingBean={meetingSignBean}/>)
            }
        }

        return (
            <div style={{background: '#F2F2F2'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMeetList}
                    hasMore={hasMoreData}
                    loader={<LoadingMore/>}>
                    {meetingItems}
                </InfiniteScroll>
            </div>
        )
    }

    loadMeetList = (index) => {
        setTimeout(() => {
            const {meetingSignList} = this.state
            for (let i = 0; i < 8; i++) {
                let meetBean = new MeetingBean()
                meetBean.createTime = '2018-10-25 10:20'
                meetBean.title = '三年级全体教师期末动员大会'
                if (i % 2 == 0) {
                    meetBean.meetStatus = '进行中'
                } else {
                    meetBean.meetStatus = '已结束'
                }
                meetBean.startTime = '2018-10-25 10:20'
                meetBean.endTime = '2018-10-25 11:20'
                meetBean.address = '行政楼3楼办公室'
                meetBean.sponsor = '饶猛'
                if (i % 2 == 0) {
                    meetBean.signStatus = '签到'
                } else {
                    meetBean.signStatus = '已签到'
                }

                meetingSignList.push(meetBean)
            }

            this.setState({
                meetingSignList: meetingSignList
            })
        }, 1500)
    }
}

