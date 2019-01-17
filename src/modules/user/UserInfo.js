import React, {Component} from 'react'
import 'css/user-info.css'
import 'css/phones.css'
import {Icon, Modal, Upload} from "antd";
import icon_userInfo_upload from "../../style/imgs/icon_userInfo_upload.png"
import {API, _baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {fetchPost, fetchGet} from "../../utils/fetchRequest";
import UploadEnclosure from "../../components/UploadEnclosure";
import ImagesViewer from '../../components/imagesVIewer/index'
import {isObjEmpty} from "../../utils/common";
import {switchUser} from "../../redux/actions/userInfo";

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

    componentWillUnmount() {
        Toast.hide()
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

    //显示个人联系方式
    showUserContact() {
        const {previewVisible, fileList} = this.state;
        const {userInfo} = this.props

        let pictureUrls = []
        if (!isObjEmpty(userInfo.student.stuPhoto)) {
            pictureUrls.push(_baseURL + userInfo.student.stuPhoto)
        }

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

            {this.type == 1 ? '' : <div>
                <div className='user-info-item-top'>
                    <text className='user-info-item-name'>人脸照</text>
                    <div className='gray-line'
                         style={{height: '34px', background: '#CCCCCC', width: '1px'}}></div>
                    <span className="fileinput-button margin_left_20" style={{color: "#3680ED"}}>
                    上传
                        {/*<input type="file" accept="image/*" capture="camera" onChange={this.uploadChange}/>*/}
                        <UploadEnclosure
                            action={API.UPLOAD_FILE}
                            fileList={fileList}
                            count={1}
                            multiple={false}
                            handlePreview={this.enclosurePreview.bind(this)}
                            beforeUpload={this.beforeUpload.bind(this)}
                            handleChange={this.handleChange.bind(this)}
                        />
                </span>
                </div>
                <div className='flex' style={{marginTop: '8px'}}>
                    <img style={{marginLeft: "16px"}}
                         src={userInfo.student.stuPhoto === "" ? icon_userInfo_upload :
                             _baseURL + userInfo.student.stuPhoto}
                         width={86}
                         height={100}
                         onClick={this.handlePreview}/>

                    <div style={{marginLeft: '14px'}}>
                        <div className="user-info-photo-text">• 请按照证件照的样式拍摄正面</div>
                        <div className="user-info-photo-text">• 请保证光线充足，没有遮挡物</div>
                        <div className="user-info-photo-text">• 请取下您的眼镜帽子保持面部曝光率</div>
                    </div>
                </div>

                {previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={0}
                                  needPoint={false}/> : ""}
            </div>}

        </div>
    }

    handlePreview = () => {
        this.setState({
            previewVisible: true,
        });
    }

    handleCancel = () => this.setState({previewVisible: false})

    beforeUpload = (file, fileList) => {
        Toast.loading('人脸照上传中...', 0)
    }

    handleChange = fileList => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
                value.picUrl = value.response ? value.response.data : value.picUrl
            })

            this.setState({fileList})

            if (fileList[0].status === 'error') {
                Toast.fail('人脸照上传失败，请重试！')
                this.setState({
                    fileList: []
                })
            } else if (fileList[0].status === 'done') {
                this.updateUserInfo(fileList[0].response.data)
            } else if (fileList[0].status === 'uploading') {

            } else {
                Toast.hide()
            }
        }
    }

    enclosurePreview = () => {

    }

    updateUserInfo = (userPhoto) => {
        fetchPost(API.UPDATE_STU_PHOTO, {
            stuId: this.props.userInfo.student.stuId,
            stuPhoto: userPhoto
        }).then((response) => {
            Toast.success('人脸照上传成功！')
            this.setState({
                fileList: []
            });

            switchUser({
                student: {
                    ...this.props.userInfo.student,
                    stuPhoto: userPhoto
                }
            })()
        }).catch((error) => {
            Toast.hide();
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('人脸照上传异常', 2)
            }
        })
    }

    //头像点击事件
    onAvatarClick = (event) => {
        //TODO 点击头像
    }


    uploadChange = (e) => {
        this.uploadFile(e.target.files[0])
    }

    uploadFile = (file) => {
        const formData = new FormData();
        formData.append('file', file);
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
                let imageUrl = result.data;
                this.state.imageUrl = imageUrl;
                this.setState({
                    imageUrl: imageUrl
                });
                this.updateUserInfo(imageUrl)
            }
        }).catch(function (ex) {
            Toast.fail("上传失败！")
        })
    }

}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)