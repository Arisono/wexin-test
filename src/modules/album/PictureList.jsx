/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 相册详情
 */

import React, {Component} from 'react'
import {getStrValue, isObjEmpty} from "../../utils/common";
import LazyLoad from 'react-lazyload'
import {Toast} from 'antd-mobile'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import '../../index.css'
import 'css/album-item.css'

import ImagesViewer from '../../components/imagesVIewer/index'
import {fetchGet} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import PictureBean from "../../model/PictureBean";

export default class PictureList extends Component {

    constructor() {
        super()

        this.state = {
            pictureList: [],
            previewVisible: false,
            previewImage: '',
            description: ''
        }
    }

    componentDidMount() {
        const title = this.props.match.params.title

        this.mType = this.props.match.params.type
        this.albumId = this.props.match.params.albumId

        console.log(title + '---' + this.albumId)
        if (title) {
            document.title = title
        } else {
            document.title = '相册'
        }

        Toast.loading('', 0)
        this.getPictureList(this.albumId)
    }

    render() {
        const {pictureList, previewVisible, description} = this.state
        let pictureItems = []
        let pictureUrls = []
        for (let i = 0; i < pictureList.length; i++) {
            const pictureUrl = pictureList[i].url
            pictureUrls.push(pictureUrl)
            if (!isObjEmpty(pictureUrl)) {
                pictureItems.push(
                    i > 20 ?
                        <LazyLoad throttle={200} height={300} once overflow>
                            <CSSTransition
                                timeout={2000}
                                classNames='fade'
                                appear={true}
                                key={i}>
                                <div className='pictureItem'>
                                    <img src={pictureUrl} onClick={this.handlePreview.bind(this, pictureUrl, i)}/>
                                </div>
                            </CSSTransition>
                        </LazyLoad> :
                        <div className='pictureItem'>
                            <img src={pictureUrl} onClick={this.handlePreview.bind(this, pictureUrl, i)}/>
                        </div>
                )
            }
        }

        return (
            <div style={{display: 'flex', width: '100%', height: '100vh', flexDirection: 'column'}}>
                <div className='album-detail-title'>{description}</div>
                <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                    <TransitionGroup>
                        {pictureItems}
                    </TransitionGroup>
                </div>

                {this.mType == 'teacher' ?
                    <img src={require('imgs/ic_album_edit.png')} className='common-add-icon album-edit-icon'
                         onClick={this.editPicturesClick}/> : ''}


                {previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={this.state.previewIndex}
                                  needPoint={pictureUrls.length <= 9}/> : ""}

                {/*<div className='album-detail-bottom'>
                    <Button type='primary' className='album-detail-button'
                            onClick={this.addPicturesClick}>新增照片</Button>
                    <Button type='warning' className='album-detail-button'
                            onClick={this.deletePirturesClick}>删除</Button>
                </div>*/}
            </div>
        )
    }

    getPictureList = albumId => {

        fetchGet(API.GET_PICTURE_LIST, {
            parentId: albumId,
            picStatus: 2
        }).then(response => {
            Toast.hide()

            const {pictureList} = this.state
            pictureList.length = 0

            if (response) {
                const dataObject = response.data
                if (dataObject) {
                    const albumObj = dataObject.album
                    if (albumObj.picRemarks) {
                        this.setState({
                            description: albumObj.picRemarks
                        })
                    }

                    const pictures = dataObject.pictures
                    if (pictures) {
                        pictures.forEach((picture, index) => {
                            const pictureBean = new PictureBean()

                            pictureBean.picId = getStrValue(picture, 'picId')
                            pictureBean.picName = getStrValue(picture, 'picName')
                            pictureBean.picUrl = getStrValue(picture, 'picUrl')
                            pictureBean.picDate = getStrValue(picture, 'picDate')
                            pictureBean.picType = getStrValue(picture, 'picType')
                            pictureBean.picStatus = getStrValue(picture, 'picStatus')
                            pictureBean.parentId = getStrValue(picture, 'parentId')
                            pictureBean.picRemarks = getStrValue(picture, 'picRemarks')
                            pictureBean.schId = getStrValue(picture, 'schId')
                            pictureBean.quantity = getStrValue(picture, 'quantity')
                            pictureBean.schName = getStrValue(picture, 'schName')
                            pictureBean.url = _baseURL + getStrValue(picture, 'picUrl')

                            pictureList.push(pictureBean)
                        })
                    }
                }
            }

            this.setState({pictureList})
        }).catch(error => {
            Toast.hide()
            if (typeof error === 'string') {
                Toast.fail(error)
            }
        })
    }

    editPicturesClick = () => {
        this.props.history.push('/uploadImage/' + this.albumId)
    }

    handlePreview = (url, index) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
            previewIndex: index
        });
    }

    handleCancel = () => this.setState({previewVisible: false})
}