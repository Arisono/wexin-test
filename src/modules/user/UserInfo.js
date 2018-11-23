import React, {Component} from 'react'
import 'css/user-info.css'
import 'css/phones.css'
import {Icon, Modal, Upload} from "antd";

export default class UserInfo extends Component {

    static defaultProps = {
        type: 1,
        userName: '王小明',
        school: '广西科技大学',
        phone: '15915408583',
        id: '1665628',
    }

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            userName: props.userName,
            school: props.school,
            phone: props.phone,
            id: props.id,
            previewVisible: false,
            previewImage: '',
            studentName: '陈玉',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            sex: '男'
        }
    }
    componentWillMount() {
        if (this.props.match.params.type) {
            let type = this.props.match.params.type
            this.state.type = type;
        }
        document.title = '个人信息'
    }

    render() {
        let identity = this.state.type == 1 ? '教师' : '家长'
        return <div className={'user-column'}>
            {this.showUserInfo()}
            <span className={'lineMax'} style={{marginTop: 10}}/>
            {this.showLocation()}
            <span className={'lineMax'} style={{marginTop: 10}}/>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>身份</text>
                <text className='phones-item-phone'>{identity}</text>
            </div>
            <span className={'lineMax'}/>
            {this.showUserContact()}
        </div>
    }

    //显示顶部个人信息
    showUserInfo() {
        return <div className='user-row'>
            <img style={{borderRadius: 360}} width={50} height={50} onClick={this.onAvatarClick}
                 src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}/>
            <div style={{marginLeft: 20, display: "flex", flexDirection: "column"}}>
                <span>{this.state.userName}</span>
                <span style={{marginTop: 5}}>{this.state.sex}</span>
            </div>

        </div>
    }

    //显示个人位置信息
    showLocation() {
        let idTag = this.state.type == 1 ? '工号ID' : '绑定学号ID'
        return <div className={'user-column'}>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>{idTag}</text>
                <text className='phones-item-phone'>{this.state.id}</text>
            </div>
            <div style={this.state.type == 1 ? {display: 'none'} : {padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>学生姓名</text>
                <text className='phones-item-phone'>{this.state.studentName}</text>
            </div>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>所在学校</text>
                <text className='phones-item-phone'>{this.state.school}</text>
            </div>
        </div>
    }

    //显示个人联系方式
    showUserContact() {
        const {previewVisible, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <div className={'user-column'}>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>手机号码</text>
                <a href={'tel:' + this.state.phone} style={{display: 'flex', alignItems: 'center'}}>
                    <div className='phones-item-phone'>{this.state.phone}</div>
                    <div style={{textAlign: 'right'}}>
                        <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                    </div>
                </a>
            </div>
            <div onClick={this.passWordClick} style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>登陆密码</text>
                <div style={{textAlign: 'right'}}>
                    <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                </div>
            </div>
            <div style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>人脸照</text>
            </div>
            <div className='imagesLayout'>
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    multiple
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                </Modal>
            </div>
        </div>
    }

    handleCancel = () => {
        this.setState({
            previewImage: '',
            previewVisible: false,
        });
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
        console.log('预览')
    }
    handleChange = ({fileList}) => this.setState({fileList})

    //头像点击事件
    onAvatarClick = (event) => {
        //TODO 点击头像
    }
    //点击密码
    passWordClick = (event) => {
        //TODO 点击密码
    }
}