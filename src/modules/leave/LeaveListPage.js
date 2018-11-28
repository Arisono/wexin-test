/**
 * Created by Arison on 2018/11/9.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LeaveListPage.css'
import '../../style/css/app-gloal.css'
import { List} from 'antd';
import { Button,message,Icon} from 'antd';
import InfiniteScroll from 'react-infinite-scroller'
import {setTitle} from "../../utils/constants";
import LoadingMore from "../../components/LoadingMore";
/**
 * Created by Arison on 11:22.
 */
class LeaveListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveListPage',
            hasMoreData:true,
            role:this.props.match.params.role,
            data:[{
               title:'黎明的请假单',
                endTime:'2018-09-08 09:00',
                startTime:'2018-09-09 08:00',
                content:"感冒发烧"
            },
                {
                    title:'黎明的请假单',
                    endTime:'2018-09-08 09:00',
                    startTime:'2018-09-09 08:00',
                    content:"感冒发烧"
                }]
        };
    }

    componentWillMount(){
              document.title ="学生请假";
    }
    
    componentDidMount(){

    }

    loadMoreAction=()=> {
        setTimeout(() => {
            if (this.state.data.length>60){
                this.setState({
                    hasMoreData:false
                })
                message.info("没有更多数据！")
                return;
            }
            for (let i = 0; i < 10; i++) {
                let model = {
                    title: '黎明的请假单',
                    endTime: '2018-09-08 09:00',
                    startTime: '2018-09-09 08:00',
                    content: "感冒发烧"
                };
                this.state.data.push(model);
            }

            this.setState({
                data: this.state.data
            })


        }, 1000)

    }
    onAddAction=()=>{
        this.props.history.push("/leaveAdd");
    }

   
    render(){
        return <div className="container-fluid" id="global_background">
            <div className="row" >
                <div  className="col-xs-12 clear_margin" >
                     <InfiniteScroll
                         pageStart={0}
                         loadMore={this.loadMoreAction}
                         hasMore={this.state.hasMoreData}
                         loader={<LoadingMore/>}>
                         <List
                             dataSource={this.state.data}
                             renderItem={item=>(
                                 <List.Item  id="row_background"  >
                                     <div className="col-xs-12" >
                                         <div className="row" >
                                             <div id="global_page_title">  {item.title}</div>
                                         </div>
                                         <div className="row">
                                             <div  className="col-xs-3" id="col-clear">请假时间：</div>
                                             <div  className="col-xs-9" id="col-clear-start">{item.startTime}—{item.endTime}</div>
                                         </div>
                                         <div className="row">
                                             <div  className="col-xs-3" id="col-clear">请假事由：</div>
                                             <div  className="col-xs-9" id="col-clear-start">{item.content}</div>
                                         </div>

                                         <div className="row">
                                             <div className="col-xs-6"></div>
                                             <div  className="col-xs-6" id="row_right">
                                                 <Button type={"primary"}  size={"small"} id="button_ok">批准</Button>
                                                 <Button type={"primary"}  size={"small"} id="button_no_ok">不批准</Button>
                                             </div>
                                         </div>
                                     </div>
                                 </List.Item>
                             )}/>
                       </InfiniteScroll>
                    {
                        this.state.role=="teacher"?(""):(<Icon type="plus-circle" theme='filled' className='common-add-icon'
                                                             onClick={this.onAddAction} />)
                    }
                </div>
            </div>
        </div>
    }
}

export  default LeaveListPage;