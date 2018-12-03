/**
*   Created by FANGlh on 2018/11/9 19:35.
*/

import React,{Component} from 'react';
import { Select,Icon,Upload,Modal} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './FieldTrip.css';
import {Toast,Picker,List,DatePicker} from 'antd-mobile';
import {fetchPost,fetchGet,fetchGetNoSession} from '../../../utils/fetchRequest';
import {API} from '../../../configs/api.config';

import moment from 'moment'
const  nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
const Option = Select.Option;
export default class FieldTrip extends Component{
    componentWillMount() {
        document.title = '外勤出差'
    }
    constructor(){
        super();
        this.state = {
            tripType:'666',
            startValue: null,
            endValue: null,
            Tdurntion:null,
            tripsHours:null,
            tripsReason:new Date().toLocaleString(),
            Receiver:'吴彦祖',
            previewVisible: false,
            previewImage: '',
            fileList: [], //附件
            typeList:[
                {
                    label: '类型1',
                    value: '类型1'
                },{
                    label: '类型2',
                    value: '类型2'
                },{
                    label: '类型3',
                    value: '类型3'
                },{
                    label: '类型4',
                    value: '类型4'
                }
            ],
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
        };

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
                <div className="common-column-layout">
                    <Picker
                        data={this.state.typeList} title='出差类型' extra='请选择'
                        value={this.state.tripType}
                        onChange={this.handleSelectChange}
                        onOk={this.handleSelectChange} cols={1}>
                        <List.Item arrow="horizontal" >出差类型</List.Item>
                    </Picker>
                </div>

                <div className="comhline_sty1"></div>
                <DatePicker
                    value={this.state.startValue}
                    onChange={this.setStartDate}>
                    <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
                <div className="comhline_sty1"></div>
                <DatePicker
                    value={this.state.endValue}
                    onChange={this.setEndDate}>
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>


                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,color:"#333333"}}>时长(h)</div>
                    <div className="text-right" style={{width:"100%",}}>{this.state.tripsHours}
                        {this.state.Tdurntion}<img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty"></div>

                <textarea  ref='tripsReason' className="form-control textarea_sty" rows="5" placeholder="请填写出差事由…" value={this.state.tripsReason}></textarea>
                <div className="comhline_sty1"></div>
                <div className="common-column-layout">
                    <Picker
                        data={this.state.receiverPerson} title='接收人' extra='请选择'
                        value={this.state.Receiver}
                        onChange={this.handleSelectChange1}
                        onOk={this.handleSelectChange1} cols={1}>
                        <List.Item arrow="horizontal" >接收人</List.Item>
                    </Picker>
                </div>

                <div className="comhline_sty"></div>

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
        // console.log('startValue',this.state.startValue)
        if(this.state.tripType == null || this.state.tripType == ''){
            Toast.show('请选择出差类型',1)
            return
        }
        if(this.state.startValue == null || this.state.startValue == ''){
            Toast.show('请选择开始时间',1)
            return
        }
        if(this.state.endValue == null || this.state.endValue == ''){
            Toast.show('请选择结束时间',1)
            return
        }
        var startT = new Date(this.state.startValue).getTime()
        var endT = new Date(this.state.endValue).getTime()
        // console.log('startT',startT)
        if(startT > endT){
            Toast.show('结束时间不可小于开始时间',1)
            return
        }
        if(this.state.tripsReason == null || this.state.tripsReason == ''){
            Toast.show('请输入出差事由',1)
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
            appType:1,
            approveName: "这是一个出差",
            approveDetails:this.state.tripsReason,
            approveType: 1,
            proposer: 10000,
            approver: 10007,
            startDate: moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),
            approveFiles:approveFiles
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
    setStartDate = (value) =>{
        this.setthisTime(value,null)
    }
    setEndDate = (value) =>{
        this.setthisTime(null,value)
    }
    setthisTime = (stT,enT) =>{
       this.setState({
           startValue:stT == null ? this.state.startValue : stT,
           endValue:enT == null ? this.state.endValue : enT
       },function () {
           var startT = new Date(this.state.startValue).getTime()
           var endT = new Date(this.state.endValue).getTime()
           // console.log('startT',startT)
           // console.log('endT',endT)
           if(startT > endT && stT == null){
               Toast.show('结束时间不可小于开始时间',1)
               return
           }else if(startT != 0 && endT != 0){
               var Tdurntion = parseInt((endT - startT)/(1000*60*60))
               this.setState({
                   Tdurntion:Tdurntion
               })
           }
       })
    }
    handleSelectChange =(value) =>{
        this.setState({
            tripType:value
        })
    }
    handleSelectChange1 =(value) =>{
        this.setState({
            Receiver:value
        })
    }
    handelValueCom = (event)=>{
        //获取用户名的值
        let tripsReason = this.refs.tripsReason.value;
        //获得内容的值
        this.setState({
            tripsReason:tripsReason
        })
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
        if(this.state.startValue != null){

        }
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
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