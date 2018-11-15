/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 校长信箱
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Upload, Switch, message, Modal} from 'antd'
import 'css/principal-mailbox.css'

const {TextArea} = Input

export default class PrincipalMailbox extends Component {

    constructor() {
        super()

        this.state = {
            suggest: '',
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            isAnonymous: false
        }
    }

    componentDidMount() {
        document.title = '校长信箱'
    }

    render() {
        const {previewVisible, previewImage, fileList, suggest, isAnonymous} = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='pageLayout'>
                <div className='headerLayout'>欢迎各位家长向本校提出意见和建议</div>
                <TextArea className='suggestInput' placeholder='请填写意见或建议…'
                          autosize={{minRows: 6, maxRows: 12}} value={suggest}
                          onChange={this.suggestChange}/>
                <span className='wordCount'>{suggest.length + '/500'}</span>
                <div className='gray-line'></div>
                <div className='chooseLayout'>
                    <span className='annexText'>附件</span>
                    <span className='annexCount'>{'（' + fileList.length + '/4张）'}</span>
                </div>
                <div className='imagesLayout'>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}>
                        {fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>
                <div className='anonymousLayout'>
                    <Switch size="small" checked={isAnonymous} onChange={this.switchChange}/>
                    <span style={{marginLeft: '5px'}}>匿名</span>
                </div>
                <div className='principal-uploadLayout'>
                    <Button className='commonButton' type="primary" block
                            onClick={this.releaseEvent}>提交</Button>
                </div>

                <span className='common-record-text' onClick={this.principalRecord}>历史投递</span>
            </div>
        )
    }

    suggestChange = e => {
        if (e.target.value.length <= 500) {
            this.setState({
                suggest: e.target.value
            })
        } else {
            message.error('字数已超限')
        }
    }

    switchChange = (checked) => {
        console.log(checked)
        this.setState({
            isAnonymous: checked
        })
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
        console.log('预览')
    }

    handleChange = ({fileList}) => this.setState({fileList})

    principalRecord = () => {
        this.props.history.push('/principalHistory')
    }
}