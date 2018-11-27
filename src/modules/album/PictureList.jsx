/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 相册详情
 */

import React, {Component} from 'react'
import {isObjEmpty} from "../../utils/common";
import LazyLoad from 'react-lazyload'
import {Button, Modal} from 'antd'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import '../../index.css'
import 'css/album-item.css'
import WxImageViewer from 'react-wx-images-viewer'
export default class PictureList extends Component {

    constructor() {
        super()

        this.state = {
            pictureList: [],
            previewVisible: false,
            previewImage: '',
        }
    }

    componentDidMount() {
        const title = this.props.match.params.title
        if (title) {
            document.title = title
        } else {
            document.title = '相册'
        }

        let pictures = [
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3507505698,2706878664&fm=15&gp=0.jpg',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3507505698,2706878664&fm=15&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=223394732,3681620813&fm=15&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=223394732,3681620813&fm=15&gp=0.jpg',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=223394732,3681620813&fm=15&gp=0.jpg',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3507505698,2706878664&fm=15&gp=0.jpg',
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=223394732,3681620813&fm=15&gp=0.jpg',
        ]

        this.setState({
            pictureList: this.state.pictureList.concat(pictures, pictures, pictures, pictures)
        })
    }

    render() {
        const {pictureList, previewVisible, previewImage} = this.state
        let pictureItems = []
        for (let i = 0; i < pictureList.length; i++) {
            const pictureUrl = pictureList[i]
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
                <div className='album-detail-title'>摄影与2018年六月一日，老师与家长们参加儿童节活动，热情高涨！</div>
                <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                    <TransitionGroup>
                        {pictureItems}
                    </TransitionGroup>
                </div>

                {/*<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="图片" style={{width: '100%'}} src={previewImage}/>
                </Modal>*/}

                {previewVisible ?
                    <WxImageViewer onClose={this.handleCancel} urls={pictureList}
                                   index={this.state.previewIndex}/> : ""}

                <div className='album-detail-bottom'>
                    <Button type='primary' className='album-detail-button'
                            onClick={this.addPicturesClick}>新增照片</Button>
                    <Button type='warning' className='album-detail-button'
                            onClick={this.deletePirturesClick}>删除</Button>
                </div>
            </div>
        )
    }

    addPicturesClick = () => {
        this.props.history.push('/uploadImage')
    }

    deletePirturesClick = () => {
        this.props.history.push('/uploadImage')
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