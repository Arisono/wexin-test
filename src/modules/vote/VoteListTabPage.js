/**
 * Created by Arison on 2018/11/12.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { List} from 'antd';
import '../../style/css/app-gloal.css'
import './VoteListPage.css'
import { Checkbox,message,Icon} from 'antd';
import icon_vote_items  from "../../style/imgs/icon_vote_items.png";
import {Link} from "react-router-dom";
import LoadingMore from "../../components/LoadingMore";
import InfiniteScroll from 'react-infinite-scroller'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import RefreshLayout from '../../components/RefreshLayout'
import {fetchPost,fetchGet} from "../../utils/fetchRequest";
import {API} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
let mySwiper;
/**
 * Created by Arison on 20:14.
 */
class VoteListTabPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectIndex: 0,
            name:'VoteListPage',
            hasMoreData:true,
            hasMoreRightData:true,
            isReleaseRefreshing: false,
            isReceiveRefreshing: false,
            height: document.documentElement.clientHeight,
            data:[
            ],
            dataRight:[
            ]
        };
    }

      componentWillMount(){
              document.title ="投票";
      }

    componentDidMount(){
        const that = this
        this.loadReleaseList();
        this.loadReceiveList();
        mySwiper = new Swiper('.swiper-container', {
            autoplay: false,
            loop: false,
            on: {
                slideChangeTransitionEnd: function () {
                    that.setState({
                        selectIndex: this.activeIndex
                    })
                }
            }
        })
    }

    onAddAction=()=>{
        this.props.history.push("/send-vote")
    }

    render(){
         const created= this.getReleaseItems() ;
         const receive=this.getReceiveItems();

        return <div className="container-fluid" id="global_background">
            <div className="row">
                <div className="col-xs-12 phone-select-root clear_margin">
                    <div className='identity-select'>
                        <div className={this.state.selectIndex == 0 ?
                            'identity-item-select' : 'identity-item-normal'}
                             onClick={this.onTeacherClick}>我发布的
                        </div>
                        <div className={this.state.selectIndex == 1 ?
                            'identity-item-select' : 'identity-item-normal'}
                             onClick={this.onParentClick}>我接收的
                        </div>
                    </div>
                    <div className="swiper-container" id="global_background">
                        <div className="swiper-wrapper">
                            <div   className="swiper-slide">
                                    {created}
                            </div>
                            <div   className="swiper-slide">
                                    {receive}
                            </div>

                        </div>
                        <Icon type="plus-circle" theme='filled' className='common-add-icon'
                              onClick={this.onAddAction} />
                    </div>
                </div>
            </div>
        </div>;
    }

    loadReleaseList=()=>{
        console.log("loadMoreAction()");
        setTimeout(()=>{
            fetchGet(API.voteListTeacher,{
                          userId:'10004',
                          pageIndex:'1',
                          pageSize:'5',
                          voteType:'1',
                      }).then((response)=>{
                          console.log("response:"+JSON.stringify(response));
                          for (let i = 0; i <response.data.create.length; i++) {
                              let  voteObject  = response.data.create[i];
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
                      })



        },1500);
    }

    loadReceiveList=()=>{
        console.log("loadMoreRightAction()");
        setTimeout(()=>{
            fetchGet(API.voteListTeacher,{
                userId:'10004',
                pageIndex:'1',
                pageSize:'5',
                voteType:'1',
            }).then((response)=>{
                console.log("response:"+JSON.stringify(response));
                for (let i = 0; i <response.data.notify.length; i++) {
                    let  voteObject  = response.data.notify[i];
                    let stateStr=voteObject.voteStatus==1?"进行中":"已投票"
                    let options=voteObject.topics[0].options;
                    let model={
                        voteId:voteObject.voteId,
                        title:voteObject.topics[0].topicName,
                        state:stateStr,
                        endTime:voteObject.creatDate,
                        votes:options
                    };
                    this.state.dataRight.push(model);
                }
                this.setState({
                    data:this.dataRight.data
                });
            }).catch((error)=>{
                console.log("error:"+JSON.stringify(error));
            })
        },2500);
    }

    getReleaseItems = () => (
        <div className='notify-bg-root'>
            <RefreshLayout
                refreshing={this.state.isReleaseRefreshing}
                onRefresh={this.loadReleaseList}
                height={this.state.height}>
                <List
                    locale={{emptyText: ''}}
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
            </RefreshLayout>
        </div>
    )


    getReceiveItems = () => (
        <div className='notify-bg-root'>
        <RefreshLayout
            refreshing={this.state.isReceiveRefreshing}
            onRefresh={this.loadReceiveList}
            height={this.state.height}>
            <List
                locale={{emptyText: ''}}
                dataSource={this.state.dataRight}
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

        </RefreshLayout>
        </div>
    )


    onTeacherClick = () => {
        this.setState({
            selectIndex: 0
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }

    onParentClick = () => {
        this.setState({
            selectIndex: 1
        }, () => {
            mySwiper.slideTo(this.state.selectIndex, 300, false)
        })
    }
}

export  default VoteListTabPage;