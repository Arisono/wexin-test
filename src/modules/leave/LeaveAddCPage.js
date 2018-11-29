/**
 * Created by Arison on 2018/11/22.
 */
/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/app-gloal.css'
import  './LeaveApprovalPage.css'
import  './LeaveAddPage.css'
import { Input,Button } from 'antd';
import {Select,DatePicker } from 'antd';
import PicturesWallItem from "../../components/upload/PicturesWallItem";
import TargetSelect from "../../components/TargetSelect";
const { TextArea } = Input;
const Option = Select.Option;


const teacherData = []
const parentData = []

for (let i = 1; i < 6; i++) {
    parentData.push({
        title: `三年级${i}班`,
        value: `0-${i}`,
        key: `0-${i}`,
        children: [{
            title: `饶猛`,
            value: `0-${i}-0`,
            key: `0-${i}-0`
        }, {
            title: `李泞`,
            value: `0-${i}-1`,
            key: `0-${i}-1`,
        }, {
            title: `章晨望`,
            value: `0-${i}-2`,
            key: `0-${i}-2`,
        }],
    })
}

for (let i = 1; i < 10; i++) {
    teacherData.push({
        title: `老师${i}`,
        value: `1-${i}`,
        key: `1-${i}`,
    })
}


const targetData = [
    {
        title: `全体家长`,
        value: `0`,
        key: `0`,
        children: parentData,
    },
    {
        title: `全体老师`,
        value: `1`,
        key: `1`,
        children: teacherData,
    }
]
/**
 * Created by Arison on 14:39.
 */
class LeaveAddCPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveAddPage',
            targetList: ['1-1'],
            targetCount: 1
        };
    }

    clickLeaveList(){
        this.props.history.push("/leaveList")
    }

    componentDidMount(){

    }


    callback(msg){
        console.log("leaveAddPage:callback："+JSON.stringify(msg));
    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count
        });
    }

     handleChange(value) {
    console.log(`selected ${value}`);
     }

    render(){

        const { targetCount, targetList} = this.state
        const targetProps = {
            placeholder: '请选择抄送对象',
            targetData: targetData,
            targetValues: targetList,
            title: '抄送对象',
            targetCount: targetCount,
            onTargetChange: this.onTargetChange.bind(this)
        }
        return <div className="container-fluid ">
            <div className="row">
                <div className="col-xs-12">
                    <div className="row " id="page_block_min"></div>
                    <div className="row leave-input flex_row padding_10
                           flex_center_vertical">
                        <span>请假类型：</span>
                        <Select className="item_flex  flex_row_right"
                                defaultValue="调休" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                            <Option value="事假">事假</Option>
                            <Option value="病假">病假</Option>
                            <Option value="年假" >年假</Option>
                            <Option value="其它">其它</Option>
                        </Select>
                    </div>

                    <div className="row leave-input  flex_row padding_10
                           flex_center_vertical">
                        <span>开始时间：</span>
                        <div class="item_flex  flex_row_right">
                            <DatePicker style={{width:"100%"}} showTime format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="请选择开始时间"/>
                        </div>
                    </div>
                    <div className="row" id="page_horizontal_line"></div>
                    <div className="row leave-input flex_row padding_10
                           flex_center_vertical">
                        <span>结束时间：</span>
                        <div class="item_flex  flex_row_right">
                            <DatePicker
                                style={{width:"100%"}}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请选择结束时间"/></div>

                    </div>
                    <div id="page_horizontal_line"></div>
                    <div className="row" >
                        <TextArea id="input_no_border" rows={4} placeholder="请填写请假理由"></TextArea>
                    </div>
                    <div  className="row"  id="page_horizontal_line"></div>
                    <div className="row">
                        {/*  <span>        抄送对象：</span>*/}
                            <TargetSelect   {...targetProps}></TargetSelect>
                        {/*  <Icon type="right"/>*/}
                    </div>
                    <div className="row" id="page_block_min"></div>
                    <div className="row padding_10 span_15 ">
                        <div>  <span >附件</span></div>
                        <div>
                            <PicturesWallItem action={'url路径'} number={1} callback = { this.callback.bind(this)}></PicturesWallItem>
                        </div>
                        <div className="flex_center margin_top_20">
                            <Button   type={'primary'}  block> 提交</Button>
                        </div>

                        <div   onClick={this.clickLeaveList.bind(this)} className="leave-history flex_center text_underline">请假记录</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export  default LeaveAddCPage;