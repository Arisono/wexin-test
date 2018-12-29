/**
*   Created by FANGlh on 2018/12/12 11:45.
*   Desc:
*/

import React,{Component} from 'react';
import '../../style/css/app-gloal.css'
import  './LeaveApprovalPage.css'
import  './LeaveAddPage.css'
import {Toast,Picker,List,DatePicker} from 'antd-mobile';
import UploadEnclosure from '../../components/UploadEnclosure';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../utils/fetchRequest';
import {_baseURL,API} from '../../configs/api.config';
import { Input,Button } from 'antd';
import moment from 'moment'
import {connect} from 'react-redux';
import TargetSelect from '../../components/TargetSelect';
import {getIntValue, getStrValue, isObjEmpty} from "../../utils/common";


class LeaveAddCPage extends Component{
   componentDidMount() {
        this.getOrganization()
    }
   constructor(props){
        super(props);
        this.state = {
            targetData: [],
            votePerson:[],
            fileList: [],
            typeLeave:[
                {
                    label: '事假',
                    value: '1'
                },{
                    label: '病假',
                    value: '2'
                },{
                    label: '丧假',
                    value: '3'
                },{
                    label:'陪产假',
                    value:'4'
                }
            ],
            leaveName:null,
            leaveReason:null,
            leaveType:null,
            startValue:null,
            endValue:null,
        }
    }


    componentWillMount(){
        document.title ="请假申请";
    }

     render(){
         const targetProps = {
             targetData: this.state.targetData,
             targetValues: this.state.targetList,
             title: '接受人',
             targetCount: this.state.targetCount,
             onTargetChange: this.onTargetChange.bind(this),
             onTargetFocus: this.onTargetFocus.bind(this)
         }

         const defaultTargetProps = {
             targetData: [],
             targetValues: this.state.targetList,
             title: '接受人',
             targetCount: this.state.targetCount,
             onTargetChange: this.onTargetChange.bind(this),
             onTargetFocus: this.onTargetFocus.bind(this)
         }
        return(
            <div>
                <Picker
                    data={this.state.typeLeave} title='请假类型' extra='请选择'
                    value={this.state.leaveType}
                    onChange={this.handleSelectChange}
                    onOk={this.handleSelectChange} cols={1}>
                    <List.Item arrow="horizontal" >请假类型</List.Item>
                </Picker>
                <div className="comhline_sty1"></div>

                <DatePicker
                    value={this.state.startValue}
                    onChange={date => this.setState({startValue:date})}>
                    <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>

                <div className="comhline_sty1"></div>

                <DatePicker
                    value={this.state.endValue}
                    onChange={date => this.setState({endValue:date})}>
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>

                <div className="comhline_sty"></div>
               <div onChange={this.handelValueCom}>
                    <textarea autoFocus="autoFocus" ref='leaveReason' className="form-control textarea_sty" rows="4" placeholder="请填写请假理由…"></textarea>
               </div>
                <div className="comhline_sty"></div>
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}

                <UploadEnclosure
                    action={API.UPLOAD_FILE}
                    fileList={this.state.fileList}
                    count={9}
                    multiple={true}
                    beforeUpload={this.beforeUpload.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                />

                <div className="flex_center margin_top_20">
                    <center><Button type="button" className="btn btn-primary comBtn_sty"  onClick={this.onSubmitClick}>提交</Button></center>
                </div>
                <div
                    onClick={this.clickLeaveList.bind(this)}
                    className="leave-history flex_center text_underline">
                    请假记录</div>
            </div>
        )
    }

    onSubmitClick = (event)=>{
         console.log('state',this.state)
        if(this.state.leaveType == null || this.state.leaveType == ''){
            Toast.fail('请选择请假类型')
            return
        }
        if(this.state.startValue == null || this.state.startValue == ''){
            Toast.fail('请选择开始时间')
            return
        }
        if(this.state.endValue == null || this.state.endValue == ''){
            Toast.fail('请选择结束时间')
            return
        }
        var startT = new Date(this.state.startValue).getTime()
        var endT = new Date(this.state.endValue).getTime()
        // console.log('startT',startT)
        if(startT > endT){
            Toast.fail('结束时间不可小于开始时间')
            return
        }
        if(this.state.leaveReason == null || this.state.leaveReason == ''){
            Toast.fail('请填写请假理由')
            return
        }
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.votePerson.push(node.userId)
            })
        }else {
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
            lvName:"",
            lvType:"",
            lvDetails:this.props.userInfo.userName+"的请假条",
            lvPro:this.props.userInfo.userId,
            lvProposer:JSON.stringify(this.state.votePerson[0]),
            lvFiles:approveFiles,
            lvRemarks:this.state.leaveReason,
            startDate:moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
            endDate:moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),

        }
        console.log('param',params)
        fetchPost(API.leaveCreate,params,{}).then((response)=>{
                console.log('response',response)
                if(response.success){
                    Toast.show(response.data,1)
                    this.props.history.push("/leaveList/" + this.props.match.params.role)
                }
            }).catch((error) =>{
                console.log('error',error)
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    Toast.fail('请求异常', 2)
                }
            })
    }

    beforeUpload = (file, fileList) => {

    }
    clickLeaveList(){
        this.props.history.push("/leaveList/" + this.props.match.params.role)
    }
    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
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
    handleSelectChange =(value) =>{
        console.log('value',value)
        this.setState({
           leaveType:value
        },function () {
            var ln = null;
            switch (value){
                case "1":
                    ln = "事假"
                    break;
                case "2":
                    ln = "病假"
                    break;
                case "3":
                    ln = "丧假"
                    break;
                case "4":
                    ln = "陪产假"
                    break;
            }
            this.setState({
                leaveName:ln
            })
        })
    }
    handelValueCom = (event)=>{
        //获取用户名的值
        let leaveReason = this.refs.leaveReason.value;
        //获得内容的值
        this.setState({
            leaveReason:leaveReason,
        })
    }
    getOrganization = () => {
        Toast.loading('', 0)

        fetchGet(API.USER_GETOBJECT, {
            // userId:10008,
            stuId:this.props.userInfo.userId
        }).then(response => {
            Toast.hide()
            const {targetData} = this.state
            targetData.length = 0
            if (response && response.data) {
                const schoolArray = response.data.schools
                const teacherArray = response.data.teachers
                if (!isObjEmpty(teacherArray)) {
                    const teacherData = []
                    teacherArray.forEach((teacherObj, index) => {
                        if (teacherObj) {
                            teacherData.push({
                                title: getStrValue(teacherObj, 'userName'),
                                userId: getIntValue(teacherObj, 'userId'),
                                userPhone: getStrValue(teacherObj, 'userPhone'),
                                value: getStrValue(teacherObj, 'userName') + `-1-${index}`,
                                key: `1-${index}`,
                            })
                        }
                    })

                    targetData.push({
                        title: `全体老师`,
                        value: `1`,
                        key: `1`,
                        children: teacherData,
                    })
                }
            }
            console.log('targetData', targetData)
            this.setState({
                targetData,
            })
        }).catch(error => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }
}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveAddCPage)