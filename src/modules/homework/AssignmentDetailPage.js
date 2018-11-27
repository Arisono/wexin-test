/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AssignmentDetailPage.css'
import '../../style/css/app-gloal.css'
import { List} from 'antd';
/**
 * 作业详情
 * Created by Arison on 17:49.
 */

const data =[{
    name:'张山',
    content:'陈老师收到'
},{
    name:'张山',
        content:'陈老师收到'
},{
    name:'张山',
        content:'陈老师收到'
}]
    class AssignmentDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'AssignmentDetailPage'
        };
    }
    
    
    componentDidMount(){
        
    }
   
    render(){
        return <div className="container-fluid">
                  <div className="row" id="layout_header">
                      <div className="col-xs-4" id="padding10">
                          <img className="img-circle" style={{marginLeft:"10px"}}  src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}
                               width={80} height={80} />
                      </div>
                      <div className="col-xs-8" id="padding10">
                          <div className="margin_top_bottom_15" ><span className="span_19" style={{color:"#0088DC"}}>陈小龙老师</span></div>
                          <div ><span className="span_16">2018-09-09:00</span></div>
                      </div>
                  </div>
               <div className="row">
                <div className="col-xs-12">
                      <div className="margin_top_20">
                          <span className="span_20 text_bold">周末语文作业</span>
                      </div>
                      <div className="margin_top_bottom_15"><span >背诵弟子规，周一回校检查背诵情况</span></div>
                      <div className="margin_top_bottom_15 flex_center"><img style={{margin:"0px"}} src={"https://upload-images.jianshu.io/upload_images/1131704-933140165dae3e52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}  width={290} height={150} /></div>
                </div>
            </div>
            <div className="row" id="page_block_min"></div>
            <div className="row">
                 <div className="col-xs-12">
                          <div className="margin_top_bottom_15">留言(20/40)</div>
                     <div id="page_horizontal_line"></div>
                          <div>
                              <List dataSource={data} renderItem={item=>(
                                  <List.Item>
                                      <div>
                                          <span className="text_bold margin_left_right_10">{item.name}:</span>   <span>{item.content}</span>
                                      </div>
                                  </List.Item>
                              )}/>




                          </div>
                  </div>
              </div>
        </div>
    }
}

export  default AssignmentDetailPage;