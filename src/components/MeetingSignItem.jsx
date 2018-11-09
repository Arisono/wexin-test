/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 会议签到item
 */

import React, {Component} from 'react'
import MeetingBean from "../model/MeetingBean";
import 'css/meeting.css'

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
            <div className='signItemLayout'>
                <div className='signCreateTime'>{meetingBean.createTime}</div>
                <div className='signContentlayout'>
                    <div className='titleLayout'>
                        <div className='titleText'>{meetingBean.title}</div>
                        <div className={meetingBean.meetStatus == '进行中' ? 'meetStatusRed' : 'meetStatusGray'}>
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
                        <span className={meetingBean.signStatus == '签到' ? 'signBtnActive' : 'signBtnEnable'}>
                            {meetingBean.signStatus}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}