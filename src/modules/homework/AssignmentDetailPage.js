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
                          <img style={{marginLeft:"10px"}}  src={""}  width={60} height={60} />
                      </div>
                      <div className="col-xs-8" id="padding10">
                          <div ><span>陈小龙老师</span></div>
                          <div ><span>2018-09-09:00</span></div>
                      </div>
                  </div>
               <div className="row">
                <div className="col-xs-12">
                      <div >周末语文作业</div>
                      <div >课文背诵</div>
                      <div><img style={{margin:"10px"}} src={""}  width={360} height={150} /></div>
                </div>
            </div>
            <div className="row" id="page_block_min"></div>
            <div className="row">
                 <div className="col-xs-12">
                          <div id="padding10">留言(20/40)</div>
                     <div id="page_horizontal_line"></div>
                          <div>
                              <List dataSource={data} renderItem={item=>(
                                  <List.Item>
                                      <div>
                                          <span>{item.name}:</span>   <span>{item.content}</span>
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