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

function SignItem() {
    return(
        <div style={{display:'flex',flexDirection:'column',margin:8}}>
            <img src={hi_img} alt="" style={{width:40,height:40,borderRadius:25}}/>
            <span style={{fontSize:12,color:'#333333',marginTop:5}}>吴彦祖</span>
        </div>
    )
}

export default class MeetDetail extends Component{
   constructor(props){
        super(props);
        this.state = {
            meetingBean: new MeetingBean(),
            meetingSignData:{},
            signList:[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,],
            unsignList:[1,2,3]
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
                    <span style={{fontSize:12,color:'#666666',marginLeft:10}}>(13/16人)</span>
                </div>
                <div style={{marginTop:10,marginLeft:20,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    {this.state.signList.map((itemdata,index)=><SignItem></SignItem>)}
                </div>

                <div style={{fontSize:14,color:'#252525',marginTop:10,marginLeft:20}}>未签到
                    <span style={{fontSize:12,color:'#666666',marginLeft:10}}>(13/16人)</span>
                </div>
                <div className="comhline_sty1"></div>
                    <div style={{marginTop:10,marginLeft:20,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    {this.state.unsignList.map((itemdata,index)=><SignItem></SignItem>)}
                </div>
                <div style={{textAlign:'center',marginTop:20}}>
                    <Button type="primary"  className='end_sty' style={{color:'#FFFFFF',backgroundColor:'#929292'}}>已结束</Button></div>
                <div style={{textAlign:'center',marginTop:20,marginBottom:20}}><Button type="primary"  className='end_sty'>结束会议</Button></div>

            </div>
        )
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.setState({
            meetingBean: this.props.meetingBean
        })

        let meetBean = new MeetingBean()
        meetBean.createTime = '2018-10-25 10:20'
        meetBean.title = '三年级全体教师期末动员大会'
        meetBean.meetStatus = '进行中'
        meetBean.startTime = '2018-11-25 14:20'
        meetBean.endTime = '2018-11-25 16:00'
        meetBean.address = '行政楼6楼办公室'
        meetBean.sponsor = '吴彦祖'
        // meetBean.signStatus = '已签到'
        this.setState({
            meetingSignData:meetBean
        })


        let params = {
            notifyId:18,
            userId:10002
        }
        fetchGet(API.homeWorkDetail,params,{})
            .then((response)=>{
                console.log('response',response)
                if(response.success){

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