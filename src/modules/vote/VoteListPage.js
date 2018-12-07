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
import InfiniteScroll from 'react-infinite-scroller';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../utils/fetchRequest';
import {API} from '../../configs/api.config';
import {Toast} from 'antd-mobile'
/**
 * Created by Arison on 20:14.
 */
class VoteListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'VoteListPage',
            hasMoreData:true,
            pageIndex:1,
            pageSize:10,
            data:[]
        };
    }

    componentWillMount(){
        document.title ="投票";
   }

    componentDidMount(){
          fetchGet(API.voteList,{
              userId:'10000',//学号ID
              pageIndex:this.state.pageIndex,
              pageSize:this.state.pageSize,
              voteType:'1',
          }).then((response)=>{
              this.state.data.length=0;
              for (let i = 0; i < response.data.length; i++) {
                    let  voteObject  = response.data[i];
                    let stateStr=voteObject.voteStatus==1?"进行中":"已投票"
                    let options=voteObject.topics[0].options;
                    let model={
                      voteId:voteObject.voteId,
                        title:voteObject.topics[0].topicName,
                      state:stateStr,
                      endTime:voteObject.creatDate,
                      votes:options
                  };
                    this.state.data.push(model);
              }
              this.setState({
                  data:this.state.data
              });

          }).catch((error)=>{
              console.log("error:"+JSON.stringify(error));
          });
    }


    loadMoreAction(){
      setTimeout(()=>{
          this.state.pageIndex++
          console.log("加载更多index:",this.state.pageIndex);
          fetchGet(API.voteList,{
              stuId:'10000',//学号ID
              pageIndex:this.state.pageIndex,
              pageSize:this.state.pageSize,
              voteType:'1',
          }).then((response)=>{
              if(response.success){
                  for (let i = 0; i < response.data.length; i++) {
                      let  voteObject  = response.data[i];
                      let stateStr=voteObject.voteStatus==1?"进行中":"已结束"
                      let options=voteObject.topics[0].options;
                      let model={
                          voteId:voteObject.voteId,
                          title:options.topicName,
                          state:stateStr,
                          endTime:voteObject.creatDate,
                          votes:options
                      };
                      this.state.data.push(model);
                  }
                  this.setState({
                      data:this.state.data
                  });
                  if(response.data.length<this.state.pageSize){
                      this.setState({
                          hasMoreData:false
                      });
                      Toast.info("数据加载完成");
                  }
              }

          }).catch((error)=>{
              console.log("error:"+JSON.stringify(error));
              this.setState({ hasMoreData:false})
          });
              },1000);
    }


    render(){
        return <div className="container-fluid" id="global_background">
            <div className="row">
              <div className="col-xs-12 clear_margin">
                   <InfiniteScroll
                       initialLoad={false}
                       pageStart={0}
                       loadMore={this.loadMoreAction.bind(this)}
                       hasMore={this.state.hasMoreData}
                       loader={<LoadingMore/>}>
                  <List
                      dataSource={this.state.data}
                      renderItem={item=>(
                        <Link to={"/voteDetail/"+(item.state=='进行中'?true:false)+"/"+item.voteId} id="menu_span_normal">
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
                                                          <Checkbox >{item.optionName}</Checkbox>
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