/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传视频
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {isObjEmpty} from "../../utils/common";
import {Icon, Input, Button, Upload} from 'antd'
import {Picker,List} from 'antd-mobile'

const {TextArea} = Input

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    onChange({file, fileList}) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [],
};

export default class UploadVideo extends Component {

    constructor() {
        super()

        this.state = {
            classText: '',
            videoTitle: '',
            videoDescription: '',
            fileList: [],
            classList: [],
        }
    }

    componentDidMount() {
        document.title = '上传视频'

        const {classList} = this.state

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

        this.setState({classList})
    }

    render() {
        const {classText, videoTitle, videoDescription, fileList, classList} = this.state
        return (
            <div className='pageLayout' style={{background: 'white'}}>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange}
                        onOk={this.handleClassChange} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                <div className='uploadCaptionText'>视频名称</div>
                <input className='titleInput' placeholder='请输入视频名称'
                       value={videoTitle} onChange={this.titleChange}/>
                {/*<div className='uploadCaptionText'>视频描述</div>
                <TextArea className='contentInput' placeholder='请输入视频描述'
                          autosize={{minRows: 8, maxRows: 16}} value={videoDescription}
                          onChange={this.descriptionChange}/>*/}
                <div style={{padding: '10px', marginTop: '12px', flex: '1'}}>
                    <Upload {...props} disabled={fileList.length >= 1}
                            onChange={this.handleChange}>
                        <div style={{display: 'flex', padding: '10px', alignItems: 'center'}}>
                            <div className={fileList.length < 1 ? 'uploadBtn' : 'uploadBtn-disable'}>
                                <Icon type="upload" style={{color: fileList.length < 1 ? 'white' : 'gray'}}/>
                                <span style={{fontSize: '12px', marginLeft: '6px'}}>选择文件</span>
                            </div>
                            <span className='promptText'>（不能超过100MB）</span>
                        </div>
                    </Upload>
                </div>

                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>发布</Button>
                </div>
            </div>
        )
    }

    handleChange = ({fileList}) => this.setState({fileList})

    titleChange = e => {
        this.setState({
            videoTitle: e.target.value
        })
    }

    descriptionChange = e => {
        this.setState({
            videoDescription: e.target.value
        })
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
    }
}