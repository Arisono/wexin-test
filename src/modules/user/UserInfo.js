import React, {Component} from 'react'
import 'css/user-info.css'
import 'css/phones.css'
import {Icon, Modal, Upload} from "antd";
import icon_userInfo_upload from "../../style/imgs/icon_userInfo_upload.png"
import {API, _baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {fetchPost, fetchGet} from "../../utils/fetchRequest";

class UserInfo extends Component {
    //老师是1家长是2
    static defaultProps = {
        type: 1,
        userName: '',
        school: '',
        phone: '',
        id: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }

    componentWillMount() {
        if (this.props.match.params.type) {
            this.type = this.props.match.params.type
        }
        document.title = '个人信息'
    }


    componentDidMount() {
        // this.updateUserInfo("");
    }


    render() {
        return <div className={'user-column'}>
            {this.showUserInfo()}
            <span className={'lineMax'}/>
            {this.showLocation()}
            <span className={'lineMax'}/>
            {this.showUserContact()}
        </div>
    }

    //显示顶部个人信息
    showUserInfo() {
        return <div className='user-row'>
            <img className='user-info-avatar' onClick={this.onAvatarClick}
                 src={this.props.userInfo.userAvatar}/>
            <div className="flex_row_center user-info-msg">
                <span>{this.props.userInfo.userName}</span>
            </div>

        </div>
    }

    //显示个人位置信息
    showLocation() {
        const {userInfo} = this.props
        const idTag = (this.type == 1 ? '工号ID' : '绑定学号ID')
        const id = (this.type == 1 ? userInfo.userId : userInfo.student.stuId)
        const sex = (this.type == 1 ? userInfo.userSex : userInfo.student.stuSex)

        return <div className={'user-column'}>
            {/*<div className='user-info-item-top'>
                <text className='user-info-item-name'>{idTag}</text>
                <text className='user-info-item-phone'>{id}</text>
            </div>*/}
            {this.type == 1 ? '' : <div>
                <div className='user-info-item-top'>
                    <text className='user-info-item-name'>学生姓名</text>
                    <text className='user-info-item-phone'>{userInfo.student.stuName}</text>
                </div>
                <div className='gray-line' style={{height: '1px'}}></div>
            </div>}
            <div className='user-info-item-top'>
                <text className='user-info-item-name'>所在学校</text>
                <text className='user-info-item-phone'>{userInfo.school}</text>
            </div>
            <div className='gray-line' style={{height: '1px'}}></div>
            {this.type == 1 ? '' : (<div>
                <div className='user-info-item-top'>
                    <text className='user-info-item-name'>性别</text>
                    <text className='user-info-item-phone'>{sex === 1 ? '男' : '女'}</text>
                </div>
                <div className='gray-line' style={{height: '1px'}}></div>
            </div>)}
            <div className='user-info-item-top'>
                <text className='user-info-item-name'>身份</text>
                <text className='user-info-item-phone'>{this.type == 1 ? '教师' : '家长'}</text>
            </div>
        </div>
    }

    uploadChange = (e) => {
        console.log("file():", e.target.files);
        this.uploadFile(e.target.files[0])

    }

    //显示个人联系方式
    showUserContact() {
        const {previewVisible, fileList} = this.state;
        const {userInfo} = this.props
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <div className={'user-column'}>
            <div className='user-info-item-top'>
                <div>
                    <text className='user-info-item-name'>手机号码</text>
                    <div className='user-info-item-phone' style={{marginTop: '8px'}}>{userInfo.userPhone}</div>
                </div>
                <div className="item_flex_1 flex_row_right">
                    <div className='gray-line'
                         style={{height: '34px', background: '#CCCCCC', width: '1px'}}></div>
                    <text className="margin_left_20" style={{color: "#3680ED"}}>更换</text>
                </div>
            </div>
            <div className='gray-line' style={{height: '1px'}}></div>
            <div className='user-info-item-top'>
                <text className='user-info-item-name'>人脸照</text>
                <div className='gray-line'
                     style={{height: '34px', background: '#CCCCCC', width: '1px'}}></div>
                <span class="fileinput-button margin_left_20" style={{color: "#3680ED"}}>
                    上传
                  <input type="file" accept="image/*" capture="camera" onChange={this.uploadChange}/>
                </span>
            </div>
            <div className='flex' style={{marginTop: '8px'}}>
                <img style={{marginLeft: "10px"}}
                     src={this.state.imageUrl === "" ? icon_userInfo_upload : _baseURL + this.state.imageUrl}
                     width={80}
                     height={100}/>

                <div className="margin_left_20">
                    <div className="user-info-photo-text">• 请按照证件照的样式拍摄正面</div>
                    <div className="user-info-photo-text">• 请保证光线充足，没有遮挡物</div>
                    <div className="user-info-photo-text">• 请取下您的眼镜帽子保持面部曝光率</div>
                </div>

                {/*  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    multiple
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>*/}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                </Modal>
            </div>
        </div>
    }


    uploadFile = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log("uploadFile()", file);
        Toast.loading("")
        fetch(API.UPLOAD_FILE, {
            method: "POST",
            body: formData,
            mode: 'cors',
        }).then(function (response) {
            let result = response.json();
            if (response.status === 200) {
                console.log("text:", result);
                return result;
            } else {
                Toast.success("上传失败！")
            }
        }).then(result => {
            if (result.success) {
                Toast.success("上传成功！");
                console.log("result():", result);
                let imageUrl = result.data;
                this.state.imageUrl = imageUrl;
                this.setState({
                    imageUrl: imageUrl
                });
                this.updateUserInfo(imageUrl)

            }
        }).catch(function (ex) {
            Toast.fail("上传失败！")
            console.log('parsing failed', ex)
        })
    }


    updateUserInfo = (userPhoto) => {
        let userInfo = {
            userName: this.state.userName,
            userId: this.state.userId,
            userPhoto: userPhoto
        }
        console.log("updateUserInfo()", JSON.stringify(userInfo));
        fetchPost(_baseURL + "/user/updateUser", {
            userJson: JSON.stringify(userInfo)
        }).then((response) => {

        }).catch((error) => {

        })
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

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)