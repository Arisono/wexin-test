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
            ],
            dataRight:[
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

      componentWillMount(){
              document.title ="投票";
      }

    componentDidMount(){
        const that = this
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



    loadMoreAction=()=>{
        console.log("loadMoreAction()");
        setTimeout(()=>{
             for (let i = 0; i < 2; i++) {
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

    onAddAction=()=>{
        this.props.history.push("/send-vote")
    }

    loadMoreRightAction=()=>{
        console.log("loadMoreRightAction()");
        setTimeout(()=>{
            for (let i = 0; i < 2; i++) {
                let model={
                    title:'三年级2班',
                    state:'进行中',
                    endTime:'2018-11-15 08:00',
                    votes:[
                        '深圳南山',
                        '深圳宝安',
                        '深圳福田'
                    ]
                };
                this.state.dataRight.push(model);

            }

            this.setState({
                dataRight:this.state.dataRight
            });
        },2500);
    }

    render(){
         const created= <List
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
                )}/>;
         const recived=
             <List
                 dataSource={this.state.dataRight}
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
                 )}/>;
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
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadMoreAction}
                                    hasMore={this.state.hasMoreData}
                                    loader={<LoadingMore/>}>
                                    {created}
                                </InfiniteScroll>
                            </div>
                            <div   className="swiper-slide">
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadMoreRightAction}
                                    hasMore={this.state.hasMoreData}
                                    loader={<LoadingMore/>}>
                                    {recived}
                                </InfiniteScroll>
                            </div>

                        </div>
                        <Icon type="plus-circle" theme='filled' className='common-add-icon'
                              onClick={this.onAddAction} />
                    </div>
                </div>
            </div>
        </div>;
    }


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