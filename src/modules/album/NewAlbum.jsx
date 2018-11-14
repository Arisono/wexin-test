/**
 * Created by RaoMeng on 2018/11/6
 * Desc: 新建相册
 */

import React, {Component} from 'react'
import {Icon, Input, Button} from 'antd'
import 'css/new-album.css'
import {isObjEmpty} from "../../utils/common";
import {Picker, List} from 'antd-mobile'

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
            albumdescription: '',
            classList: []
        }
    }

    componentDidMount() {
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
        const {classText, albumTitle, albumdescription, classList} = this.state

        return (
            <div className='pageLayout'>
                <div className='gray-line'></div>
                <Picker data={classList} title='选择班级' extra='请选择'
                        value={classText} onChange={this.handleClassChange}
                        onOk={this.handleClassChange}
                        children={List.Item} cols={1}>
                    <List.Item arrow="horizontal">选择班级</List.Item>
                </Picker>
                {/*<div className='chooseLayout'>*/}
                {/*<div className='chooseText'>{isObjEmpty(classText) ? '选择班级' : classText}</div>*/}
                {/*<Icon type="right" theme="outlined"/>*/}
                {/*</div>*/}
                <div className='gray-line'></div>
                <input className='titleInput' placeholder='请输入相册标题'
                       value={albumTitle} onChange={this.titleChange}/>
                <div className='gray-line' style={{height: '1px'}}></div>
                <TextArea className='contentInput' placeholder='请输入相册描述'
                          autosize={{minRows: 8, maxRows: 16}} value={albumdescription}
                          onChange={this.descriptionChange}/>
                <div style={{flex: '1'}}></div>
                <div className='confirmLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>新建</Button>
                </div>
            </div>
        );
    }

    handleClassChange = (v) => {
        this.setState({classText: v})
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