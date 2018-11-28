/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './ReleaseAssignmentPage.css'
import '../../style/css/app-gloal.css'
import { Input,Button , DatePicker } from 'antd';
import PicturesWallItem from "../../components/upload/PicturesWallItem";
import {Icon} from "antd";
import TargetSelect from "../../components/TargetSelect";
const { TextArea } = Input;

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
 * 发布作业
 * Created by Arison on 17:47.
 */
class ReleaseAssignmentPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ReleaseAssignmentPage',
            targetList: ['1-1'],
            targetCount: 1
        };
    }

    callback(msg){
        console.log("leaveAddPage:callback："+JSON.stringify(msg));
    }

    componentDidMount(){

    }

    onTargetChange = (value, label, checkNodes, count) => {
        this.setState({
            targetList: value,
            targetCount: count
        });
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
        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="row" id="page_block_min"></div>
                    <div className="row">
                        <TargetSelect   {...targetProps}></TargetSelect>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_max"></div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="row flex_center_vertical"  >
                        <div className="margin_left_right_10"><span   id="page_tile">截止时间</span></div>
                        <div className="item_flex
                        flex_row_right
                        margin_top_bottom_10
                        margin_left_right_10"  style={{marginRight:"10px"}}>
                                <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder=""
                                />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_max"></div>
            <div className="row" id="row_padding_height">
                <div className="col-xs-12">
                    <div className="row">
                    <Input placeholder="请输入作业名称" style={{paddingLeft:"28px",fontSize:"18px"}}  id="input_no_border"/>
                    </div>
                    <div className="row">
                        <div  id="page_horizontal_line"></div>
                    </div>
                    <div className="row">
                        <TextArea rows={4} style={{paddingLeft:"28px",paddingTop:"20px"}} placeholder="请输入作业内容" id="input_no_border"/>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_min"></div>
            <div className="row">
                    <div className="col-xs-12">
                        <div className="row"><div className="col-xs-6" id="page_tile">附件</div></div>
                        <div className="row" id="row_padding_with" >
                            <PicturesWallItem action={'url路径'} number={1} callback = { this.callback.bind(this)}></PicturesWallItem>

                        </div>
                        <div className="row flex_row flex_center margin_top_20" >
                            <Button type="primary" size="large"  block><span id="span-lager">发 布 作 业</span></Button>
                        </div>
                        <div id="row_center"><span id="link_href" >历史发布</span></div>
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
}

export  default ReleaseAssignmentPage;