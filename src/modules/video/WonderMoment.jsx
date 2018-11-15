/**
 * Created by RaoMeng on 2018/11/13
 * Desc: 精彩瞬间列表
 */

import React, {Component} from 'react'
import {isObjEmpty} from "../../utils/common"
import {Icon, List} from 'antd'
import {Picker, List as Mlist} from 'antd-mobile'
import ReactPlayer from 'react-player'
import VideoItem from 'components/VideoItem'

export default class WonderMoment extends Component {

    constructor() {
        super()

        this.state = {
            classList: [],
            classText: '',
            videoList: []
        }
    }

    componentDidMount() {
        document.title = '精彩瞬间'

        const {classList, videoList} = this.state

        for (let i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                classList.push({
                    label: '三年级（一）班',
                    value: '三年级（一）班'
                })
            } else {
                classList.push({
                    label: '三年级（二）班',
                    value: '三年级（二）班'
                })
            }
        }

        for (let i = 0; i < 10; i++) {
            videoList.push({
                title: '六一儿童节舞蹈'
            })
        }

        this.setState({classList, videoList})
    }

    render() {
        const {classList, classText, videoList} = this.state

        return (
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <Mlist.Item arrow="horizontal">选择班级</Mlist.Item>
                </Picker>
                <div className='gray-line'></div>
                <div style={{flex: '1', overflow: 'scroll'}}>
                    <List dataSource={videoList} renderItem={
                        (item, index) => (
                            <VideoItem
                                videoInfo={item} index={index}
                                deleteEvent={this.onDeleteVideo.bind(this)}/>
                        )
                    }/>
                </div>

                <Icon type="plus-circle" theme='filled' className='video-add-icon'
                      onClick={this.onAddVideo}/>
            </div>
        )
    }

    onDeleteVideo = (index) => {
        console.log('删除第' + index)
    }

    onAddVideo = () => {
        this.props.history.push('/uploadVideo')
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
    }
}