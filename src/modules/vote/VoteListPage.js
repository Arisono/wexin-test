/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { List} from 'antd';
import '../../style/css/app-gloal.css'
import './VoteListPage.css'

/**
 * Created by Arison on 20:14.
 */
class VoteListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'VoteListPage',
            data:[
                {
                    title:'三年级2班',
                    state:'进行中',
                    endTime:'2018-11-15 08:00',
                    votes:[
                        '深圳南山',
                        '深圳宝安',
                        '深圳福田'
                    ]

                }
            ]
        };
    }


    componentDidMount(){

    }

    render(){
        return <div className="container-fluid" id="global_background">
              <List
                    dataSource={this.state.data}
                    renderItem={item=>(
                       <List.Item className="row" id="row_background"
                                  style={{padding:"10px"}}>
                              <div className="col-xs-12" >
                                     <div className="row">
                                         <div className="col-xs-6" id="row_left"> <span id="span_18">{item.title}</span></div>
                                         <div className="col-xs-6" id="row_right"><span>{item.state}</span></div>


                                     </div>
                                     <div className="row" id="row_center_align">
                                       <div className="col-xs-12" id="row_left">
                                           <List dataSource={item.votes}
                                                 renderItem={item=>(
                                                     <List.Item style={{width:"180px"}}>
                                                         {item}
                                                     </List.Item>
                                                 )}/>

                                               <img style={{marginLeft:"30px"}} src={""}  width={80} height={80} /></div>

                                     </div>
                                     <div className="row">
                                          <span>截止时间：</span>
                                          <span>{item.endTime}</span>
                                     </div>
                              </div>
                       </List.Item>
              )}/>
        </div>
    }
}

export  default VoteListPage;