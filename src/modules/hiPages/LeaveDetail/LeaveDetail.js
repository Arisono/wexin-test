/**
*   Created by FANGlh on 2019/1/14 18:13.
*   Desc: 学生请假详情
*/

import React,{Component} from 'react';
import "./LeaveDetail.css";
import {connect} from 'react-redux';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API,_baseURL} from '../../../configs/api.config';
import ImageGrid from "../../../components/image/ImageGrid";
import {Button,Icon,Input} from 'antd';
import {isObjEmpty,getIntValue, getStrValue} from  '../../../utils/common';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import LazyLoad from 'react-lazyload';
import ImagesViewer from '../../../components/imagesVIewer/index';

class LeaveDetail extends Component{
   constructor(props){
        super(props);
        this.state = {
            item:{"lvId":153,"title":"刘一的请假条","endTime":"2019-01-07 13:41:44","startTime":"2019-01-04 13:41:40","content":"请假吧","enclosure":["/files/bfcc1ce3-3fd8-449a-bfa5-024c4986e580.jpg","/files/d3c17180-617b-45c2-8e33-b2a8397463c8.jpg"],"leaveMessages":[]},
            pictureList:[],
            index:null,
            role:'parent',
            previewImage: '',
            previewVisible: false,
        }
    }
     render(){
       const {item} = this.state
         const {pictureList} = this.state
         let pictureItems = []
         let pictureUrls = []
         for (let i = 0; i < pictureList.length; i++) {
             const pictureUrl = pictureList[i]
             pictureUrls.push(pictureUrl)
             if (!isObjEmpty(pictureUrl)) {
                 pictureItems.push(
                     i > 20 ?
                         <LazyLoad throttle={200} height={300} once overflow>
                             <CSSTransition
                                 timeout={2000}
                                 classNames='fade'
                                 appear={true}
                                 key={i}>
                                 <div className='pictureItem'>
                                     <img src={pictureUrl}  onClick={this.handlePreview.bind(this, pictureUrl, i)}/>
                                 </div>
                             </CSSTransition>
                         </LazyLoad> :
                         <div className='pictureItem'>
                             <img src={pictureUrl}  onClick={this.handlePreview.bind(this, pictureUrl, i)}/>
                         </div>
                 )
             }
         }
        return(
            <div className='container-fluid notify-detail-modal-content-layout' style={{height:"350px"}}>
                <div className="col-xs-12 " >
                    <div className="row flex" >
                        <div id="global_page_title" style={{fontSize:15,color:"#333333"}}>  {item.title}</div>
                        <div className="item_flex_1  flex_row_right margin_left_right_10">
                            {this.state.role==="parent"?(""):(<div>
                                {item.leaveMessages.length===0? <div style={{fontSize:12,color:"#FA5200"}}>未查阅</div>: <div style={{fontSize:12,color:"##686868"}}>已查阅</div> }
                            </div>)}
                        </div>
                    </div>
                    <div className="row ">
                        <div  className="col-xs-3" id="col-clear" style={{fontSize:12,color:"#666666"}}>请假时间：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.startTime}—{item.endTime}</div>
                    </div>
                    <div className="row "  style={{marginTop:10}}>
                        <div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>请假事由：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.content}</div>
                    </div>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                            <TransitionGroup>
                                {pictureItems}
                            </TransitionGroup>
                        </div>
                    </div>

                    <div style={{fontSize:15,color:"#666666"}}>回复：</div>
                    {item.leaveMessages.length===0?"": <div style={{color:"#333333",fontSize:12}}>item.leaveMessages[0].messConten</div>}
                </div>


                <div className="foot_input_view">
                         <div className="comH_view">
                             <Icon type="form"  style={{height:"28px",width:"28px"}}/>

                             <textarea autoFocus="autoFocus" ref='voteTitle' className="form-control textarea_sty"
                                       rows="auto" placeholder="请输入回复内容" style={{resize:'none'}} ></textarea>
                             <Button type="button" className="btn btn-primary send_btn" onClick={this.doSendMsg}>发送</Button>
                         </div>
                </div>
                {this.state.previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={this.state.previewIndex}
                                  needPoint={pictureUrls.length <= 9}/> : ""}
            </div>
        )
    }
    componentWillMount() {
        document.title = '学生请假'
    }
    componentDidMount() {
        let lvId = this.props.match.params.lvId
        console.log("lvId",lvId)
        let pictureList=[];
        for (let i = 0; i < this.state.item.enclosure.length; i++) {
            pictureList.push(_baseURL+this.state.item.enclosure[i]);
        }
        this.setState({
            pictureList:pictureList
        },function () {
            console.log("pictureList",pictureList)
        })
        if (!isObjEmpty(lvId)){

        }
    }
    handleCancel = () => this.setState({previewVisible: false})
    handlePreview = (url, index) => {
        this.setState({
            previewImage: url,
            previewVisible: true,
            previewIndex: index
        });
    }
}
let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveDetail)
