/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/app-gloal.css'
import  './LeaveApprovalPage.css'
import  './LeaveAddPage.css'
import { Input } from 'antd';
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


    componentDidMount(){

    }

    render(){
        return <div className="container-fluid clear_margin">
              <div className="row">
                  <div className="col-xs-12">
                      <div  className="border_lightGreen" id="padding10">
                          <img class="img-circle" id="margin_top_bottom_20" src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}  width={60} height={60} />
                          <span class="span_19 text_bold " id="row_margin">陈小韩的请假条</span>
                      </div>
                      <div className="row" id="page_block_min"></div>
                      <div className="row"
                           class="leave-input flex_row padding_10
                           flex_center">
                          <span>请假开始时间：</span>
                          <Input ></Input>
                          <img style={{marginLeft:"10px"}} src={""}  width={30} height={30} />
                      </div>
                      <div id="page_horizontal_line"></div>
                      <div className="row"
                           class="leave-input flex_row padding_10
                           flex_center">
                          <span>请假结束时间：</span>
                          <Input ></Input>
                          <img style={{marginLeft:"10px"}} src={""}  width={30} height={30} />
                      </div>
                      <div id="page_horizontal_line"></div>
                      <div >
                          <TextArea id="input_no_border"></TextArea>
                      </div>
                      <div id="page_horizontal_line"></div>
                      <div>

                      </div>
                      <div className="row" id="page_block_min"></div>
                  </div>
              </div>
        </div>
    }
}

export  default LeaveAddPage;