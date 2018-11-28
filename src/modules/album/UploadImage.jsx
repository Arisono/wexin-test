/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传图片
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {Icon, Button, Upload, Modal} from 'antd'
import UploadEnclosure from 'components/UploadEnclosure'
import {API} from "../../configs/api.config";

export default class UploadImage extends Component {

    componentDidMount() {
        document.title = '上传图片'
    }

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
                <div style={{flex: '1'}}>
                    <UploadEnclosure
                        action={API.UPLOAD_FILE}
                        fileList={fileList}
                        limit={false}
                        multiple={true}
                        title='添加图片'
                        beforeUpload={this.handleBefore.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    />
                </div>

                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>上传</Button>
                </div>
            </div>
        )
    }

    handleBefore = (file, fileList) => {

    }

    handleChange = response => {
        console.log(response)
    }

}