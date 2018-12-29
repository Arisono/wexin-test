/**
*   Created by FANGlh on 2018/11/9 17:39.
*/

import React,{Component} from 'react';
import './ResApply.css';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import { Select,Upload,Modal,Icon } from 'antd';
import UserItem from './UserItem';
import {Toast,Picker,List} from 'antd-mobile';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
import {connect} from 'react-redux';
import {getIntValue, getStrValue, isObjEmpty} from "../../../utils/common";
import TargetSelect from '../../../components/TargetSelect';
import {getOrganization} from "../../../utils/api.request";
import {ORGANIZATION_TEACHER} from "../../../utils/api.constants";

const Option = Select.Option;


class ResApply extends Component{
    componentWillMount() {
        document.title = '用品申请'
    }
    constructor(){
        super();
        this.state = {
            votePerson:[],
            targetData: [],
            resUser:null, //物品用途
            receivingSays:null, //领取说明
            Receiver:null, //接收人
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
                value: '1'
            },{
                label: '陈冠希',
                value: '2'
            },{
                label: '古天乐',
                value: '3'
            }]
        }
    }

    render(){
        const targetProps = {
            targetData: this.state.targetData,
            targetValues: this.state.targetList,
            title: '接收人',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this),
            multiple: false,
        }

        const defaultTargetProps = {
            targetData: [],
            targetValues: this.state.targetList,
            title: '接收人',
            targetCount: this.state.targetCount,
            onTargetChange: this.onTargetChange.bind(this),
            onTargetFocus: this.onTargetFocus.bind(this),
            multiple: false,
        }
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


                {/*<div className="common-column-layout">*/}
                    {/*<Picker*/}
                        {/*data={this.state.receiverPerson} title='接收人' extra='请选择'*/}
                        {/*value={this.state.Receiver}*/}
                        {/*onChange={this.handleSelectChange}*/}
                        {/*onOk={this.handleSelectChange} cols={1}>*/}
                        {/*<List.Item arrow="horizontal" >接收人</List.Item>*/}
                    {/*</Picker>*/}
                {/*</div>*/}
                {this.state.targetData.length > 0 ? <TargetSelect {...targetProps}/>
                    : <TargetSelect {...defaultTargetProps}/>}
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

                <center><button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSaveClick}>提交</button></center>
            </div>
        )
    }
    onTargetFocus = (e) => {
        if (isObjEmpty(this.state.targetData)) {
            getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.userId, false)
                .then(organization => {
                    this.setState({
                        targetData: organization.teachers,
                    })
                }).catch(error => {

            })
        }
    }
    componentWillUnmount() {
        Toast.hide()
        clearTimeout(this.backTask)
    }
    onTargetChange = (value, label, checkNodes, count) => {
        this.checkNodes = checkNodes
        this.setState({
            targetList: value,
            targetCount: count
        });
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
        if (!isObjEmpty(this.checkNodes)) {
            this.checkNodes.forEach((node, index) => {
                this.state.votePerson.push(node.userId)
            })
        }else {
            Toast.fail('请选择接收人')
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
            appType:1,
            proposer: this.props.userInfo.userId,
            approver: this.state.votePerson[0],
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
                    this.backTask = setTimeout(() => {
                        this.props.history.goBack()
                    }, 2000)
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
        console.log('value',value)
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
    componentDidMount() {
        getOrganization(ORGANIZATION_TEACHER, this.props.userInfo.userId, false)
            .then(organization => {
                this.setState({
                    targetData: organization.teachers,
                })
            }).catch(error => {

        })
    }
}
let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ResApply)