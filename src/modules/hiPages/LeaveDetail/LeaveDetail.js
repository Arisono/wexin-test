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
import {Button,Icon,Input,List} from 'antd';
import {isObjEmpty,getIntValue, getStrValue} from  '../../../utils/common';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import LazyLoad from 'react-lazyload';
import ImagesViewer from '../../../components/imagesVIewer/index';
import {Toast} from 'antd-mobile';


class LeaveDetail extends Component{
   constructor(props){
        super(props);
        this.state = {
            itemdetail:{},
            pictureList:[],
            index:null,
            role:'parent',
            previewImage: '',
            previewVisible: false,
            messageContent: null,

        }
    }
    componentWillMount() {
        document.title = '学生请假'
    }
    componentDidMount() {
        let lvId = this.props.match.params.lvId
        console.log("lvId",lvId)
        if (!isObjEmpty(lvId)){
            this.getleaveDetail(lvId)
        }
    }
     render(){
       const {itemdetail} = this.state
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
            <div>
                <div className="col-xs-12 " >
                    <div className="row flex" >
                        <div id="global_page_title" style={{fontSize:15,color:"#333333"}}>  {itemdetail.title}</div>
                        <div className="item_flex_1  flex_row_right margin_left_right_10">
                            {this.state.role==="parent"?(""):(<div>
                                {itemdetail.leaveMessages.length===0? <div style={{fontSize:12,color:"#FA5200"}}>未查阅</div>: <div style={{fontSize:12,color:"##686868"}}>已查阅</div> }
                            </div>)}
                        </div>
                    </div>
                    <div className="row ">
                        <div  className="col-xs-3" id="col-clear" style={{fontSize:12,color:"#666666"}}>请假时间：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{itemdetail.startTime}—{itemdetail.endTime}</div>
                    </div>
                    <div className="row "  style={{marginTop:10}}>
                        <div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>请假事由：</div>
                        <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{itemdetail.content}</div>
                    </div>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                            <TransitionGroup>
                                {pictureItems}
                            </TransitionGroup>
                        </div>
                    </div>

                    <div style={{fontSize:15,color:"#666666"}}>回复：</div>

                    { itemdetail.leaveMessages==null || itemdetail.leaveMessages.length==0 ? '' :
                        <List
                            dataSource={itemdetail.leaveMessages}
                            renderItem={item => (
                                <List.Item>
                                    <div>
                                        <span className=" margin_left_right_20">{item.messContent}:</span>
                                    </div>
                                </List.Item>
                            )}
                        />
                    }
                </div>
                <div className="foot_input_view">
                         <div className="comH_view">
                             <div className="footer flex padding_10" style={{background: '#F2F2F2', alignItems: 'center'}}>
                                 <img src={require('imgs/ic_edit.png')} width={28} height={28}/>
                                 <input ref={ref => this.input_content = ref} value={this.state.messageContent}
                                        onChange={this.onChangeMessage} placeholder="留言"
                                        className='homework-detail-leave-input'></input>
                                 <span onClick={this.onMessageSend} className="homework-detail-leave-send">发送</span>
                             </div>
                         </div>
                </div>
                {this.state.previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={pictureUrls}
                                  index={this.state.previewIndex}
                                  needPoint={pictureUrls.length <= 9}/> : ""}
            </div>
        )
    }
    onMessageSend =() =>{
        if (isObjEmpty(this.state.messageContent)) {
            Toast.info("请输入回复内容")
            return;
        }
        fetchPost(API.messageCreate,{
            messName:'这是回复',
            messContent:this.state.messageContent,
            userId: this.props.userInfo.userId,
            lvId:this.state.itemdetail.lvId,
        }).then((response)=>{
            console.log("response:"+JSON.stringify(response));
            if(response.success){
                Toast.info("回复成功！");
                this.getleaveDetail(this.state.itemdetail.lvId)
                // this.backTask = setTimeout(() => {
                //     this.props.history.goBack();
                // }, 2000)
            }
        }).catch((error)=>{
            console.log("error:"+JSON.stringify(error));
        })
    }
    getleaveDetail = (lvid) =>{
        fetchGet(API.leaveDetail,{
            lvId:lvid,
        }).then((response)=>{
            if(response.success && !isObjEmpty(response.data)){
                let model = {
                    lvId:response.data.lvId,
                    title: response.data.lvName,
                    endTime: response.data.endDate,
                    startTime: response.data.startDate,
                    content: response.data.lvDetails,
                    enclosure:response.data.enclosure,
                    leaveMessages:response.data.leaveMessages
                };
                this.setState({
                    itemdetail:model
                },function () {
                    console.log("itemdetail",this.state.itemdetail)
                    let pictureList=[];
                    for (let i = 0; i < this.state.itemdetail.enclosure.length; i++) {
                        pictureList.push(_baseURL+this.state.itemdetail.enclosure[i]);
                    }
                    this.setState({
                        pictureList:pictureList
                    },function () {
                        console.log("pictureList",pictureList)
                    })
                })
            }
        }).catch((error)=>{
            console.log("error:",JSON.stringify(error));
        })
    }
    onChangeMessage = (event) => {
        let msg = event.target.value;
        this.setState({
            messageContent: msg
        })
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
