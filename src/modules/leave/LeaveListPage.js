/**
 * Created by Arison on 2018/11/9.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LeaveListPage.css'
import '../../style/css/app-gloal.css'
import {List} from 'antd';
import {Button,Icon,Input} from 'antd';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from "../../components/LoadingMore";
import {fetchPost,fetchGet} from "../../utils/fetchRequest";
import {API,_baseURL} from "../../configs/api.config";
import {Toast,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import ImageGrid from "../../components/image/ImageGrid";
/**
 * Created by Arison on 11:22.
 */
class LeaveListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveListPage',
            detailVisible: false,
            hasMoreData:true,
            pageIndex:1,
            pageSize:5,
            listItem:null,
            index:null,
            role:this.props.match.params.role,
            data:[]
        };
    }

    componentWillMount(){
        document.title ="学生请假条";
    }
    
    componentDidMount(){
        this.getLeaveListData();
    }

    getLeaveListData() {
        this.state.pageIndex=1;
        this.state.pageSize=5;
        this.setState({
            hasMoreData:true,
        })
        if (this.state.role === "teacher") {
            console.log("getLeaveListData()",this.props.userInfo.userId);
            fetchGet(API.leaveListTeacher, {
                userId: this.props.userInfo.userId,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                this.state.data.length = 0;
                for (let i = 0; i < response.data.leaveNotify.length; i++) {
                    let model = {
                        lvId:response.data.leaveNotify[i].lvId,
                        title: response.data.leaveNotify[i].lvName,
                        endTime: response.data.leaveNotify[i].endDate,
                        startTime: response.data.leaveNotify[i].startDate,
                        content: response.data.leaveNotify[i].lvDetails,
                        enclosure:response.data.leaveNotify[i].enclosure,
                        leaveMessages:response.data.leaveNotify[i].leaveMessages
                    };
                    this.state.data.push(model);
                }
                if(response.data.length<this.state.pageSize){
                    this.setState({
                        hasMoreData:false,
                    })
                }
                this.setState({
                    data: this.state.data
                })
            }).catch((error) => {
                console.log("error:" + JSON.stringify(error));
            })
        }
        if (this.state.role === "parent") {
            fetchGet(API.leaveListParent, {
                stuId: this.props.userInfo.stuId,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                this.state.data.length = 0;
                for (let i = 0; i < response.data.length; i++) {
                    let model = {
                        lvId:response.data[i].lvId,
                        title: response.data[i].lvName,
                        endTime: response.data[i].endDate,
                        startTime: response.data[i].startDate,
                        content: response.data[i].lvDetails,
                        enclosure:response.data[i].enclosure,
                        leaveMessages:response.data[i].leaveMessages
                    };
                    this.state.data.push(model);
                }
                if(response.data.length<this.state.pageSize){
                    this.setState({
                        hasMoreData:false,
                    })
                }
                this.setState({
                    data: this.state.data
                })
            }).catch((error) => {
                console.log("error:" + JSON.stringify(error));
            })
        }
    }

    loadMoreAction=()=> {
        setTimeout(() => {
            this.state.pageIndex++;
            if (this.state.role === "teacher") {
                fetchGet(API.leaveListTeacher, {
                    userId: this.props.userInfo.userId,
                    pageIndex: this.state.pageIndex,
                    pageSize: this.state.pageSize
                }).then((response) => {
                     if(response.data.leaveNotify.length>0){
                         for (let i = 0; i < response.data.leaveNotify.length; i++) {
                             let model = {
                                 lvId:response.data.leaveNotify[i].lvId,
                                 title: response.data.leaveNotify[i].lvName,
                                 endTime: response.data.leaveNotify[i].endDate,
                                 startTime: response.data.leaveNotify[i].startDate,
                                 content: response.data.leaveNotify[i].lvDetails,
                                 enclosure:response.data.leaveNotify[i].enclosure,
                                 leaveMessages:response.data.leaveNotify[i].leaveMessages
                             };
                             this.state.data.push(model);
                         }
                         this.setState({
                             data: this.state.data
                         })
                     }else{
                         this.setState({
                             hasMoreData:false,
                         })
                     }

                }).catch((error) => {
                    console.log("error:" + JSON.stringify(error));
                })
            }
            if (this.state.role === "parent") {
                fetchGet(API.leaveListParent, {
                    stuId: this.props.userInfo.stuId,
                    pageIndex: this.state.pageIndex,
                    pageSize: this.state.pageSize
                }).then((response) => {
                    console.log("response:" + JSON.stringify(response));
                    if(response.data.length>0){
                        for (let i = 0; i < response.data.length; i++) {
                            let model = {
                                lvId:response.data[i].lvId,
                                title: response.data[i].lvName,
                                endTime: response.data[i].endDate,
                                startTime: response.data[i].startDate,
                                content: response.data[i].lvDetails,
                                enclosure:response.data[i].enclosure,
                                leaveMessages:response.data[i].leaveMessages
                            };
                            this.state.data.push(model);
                        }
                        this.setState({
                            data: this.state.data
                        })
                    }else{
                        this.setState({
                            hasMoreData:false,
                        })
                    }

                }).catch((error) => {
                    console.log("error:" + JSON.stringify(error));
                })
            }
        }, 1000)

    }
    onAddAction=()=>{
        this.props.history.push("/leaveAdd/");
    }

    onChangeMessage=(event)=>{
        console.log("onChangeMessage()",event.target.value);
        console.log("onChangeMessage()",event.target.name);
        console.log("onChangeMessage()",event.target.id);
       let model= this.state.data[event.target.id];
        model.leaveMessages.splice(0,1,event.target.value)
        this.state.data.splice(event.target.id,1,model);
        // this.setState({
        //     data:this.state.data
        // })
    }

    onMessageSend=(index,event)=>{
        console.log("onMessageSend()",index);
        let model= this.state.data[index];
        console.log("onMessageSend()",model.leaveMessages[0]);
        if(model.leaveMessages.length===0){
            Toast.info("请输入留言内容")
            return;
        }
        fetchPost(API.messageCreate,{
            messName:'这是留言',
            messContent:model.leaveMessages[0],
            userId: this.props.userInfo.userId,
            lvId:model.lvId,
        }).then((response)=>{
            console.log("response:"+JSON.stringify(response));
            if(response.success){
                Toast.info("留言成功！");
                this.getLeaveListData();
                this.onModalClose();
            }
        }).catch((error)=>{
            console.log("error:"+JSON.stringify(error));
        })

    }

    onItemOnClick=(index,item)=>{
        console.log("onItemOnClick()",JSON.stringify(item));
        this.props.history.push('/leavedetail/' +item.lvId+'/'+this.state.role)
       return;
        this.setState({
            detailVisible: true,
            listItem:item,
            index:index
        })

    }
    onModalClose = () => {
        this.setState({
            detailVisible: false
        })
    }

    getDetailModal=()=>{
        let {index}=this.state;
        let item=this.state.listItem;

        if(item!=null&&index!=null){
            let fileImages=[];
            for (let i = 0; i < item.enclosure.length; i++) {
                fileImages.push(_baseURL+item.enclosure[i]);
            }
            console.log("getDetailModal()",fileImages);
            return <div>
                <Modal
                    popup
                    visible={this.state.detailVisible}
                    onClose={this.onModalClose}
                    animationType="slide-up">
                    <div className='notify-detail-modal-layout'>
                        <div style={{
                            width: '100%',
                            padding: '12px 14px',
                            background: 'transparent',
                            textAlign: 'right'
                        }}>
                            <Icon type="close-circle" style={{color: 'white', fontSize: '20px'}}
                                  onClick={this.onModalClose}/>
                        </div>
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
                                <div className="row  " >
                                    <div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>请假事由：</div>
                                    <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.content}</div>
                                </div>

                                <div className="row  margin_bottom_20">

                                    {item.enclosure.length!=0?(<div >
                                        <ImageGrid images={fileImages}/>
                                       {/* <img className="margin_top_bottom_10" src={_baseURL+"/"+item.enclosure[0]}  width={"70%"}  />*/}
                                    </div>):("")}


                                </div>

                                <div className="row ">
                                    <div  className="col-xs-12 clear_margin" >
                                        {this.state.role==="parent"?(
                                            /*家长端*/
                                            <div className="bg_white">
                                                {item.leaveMessages.length===0?(<div className="row" style={{height:"15px"}}>

                                                </div>):(
                                                    <div className="">
                                                        <div className="padding_5"> 回复</div>
                                                        <div id="page_horizontal_line"></div>

                                                        {item.leaveMessages.map((item)=>{

                                                            return  <div className="padding_5" id="global_page_title">
                                                                <span className="text_underline">{item.userName}</span>老师：{item.messContent}
                                                            </div>
                                                        })}

                                                   </div>

                                                )}
                                            </div>
                                        ):(
                                            /*教师端*/
                                            <div className=" bg_white">
                                                {item.leaveMessages.length===0?(<div className="flex padding_10">
                                                    <Input id={index} name={"item."+item.lvId}  size={"small"} className="item_flex_1"
                                                           onChange={this.onChangeMessage.bind(this)} placeholder=""  ></Input>
                                                    <Button  id={index} name={"item."+item.lvId}  size={"small"} onClick={this.onMessageSend.bind(this,index)}  type={"primary"} className="margin_left_10">回复</Button>
                                                </div>):(<div className="flex padding_10">
                                                    <Input  id={index} name={"item."+item.lvId}  disabled={true} size={"small"} value={item.leaveMessages[0].messContent} className="item_flex_1"
                                                            onChange={this.onChangeMessage.bind(this)} placeholder=""  ></Input>
                                                    <Button  style={{backgroundColor:"#C9C9C9",border:"0px"}} size={"small"}    type={"primary"} className="margin_left_10">已回复</Button>
                                                </div>)}
                                            </div>)}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        }else{
            return "";
        }

    }

    render(){
        let detailModal=this.getDetailModal();
        return <div className="container-fluid" id="global_background" style={{height:'100vh',backgroundColor:'#F6F6F'}}>
            <div className="row" >
                <div  className="col-xs-12 clear_margin" >
                     <InfiniteScroll
                         pageStart={0}
                         initialLoad={true}
                         loadMore={this.loadMoreAction}
                         hasMore={this.state.hasMoreData}
                         loader={<LoadingMore/>}>
                         <List
                             dataSource={this.state.data}
                             renderItem={(item,index)=>(
                                 <List.Item  onClick={this.onItemOnClick.bind(this,index,item)} key={item.lvId} id="row_background"  >
                                     <div className="col-xs-12 " >
                                         <div className="row flex" >
                                             <div id="global_page_title"  style={{fontSize:15,color:"#333333"}}>  {item.title}</div>
                                             <div className="item_flex_1  flex_row_right margin_left_right_10">
                                                 {this.state.role==="parent"?(""):(<div>
                                                     {item.leaveMessages.length===0?<div style={{fontSize:12,color:"#FA5200"}}>未查阅</div>: <div style={{fontSize:12,color:"##686868"}}>已查阅</div>}
                                                 </div>)}
                                             </div>
                                         </div>
                                         <div className="row ">
                                             <div  className="col-xs-3" id="col-clear"   style={{fontSize:12,color:"#666666"}}>请假时间：</div>
                                             <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.startTime}—{item.endTime}</div>
                                         </div>
                                         <div className="row " style={{marginTop:10,marginBottom:10}} >
                                             <div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>请假事由：</div>
                                             <div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{item.content}</div>
                                         </div>


                                         {/*<div className="row " style={{marginTop:10,marginBottom:10}} >*/}
                                             {/*<div  className="col-xs-3" id="col-clear"  style={{fontSize:12,color:"#666666"}}>老师回复：</div>*/}
                                             {/*<div  className="col-xs-9" id="col-clear-start"  style={{fontSize:12,color:"#333333"}}>{ item.leaveMessages.length > 0 ? item.leaveMessages[0].messContent : '无'}</div>*/}
                                         {/*</div>*/}

                                     </div>
                                 </List.Item>
                             )}/>
                       </InfiniteScroll>
                    {
                        this.state.role=="teacher"?(""):(<Icon type="plus-circle" theme='filled' className='common-add-icon'
                                                             onClick={this.onAddAction} />)
                    }
                    {detailModal}
                </div>
            </div>
        </div>
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveListPage)