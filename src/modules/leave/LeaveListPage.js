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
            pageIndex:'1',
            pageSize:'5',
            listItem:null,
            index:null,
            role:this.props.match.params.role,
            data:[{
                title:'黎明的请假单',
                endTime:'2018-09-08 09:00',
                startTime:'2018-09-09 08:00',
                content:"感冒发烧",
                leaveMessages:[]
            }]
        };
    }

    componentWillMount(){
              document.title ="学生请假";
    }
    
    componentDidMount(){
        this.getLeaveListData();
    }

    getLeaveListData() {
        console.log("getLeaveListData() userId:",this.props.userInfo.userId);
        if (this.state.role === "teacher") {
            fetchGet(API.leaveListTeacher, {
                userId: this.props.userInfo.userId,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                this.state.data.length = 0;
                console.log("response:" + JSON.stringify(response));
                for (let i = 0; i < response.data.length; i++) {
                    let model = {
                        lvId:response.data[i].lvId,
                        title: response.data[i].lvName,
                        endTime: response.data[i].startDate,
                        startTime: response.data[i].endDate,
                        content: response.data[i].lvDetails,
                        enclosure:response.data[i].enclosure,
                        leaveMessages:response.data[i].leaveMessages
                    };
                    this.state.data.push(model);
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
                console.log("response:" + JSON.stringify(response));
                for (let i = 0; i < response.data.length; i++) {
                    let model = {
                        lvId:response.data[i].lvId,
                        title: response.data[i].lvName,
                        endTime: response.data[i].startDate,
                        startTime: response.data[i].endDate,
                        content: response.data[i].lvDetails,
                        enclosure:response.data[i].enclosure,
                        leaveMessages:response.data[i].leaveMessages
                    };
                    this.state.data.push(model);
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
            // if (this.state.data.length>60){
            //     this.setState({
            //         hasMoreData:false
            //     })
            //     message.info("没有更多数据！")
            //     return;
            // }
            // for (let i = 0; i < 10; i++) {
            //     let model = {
            //         title: '黎明的请假单',
            //         endTime: '2018-09-08 09:00',
            //         startTime: '2018-09-09 08:00',
            //         content: "感冒发烧"
            //     };
            //     this.state.data.push(model);
            // }
            //
            // this.setState({
            //     data: this.state.data
            // })


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
            }
        }).catch((error)=>{
            console.log("error:"+JSON.stringify(error));
        })

    }

    onItemOnClick=(index,item)=>{
       console.log("onItemOnClick()",index);
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
                                    <div id="global_page_title">  {item.title}</div>
                                    <div className="item_flex_1  flex_row_right margin_left_right_10">
                                        {this.state.role==="parent"?(""):(<div>
                                            {item.leaveMessages.length===0?("未查阅"):("已查阅")}
                                        </div>)}
                                    </div>
                                </div>
                                <div className="row ">
                                    <div  className="col-xs-3" id="col-clear">请假时间：</div>
                                    <div  className="col-xs-9" id="col-clear-start">{item.startTime}—{item.endTime}</div>
                                </div>
                                <div className="row  " >
                                    <div  className="col-xs-3" id="col-clear">请假事由：</div>
                                    <div  className="col-xs-9" id="col-clear-start">{item.content}</div>
                                </div>

                                <div className="row  margin_bottom_20">
                                    {item.enclosure.length!=0?(<div >
                                        <img className="margin_top_bottom_10" src={_baseURL+"/"+item.enclosure[0]}  width={"70%"}  />
                                    </div>):("")}
                                </div>

                                <div className="row ">
                                    <div  className="col-xs-12 clear_margin" >
                                        {/*    <Button type={"primary"}  size={"small"} id="button_ok">批准</Button>*/}
                                        {this.state.role==="parent"?(
                                            /*家长端*/
                                            <div className="bg_white">
                                                {item.leaveMessages.length===0?(<div className="row" style={{height:"15px"}}>

                                                </div>):(
                                                    <div className="">
                                                        <div className="padding_5"> 回复</div>
                                                        <div id="page_horizontal_line"></div>
                                                        <div className="padding_5" id="global_page_title"> {item.leaveMessages[0].messContent}</div>
                                                    {/*<Input  id={index} name={"item."+item.lvId}  disabled={true} size={"small"} value={item.leaveMessages[0].messContent} className="item_flex_1"*/}
                                                            {/*onChange={this.onChangeMessage.bind(this)} placeholder=""  ></Input>*/}
                                                    {/*<Button  style={{backgroundColor:"#C9C9C9",border:"0px"}} size={"small"}    type={"primary"} className="margin_left_10">已回复</Button>*/}
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
                             renderItem={(item,index)=>(
                                 <List.Item  onClick={this.onItemOnClick.bind(this,index,item)} key={item.lvId} id="row_background"  >
                                     <div className="col-xs-12 " >
                                         <div className="row flex" >
                                             <div id="global_page_title">  {item.title}</div>
                                             <div className="item_flex_1  flex_row_right margin_left_right_10">
                                                 {this.state.role==="parent"?(""):(<div>
                                                     {item.leaveMessages.length===0?("未查阅"):("已查阅")}
                                                 </div>)}
                                             </div>
                                         </div>
                                         <div className="row ">
                                             <div  className="col-xs-3" id="col-clear">请假时间：</div>
                                             <div  className="col-xs-9" id="col-clear-start">{item.startTime}—{item.endTime}</div>
                                         </div>
                                         <div className="row " >
                                             <div  className="col-xs-3" id="col-clear">请假事由：</div>
                                             <div  className="col-xs-9" id="col-clear-start">{item.content}</div>
                                         </div>

                                         <div className="row">
                                             <div  className="col-xs-12" >
                                             {/*    <Button type={"primary"}  size={"small"} id="button_ok">批准</Button>*/}
                                                 {this.state.role==="parent"?(
                                                     /*家长端*/
                                                     <div className=" bg_white">
                                                     {item.leaveMessages.length===0?(<div className="row" style={{height:"15px"}}>

                                                     </div>):(<div className="flex padding_10">
                                                         {
                                                             item.leaveMessages.map((item)=>(
                                                                 <div className="flex">
                                                                     <span className="text_underline">{item.userName}</span>老师：
                                                                     <Input  id={index} name={"item."+item.lvId}  disabled={true} size={"small"}
                                                                      value={item.messContent} className="item_flex_1"
                                                                             onChange={this.onChangeMessage.bind(this)} placeholder="">
                                                                     </Input>
                                                                 </div>
                                                             ))
                                                         }

                                                         {/*<Button  style={{backgroundColor:"#C9C9C9",border:"0px"}} size={"small"}    type={"primary"} className="margin_left_10">已回复</Button>*/}
                                                     </div>)}
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