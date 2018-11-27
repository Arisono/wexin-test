/**
 * Created by RaoMeng on 2018/11/7
 * Desc: 校长信箱
 */

import React, {Component} from 'react'
import {Icon, Input, Button, Upload, Switch, message, Modal} from 'antd'
import 'css/principal-mailbox.css'
import WxImageViewer from 'react-wx-images-viewer'
import {isObjEmpty} from "../../utils/common";
import UploadEnclosure from 'components/UploadEnclosure'

const {TextArea} = Input

export default class PrincipalMailbox extends Component {

    constructor() {
        super()

        this.state = {
            suggest: '',
            previewVisible: false,
            previewImage: '',
            fileList: [{
                index: 0,
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                index: 1,
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039474667&di=32c37088ba29d428392cee485ce29995&imgtype=0&src=http%3A%2F%2Fpic153.nipic.com%2Ffile%2F20171226%2F26515894_231421032000_2.jpg',
            }, {
                index: 2,
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543039450432&di=c4e6d3b8039a4b2b2713a8fa278a54cc&imgtype=0&src=http%3A%2F%2Ffx120.120askimages.com%2F120ask_news%2F2017%2F0706%2F201707061499322886181789.jpg',
            }],
            isAnonymous: false,
            previewIndex: 0
        }
    }

    componentDidMount() {
        document.title = '校长信箱'
    }

    render() {
        const {previewVisible, previewImage, fileList, suggest, isAnonymous} = this.state;
        const imgs = []
        if (!isObjEmpty(fileList) && fileList !== '[]') {
            for (let i = 0; i < fileList.length; i++) {
                imgs.push(fileList[i].url)
            }
        }

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='principal-pageLayout'>
                <div className='headerLayout'>欢迎各位家长向本校提出意见和建议</div>
                <TextArea className='suggestInput' placeholder='请填写意见或建议…'
                          autosize={{minRows: 6, maxRows: 12}} value={suggest}
                          onChange={this.suggestChange}/>
                <span className='wordCount'>{suggest.length + '/500'}</span>
                <div className='gray-line'></div>
                {/*<div className='chooseLayout'>
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
                    {previewVisible ?
                        <WxImageViewer onClose={this.handleCancel} urls={imgs} index={this.state.previewIndex}/> : ""}
                </div>*/}

                <UploadEnclosure
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    count={4}
                    multiple={true}
                    title='附件'
                    beforeUpload={this.beforeUpload}
                    handleChange={this.handleChange}
                />
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

    beforeUpload = (file, fileList) => {

    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file, index) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
            previewIndex: file.index || 0
        });
        console.log('预览' + index)
    }

    handleChange = ({fileList}) => this.setState({fileList})

    principalRecord = () => {
        this.props.history.push('/principalHistory')
    }
}