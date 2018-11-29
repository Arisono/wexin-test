/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 上传图片
 */

import React, {Component} from 'react'
import 'css/new-album.css'
import {Button,} from 'antd'
import {Toast} from 'antd-mobile'
import UploadEnclosure from 'components/UploadEnclosure'
import {_baseURL, API} from "../../configs/api.config";
import {fetchGet, fetchPost} from "../../utils/fetchRequest";
import PictureBean from "../../model/PictureBean";

export default class UploadImage extends Component {

    componentWillMount() {
        this.albumId = this.props.match.params.albumId
    }

    componentDidMount() {
        document.title = '编辑相册'

        Toast.loading('', 0)
        this.getPictureList(this.albumId)
    }

    constructor() {
        super()
        this.state = {
            classText: '',
            albumText: '',

            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }

    render() {
        const {fileList} = this.state;

        return (
            <div className='pageLayout'>
                <div className='gray-line'></div>
                <div style={{flex: '1'}}>
                    <UploadEnclosure
                        action={API.UPLOAD_FILE}
                        fileList={fileList}
                        limit={false}
                        multiple={true}
                        title='编辑相册'
                        beforeUpload={this.handleBefore.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        handleRemove={this.handleRemove.bind(this)}
                    />
                </div>

                <div className='uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>更新</Button>
                </div>
            </div>
        )
    }

    getPictureList = albumId => {
        fetchGet(API.GET_PICTURE_LIST, {
            parentId: albumId,
            picStatus: 2
        }).then(response => {
            Toast.hide()

            const {fileList} = this.state
            fileList.length = 0

            if (response) {
                const dataArray = response.data.pictures
                if (dataArray) {
                    dataArray.forEach((dataObject, index) => {
                        const pictureBean = {}

                        pictureBean.picId = dataObject.picId
                        pictureBean.picName = dataObject.picName
                        pictureBean.picUrl = dataObject.picUrl
                        pictureBean.picDate = dataObject.picDate
                        pictureBean.picType = dataObject.picType
                        pictureBean.picStatus = dataObject.picStatus
                        pictureBean.parentId = dataObject.parentId
                        pictureBean.picRemarks = dataObject.picRemarks
                        pictureBean.schId = dataObject.schId
                        pictureBean.quantity = dataObject.quantity
                        pictureBean.schName = dataObject.schName

                        pictureBean.uid = dataObject.picId
                        pictureBean.url = dataObject.picUrl
                        // pictureBean.type = ''
                        pictureBean.thumbUrl = dataObject.picUrl
                        pictureBean.status = 'done'
                        // pictureBean.size = ''

                        fileList.push(pictureBean)
                    })
                }
            }

            console.log(fileList)
            this.setState({fileList})
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    handleBefore = (file, fileList) => {

    }

    handleRemove = (file) => {
        console.log(file)
        /*fetchPost(API.DELETE_FILE, {
            fileUrls: [file.picUrl]
        }).then(response => {

        }).catch(error => {

        })*/
        return true
    }

    handleChange = fileList => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
            })

            this.setState({fileList})
        }

        // console.log(fileList)
    }

    releaseEvent = () => {
        Toast.loading('相册更新中...', 0)

        const {fileList} = this.state
        const fileUrls = []
        if (fileList) {
            fileList.forEach((value, index) => {
                fileUrls.push(value.url)
            })
        }

        fetchPost(API.UPDATE_ALBUM, {
            fileUrls: JSON.stringify(fileUrls),
            parentId: this.albumId
        }).then(response => {
            Toast.hide()
            Toast.success('更新成功')
        }).catch(error => {
            Toast.hide()
            Toast.fail(error)
        })
    }

}