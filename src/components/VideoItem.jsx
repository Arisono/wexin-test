/**
 * Created by RaoMeng on 2018/11/13
 * Desc: 视频播放item
 */

import React, {Component} from 'react'
import {Icon} from 'antd'
import ReactPlayer from 'react-player'

export default class VideoItem extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {videoInfo} = this.props

        return (
            <div className='video-item-root'>
                <div className='video-item-head'>
                    <div className='video-item-title'>{videoInfo.title}</div>
                    <Icon type="close-circle" theme='filled' onClick={this.onDeleteEvent}/>
                </div>
                <ReactPlayer
                    url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                    controls
                    width='100%'
                    height='max-content'/>
            </div>
        )
    }

    onDeleteEvent = () => {
        this.props.deleteEvent(this.props.index)
    }
}
