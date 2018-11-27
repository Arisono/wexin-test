/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传图片
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {Icon, Button, Upload, Modal} from 'antd'

export default class UploadImage extends Component {

    componentDidMount() {
        document.title = '上传图片'
    }

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
                {/*<div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(albumText) ? '选择相册' : albumText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>*/}
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>添加图片</div>
                </div>
                <div className='imagesLayout'>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        beforeUpload={this.handleBefore}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        showUploadList={{showPreviewIcon: true, showRemoveIcon: true}}>
                        {fileList.length >= 50 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="图片" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>

                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>上传</Button>
                </div>
            </div>
        )
    }

    handleBefore = (file, fileList) => {
        return false
    }
}