/**
 * Created by Arison on 2018/11/9.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LeaveListPage.css'
import '../../style/css/app-gloal.css'
import { List} from 'antd';
import { Button } from 'antd';

/**
 * Created by Arison on 11:22.
 */
class LeaveListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveListPage',
            data:[{
               title:'黎明的请假单',
                endTime:'2018-09-08 09:00',
                startTime:'2018-09-09 08:00',
                content:"感冒发烧"
            }]
        };
    }
    
    
    componentDidMount(){
        
    }
   
    render(){
        return <div className="container-fluid" id="global_background">
            <div className="row" id="row_background">
                <div  className="col-xs-12" >
                    <List  dataSource={this.state.data}
                           renderItem={item=>(
                               <List.Item className="row">
                                   <div className="col-xs-12">
                                       <div className="row">{item.title}</div>
                                       <div className="row">
                                           <div  className="col-xs-4">请假时间：</div>
                                           <div  className="col-xs-8">{item.startTime}—{item.endTime}</div>
                                       </div>
                                       <div className="row">
                                           <div  className="col-xs-4">请假事由：</div>
                                           <div  className="col-xs-8">{item.content}</div>
                                       </div>

                                       <div className="row">
                                           <div className="col-xs-6"></div>
                                           <div  className="col-xs-6" id="row_right">
                                               <Button type={"primary"} id="button_ok">批准</Button>
                                               <Button type={"primary"} id="button_no_ok">不批准</Button>
                                           </div>
                                       </div>
                                   </div>
                               </List.Item>
                           )}/>
                </div>
            </div>
        </div>
    }
}

export  default LeaveListPage;