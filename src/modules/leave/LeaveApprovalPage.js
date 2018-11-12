/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/app-gloal.css'
import { List,Button} from 'antd';

/**
 * Created by Arison on 11:42.
 */
class LeaveApprovalPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveApprovalPage'
        };
    }


    componentDidMount(){

    }

    render(){
        return <div className="container-fluid">
            <div className="row">
                 <div className="col-xs-12" >
                        <div className="row"  id="padding10">
                            <img id="row_margin" src={""}  width={40} height={40} />
                            <span>张明的请假单</span>
                        </div>
                        <div className="row" id="padding10">
                            <span>请假时间：</span>
                            <span>2018-08-10 09:10-18:00</span>
                        </div>
                        <div className="row"  id="padding10">
                            <span>请假时长：</span>
                            <span>一天</span>
                        </div>
                        <div className="row"  id="padding10">
                            <span>请假事由：</span>
                            <span>孩子不舒服，上医院看病</span>
                        </div>

                     <div className="row" >

                         <img style={{marginLeft:"10px"}} src={""}  width={120} height={80} />

                     </div>

                      <div className="row" id="row_center" style={{flexDirection:"column"}}>
                          <div className="col-xs-10" style={{marginTop:"30px"}}>
                              <Button id="btn_ok"  block>批准</Button>
                              <Button id="btn_no_ok"  block>不批准</Button>
                          </div>
                      </div>

                  </div>
              </div>
        </div>
    }
}

export  default LeaveApprovalPage;