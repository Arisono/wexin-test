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
import {fetchPost} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {isObjEmpty} from '../../utils/common'

const {TextArea} = Input;
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
class LeaveAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LeaveAddPage',
            role: "parent",
            targetList: ['1-1'],
            targetCount: 1,
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

    }
    onClickEvent(){
      let commit=   this.btn_commit;
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

        // "lvName":"病假",
        //     "lvDetails":"请假详情",
        //     "lvType":2,
        //     "lvProposer":10000,
        //     "lvStatus":2,
        //     "startDate":"Date类型的",
        //     "endDate":"Date类型",
        //     "lvRemarks":"备注"
        let param={
            lvProposer:'10000',
            lvName:"陈小春的请假条",
            // lvRemarks:"",
            // lvType:2,
            // lvStatus:2,
            lvNotifier:["10002"],
            lvFiles:[],
            lvDetails:this.state.lvDetails,
            startDate:this.state.startDate,
            endDate:this.state.endDate
        }
            console.log("onClickEvent()",JSON.stringify(param));
        fetchPost(API.leaveCreate,{
                     leaveString:JSON.stringify(param)
                  }).then((response)=>{
                      console.log("response:"+JSON.stringify(response));
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
            targetCount: count
        });
    }

    render() {
        const {targetCount, targetList} = this.state
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
                    <div id="padding10">
                        <img class="img-circle" id="margin_top_bottom_15"
                             src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"} width={60}
                             height={60}/>
                        <span class="span_17 text_bold " id="row_margin">陈小韩的请假条</span>
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
                    <div className="row leave-input flex_row
                           flex_center">
                        <div style={{width: "100%"}}>
                            <TargetSelect className="flex_row flex_center"
                                          style={{width: "310px"}} {...targetProps}></TargetSelect>

                        </div>
                        {/*  <Icon type="right"/>*/}
                    </div>
                    <div className="row" id="page_block_min"></div>
                    <div className="row padding_10 span_15 ">
                        <div><span >附件</span></div>
                        <div>
                            <PicturesWallItem
                                action={API.UPLOAD_FILE}
                                number={4}
                                callback = { this.callback.bind(this)}>
                                handleRemove={this.handleRemove.bind(this)}
                            </PicturesWallItem>
                        </div>
                        <div className="flex_center margin_top_20">
                            <Button ref={ref=>this.btn_commit=ref}  onClick={this.onClickEvent.bind(this)}  type={'primary'} block> 提交</Button>
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

export  default LeaveAddPage;