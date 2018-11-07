/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 新建相册
 */

import React, {Component} from 'react'
import {Icon, Input, Button} from 'antd'
import 'css/new-album.css'
import {isObjEmpty} from "../../utils/common";

const {TextArea} = Input

export default class NewAlbum extends Component {

    componentWillMount() {
        document.title = '新建相册'
    }

    constructor() {
        super()
        this.state = {
            classText: '',
            albumTitle: '',
            albumdescription: ''
        }
    }

    render() {
        const {classText, albumTitle, albumdescription} = this.state

        return (
            <div className='pageLayout'>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>
                    <Icon type="right" theme="outlined"/>
                </div>
                <div className='gray-line'></div>
                <input className='titleInput' placeholder='请输入相册标题'
                       value={albumTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                <TextArea className='contentInput' placeholder='请输入相册描述'
                          autosize={{minRows: 8, maxRows: 16}} value={albumdescription}
                          onChange={this.descriptionChange}/>

                <div className='confirmLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>发布</Button>
                </div>
            </div>
        );
    }

    titleChange = e => {
        this.setState({
            albumTitle: e.target.value
        })
    }

    descriptionChange = e => {
        this.setState({
            albumdescription: e.target.value
        })
    }

    releaseEvent = () => {
        console.log('发布\n' + this.state.albumTitle + '\n' + this.state.albumdescription)
    }
}