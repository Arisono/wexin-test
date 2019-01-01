/**
*   Created by FANGlh on 2018/11/9 20:09.
*/

import React,{Component} from 'react';
import './AccessNotice.css';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import LoadingMore from "../../../components/LoadingMore";
import InfiniteScroll from 'react-infinite-scroller';
import {Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import ItemComp from './ItemComp';


class AccessNotice extends Component{
    componentWillMount() {
        document.title = '进出校通知'
    }

    constructor(){
        super();
        this.state = {
            studentName:'吴彦祖',
            studentGrade:'三年八班',
            out_inData:[]
        }
    }
    componentDidMount() {
        fetchGet(API.RecordOutgoingList,{
            // stuId:this.props.userInfo.userId,
            stuId:10002,
            pageIndex:1,
            pageSize:10
        },{})
            .then((response)=>{
                console.log('response',response)
                if (response.success && response.data){
                    this.setState({
                        out_inData:response.data
                    })
                }else {
                    Toast.info("暂无进出校数据",2)
                }
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