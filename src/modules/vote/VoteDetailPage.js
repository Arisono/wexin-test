/**
 * Created by Arison on 2018/11/15.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { List,Button,Checkbox, Progress } from 'antd';
import './VoteDetailPage.css'
import {fetchPost,fetchGet} from "../../utils/fetchRequest";
import {API,_baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import ImageGrid from "../../components/image/ImageGrid";
/**
 * Created by Arison on 15:51.
 */
class VoteDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'VoteDetailPage',
            id: this.props.match.params.id,
            voteState:false,
            data: {
                    title:'三年级2班',
                    state:'进行中',
                    voter:'',
                    voterPhoto:'',
                    files:[],
                    endTime:'2018-11-15 08:00',
                    selectState:0,//0 单选 1 多选
                    votes:[]
                }
        };
    }


   componentWillMount(){
        document.title ="投票";
   }
    
    componentDidMount(){
        console.log("componentWillMount():id:"+this.state.id);
        document.title = '投票'
        this.setState({
            voteState:this.props.match.params.voteState
        });
        this.getVoteDetail();

    }

    getVoteDetail() {
        fetchGet(API.voteDetail, {
            voteId: this.state.id,
            userId:'10000'
        }).then((response) => {
            console.log("response:" + JSON.stringify(response));
            this.state.data.title = response.data.topics[0].topicName;
            this.state.data.voter = response.data.userName;

            this.state.data.files.length=0;
            if(response.data.enclosure!=null){
                for (let i = 0; i < response.data.enclosure.length; i++) {
                    this.state.data.files.push(_baseURL+response.data.enclosure[i]);
                }
            }

            this.state.data.endTime = response.data.voteEndDate;
            this.state.data.voterPhoto = response.data.userPhoto
            this.state.data.selectState = response.data.voteType === 1 ? 0 : 1
            this.state.data.state = response.data.voteStatus === 1 ? "进行中" : "已结束"
            if(this.state.data.state==="进行中"){
                this.state.voteState=true;
            }else{
                this.state.voteState=false;
            }
            this.state.data.votes.length = 0;
            for (let i = 0; i < response.data.topics[0].options.length; i++) {
                let model = {
                    optionId: response.data.topics[0].options[i].optionId,
                    topicId: response.data.topics[0].options[i].topicId,
                    count: response.data.topics[0].options[i].count,
                    percent: parseInt(response.data.topics[0].options[i].percent),
                    name: response.data.topics[0].options[i].optionName,
                    checked: false
                }
                this.state.data.votes.push(model);
            }
            this.setState({
                data: this.state.data
            })

        }).catch((error) => {
            console.log("error:" + JSON.stringify(error));
        })
    }
    onChangeEvent=(index,event)=>{
        console.log("onChangeEvent()",event.target.checked);
        if(this.state.data.selectState===0){//单选
            this.state.data.votes[index].checked= event.target.checked;
           for (let i = 0; i < this.state.data.votes.length; i++) {
                 if(i!=index){
                     this.state.data.votes[i].checked= false;
                 }
           }
           this.setState({
               data:this.state.data
           })
        }else{//多选
            this.state.data.votes[index].checked= event.target.checked;
            this.setState({
                data:this.state.data
            })
        }
    }

    onClickEvent=()=>{
        //投票状态
         let  options=[];
        for (let i = 0; i < this.state.data.votes.length; i++) {
            let model=this.state.data.votes[i];
            console.log("onClickEvent():model:",model);
            if(model.checked){
                if(this.state.data.selectState===0){
                    options.push(model.optionId);
                }else{
                    options.push(model.optionId);
                }
            }
        }
       console.log("onClickEvent():",options);
        if(options.length==0){
            Toast.info("请选择一个投票项")
            return
        }
       fetchPost(API.voteAction,{
                     optionIds:JSON.stringify(options),
                     voteId:this.state.id,
                     userId:'10000'
                 }).then((response)=>{
                     console.log("response:"+JSON.stringify(response));
                     Toast.info(response.data)
                     this.getVoteDetail();
                     this.setState({
                         voteState:true
                     })
                 }).catch((error)=>{
                     console.log("error:"+JSON.stringify(error));
                 })
    }


    render(){
        return <div className="container-fluid">
            <div className="row">
                 <div className="col-xs-12">
                     <div className="row" id="pager_header" >
                          <div className="flex_row">
                              <img class="img-circle" style={{marginLeft:"10px",marginTop:'20px',border:"1px solid #e4e4e4"}} src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}  width={66} height={66} />

                              <div  className="vote-header" >
                                  {this.state.data.title}
                              </div>
                          </div>
                         <div className="text_bold" style={{marginLeft:"18px"}} >{this.state.data.voter}</div>
                         <div id="row_right"><span className="text_bold">截止时间：</span><span>{this.state.data.endTime}</span></div>
                     </div>
                     <div className="row">
                         <div id="padding10">
                             {this.state.data.selectState===0?(<span>单选</span>):(<span>多选</span>)}
                             </div>
                         <div id="page_horizontal_line"></div>
                          <div className="col-xs-12">
                             <List dataSource={this.state.data.votes}
                                   renderItem={(item,index)=>(
                                      <List.Item id="flex_row">
                                          <Checkbox  checked={item.checked}
                                                     onChange={this.onChangeEvent.bind(this,index)}
                                                     style={{marginLeft:"20px",display:"flex",alignItems:"center"}}  >
                                          </Checkbox>
                                          <div style={{width:"200px",display:"inline",marginRight:"10px"
                                          ,marginLeft:"10px",display:"flex",alignItems:"center",height:"100%"}} >
                                              <Progress   percent={item.percent} size="small" />
                                          </div>
                                          {item.name}
                                      </List.Item>
                             )}/>
                         </div>
                     </div>

                     <div className="row flex_center" id="row_vote">
                         {this.state.voteState==true?(
                             <Button onClick={this.onClickEvent.bind(this)} id="button_vote" type={'primary'}  block> 投票</Button>
                         ):(
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
                     {this.state.data.files.length===0?(""):(<div>
                         <div className="row" id="page_block_min"></div>
                         <div className="row margin_left_right_20">
                             <div className="margin_top_20"><span className="span_15">附件</span></div>
                             <ImageGrid images={this.state.data.files}/>
                         </div>
                     </div>)}

                  </div>
              </div>
        </div>
    }
}

export  default VoteDetailPage;