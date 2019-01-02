/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 会议签到item
 */

import React, {Component} from 'react'
import MeetingBean from "../model/MeetingBean";
import {Modal} from 'antd-mobile'
import 'css/meeting.css'

const {alert} = Modal

export default class MeetingSignItem extends Component {

    constructor() {
        super()

        this.state = {
            meetingBean: new MeetingBean()
        }
    }

    componentDidMount() {
        this.setState({
            meetingBean: this.props.meetingBean
        })
    }

    render() {
        const {meetingBean} = this.state

        return (
            <div className='signItemLayout' onClick={this.onItemClick}>
                <div className='signCreateTime'>{meetingBean.createTime}</div>
                <div className='signContentlayout'>
                    <div className='titleLayout'>
                        <div className='titleText'>{meetingBean.title}</div>
                        <div className={meetingBean.meetStatusCode === 3 ? 'meetStatusRed' : 'meetStatusGray'}>
                            {meetingBean.meetStatus}
                        </div>
                    </div>
                    <div className='contentItem'>
                        <div className='captionText'>时间：</div>
                        <div className='valueText'>{meetingBean.startTime + ' 到 ' + meetingBean.endTime}</div>
                    </div>
                    <div className='contentItem'>
                        <div className='captionText'>地址：</div>
                        <div className='valueText'>{meetingBean.address}</div>
                    </div>
                    <div className='contentItem'>
                        <div className='captionText'>发起人：</div>
                        <div className='valueText'>{meetingBean.sponsor}</div>
                    </div>
                    <div className='bottomLayout'>
                        <span className={meetingBean.signStatusCode === 5 ? 'signBtnEnable' : 'signBtnActive'}
                              onClick={this.onMeetingSign}>
                            {meetingBean.signStatus}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    onMeetingSign = (e) => {
        e.stopPropagation();
        const {meetingBean} = this.state

        if (meetingBean.signStatusCode === 1) {
            alert('提示', '确定对该会议签到吗？', [
                {
                    text: '取消', onPress: () => {
                    }
                },
                {
                    text: '确定', onPress: () => {
                        this.props.onMeetingSign(this.props.index)
                    }
                }
            ])
        }
    }

    onItemClick = () => {
        this.props.onItemClick(this.props.index)
    }
}