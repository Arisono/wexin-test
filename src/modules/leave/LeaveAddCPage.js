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


class LeaveAddCPage extends Component{
   constructor(props){
        super(props);
        this.state = {
            fileList: [],
            typeLeave:[
                {
                    label: '病假',
                    value: '1'
                },{
                    label: '年假',
                    value: '2'
                },{
                    label: '事假',
                    value: '3'
                }
            ],
            leaveReason:null,
            leaveType:null,
            startValue:null,
            endValue:null,
        }
    }
     render(){
        return(
            <div>
                {/*<Picker*/}
                    {/*data={this.state.typeLeave} title='请假类型' extra='请选择'*/}
                    {/*value={this.state.leaveType}*/}
                    {/*onChange={this.handleSelectChange}*/}
                    {/*onOk={this.handleSelectChange} cols={1}>*/}
                    {/*<List.Item arrow="horizontal" >请假类型</List.Item>*/}
                {/*</Picker>*/}
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
                <div   onClick={this.clickLeaveList.bind(this)} className="leave-history flex_center text_underline">请假记录</div>
            </div>
        )
    }

    onSubmitClick = (event)=>{
         console.log('state',this.state)
        // if(this.state.leaveType == null || this.state.leaveType == ''){
        //     Toast.fail('请选择请假类型')
        //     return
        // }
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
        const approveFiles = []
        if (this.state.fileList) {
            this.state.fileList.forEach((value, index) => {
                approveFiles.push(value.picUrl)
            })
        }
        const params = {
            lvPro:this.props.userInfo.stuId,
            lvName:this.props.userInfo.userName+"的请假条",

            // lvNotifier:JSON.stringify(personArrays),
            lvFiles:approveFiles,
            lvDetails:this.state.leaveReason,
            startDate:moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
            endDate:moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss')
        }
        fetchPost(API.oaCreate,params,{}).then((response)=>{
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
        console.log('leaveType',value)
        this.setState({
            leaveType:value
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
}
let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveAddCPage)