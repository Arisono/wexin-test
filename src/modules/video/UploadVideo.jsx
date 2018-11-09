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
    defaultFileList: [{
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
        uid: '4',
        name: 'aaa.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/aaa.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
};

export default class UploadVideo extends Component {

    constructor() {
        super()

        this.state = {
            classText: '',
            videoTitle: '',
            videoDescription: ''
        }
    }


    render() {
        const {classText, videoTitle, videoDescription} = this.state
        return (
            <div className='pageLayout' style={{background:'white'}}>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='uploadCaptionText'>视频名称</div>
                <input className='titleInput' placeholder='请输入视频名称'
                       value={videoTitle} onChange={this.titleChange}/>
                <div className='uploadCaptionText'>视频描述</div>
                <TextArea className='contentInput' placeholder='请输入相册描述'
                          autosize={{minRows: 8, maxRows: 16}} value={videoDescription}
                          onChange={this.descriptionChange}/>
                <div style={{padding: '10px', marginTop: '12px'}}>
                    <Upload {...props}>
                        <div style={{display: 'flex', padding: '10px', alignItems: 'center'}}>
                            <div className='uploadBtn'>
                                <Icon type="upload" style={{color: 'white'}}/>
                                <span style={{color: 'white', fontSize: '12px', marginLeft: '6px'}}>选择文件</span>
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