/**
*   Created by FANGlh on 2018/11/9 20:09.
*/

import React,{Component} from 'react';
import './AccessNotice.css';
import line_img from '../../../style/imgs/line_img.png';
import enter_img from '../../../style/imgs/ic_enter.png';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import LoadingMore from "../../../components/LoadingMore";
import InfiniteScroll from 'react-infinite-scroller';
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux';

function ItemComp() {
    return(
        <div>
            <img className="lineimg_sty" src={line_img} alt=""/>
            <div className="timeList_sty">
                <img className="img-circle out_in" src={enter_img} alt=""/>
                <div style={{marginLeft:30}}>
                    <div style={{color:"#666666",fontSize:12}}>2018-10-21 星期天</div>
                    <div style={{color:"#3333",fontSize:12,marginTop:5}}>17:01:34</div>
                </div>
            </div>
        </div>
    )
}

class AccessNotice extends Component{
    componentWillMount() {
        document.title = '进出校通知'
    }
    componentDidMount() {
        // console.log('Component DID MOUNT!',API.RecordOutgoingList)
        fetchGet(API.RecordOutgoingList,{
            stuId:this.props.userInfo.userId,
            pageIndex:1,
            pageSize:10
        },{})
            .then((response)=>{
                console.log('response',response)
            })
            .catch((error) =>{
                console.log('error',error)
                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    Toast.fail('请求异常', 2)
                }
            })
    }
    constructor(){
        super();
        this.state = {
            studentName:'吴彦祖',
            studentGrade:'三年八班',
            out_inData:[1,2,3,4,5,1,2,3,4,5]
        }
    }
    render(){
        return(
            <div >
                {/*<div className="header_sty1">*/}
                    <div className="header_sty">
                        <img className="img-circle header" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
                        <div style={{marginTop:20,marginLeft:10}}>
                            <div style={{color:"#4087DC",fontSize:18}}>{this.state.studentName}</div>
                            <div style={{color:"#666666",fontSize:12,marginTop:5}}>{this.state.studentGrade}</div>
                        </div>
                    </div>
                {/*</div>*/}
                <div className="center_sty">
                    <div style={{width:95,color:"#4087DC",fontSize:"20px",paddingLeft:30,paddingTop:60,
                        position:'fixed'}}>
                        <div>智</div><div>慧</div><div>校</div><div>园</div>
                        <br/>
                        <div>平</div><div>安</div><div>出</div><div>行</div>
                    </div>
                    <div style={{marginBottom:50,marginLeft:90}}>
                        {this.state.out_inData.map((itemdata,index) => <ItemComp key ={index} itemdata = {itemdata} handelSItem={this.handelSItem}></ItemComp>)}
                    </div>
                </div>
               {/*{ <div className="foot-sty">*/}
                    {/*<div className="comhline_sty1"></div>*/}
                   {/*<div className="foot-sty1">*/}
                       {/*<div onClick={this.previousDataClick} style={{width:"50%"}} className="text-center"><img src={arrowLeft} alt=""  style={{height:32,width:17,marginTop:8}}/></div>*/}
                       {/*<div onClick={this.nextDataClick} style={{width:"50%"}} className="text-center"><img src={nextArrowimg} alt=""  style={{height:32,width:17,marginTop:8}}/></div>*/}
                   {/*</div>*/}
                {/*</div>}*/}

            </div>
        )
    }

    HttpTest =() =>{
        // httpRuquest.
    }
    previousDataClick = (event)=>{
       console.log('previousDataClick')
    }

    nextDataClick = (event)=>{
        console.log('nextDataClick')
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AccessNotice)