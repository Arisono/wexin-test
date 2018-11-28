/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { List} from 'antd';
import '../../style/css/app-gloal.css'
import './VoteListPage.css'
import { Checkbox,message} from 'antd';
import icon_vote_items  from "../../style/imgs/icon_vote_items.png";
import {Link} from "react-router-dom";
import LoadingMore from "../../components/LoadingMore";
import InfiniteScroll from 'react-infinite-scroller'
/**
 * Created by Arison on 20:14.
 */
class VoteListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'VoteListPage',
            hasMoreData:true,
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

                },
                {
                    title:'三年级2班',
                    state:'已结束',
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


    loadMoreAction(){
        setTimeout(()=>{
             for (let i = 0; i < 10; i++) {
                       let model={
                           title:'三年级2班',
                           state:'已结束',
                           endTime:'2018-11-15 08:00',
                           votes:[
                               '深圳南山',
                               '深圳宝安',
                               '深圳福田'
                           ]
                       };
                       this.state.data.push(model);

             }

             this.setState({
                 data:this.state.data
             });
        },1500);
    }


    render(){
        return <div className="container-fluid" id="global_background">
            <div className="row">
              <div className="col-xs-12 clear_margin">
                   <InfiniteScroll
                       pageStart={0}
                       loadMore={this.loadMoreAction.bind(this)}
                       hasMore={this.state.hasMoreData}
                       loader={<LoadingMore/>}>


                  <List
                      dataSource={this.state.data}
                      renderItem={item=>(
                        <Link to={"/voteDetail/"+(item.state=='进行中'?true:false)} id="menu_span_normal">
                            <List.Item className="row " id="row_background"
                                       style={{padding:"10px"}}>
                                <div className="col-xs-12 ">
                                    <div className="row">
                                        <div className="col-xs-6" id="row_left"> <span id="span_18">{item.title}</span></div>
                                        <div className="col-xs-6" id="row_right">
                                            {item.state=="进行中"?(<span style={{color:"red"}}>{item.state}</span>):(<span>{item.state}</span>)}

                                        </div>
                                    </div>
                                    <div className="row" id="row_center_align">
                                        <div className="col-xs-12 flex_row flex_center_vertical" >
                                            <List dataSource={item.votes}
                                                  renderItem={item=>(
                                                      <List.Item style={{width:"120px"}}>
                                                          <Checkbox >{item}</Checkbox>
                                                      </List.Item>
                                                  )}/>
                                            <div className="flex_center item_flex">
                                                <img  style={{marginLeft:"30px"}} src={icon_vote_items}  width={60} height={60} /></div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <span>截止时间：</span>
                                        <span>{item.endTime}</span>
                                    </div>
                                </div>
                            </List.Item>
                        </Link>
                      )}/>

                   </InfiniteScroll>
              </div>
            </div>
        </div>
    }
}

export  default VoteListPage;