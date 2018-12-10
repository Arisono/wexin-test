/**
 *   Created by FANGlh on 2018/11/26 16:18.
 *   Desc:审批详情，审批操作通用界面
 */

import React,{Component} from 'react';
import './ApprovelDetail.css';
import hi_img from '../../../style/imgs/hiimg.png';
import DetailItem from './DetailItem';
import {isObjEmpty} from "../../../utils/common";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import LazyLoad from 'react-lazyload'
import ItemApprovel from './ItemApprovel';
import { Button,Modal } from 'antd';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API,_baseURL} from '../../../configs/api.config';
import {Toast} from 'antd-mobile';


export default class ApprovelDetail extends Component{
    constructor(){
        super();
        this.state = {
            showButton:false,
            AMvisible: false,
            AMTitle:null,
            detailList:[],
            pictureList:[],
            approvelData:[],
            approveId:null,
            docModel:{
                approveFiles:{},
                approver:{},
                basic:[],
                oaApprove:{},
                proposer:{}
            },
            handleStatus:null //审批操作1:同意，2：不同意
        }
    }
     render(){
         const {pictureList} = this.state
         let pictureItems = []
         for (let i = 0; i < pictureList.length; i++) {
             const pictureUrl = pictureList[i]
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
                                     <img src={pictureUrl}/>
                                 </div>
                             </CSSTransition>
                         </LazyLoad> :
                         <div className='pictureItem'>
                             <img src={pictureUrl}/>
                         </div>
                 )
             }
         }
        return(
            <div>
               <div className="headerDiv">
                   <img className="headerImg" src={hi_img} alt=""/>
                   <div style={{marginTop:10}}>
                       <div style={{color:"#000000",fontSize:15}}>{this.state.docModel.proposer.value}</div>
                       <div style={{color:"#666666",fontSize:12,marginTop:10}}>{this.state.docModel.oaApprove.creatDate}</div>
                   </div>
               </div>
                <div className="comhline_sty"></div>

                <div style={{marginTop:10}}>
                    {this.state.docModel.basic.map((itemdata,index) =>
                        <DetailItem index = {index} itemdata = {itemdata}></DetailItem>
                    )}
                </div>
                <div className="comhline_sty1" style={{marginTop:10}}></div>
                <div style={{textAlign:'left',color:'#666666',marginLeft:10,marginTop:10}}>附件</div>

                <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                    <div style={{flex: '1', overflow: 'scroll', padding: '5px', webkitOverflowScrolling: 'touch'}}>
                        <TransitionGroup>
                            {pictureItems}
                        </TransitionGroup>
                    </div>
                </div>

                <div className="comhline_sty"></div>

                <div style={{marginBottom:50}}>
                    {/*{this.state.docModel.approver.map((itemdata,index) => <ItemApprovel key ={index} itemdata = {itemdata}></ItemApprovel>)}*/}
                    <ItemApprovel itemdata ={this.state.docModel.approver} approveStatus = {this.state.docModel.oaApprove.approveStatus}
                                  approveDate = {this.state.docModel.oaApprove.approveDate}
                    ></ItemApprovel>
                </div>
                {this.state.showButton ?  <div style={{display:'flex',flexDirection:'row',marginBottom:20}} >
                        <div style={{width:'50%',textAlign:'center'}}>
                            <Button  type="primary" className="agree_sty" onClick={this.handleStatusClick.bind(this,1)}>同意</Button>
                        </div>
                        <div style={{width:'50%',textAlign:'center'}}>
                            <Button className="disagree_sty" onClick={this.handleStatusClick.bind(this,2)}>不同意</Button>
                        </div>
                    </div> : ''}
                <Modal
                    title={this.state.AMTitle}
                    visible={this.state.AMvisible}
                    okText={'确认'}
                    onOk={this.doApprovel.bind(this,1)}
                    cancelText={'取消'}
                    onCancel={this.doApprovel.bind(this,0)}
                    // footer={[
                    //     <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    //     <Button key="submit" type="primary" onClick={this.handleSubmit}>提交</Button>,
                    // ]}
                >
                   <div onChange={this.handelValueCom}>
                       <textarea autoFocus="autoFocus" ref='approveOpinion' className="form-control" rows="5" placeholder="填写意见说明（非必填）" ></textarea>
                   </div>
                </Modal>
            </div>
        )
    }
    handleStatusClick = (status)=>{
         var statusTitle = null
         if(status == 1){
             statusTitle = '同意'
         }else if(status == 2){
             statusTitle = '不同意'
         }
        // console.log('您点击了',statusTitle)

        this.setState({
            AMvisible:true,
            AMTitle:statusTitle,
            handleStatus:status
        })
    }
    doApprovel = (order)=>{
        this.setState({
            AMvisible: false,
        });
        if(order == 0){
            return
        }
        fetchPost(API.doapprove,{
            userId:10007,
            approveId:this.state.approveId,
            status:this.state.handleStatus,
            approveOpinion:this.state.approveOpinion
        },{}).then((response)=>{
            if(response.success && response.data){
                Toast.show(response.data,1)
                this.setState({
                    showButton:false
                })
                setTimeout(()=>{
                    this.props.history.push("/approvel")
                },3000)
            }
        }).catch((error) =>{
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }
    handelValueCom = ()=>{
        let approveOpinion = this.refs.approveOpinion.value;
        this.setState({
            approveOpinion:approveOpinion,
        })
    }
    componentWillMount() {
        document.title = '审批详情';
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
    componentDidMount() {

        // let pictures = [
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918586&di=a22036279c9e4a86f03cdd9996a8a0f5&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D0645f21b46086e067ea537086a611181%2F1c950a7b02087bf4b40d39c3f8d3572c11dfcf33.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918584&di=beb8b53a7e5544a0f9f4c24b6c992a4b&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150311%2F0005018318132246_b.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918579&di=d579d076328b42dac2924ce2a2524bc8&imgtype=0&src=http%3A%2F%2Fpic25.photophoto.cn%2F20121230%2F0010023534858256_b.jpg',
        //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543289918576&di=33bc85167aca41998561827abee641c7&imgtype=0&src=http%3A%2F%2Fpic25.photophoto.cn%2F20121230%2F0044040929574945_b.jpg'
        // ]

        this.setState({
           // pictureList: this.state.pictureList.concat(pictures, pictures),
            approveId:this.props.match.params.approveId,
            isMyApply:this.props.match.params.isMyApply
        },function () {
            if(this.state.approveId == null || this.state.approveId == ''){
                return
            }else {
                fetchGet(API.oaDetails,{
                    approveId:this.state.approveId
                },{}).then((response)=>{
                    if(response.success && response.data){
                        var approveStatus = response.data.oaApprove.approveStatus
                        var showbutton = false
                        if(approveStatus == 1 && this.state.isMyApply== 'false'){
                            showbutton = true
                            // console.log('showbutton1',1)
                        }else {
                            showbutton = false
                            // console.log('showbutton2',2)
                        }
                        let approveFiles = response.data.approveFiles.value
                        const pictureList = []
                        console.log('approveFiles',approveFiles)
                        if (approveFiles) {
                            approveFiles.forEach((value, index) => {
                                pictureList.push(_baseURL + value)
                            })
                        }
                        this.setState({
                            showButton:showbutton,
                            docModel: response.data,
                            pictureList:pictureList
                        },function () {
                             console.log('pictureList',this.state.pictureList)
                        })
                        // console.log('showbutton',showbutton)
                        // console.log('approveStatus',approveStatus)
                        // console.log('this.state.isMyApply',this.state.isMyApply)
                    }
                }).catch((error) =>{
                    console.log('error',error)
                })
            }
        })
    }
}