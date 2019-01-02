import React, {Component} from 'react'
import 'css/user-info.css'
import 'css/phones.css'
import {Icon, Modal, Upload} from "antd";
import  icon_userInfo_upload from "../../style/imgs/icon_userInfo_upload.png"
import {API,_baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {fetchPost,fetchGet} from "../../utils/fetchRequest";

class UserInfo extends Component {
//老师是1家长是2
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
            userName: this.props.userInfo.userName,
            userId:this.props.userInfo.userId,
            school:this.props.userInfo.school,
            phone: this.props.userInfo.userPhone,
            id: this.props.userInfo.stuId,
            imageUrl:"",
            previewVisible: false,
            previewImage: '',
            studentName: this.props.userInfo.stuName,
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            sex: this.props.userInfo.userSex===1?"男":"女"
        }
    }
    componentWillMount() {
        if (this.props.match.params.type) {
            let type = this.props.match.params.type
            this.state.type = type;
        }
        document.title = '个人信息'
    }


    componentDidMount(){
       // this.updateUserInfo("");
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
                 src={this.props.userInfo.userAvatar}/>
            <div style={{marginLeft: 20, display: "flex", flexDirection: "column"}} className="flex_row_center">
                <span>{this.state.userName}</span>
               {/* <span style={{marginTop: 5}}>{this.state.sex}</span>*/}
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

    uploadChange=(e)=>{
            console.log("file():",e.target.files);
            this.uploadFile(e.target.files[0])

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
            <div style={{padding: 10}} className=' flex flex_row_center'>
                <div>
                    <text className='phones-item-name'>手机号码</text>
                    <div className='phones-item-phone ' >{this.state.phone}</div>
                </div>
                <div className=" item_flex_1 flex_row_right">|
                    <text className="margin_left_10" style={{color:"#3680ED"}}>修改</text>
                </div>
                {/*<a href={'tel:' + this.state.phone} style={{display: 'flex', alignItems: 'center'}}>

                    <div style={{textAlign: 'right'}}>
                        <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                    </div>
                </a>*/}
            </div>
     {/*       <div onClick={this.passWordClick} style={{padding: 10}} className='phones-item-top'>
                <text className='phones-item-name'>登陆密码</text>
                <div style={{textAlign: 'right'}}>
                    <img width={8} height={15} src={require('../../style/imgs/next_arrow.png')}/>
                </div>
            </div>*/}
            <div style={{padding: 10}} className='flex phones-item-top margin_bottom_20'>
                <text className='phones-item-name'>人脸照</text>
                |
              {/*  <text className="margin_left_10" style={{color:"#3680ED"}}>上传</text>*/}

                <span class="fileinput-button margin_left_10" style={{color:"#3680ED"}}>
                    上传
                  <input type="file" accept="image/*" capture="camera"  onChange={this.uploadChange}/>
                </span>

            </div>
            <div className=' flex padding_15'>
                        <img style={{marginLeft:"10px"}}
                             src={this.state.imageUrl===""?icon_userInfo_upload:_baseURL+this.state.imageUrl}
                             width={100}
                             height={130} />



                <div className="margin_left_20">
                    <div className="margin_bottom_10"><span className="span_16">• 请按照证件照的样式拍摄正面</span></div>
                    <div className="margin_bottom_10"><span className="span_16">• 请保证光线充足，没有遮挡物</span></div>
                    <div className="margin_bottom_10"><span className="span_16">• 请取下您的眼镜帽子保持面部曝光率</span></div>
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


    uploadFile=(file)=>{
        const formData = new FormData();
        formData.append('file', file);
        console.log("uploadFile()",file);
        Toast.loading("")
        fetch(API.UPLOAD_FILE,{
            method :"POST",
            body: formData,
            mode: 'cors',
            credentials: 'include'
        }).then(function(response) {
            let  result= response.json();
            if(response.status===200){
                console.log("text:",result);
                return result;
            }else{
                Toast.success("上传失败！")
            }
        }).then(result=>{
            if(result.success){
                Toast.success("上传成功！");
                console.log("result():",result);
                let imageUrl=result.data;
                this.state.imageUrl=imageUrl;
                this.updateUserInfo(imageUrl)

            }
        }).catch(function(ex) {
            Toast.success("上传失败！")
            console.log('parsing failed', ex)
        })
    }


    updateUserInfo=(userPhoto)=>{
        //    let imageUrl=_baseURL+result.data;
        let userInfo={
             userName:this.state.userName,
             userId:this.state.userId,
             userPhoto:userPhoto
        }
            console.log("updateUserInfo()",JSON.stringify(userInfo));
        fetchPost(_baseURL+"/user/updateUser",{
                  userJson:JSON.stringify(userInfo)
                  }).then((response)=>{
                      console.log("response:"+JSON.stringify(response));
                  }).catch((error)=>{
                      console.log("error:"+JSON.stringify(error));
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