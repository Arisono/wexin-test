/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AssignmentListPage.css'
import { List} from 'antd';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
/**
 * 作业列表
 * Created by Arison on 17:48.
 */
const data = [
    {
        title: '语文作业',
        state:'未读',
        content:'背诵课文',
        end_time:'2018-08-23 16:00',
        publisher:'陈莉莉'
    },
    {
        title: '数学作业',
        state:'未读',
        content:'背诵课文',
        end_time:'2018-08-23 16:00',
        publisher:'陈莉莉'
    },
    {
        title: '英语作业',
        state:'未读',
        content:'背诵课文',
        end_time:'2018-08-23 16:00',
        publisher:'陈莉莉'

    },
    {
        title: '物理作业',
        state:'未读',
        content:'背诵课文',
        end_time:'2018-08-23 16:00',
        publisher:'陈莉莉'
    }
];
class AssignmentListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'AssignmentListPage'
        };

    }


    componentDidMount(){

    }

    render(){
        return <div className="container-fluid"
                    style={{padding:"0px",height:"1000px",backgroundColor:"#F3F3F3"}}>
            <List
                id="assignment_list"
                dataSource={data}
                renderItem={item => (
                    <Link to="/assignmentDetail" id="menu_span_normal">
                    <List.Item   className="row"  id="list_item_noBorder">
                            <div className="col-xs-12" >
                                   <div className="row" id="padding">
                                       <div className="col-xs-6" id="row_left">
                                           <span id="span_header_left">{item.title}</span></div>
                                       <div className="col-xs-6" id="row_right">
                                           <span id="span_header_right">{item.state}</span></div>
                                   </div>
                                <div id="page_horizontal_line"></div>
                                <div className="row" id="padding">
                                    <div className="col-xs-4">内容：</div>
                                    <div className="col-xs-8"><span id="span_display">{item.content}</span></div>
                                </div>
                                <div className="row" id="padding">
                                    <div className="col-xs-4">截止时间：</div>
                                    <div className="col-xs-8"><span id="span_display">{item.end_time}</span></div>
                                </div>
                                <div className="row" id="padding">
                                    <div className="col-xs-4">发布老师：</div>
                                    <div className="col-xs-8"><span id="span_display">{item.publisher}</span></div>
                                </div>
                         </div>
                    </List.Item>
                    </Link>
                )}
            />
        </div>
    }
}

export  default AssignmentListPage;