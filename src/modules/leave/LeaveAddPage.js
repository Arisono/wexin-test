/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/app-gloal.css'
import  './LeaveApprovalPage.css'
import  './LeaveAddPage.css'
import {Input, Button,Upload, Icon, message,DatePicker} from 'antd';
import PicturesWallItem from "../../components/upload/PicturesWallItem";
import TargetSelect from "../../components/TargetSelect";
import {fetchPost,fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {isObjEmpty,getIntValue, getStrValue} from  '../../utils/common';
import {connect} from 'react-redux'

const {TextArea} = Input;

/**
 * Created by Arison on 14:39.
 */
class LeaveAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LeaveAddPage',
            role: "parent",
            targetCount: 1,
            targetList: [],
            targetData: [],
            checkNodes:[],
            lvNotifier:[],
            lvFiles:[],
            lvType:"",
            lvName:"",
            lvDetails:"",
            startDate:"",
            endDate:""
        };
    }

    clickLeaveList() {
        this.props.history.push("/leaveList/" + this.state.role)
    }


    componentWillMount() {
        document.title = "学生请假";
    }

    componentDidMount() {
         this.getOrganization();
    }

    getOrganization = () => {
        Toast.loading('', 0)

        fetchGet(API.USER_GETOBJECT, {
            userId:this.props.userInfo.userId,
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

                if (!isObjEmpty(schoolArray)) {
                    const classData = []

                    schoolArray.forEach((schoolObj, sIndex) => {
                        if (schoolObj) {
                            const parentArray = schoolObj.parents

                            const parentData = []
                            if (!isObjEmpty(parentArray)) {
                                parentArray.forEach((parentObj, pIndex) => {
                                    parentData.push({
                                        title: getStrValue(parentObj, 'userName'),
                                        userId: getIntValue(parentObj, 'userId'),
                                        userPhone: getStrValue(parentObj, 'userPhone'),
                                        value: getStrValue(parentObj, 'userName') + `-0-${sIndex}-${pIndex}`,
                                        key: `0-${sIndex}-${pIndex}`,
                                    })
                                })

                                classData.push({
                                    title: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName'),
                                    value: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName') + `-0-${sIndex}`,
                                    key: `0-${sIndex}`,
                                    children: parentData,
                                })
                            }
                        }
                    })

                    targetData.push({
                        title: `全体家长`,
                        value: `0`,
                        key: `0`,
                        children: classData,
                    })
                }
            }

            console.log('targetData', targetData)
            this.setState({
                targetData
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


    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
        }
    }

    onClickEvent(){
      //let commit=   this.btn_commit;
      if(isObjEmpty(this.state.lvDetails)){
          Toast.info("请输入请假理由！")
          return
      }
        if(isObjEmpty(this.state.startDate)){
            Toast.info("请输入请假开始时间")
            return
        }
        if(isObjEmpty(this.state.endDate)){
            Toast.info("请输入请假结束时间！")
            return
        }
        if(isObjEmpty(this.state.targetList)){
            Toast.fail("请选择抄送对象");
            return;
        }
        let personArrays=[];
        if (!isObjEmpty(this.state.checkNodes)) {
            this.state.checkNodes.forEach((node) => {
                personArrays.push(node.userId)
            })
        }
        let param={
            lvProposer:this.props.userInfo.stuId,
            lvName:this.props.userInfo.stuName+"的请假条",
            // lvRemarks:"",
            // lvType:2,
            // lvStatus:2,
            lvNotifier:JSON.stringify(personArrays),
            lvFiles:this.state.lvFiles,
            lvDetails:this.state.lvDetails,
            startDate:this.state.startDate,
            endDate:this.state.endDate
        }
        console.log("onClickEvent()",JSON.stringify(param));
        Toast.loading("");
        fetchPost(API.leaveCreate,{
                     leaveString:JSON.stringify(param)
                  }).then((response)=>{
                      console.log("response:"+JSON.stringify(response));
                      if(response.success){
                          Toast.success("提交成功！");
                          this.props.history.goBack();
                      }
                  }).catch((error)=>{
                      console.log("error:"+JSON.stringify(error));
                  })
    }

    onChangeEvent(event){
        let content=  this.input_content;
        switch (event.target.name){
            case "text-content":
                  this.setState({
                      lvDetails:event.target.value
                  })
                break
        }
    }

    callback=(file,fileList)=>{
        console.log("leaveAddPage:callback：",fileList);
        this.state.lvFiles.length=0;
        for (let i = 0; i < fileList.length; i++) {
            if(fileList[i].status==="done"){
                this.state.lvFiles.push(fileList[i].response.data)
            }
        }
        console.log("callback()", this.state.lvFiles);
    }

    handleRemove=(file)=>{

    }
    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count,
            checkNodes:checkNodes
        });
    }

    render() {
        const { targetCount, targetList,targetData} = this.state
        console.log("render()",targetData);
        const targetProps = {
            placeholder: '请选择抄送对象',
            targetData: targetData,
            targetValues: targetList,
            title: '抄送对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: this.state.targetList,
            title: '发布对象',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this)
        }
        return <div className="container-fluid ">
            <div className="row">
                <div className="col-xs-12">
                    <div id="padding10">
                        <img class="img-circle" id="margin_top_bottom_15"
                             src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"} width={60}
                             height={60}/>
                        <span class="span_17 text_bold " id="row_margin">{this.props.userInfo.stuName}的请假条</span>
                    </div>
                    <div className="row" id="page_block_min"></div>
                    <div className="row leave-input  flex_row padding_10
                           flex_center_vertical">
                        <span>开始时间：</span>
                        <div class="item_flex  flex_row_right">
                            <DatePicker
                                name="date-start"
                                ref={ref=>this.date_start=ref}
                                onChange={(date,dateString)=>{
                                    this.setState({startDate:dateString})
                                }}
                                style={{width: "100%"}}
                                        showTime format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="请选择开始时间"/>
                        </div>
                    </div>
                    <div className="row" id="page_horizontal_line"></div>
                    <div className="row leave-input flex_row padding_10
                           flex_center_vertical">
                        <span>结束时间：</span>
                        <div class="item_flex  flex_row_right">
                            <DatePicker
                                style={{width: "100%"}}
                                onChange={(date,dateString)=>{
                                    this.setState({endDate:dateString})
                                }}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请选择结束时间"/></div>

                    </div>
                    <div id="page_horizontal_line"></div>
                    <div className="row">
                        <TextArea  name="text-content"
                                   ref={ref=>this.input_content=ref}
                                   value={this.state.lvDetails}
                                   onChange={this.onChangeEvent.bind(this)}
                                  id="input_no_border" rows={4} placeholder="请填写请假理由"></TextArea>
                    </div>
                    <div className="row" id="page_horizontal_line"></div>
                    <div className="row ">
                        <div>
                            {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                                : <TargetSelect {...defaultTargetProps}/>}

                        </div>
                        {/*  <Icon type="right"/>*/}
                    </div>
                    <div className="row" id="page_block_min"></div>
                    <div className="row  span_15 ">
                        <div className="padding_5"><span   id="page_tile">附件</span></div>
                        <div id="row_padding_with">
                            <PicturesWallItem
                                action={API.UPLOAD_FILE}
                                number={4}
                                callback = { this.callback.bind(this)}>
                                handleRemove={this.handleRemove.bind(this)}
                            </PicturesWallItem>
                        </div>
                        {/*<div className="flex_center margin_top_20">*/}
                            {/*<Button ref={ref=>this.btn_commit=ref}  onClick={this.onClickEvent.bind(this)}  type={'primary'} block> 提交</Button>*/}
                        {/*</div>*/}
                        <div className="flex_center margin_top_20">
                            <center><Button type="button" className="btn btn-primary comBtn_sty"
                                            ref={ref=>this.btn_commit=ref}  onClick={this.onClickEvent.bind(this)}  >提交</Button></center>
                        </div>
                        <div onClick={this.clickLeaveList.bind(this)}
                             className="leave-history flex_center text_underline">请假记录
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveAddPage)