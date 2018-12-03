/**
*   Created by FANGlh on 2018/11/9 17:39.
*/

import React,{Component} from 'react';
import './ResApply.css';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import { Select,Upload,Modal,Icon } from 'antd';
import UserItem from './UserItem';
import {Toast,Picker,List} from 'antd-mobile';
import {isObjEmpty} from "../../../utils/common";
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';

const Option = Select.Option;


export default class ResApply extends Component{
    componentWillMount() {
        document.title = '用品申请'
    }
    constructor(){
        super();
        this.state = {
            resUser:'这是一个用品申请', //物品用途
            receivingSays:new Date().toLocaleString(), //领取说明
            Receiver:'程冠希', //接收人
            selectContentArray: [
                    {
                        artName:null,
                        artCount:null
                    }
                ],

            previewVisible: false,
            previewImage: '',
            fileList: [], //附件，
            receiverPerson:[{
                label: '吴彦祖',
                value: '吴彦祖'
            },{
                label: '陈冠希',
                value: '陈冠希'
            },{
                label: '古天乐',
                value: '古天乐'
            }]
        }
    }

    render(){
        //添加附件按钮
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return(
            <div onChange={this.handelValueCom}>
                <div className="comhline_sty"></div>
                <div className="item_sty">
                   <div className="left_title">物品用途</div>
                   <input ref='resUser' className="text-right right_input" type="text" placeholder="请输入"  autoFocus="autoFocus" value={this.state.resUser}/>
               </div>

                <div >
                    {this.state.selectContentArray.map((itemata,index) => <UserItem index ={index} itemata = {itemata} handelRItem={this.handelRItem} removeSItem={this.removeSItem}></UserItem>)}
                    <div onClick={this.addUserItem} className="text-center" style={{color:"#0CE11D",fontSize:12,margin:10}}>+ <span style={{color:"#666666"}}>添加物品明细</span></div>
                </div>

                <textarea ref='receivingSays' className="form-control textarea_sty" rows="5"  placeholder="领取说明"  value={this.state.receivingSays}></textarea>
                <div className="comhline_sty1"></div>


                <div className="common-column-layout">
                    <Picker
                        data={this.state.receiverPerson} title='接收人' extra='请选择'
                        value={this.state.Receiver}
                        onChange={this.handleSelectChange}
                        onOk={this.handleSelectChange} cols={1}>
                        <List.Item arrow="horizontal" >接收人</List.Item>
                    </Picker>
                </div>

                <div className="comhline_sty"></div>

                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#666666"}}>附件</div>
                </div>

                <div className="clearfix" style={{margin:10}}>
                    <Upload
                        action={API.UPLOAD_FILE}
                        listType="picture-card"
                        fileList={this.state.fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        multiple={true}
                    >
                        {this.state.fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                </div>

                <center><button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSaveClick}>发布</button></center>
            </div>
        )
    }

    //提交
    doSaveClick =() =>{
        console.log('state',this.state)
        if(this.state.resUser == null || this.state.resUser == ''){
            Toast.show('请输入物品用途',1)
            return
        }
        if(isObjEmpty(this.state.selectContentArray)){
            Toast.show('物品明细存在未输入项')
            return
        }
        if(this.state.receivingSays == null || this.state.receivingSays == ''){
            Toast.show('请输入领取说明',1)
            return
        }
        if(this.state.Receiver == null || this.state.Receiver == ''){
            Toast.show('请选择接收人',1)
            return
        }
        var approveFiles = []
        for(let i=0;i<this.state.fileList.length;i++){
            if(this.state.fileList[i].response && this.state.fileList[i].response.success){
                approveFiles.push(this.state.fileList[i].response.data)
                if(i==this.state.fileList.length-1){
                    this.setState({
                        approveFiles:approveFiles
                    })
                    console.log('approveFiles',approveFiles)
                }
            }
        }
        var params = {
            approveName: this.state.resUser,
            approveDetails:this.state.receivingSays,
            approveType: 2,
            proposer: 10000,
            approver: 10007,
            approveFiles:approveFiles,
            articles:this.state.selectContentArray
        }
        console.log('param',{
            oaString:params
        })
        fetchPost(API.oaCreate,{
            oaString:JSON.stringify(params)
        },{})
            .then((response)=>{
                console.log('response',response)
                if(response.success){
                    Toast.show(response.data,1)
                }
            })
            .catch((error) =>{
                console.log('error',error)
            })
    }
    removeSItem = (index)=>{
        if(this.state.selectContentArray.length == 1){
            return
        }
        let selectContentArray = this.state.selectContentArray
        selectContentArray.splice(index,1)
        this.setState({
            selectContentArray
        })
    }
    handelRItem = (itemObject,index)=>{
        console.log('itemObject',itemObject)
        console.log('index',index)
        let selectContentArray = this.state.selectContentArray
        selectContentArray[index] = itemObject
        this.setState({
            selectContentArray:selectContentArray
        })
    }
    addUserItem = (event)=>{
        let selectContentArray =  [...this.state.selectContentArray,1];
        this.setState({
            selectContentArray
        })
    }
    handelValueCom = (event)=>{
        //获取用户名的值
        let resUser = this.refs.resUser.value;
        let receivingSays = this.refs.receivingSays.value;
        //获得内容的值
        this.setState({
            resUser:resUser,
            receivingSays:receivingSays
        })
    }

    handleSelectChange =(value) =>{
        this.setState({
            Receiver:value
        })
    }
    handleChange = ({fileList} ) => {
        this.setState({
            fileList:fileList,
        })
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })

}