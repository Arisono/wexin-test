/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './ReleaseAssignmentPage.css'
import '../../style/css/app-gloal.css'
import moment from 'moment'
import { Input,Button ,Icon,message } from 'antd';
import PicturesWallItem from "../../components/upload/PicturesWallItem";
import TargetSelect from "../../components/TargetSelect";
import {fetchPost,fetchGet} from '../../utils/fetchRequest';
import {API} from '../../configs/api.config';
import {isObjEmpty,getIntValue, getStrValue} from  '../../utils/common';

import {Toast,DatePicker,List} from 'antd-mobile'
import {connect} from 'react-redux'
const { TextArea } = Input;

/**
 * 发布作业
 * Created by Arison on 17:47.
 */
class ReleaseAssignmentPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReleaseAssignmentPage',
            targetList: [],
            targetCount: 0,
            targetData: [],
            checkNodes:[],
            startDate:null,//当前时间
            endDate: null,//截止时间
            data:{
                notifyName: '',//标题
                notifyType: '3',//作业发布
                notifyDetails: '',//内容
                notifyCreator: '10000',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: ['10001','10000','10002','10003'],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: null//截止时间
            }

        }
    }

    componentWillMount(){
          document.title ="发布作业";
     }

    callback=(file,fileList)=>{
        this.state.data.notifyFiles.length=0;
        for (let i = 0; i < fileList.length; i++) {
            if(fileList[i].status==="done"){
                this.state.data.notifyFiles.push(fileList[i].response.data)
            }
        }
    }

    handleRemove=(file)=>{
    }

    componentDidMount(){
        this.getOrganization();
    }


    changeName=(value)=>{
                console.log("changeName():"+value.target.value);
                this.setState({
                    data:{
                        notifyName: value.target.value,//标题
                        notifyType: '3',//作业发布
                        notifyDetails: this.state.data.notifyDetails,//内容
                        notifyCreator: '10000',//创建者
                        notifyStatus: '2',//状态  2发布  1草稿
                        userIds: ['10001','10000','10002','10003'],//通知
                        notifyFiles: [],
                        startDate: '',//当前时间
                        endDate: this.state.data.endDate//截止时间
                    }
                })

                console.log("changeName():"+JSON.stringify(this.state.targetList));
    }

    changeContent=(value)=>{
        console.log("changeName():"+value.target.value);
        this.setState({
            data:{
                notifyDetails: value.target.value,//标题
                notifyName: this.state.data.notifyName,//标题
                notifyType: '3',//作业发布
                notifyCreator: '10000',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: ['10001','10000','10002','10003'],//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: this.state.data.endDate//截止时间
            }
        })
    }
    changeEndDateOk=(value)=>{
        console.log("changeName():"+value);
        if(isObjEmpty(value)){
            message.info("请选择日期");
            return
        }
    }

    changeEndDate=(value,dateString)=>{
        console.log("changeName():"+value);
        console.log("changeName():"+dateString);
        this.setState({
            data:{
                notifyDetails: this.state.data.notifyDetails,//标题
                notifyName: this.state.data.notifyName,//标题
                notifyType: '3',//作业发布
                notifyCreator: '10000',//创建者
                notifyStatus: '2',//状态  2发布  1草稿
                userIds: JSON.stringify([10001,10000,10002,10003]),//通知
                notifyFiles: [],
                startDate: '',//当前时间
                endDate: dateString,//标题
            }
        })
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count,
            checkNodes:checkNodes
        });
    }

    commitAction=()=>{
        console.log("commitAction()"+this.state.data.notifyName);
        console.log("commitAction()"+this.state.data.notifyDetails);
        console.log("commitAction()"+this.state.data.endDate);
        console.log("commitAction() targetList:",this.state.targetList);
        console.log("commitAction() checkNodes:",this.state.checkNodes);
         if(isObjEmpty(this.state.data.notifyName)){
             Toast.fail("请输入作业名称");
             return;
         }
        if(isObjEmpty(this.state.data.notifyDetails)){
            Toast.fail('请输入作业内容...')
            return;
        }
        if(isObjEmpty(this.state.endDate)){
            Toast.fail("请输入截止时间");
            return;
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
        console.log("commitAction() endDate:",this.state.endDate);
        Toast.loading("");
        console.log("commitAction()",this.state.data.notifyDetails);
        fetchPost(API.homeWorkAdd,{
            notifyName:this.state.data.notifyName,//标题
            notifyType:'3',//作业发布
            notifyDetails:this.state.data.notifyDetails,//内容
            notifyCreator:this.props.userInfo.userId,//创建者
            notifyStatus:'2',//状态
            endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
            userIds: JSON.stringify(personArrays),//通知
            notifyFiles:JSON.stringify(this.state.data.notifyFiles)
        }).then((response)=>{
            Toast.hide();
            console.log("response:"+JSON.stringify(response));
            if (response.success){
                Toast.success("发布成功！")
                this.props.history.goBack();
            }
        }).catch((error)=>{
            Toast.fail("系统异常！")
            console.log("error:"+JSON.stringify(error));
        })
    }

    goListAction=()=>{
      //  this.props.history.push("/assignmentList/teacher");
        this.props.history.goBack();
    }

    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            this.getOrganization()
        }
    }


    render(){
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

        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="row" id="page_block_min"></div>
                    <div className="row">
                        {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                            : <TargetSelect {...defaultTargetProps}/>}
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_max"></div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="row flex_center_vertical"  >
                       {/* <div className=""><span   id="page_tile">截止时间</span></div>*/}
                        <div className="item_flex

                        margin_top_bottom_10
                        margin_left_right_10"  style={{marginRight:"10px"}}>
                            <DatePicker
                                showTime
                                value={this.state.endDate}
                                defaultValue={this.state.endDate}
                                onChange={date => this.setState({endDate:date}) }
                                format="YYYY-MM-DD HH:mm:ss"
                                onOk={this.changeEndDateOk}
                                placeholder="">
                                <List.Item arrow="horizontal" >截止时间</List.Item>
                            </DatePicker>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_max"></div>
            <div className="row" id="row_padding_height">
                <div className="col-xs-12">
                    <div className="row">
                    <Input placeholder="请输入作业名称"  defaultValue={this.state.data.notifyName}
                           style={{paddingLeft:"10px",fontSize:"18px"}}
                           onChange={this.changeName}
                           id="input_no_border"/>
                    </div>
                    <div className="row">
                        <div  id="page_horizontal_line"></div>
                    </div>
                    <div className="row">
                        <TextArea rows={4}
                                  value={this.state.data.notifyDetails}
                                  onChange={this.changeContent}
                                  style={{paddingLeft:"10px",paddingTop:"20px"}}
                                  placeholder="请输入作业内容"
                                  id="input_no_border"/>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_min"></div>
            <div className="row">
                    <div className="col-xs-12">
                        <div className="row"><div className="" id="page_tile">附件({this.state.data.notifyFiles.length}/4)</div></div>
                        <div className="row" id="row_padding_with" >
                            <PicturesWallItem
                                action={API.UPLOAD_FILE}
                                number={4}
                                callback = { this.callback.bind(this)}>
                                handleRemove={this.handleRemove.bind(this)}
                            </PicturesWallItem>


                        </div>
                        <div className="row flex_row flex_center margin_top_20" >
                            <Button type="primary"  onClick={this.commitAction} size="large"  block><span id="span-lager">发 布 作 业</span></Button>
                        </div>
                        <div id="row_center" onClick={this.goListAction}><span id="link_href" >历史发布</span></div>
                        <div id="bottom_height"></div>
                    </div>
            </div>
            <div className="row">

            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
        </div>
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
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseAssignmentPage)