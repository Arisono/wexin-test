/**
 *   Created by FANGlh on 2018/11/6 15:47.
 */

import React,{Component} from 'react';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './SendMeet.css';
import 'antd/dist/antd.css';
import { Select, TreeSelect,Icon,Button} from 'antd';
import moment from 'moment'
import add_newimg from '../../../style/imgs/add_new.png';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {Toast,Picker,List,DatePicker} from 'antd-mobile';
import {getIntValue, getStrValue, isObjEmpty} from "../../../utils/common";
import TargetSelect from '../../../components/TargetSelect';
import {connect} from 'react-redux';

const Option = Select.Option;

function Test(){
    return(
        <div >
            <img className="meet_penson_img img-circle" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
        </div>
    )
}
class SendMeet extends Component{
    componentWillMount() {
        document.title = '发起会议'
    }
    componentDidMount() {
        this.getOrganization()
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
    constructor(){
        super();
        this.state = {
            targetList: [],
            targetCount: 0,
            targetData: [],
            startValue:null,
            endValue: null,
            endOpen: false,
            titleValue:null,
            contentValue:null,
            earlyTime:null,
            headerArray: [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3],
            meetPerson:[],
            meetAddress:null,
            noticeType:[{
                label:'创建即提醒',
                value:'0'
            },{
                label:'会前5分钟',
                value:5
            },{
                label:'会前15分钟',
                value:15
            },{
                label:'会前25分钟',
                value:25
            },{
                label:'会前35分钟',
                value:35
            }]
        };

    }
    render(){
        const targetProps = {
            targetData: this.state.targetData,
            targetValues: this.state.targetList,
            title: '发布对象',
            targetCount: this.state.targetCount,
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
        return(
                <div onChange={this.handelValueCom}>
                    {/*<p>{new Date().getTime()}</p>*/}
                    <textarea autoFocus="autoFocus" ref='meetTitle' className="form-control textarea_sty" rows="2" placeholder="请填写会议主题…" ></textarea>
                    <textarea ref='meetAddress' className="form-control textarea_sty" rows="3" placeholder="请填写会议地址…"></textarea>
                    <div className="comhline_sty"></div>
                    <div  className="common-column-layout" style={{fontSize:15}}>
                        <DatePicker
                            value={this.state.startValue}
                            onChange={date => this.setState({startValue:date})}>
                            <List.Item arrow="horizontal">会议开始时间</List.Item>
                        </DatePicker>
                        <div className="comhline_sty1"></div>
                        <DatePicker
                            value={this.state.endValue}
                            onChange={date => this.setState({endValue:date})}>
                            <List.Item arrow="horizontal">会议结束时间</List.Item>
                        </DatePicker>
                        <div className="comhline_sty1"></div>
                        <Picker
                            data={this.state.noticeType} title='提醒时间' extra='请选择'
                            value={this.state.earlyTime}
                            onChange={this.handleSelectChange}
                            onOk={this.handleSelectChange} cols={1}>
                            <List.Item arrow="horizontal" >提醒时间</List.Item>
                        </Picker>
                    </div>

                    <div className="comhline_sty1"></div>

                    <span className="item_sty">与会人</span>
                        {/*{this.state.headerArray.map((itemata,index) => <Test key={index} itemata = {itemata}></Test>)}*/}
                        {/*<img onClick={this.addPerson} className="meet_penson_img img-circle" style={{height: 40,width: 40,marginTop:10,marginLeft:5}} src={add_newimg}/>*/}
                    {/*<div> <textarea className="form-control textarea_sty" >ww</textarea></div>*/}
                    {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                        : <TargetSelect {...defaultTargetProps}/>}
                    <center><Button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSaveClick}>创建</Button></center>
                </div >
        )
    }
    doSaveClick = (event)=>{
        console.log('state',this.state)
        if (this.state.titleValue == null || this.state.titleValue == ''){
            Toast.fail('请填写会议主题...')
            return
        }
        if (this.state.meetAddress == null || this.state.meetAddress == ''){
            Toast.fail('请填写会议地址...')
            return
        }
        if (this.state.startValue == null || this.state.startValue == ''){
            Toast.fail('请选择开始时间...')
            return
        }
        if (this.state.endValue == null || this.state.endValue == ''){
            Toast.fail('请选择结束时间...')
            return
        }
        if (this.state.meetPerson.length == 0){
            Toast.fail('请选择与会人...')
            return
        }
        var nowT = new Date().getTime()
        var startT = new Date(this.state.startValue).getTime()
        var endT = new Date(this.state.endValue).getTime()

        console.log('startT',startT)
        if(nowT > startT){
            Toast.show('开始时间不可小于当前时间',1)
            return
        }
        if(startT > endT){
            Toast.show('结束时间不可小于开始时间',1)
            return
        }
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.meetPerson.push(node.userId)
            })
        }
        var noticeT = startT - this.state.earlyTime*1000*60
        // console.log('this.state.earlyTime*1000*60',this.state.earlyTime*1000*60)
        console.log('noticeT',noticeT)
        console.log('noticeT',new Date(noticeT))
        let params = {
            notifyType:6,
            notifyName:this.state.titleValue,
            notifyAddress:this.state.meetAddress,
            startDate:this.state.startValue,
            endDate:this.state.endValue,
            reminderDate:new Date(noticeT),
            userIds:this.state.meetPerson
        }

        console.log('params',params)
        fetchPost(API.issueNotification,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success){
                    Toast.show('创建成功',1)
                }
            })
            .catch((error) =>{
                console.log('error',error)
                console.log('error',error)
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    if (typeof error === 'string') {
                        Toast.fail(error, 2)
                    } else {
                        Toast.fail('请求异常', 2)
                    }
                }
            })
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
    selectPersononChange = (value) => {
        console.log('selectPersononChange ', value);
        this.setState({meetPerson:value });
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    handleSelectChange =(value) =>{
        console.log(`selected ${value}`);
        this.setState({
            earlyTime:value
        })
    }

    handelValueCom = (event)=>{
        //获取用户名的值
        let meetTitle = this.refs.meetTitle.value;
        //获得内容的值
        let meetAddress = this.refs.meetAddress.value;

        this.setState({
            titleValue:meetTitle,
            meetAddress:meetAddress
        })
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SendMeet)