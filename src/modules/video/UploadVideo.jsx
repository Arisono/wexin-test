/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传视频
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {isObjEmpty} from "../../utils/common";
import {Icon, Input, Button, Upload} from 'antd'

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
            fileList: []
        }
    }


    render() {
        const {classText, videoTitle, videoDescription, fileList} = this.state
        return (
            <div className='pageLayout' style={{background: 'white'}}>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='uploadCaptionText'>视频名称</div>
                <input className='titleInput' placeholder='请输入视频名称'
                       value={videoTitle} onChange={this.titleChange}/>
                {/*<div className='uploadCaptionText'>视频描述</div>
                <TextArea className='contentInput' placeholder='请输入视频描述'
                          autosize={{minRows: 8, maxRows: 16}} value={videoDescription}
                          onChange={this.descriptionChange}/>*/}
                <div style={{padding: '10px', marginTop: '12px',flex:'1'}}>
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
}