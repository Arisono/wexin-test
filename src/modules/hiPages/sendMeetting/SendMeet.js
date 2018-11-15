/**
 *   Created by FANGlh on 2018/11/6 15:47.
 */

import React,{Component} from 'react';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './SendMeet.css';
import 'antd/dist/antd.css';
import { DatePicker,Select  } from 'antd';
import moment from 'moment'
import add_newimg from '../../../style/imgs/add_new.png';
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
            startValue: null,
            endValue: null,
            endOpen: false,
            titleValue:null,
            contentValue:null,
            earlyTime:null,
            headerArray: [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3]
        };

    }
    render(){

        return(
            <div >
                <div onChange={this.handelValueCom}>
                    <textarea autofocus="autofocus" ref='meetTitle' className="form-control textarea_sty" rows="2" placeholder="请填写会议主题…" ></textarea>
                    <textarea ref='meetAddress' className="form-control textarea_sty" rows="3" placeholder="请填写会议地址…"></textarea>
                    <div className="comhline_sty"></div>
                    <div  className="item_sty">
                        <div style={{width:150}}>会议开始时间:</div>
                        <div className="text-right" style={{width:"100%",}}>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.startValue}
                                placeholder="请选择开始时间"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            /><img src={nextArrowimg} className="nextarr_sty"/></div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <div  className="item_sty">
                        <div style={{width:150}}>会议结束时间:</div>
                        <div className="text-right" style={{width:"100%",}}>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={this.state.endValue}
                                placeholder="请选择结束时间"
                                onChange={this.onEndChange}
                                open={this.state.endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                            <img src={nextArrowimg} className="nextarr_sty"/></div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <div  className="item_sty">
                        <div style={{width:150}}>提醒:</div>
                        <div className="text-right" style={{width:"100%",}}>
                            <Select defaultValue="请选择" style={{ width:120 }} onChange={this.handleSelectChange}>
                                <Option value="5">会前5分钟</Option>
                                <Option value="15">会前15分钟</Option>
                                <Option value="25">会前25分钟</Option>
                                <Option value="35">会前35分钟</Option>
                            </Select>
                            <img src={nextArrowimg} className="nextarr_sty"/>
                        </div>
                    </div>
                    <div className="comhline_sty1"></div>

                    <span className="item_sty">与会人</span>
                    <div className="meet_penson">
                        {this.state.headerArray.map((itemata,index) => <Test key={index} itemata = {itemata}></Test>)}
                        <img onClick={this.addPerson} className="meet_penson_img img-circle" style={{height: 40,width: 40,marginTop:10,marginLeft:5}} src={add_newimg}/>
                    </div>

                    <center><button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSaveClick}>创建</button></center>
                </div >
            </div>
        )
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    handleSelectChange =(value) =>{
        console.log(`selected ${value}`);
        this.setState({
            earlyTime:value
        })
    }

    addPerson = (event)=>{
        let headerArray =  [...this.state.headerArray,1];
        this.setState({
            headerArray
        })
    }
    doSaveClick = (event)=>{
        let titleValue = this.state.titleValue;
        let contentValue = this.state.contentValue;
        let startValue = moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss');
        let endValue = moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss');
        let earlyTime = this.state.earlyTime

        console.log('titleValue',titleValue);
        console.log('contentValue',contentValue);
        console.log('startValue',startValue);
        console.log('endValue',endValue);
        console.log('earlyTime',earlyTime);
    }
    handelValueCom = (event)=>{
        //获取用户名的值
        let meetTitle = this.refs.meetTitle.value;
        //获得内容的值
        let meetAddress = this.refs.meetAddress.value;

        this.setState({
            titleValue:meetTitle,
            contentValue:meetAddress
        })
    }
}