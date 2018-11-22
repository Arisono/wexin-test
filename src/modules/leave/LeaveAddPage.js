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
import { Upload, Icon, message } from 'antd';
import { DatePicker } from 'antd';
import PicturesWallItem from "../../components/upload/PicturesWallItem";
const { TextArea } = Input;
/**
 * Created by Arison on 14:39.
 */
class LeaveAddPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveAddPage'
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

    render(){
        return <div className="container-fluid ">
              <div className="row ">
                  <div className="col-xs-12">
                      <div  id="padding10">
                          <img class="img-circle" id="margin_top_bottom_15" src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}  width={60} height={60} />
                          <span class="span_17 text_bold " id="row_margin">陈小韩的请假条</span>
                      </div>
                      <div className="row" id="page_block_min"></div>
                      <div className="row"
                           class="leave-input flex_row padding_10
                           flex_center_vertical">
                          <span>开始时间：</span>
                          <div class="item_flex  flex_row_right">
                          <DatePicker style={{width:"100%"}} showTime format="YYYY-MM-DD HH:mm:ss"
                                      placeholder="请选择开始时间"/>
                          </div>
                      </div>
                      <div className="" id="page_horizontal_line"></div>
                      <div className="row"
                           class="leave-input flex_row padding_10
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
                      <div >
                          <TextArea id="input_no_border" rows={4} placeholder="请填写请假理由"></TextArea>
                      </div>
                      <div id="page_horizontal_line"></div>
                      <div className="row"
                           class="leave-input flex_row padding_10
                           flex_center_vertical">
                           <span>        抄送对象：</span>
                           <div className="item_flex">


                           </div>
                         <Icon type="right"/>
                      </div>
                      <div className="row" id="page_block_min"></div>
                      <div className=" padding_10 span_18 ">
                          <div className="">  <span >附件</span></div>
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

export  default LeaveAddPage;