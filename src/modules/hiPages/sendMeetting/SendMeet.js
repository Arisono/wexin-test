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

const Option = Select.Option;

function Test(){
    return(
        <div >
            <img className="meet_penson_img img-circle" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
        </div>
    )
}
export default class SendMeet extends Component{
    componentWillMount() {
        document.title = '发起投票'
    }
    constructor(){
        super();
        this.state = {
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
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;

        const treeData = [
            {
                title: '研发部',
                value: 1000,
                key: 1000,
                children: [{
                    title: '吴彦祖',
                    value: 10000,
                    key: 10000,
                },{
                    title: '陈冠希',
                    value: 10001,
                    key: 10001,
                },{
                    title: '古天乐',
                    value: 10002,
                    key: 10002,
                },{
                    title: '黄宗伟',
                    value: 10003,
                    key: 10003,
                },{
                    title: '关之琳',
                    value: 10004,
                    key: 10004,
                }, {
                    title: '林青霞',
                    value: 10005,
                    key: 10005,
                }, {
                    title: '张曼玉',
                    value: 10006,
                    key: 10006,
                },{
                    title: '王祖贤',
                    value: 10007,
                    key: 10007,
                }],
            }];
        const tProps = {
            treeData,
            value: this.state.meetPerson,
            onChange: this.selectPersononChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择与会人',
            allowClear:true,
            style: {
                width: '100%',
            },
        };
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
                    <TreeSelect {...tProps} />
                    <center><Button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSaveClick}>创建</Button></center>
                </div >
        )
    }
    doSaveClick = (event)=>{
        let titleValue = this.state.titleValue;
        let contentValue = this.state.contentValue;
        let startValue = moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss');
        let endValue = moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss');
        let earlyTime = this.state.earlyTime

        console.log('state',this.state)
        if (this.state.titleValue == null || this.state.titleValue == ''){
            Toast.show('请填写会议主题...',1)
            return
        }
        if (this.state.meetAddress == null || this.state.meetAddress == ''){
            Toast.show('请填写会议地址...',1)
            return
        }
        if (this.state.startValue == null || this.state.startValue == ''){
            Toast.show('请选择开始时间...',1)
            return
        }
        if (this.state.endValue == null || this.state.endValue == ''){
            Toast.show('请选择结束时间...',1)
            return
        }
        if (this.state.meetPerson.length == 0){
            Toast.show('请选择与会人...',1)
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
        var noticeT = startT - this.state.earlyTime*1000*60
        // console.log('this.state.earlyTime*1000*60',this.state.earlyTime*1000*60)
        console.log('noticeT',noticeT)
        console.log('noticeT',new Date(noticeT))
        return
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
            })
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