/**
 * Created by Arison on 2018/11/15.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { List,Button,Checkbox, Progress } from 'antd';
import './VoteDetailPage.css'
import {setTitle} from "../../utils/constants";

/**
 * Created by Arison on 15:51.
 */
class VoteDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'VoteDetailPage',
            voteState:false,
            data: {
                    title:'三年级2班',
                    state:'进行中',
                    endTime:'2018-11-15 08:00',
                    votes:[
                        '深圳南山',
                        '深圳宝安',
                        '深圳福田'
                    ]

                }
        };
    }



    
    componentDidMount(){
        // this.state.voteState=this.props.match.params.voteState;
        console.log("componentWillMount():"+this.props.match.params.voteState);
        console.log("componentWillMount():"+this.state.voteState);
        document.title = '投票'
        this.setState({
            voteState:this.props.match.params.voteState
        });
    }


    render(){
        return <div className="container-fluid">
            <div className="row">
                 <div className="col-xs-12">
                     <div className="row" id="pager_header" >
                          <div className="flex_row">
                              <img class="img-circle" style={{marginLeft:"10px",marginTop:'20px',border:"1px solid #e4e4e4"}} src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}  width={66} height={66} />

                              <div  className="vote-header" >
                                  班级组织活动，请大家开始投票选择，总共有三个地方 班级组织活动
                                  班级组织活动，请大家开始投票选择
                              </div>
                          </div>
                         <div className="text_bold" style={{marginLeft:"18px"}} >成老师</div>
                         <div id="row_right"><span className="text_bold">截止时间：</span><span>2018-09-10 09:00</span></div>
                     </div>
                     <div className="row">
                           <div id="padding10"><span>单选</span></div>
                         <div id="page_horizontal_line"></div>
                          <div className="col-xs-12">
                             <List dataSource={this.state.data.votes}
                                   renderItem={item=>(
                                      <List.Item id="flex_row">
                                          <Checkbox  style={{marginLeft:"20px",display:"flex",alignItems:"center"}}  >
                                          </Checkbox>
                                          <div style={{width:"200px",display:"inline",marginRight:"10px"
                                          ,marginLeft:"10px",display:"flex",alignItems:"center",height:"100%"}} >
                                              <Progress   percent={30} size="small" />
                                          </div>
                                          {item}
                                      </List.Item>
                             )}/>
                         </div>
                     </div>

                     <div className="row flex_center" id="row_vote">
                         {this.state.voteState=='true'?(<Button id="button_vote" type={'primary'}  block> 投票</Button>):(
                                 <Button id="button_vote"
                                         type={'primary'}
                                         style={{backgroundColor:"#9D9D9D",
                                             color:"#ffffff",
                                             borderRadius:"5px 5px",
                                             border:"1px solid #ffffff"
                                         }} block> 已投票</Button>
                             )
                         }
                     </div>

                     <div cl>

                     </div>
                  </div>
              </div>
        </div>
    }
}

export  default VoteDetailPage;