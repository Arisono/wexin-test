/**
*   Created by FANGlh on 2018/11/8 14:57.
 *   *   创建投票
*/

import React,{Component} from 'react';
import  './SendVote.css';
import { Select,Switch,Upload, Icon, Modal,TreeSelect,Button} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import moment from 'moment'
import 'antd/dist/antd.css';
import SelectItem from './SelectItem';
import {isObjEmpty} from "../../../utils/common";
import {Toast,Picker,List,DatePicker} from 'antd-mobile';

import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';
const Option = Select.Option;


export default class SendVote extends Component{
    componentWillMount() {
        document.title = '发起投票'
    }
     componentDidMount() {
        console.log('Component DID MOUNT!')
    }
    constructor(props){
        super(props);
        this.state = {
            voteTitle:null,
            endValue:null,
            voteType:null,
            nonameVote:false,
            voteOptionss: [null,null],

            previewVisible: false,
            previewImage: '',
            fileList: [],
            votePerson:[],
            voteMembers:18,
            typeVote:[{
                label: '单选',
                value: '1'
            },{
                label: '多选',
                value: '2'
            }]
        }
    }

    render(){
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;

        const treeData = [
            {
                title: '研发部',
                value: 1000,
                key: 1000,
                children: [{
                    title: '吴彦祖',
                    value: 10000,
                    key: 10000,
                },{
                    title: '陈冠希',
                    value: 10001,
                    key: 10001,
                },{
                    title: '古天乐',
                    value: 10002,
                    key: 10002,
                },{
                    title: '黄宗伟',
                    value: 10003,
                    key: 10003,
                }],
            }, {
                title: '测试部',
                value: 1001,
                key: 1001,
                children: [{
                    title: '关之琳',
                    value: 10010,
                    key: 10010,
                }, {
                    title: '林青霞',
                    value: 10011,
                    key: 10011,
                }, {
                    title: '张曼玉',
                    value: 10012,
                    key: 10012,
                },{
                    title: '王祖贤',
                    value: 10013,
                    key: 10013,
                }],
            }];
        const tProps = {
            treeData,
            value: this.state.votePerson,
            onChange: this.selectPersononChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择投票对象',
            allowClear:true,
            style: {
                width: '100%',
            },
        };
        //添加附件按钮
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return(

            <div onChange={this.handelValueCom}>

                <div style={{color:"#333333",fontSize:15,margin:10}}>投票对象 <span style={{color:"#666666"}}>(共{this.state.votePerson.length}人)</span>  </div>
                <div className="comhline_sty1"></div>

                <TreeSelect {...tProps} />
                <div className="comhline_sty"></div>
                <textarea autoFocus="autoFocus" ref='voteTitle' className="form-control textarea_sty" rows="2" placeholder="请填写投票主题…" ></textarea>
                <div className="comhline_sty"></div>

                <div >
                    {this.state.voteOptionss.map((itemata,index) => <SelectItem index={index} itemata = {itemata} handelSItem={this.handelSItem} removeSItem ={this.removeSItem}></SelectItem>)}
                    <div onClick={this.addSelectItem} className="text-center" style={{color:"#0CE11D",fontSize:12,margin:10}}>+ <span >添加选项</span></div>
                </div>

                <div className="comhline_sty"></div>
                <div  className="common-column-layout">
                        <Picker
                            data={this.state.typeVote} title='投票类型' extra='请选择'
                            value={this.state.voteType}
                            onChange={this.handleSelectChange}
                            onOk={this.handleSelectChange} cols={1}>
                            <List.Item arrow="horizontal" >投票类型</List.Item>
                        </Picker>
                        {/*<Select defaultValue="请选择" style={{ width:100 }} onChange={this.handleSelectChange}>*/}
                            {/*<Option value="1">单选</Option>*/}
                            {/*<Option value="2">多选</Option>*/}
                        {/*</Select>*/}
                        {/*<img src={nextArrowimg} className="nextarr_sty"/>*/}
                    <div className="comhline_sty1"></div>
                    <DatePicker
                        value={this.state.endValue}
                        onChange={date => this.setState({endValue:date})}>
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </DatePicker>
                </div>

                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#333333"}}>匿名投票:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultunchecked = "false"  onChange={this.switchStatues}/>
                    </div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#666666"}}>附件:</div>
                    <div className="text-right" style={{width:"100%",}}>{this.state.fileList.length}/4张</div>
                </div>


                <div className="clearfix" style={{margin:10}}>
                    <Upload
                        action={API.UPLOAD_FILE}
                        listType="picture-card"
                        fileList={this.state.fileList}                        o
                        nPreview={this.handlePreview}
                        onChange={this.handleChange}
                        multiple={true}>
                        {this.state.fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                </div>

                <center><Button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSendVote}>提交</Button></center>
            </div>
        )
    }
    //发布提交
    doSendVote = (event)=>{
        console.log('state',this.state)
        if (this.state.votePerson.length == 0){
            Toast.show('请选择投票对象...',1)
            return
        }
        if(this.state.voteTitle == '' || this.state.voteTitle == null){
            Toast.show('请填写投票主题...',1)
            return
        }
        if(this.state.voteOptionss.length < 2){
            Toast.show('请输入选项内容...',1)
            return
        }
        if(this.state.voteType == null || this.state.voteType == ''){
            Toast.show('请选择投票类型...',1)
            return
        }
        if(this.state.endValue == null || this.state.endValue == ''){
            Toast.show('请选择正确结束时间...',1)
            return
        }

        var nowT = new Date().getTime()
        var endT = new Date(this.state.endValue).getTime()
        if(nowT > endT){
            Toast.show('当前时间不可大于结束时间',1)
            return
        }

        var options = []
        for(let i=0;i<this.state.voteOptionss.length;i++){
            const item = {
                optionName:this.state.voteOptionss[i],
                optionStatus:1
            }
            options[i]=item
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
        var approveFiles = []
        for(let i=0;i<this.state.fileList.length;i++){
            if(this.state.fileList[i].response.success){
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
                creator: 10004,
                voteStatus: 1,
                voteRemarks: "这是一个调查",
                voteName: this.state.voteTitle,
                voteFile:approveFiles,
                voter: this.state.votePerson,
                voteEndDate:  moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),
                voteType: this.state.voteType,
                topics:[
                    {
                        topicName: this.state.voteTitle,
                        topicStatus: 1,
                        topicType: 1,
                        options: options
                    }
                ]
        }
        console.log('params',{
            voteString:params
        })
        fetchPost(API.voteCreate,{
            voteString:JSON.stringify(params)
        },{})
            .then((response)=>{
                console.log('response',response)
                if(response.success){
                    Toast.show('提交成功',1)
                }
            })
            .catch((error) =>{
                console.log('error',error)
            })
    }
    selectPersononChange = (value) => {
        // console.log('selectPersononChange ', value);
        this.setState({votePerson:value });
    }
    removeSItem = (index)=>{
        if(this.state.voteOptionss.length == 2){
            return
        }
        let voteOptionss = this.state.voteOptionss
        voteOptionss.splice(index,1)
        this.setState({
            voteOptionss
        })
    }
    handelSItem = (itemdata,index)=>{
        console.log('index',index)
        console.log('itemdata',itemdata)
        let voteOptionss = this.state.voteOptionss
        voteOptionss[index] = itemdata
        this.setState({
            voteOptionss
        })
    }

    addSelectItem = (event)=>{
        let voteOptionss =  [...this.state.voteOptionss,null];
        this.setState({
            voteOptionss
        })
    }
    addAnnex = (event)=>{
        console.log('addAnnex')
    }

    handleSelectChange =(value) =>{
        console.log('voteType',value)
        this.setState({
            voteType:value[0]
        })
    }
    handelValueCom = (event)=>{
        //获取用户名的值
        let voteTitle = this.refs.voteTitle.value;
        //获得内容的值
        this.setState({
            voteTitle:voteTitle,
        })
    }

    switchStatues = (value)=>{
        console.log('isOpend?',value)
        this.setState({
            nonameVote:value
        })
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList} ) => {
        this.setState({
            fileList:fileList,
        })
    }

}