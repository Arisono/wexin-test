/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传图片
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {isObjEmpty} from "../../utils/common";
import {Icon, Button, Upload} from 'antd'

export default class UploadImage extends Component {
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})

    constructor() {
        super()
        this.state = {
            classText: '',
            albumText: '',

            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const {classText, albumText} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='pageLayout'>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(albumText) ? '选择相册' : albumText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>添加图片</div>
                </div>
                <div className='imagesLayout'>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}>
                        {fileList.length >= 30 ? null : uploadButton}
                    </Upload>
                </div>
                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>发布</Button>
                </div>
            </div>
        )
    }
}