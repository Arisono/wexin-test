/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 视频播放
 */

import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import 'css/video.css'

export default class VideoPlayer extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        const title = this.props.match.params.title
        if (title) {
            document.title = title
        } else {
            document.title = '视频播放'
        }
    }

    render() {
        return (
            <div>
                <ReactPlayer
                    url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                    playing controls
                    width='100%'
                    height='max-content'/>
            </div>
        )
    }
}