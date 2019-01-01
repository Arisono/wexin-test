/**
 * Created by RaoMeng on 2018/11/13
 * Desc: 视频播放item
 */

import React, {Component} from 'react'
import {Icon} from 'antd'
import ReactPlayer from 'react-player'
import {Modal} from 'antd-mobile'

const {alert} = Modal

export default class VideoItem extends Component {

    static alertClose = alert()

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {videoInfo, deleteAble} = this.props

        return (
            <div className='video-item-root'>
                <div className='video-item-head'>
                    <div className='video-item-title'>{videoInfo.picName}</div>
                    {deleteAble ? <Icon type="close-circle" theme='filled' onClick={this.onDeleteEvent}/> : ''}
                </div>
                <ReactPlayer
                    url={videoInfo.url}
                    controls
                    width='100%'
                    height='200px'
                    light={true}/>
            </div>
        )
    }

    onDeleteEvent = () => {
        alert('提示', '确定删除该条视频吗？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    this.props.deleteEvent(this.props.index)
                }
            }
        ])
    }
}
