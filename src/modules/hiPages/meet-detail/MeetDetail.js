/**
*   Created by FANGlh on 2018/11/28 11:19.
*   Desc:
*/

import React,{Component} from 'react';
import './MeetDetail.css';
import MeetingBean from "../../../model/MeetingBean";
import hi_img from '../../../style/imgs/hiimg.png';
import {Button} from 'antd';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux';

function SignItem(props) {
    return(
        <div style={{display:'flex',flexDirection:'column',margin:8}}>
            <img src={hi_img} alt="" style={{width:40,height:40,borderRadius:25}}/>
            <span style={{fontSize:12,color:'#333333',marginTop:5}}>{props.itemdata.userName}</span>
        </div>
    )
}

class MeetDetail extends Component{
   constructor(props){
        super(props);
        this.state = {
            meetId:null,
            meetingBean: new MeetingBean(),
            meetingSignData:{},
            signList:[],
            unsignList:[],
            notifyStatus:null,//1是草稿 2是已发布 3是进行中 4结束
        }
    }
     render(){
         const {meetingSignData} = this.state
        return(
            <div>
                     <div className="comhline_sty"></div>
                    <div className='signContentlayout'>
                        <div className='titleLayout'>
                            <div className='titleText'>{meetingSignData.title}</div>
                            <div className={meetingSignData.meetStatus == '进行中' ? 'meetStatusRed' : 'meetStatusGray'}>
                                {meetingSignData.meetStatus}
                            </div>
                        </div>
                        <div className='contentItem'>
                            <div className='captionText'>时间：</div>
                            <div className='valueText'>{meetingSignData.startTime + ' 到 ' + meetingSignData.endTime}</div>
                        </div>
                        <div className='contentItem'>
                            <div className='captionText'>地址：</div>
                            <div className='valueText'>{meetingSignData.address}</div>
                        </div>
                        <div className='contentItem'>
                            <div className='captionText'>发起人：</div>
                            <div className='valueText'>{meetingSignData.sponsor}</div>
                        </div>
                        <div className='bottomLayout'>
                        {/*<span className={meetingSignData.signStatus == '签到' ? 'signBtnActive' : 'signBtnEnable'}>*/}
                            {/*{meetingSignData.signStatus}*/}
                        {/*</span>*/}
                        </div>
                    </div>
                <div className="comhline_sty"></div>

                <div style={{fontSize:14,color:'#252525',marginTop:10,marginLeft:20}}>已签到
                    <span style={{fontSize:12,color:'#666666',marginLeft:10}}>({this.state.signList.length}/{this.state.signList.length+this.state.unsignList.length}人)</span>
                </div>
                <div style={{marginTop:10,marginLeft:20,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    {this.state.signList.map((itemdata,index)=><SignItem itemdata={itemdata}></SignItem>)}
                </div>

                <div style={{fontSize:14,color:'#252525',marginTop:10,marginLeft:20}}>未签到
                    <span style={{fontSize:12,color:'#666666',marginLeft:10}}>{this.state.unsignList.length}/{this.state.signList.length+this.state.unsignList.length}人</span>
                </div>
                <div className="comhline_sty1"></div>
                    <div style={{marginTop:10,marginLeft:20,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    {this.state.unsignList.map((itemdata,index)=><SignItem itemdata={itemdata}></SignItem>)}
                </div>
                    {this.state.notifyStatus == 4 ? <div style={{textAlign:'center',marginTop:20}}>
                        <Button type="primary"  className='end_sty' style={{color:'#FFFFFF',backgroundColor:'#929292'}}>已结束</Button>
                    </div> : <div style={{textAlign:'center',marginTop:20,marginBottom:20}}>
                        <Button type="primary"  className='end_sty' onClick={this.EndMeetting}>结束会议</Button>
                    </div>}
            </div>
        )
    }
    EndMeetting =()=>{
        fetchGet(API.endMeeting,{
            userId:this.props.userInfo.userId,
            notifyId:this.state.notifyId
        },{}).then((response)=>{
            console.log('response',response)
            if(response.success && response.data){
                Toast.show(response.data,1)
                setTimeout(()=>{
                    this.props.history.push("/meetingSignIn")
                },3000)
            }
        }).catch((error) =>{
            console.log('error',error)
            Toast.show(error.message,1)
        })
    }
    componentWillMount() {
        document.title = '会议详情'
    }
    componentDidMount() {
        let meetId = this.props.match.params.meetId
        if(meetId == null || meetId == ''){
            return
        }
       console.log('meetId',this.props.match.params.meetId)

        let meetBean = new MeetingBean()
        meetBean.createTime = '2018-10-25 10:20'
        meetBean.title = '三年级全体教师期末动员大会'
        meetBean.meetStatus = '进行中'
        meetBean.startTime = '2018-11-25 14:20'
        meetBean.endTime = '2018-11-25 16:00'
        meetBean.address = '行政楼6楼办公室'
        meetBean.sponsor = '吴彦祖'
        this.setState({
            meetingSignData:meetBean
        })

        let params = {
            notifyId:meetId
        }
        fetchGet(API.homeWorkDetail,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success && response.data){
                    let meetBean1 = new MeetingBean()
                    meetBean1.createTime = response.data.creatDate
                    meetBean1.title = response.data.notifyName
                    meetBean1.meetStatus = response.data.signStatus
                    meetBean1.startTime = response.data.startDate
                    meetBean1.endTime = response.data.endDate
                    meetBean1.address = response.data.notifyAddress
                    meetBean1.sponsor = response.data.notifyCreatorName
                    let status = response.data.notifyStatus
                    if (status === 2) {
                        meetBean1.meetStatus = '未开始'
                    } else if (status === 3) {
                        meetBean1.meetStatus = '进行中'
                    } else if (status === 4) {
                        meetBean1.meetStatus = '已结束'
                    }
                    this.setState({
                        notifyId:response.data.notifyId,
                        meetingSignData:meetBean1,
                        signList:response.data.notifyRecords.reads,
                        unsignList:response.data.notifyRecords.unReads,
                        notifyStatus:response.data.notifyStatus
                    })
                }
            })
            .catch((error) =>{
                console.log('error',error)
            })
    }
    componentWillReceiveProps(newProps) {
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }

}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MeetDetail)