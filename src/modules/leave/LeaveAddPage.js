/**
*   Created by FANGlh on 2019/1/14 15:52.
*   Desc:
*/

import React,{Component} from 'react';
import './LeaveAddPage.css';
import {getOrganization} from "../../utils/api.request";
import {connect} from 'react-redux';
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";
import {ORGANIZATION_TEACHER} from "../../utils/api.constants";
import TargetSelect from '../../components/TargetSelect';
import {fetchPost, fetchGet, fetchGetNoSession} from '../../utils/fetchRequest';
import {_baseURL, API} from '../../configs/api.config';
import {Input, Button} from 'antd';
import {Toast, Picker, List, DatePicker} from 'antd-mobile';
import UploadEnclosure from '../../components/UploadEnclosure';
import moment from 'moment';


class LeaveAddPage extends Component{
   constructor(props){
        super(props);
        this.state = {
            targetData: [],
            fileList: [],
            startValue: null,
            endValue: null,
            leaveReason:null,
            votePerson: [],
        }
    }
    componentWillMount() {
        document.title = "学生请假";
    }
    componentDidMount() {
        this.node.scrollIntoView();
        getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.stuId, false)
            .then(organization => {
                this.setState({
                    targetData: organization.teachers,
                })
            }).catch(error => {
            console.log('error', error)
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }
     render(){
         const targetProps = {
             targetData: this.state.targetData,
             targetValues: this.state.targetList,
             title: '接收人',
             targetCount: this.state.targetCount,
             onTargetChange: this.onTargetChange.bind(this),
             onTargetFocus: this.onTargetFocus.bind(this),
             multiple: false,
         }

         const defaultTargetProps = {
             targetData: [],
             targetValues: this.state.targetList,
             title: '接收人',
             targetCount: this.state.targetCount,
             onTargetChange: this.onTargetChange.bind(this),
             onTargetFocus: this.onTargetFocus.bind(this),
             multiple: false,
         }

        return(
            <div ref={node => this.node = node} style={{fontFamily:"PingFangSC-Regular",letterSpacing:2.5}}>
                <div id="padding10">
                    <img class="img-circle" id="margin_top_bottom_15"
                         src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"} width={60}
                         height={60}/>
                    <span class="span_17 text_bold " id="row_margin">{this.props.userInfo.stuName}的请假条</span>
                </div>
                <div className="comhline_sty"></div>

                <DatePicker
                    value={this.state.startValue}
                    locale={{
                        okText: '确定',
                        dismissText: '取消'
                    }}
                    onChange={date => this.setState({startValue: date})}>
                    <List.Item arrow="horizontal">请假开始时间</List.Item>
                </DatePicker>

                <div className="comhline_sty1"></div>

                <DatePicker
                    value={this.state.endValue}
                    locale={{
                        okText: '确定',
                        dismissText: '取消'
                    }}
                    onChange={date => this.setState({endValue: date})}>
                    <List.Item arrow="horizontal">请假结束时间</List.Item>
                </DatePicker>

                <div className="comhline_sty"></div>
                <div onChange={this.handelValueCom}>
                    <textarea  ref='leaveReason' className="form-control textarea_sty" rows="4"
                               placeholder="请填写请假事由"></textarea>
                </div>
                <div className="comhline_sty"></div>
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}

                <div style={{margin:10}}>
                    <UploadEnclosure
                        action={API.UPLOAD_FILE}
                        fileList={this.state.fileList}
                        count={9}
                        multiple={true}
                        beforeUpload={this.beforeUpload.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    />
                </div>

                <div className="flex_center margin_top_20">
                    <center><Button type="button" className="btn btn-primary comBtn_sty"
                                    onClick={this.onSubmitClick}>提交</Button></center>
                </div>
            </div>
        )
    }
    onSubmitClick = (event) => {
        console.log('state', this.state)

        if (this.state.startValue == null || this.state.startValue == '') {
            Toast.fail('请输入请假开始时间')
            return
        }
        if (this.state.endValue == null || this.state.endValue == '') {
            Toast.fail('请输入请假结束时间！')
            return
        }
        var startT = new Date(this.state.startValue).getTime()
        var endT = new Date(this.state.endValue).getTime()
        // console.log('startT',startT)
        if (startT > endT) {
            Toast.fail('结束时间不可小于开始时间')
            return
        }
        if (this.state.leaveReason == null || this.state.leaveReason == '') {
            Toast.fail('请填写请假事由')
            return
        }
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.votePerson.push(node.userId)
            })
        } else {
            Toast.fail('请选择接收人')
            return
        }

        const approveFiles = []
        if (this.state.fileList) {
            this.state.fileList.forEach((value, index) => {
                approveFiles.push(value.picUrl)
            })
        }
        const params = {
            lvProposer:this.props.userInfo.stuId,
            lvName:this.props.userInfo.stuName+"的请假条",
            lvNotifier:JSON.stringify(this.state.votePerson),
            lvFiles:approveFiles,
            lvDetails:this.state.leaveReason,
            startDate: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log('param', params)
        fetchPost(API.leaveCreate, {
            leaveString:JSON.stringify(params)
        }, {}).then((response) => {
            console.log('response', response)
            if (response.success) {
                Toast.show(response.data, 1)
                // this.props.history.push("/leaveList/" + this.props.match.params.role)
                // this.props.history.push("/homePage")
                this.backTask = setTimeout(() => {
                    this.props.history.goBack();
                }, 2000)
            }
        }).catch((error) => {
            console.log('error', error)
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.stuId, false)
                .then(organization => {
                    this.setState({
                        targetData: organization.teachers,
                    })
                }).catch(error => {

            })
        }
    }
    onTargetChange = (value, label, checkNodes, count) => {
        this.checkNodes = checkNodes
        this.setState({
            targetList: value,
            targetCount: count
        });
    }
    handleChange = fileList => {
        if (fileList) {
            fileList.forEach((value, index) => {
                value.url = value.response ? (_baseURL + value.response.data) : value.url
                value.picUrl = value.response ? value.response.data : value.picUrl
            })
            this.setState({fileList})
        }
    }
    beforeUpload = (file, fileList) => {

    }
    handelValueCom = (event) => {
        //获取用户名的值
        let leaveReason = this.refs.leaveReason.value;
        //获得内容的值
        this.setState({
            leaveReason: leaveReason,
        })
    }













}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveAddPage)