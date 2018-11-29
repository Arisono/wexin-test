/**
*   Created by FANGlh on 2018/11/9 19:35.
*/

import React,{Component} from 'react';
import { DatePicker,Select,Icon,Upload,Modal} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import './FieldTrip.css';

const Option = Select.Option;
export default class FieldTrip extends Component{
    componentWillMount() {
        document.title = '外勤出差'
    }
    constructor(){
        super();this.state = {
            tripType:null,
            startValue: null,
            endValue: null,
            tripsHours:null,
            tripsReason:null,

            previewVisible: false,
            previewImage: '',
            fileList: [], //附件
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
                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#333333"}}>选择类型:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <Select defaultValue="请选择" style={{ width:100 }} onChange={this.handleSelectChange}>
                            <Option value="1">类型1</Option>
                            <Option value="2">类型2</Option>
                            <Option value="3">类型3</Option>
                            <Option value="4">类型4</Option>
                        </Select>
                        <img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,color:"#333333"}}>开始时间</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.startValue}
                            placeholder="请选择开始时间"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        /><img src={nextArrowimg} className="nextarr_sty"/></div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,color:"#333333"}}>结束时间</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.endValue}
                            placeholder="请选择结束时间"
                            onChange={this.onEndChange}
                            open={this.state.endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                        <img src={nextArrowimg} className="nextarr_sty"/></div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,color:"#333333"}}>时长(h)</div>
                    <div className="text-right" style={{width:"100%",}}>{this.state.tripsHours}
                        <img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty"></div>

                <textarea  ref='tripsReason' className="form-control textarea_sty" rows="5" placeholder="请填写出差事由…" ></textarea>
                <div className="comhline_sty1"></div>

                <div className="item_sty">
                    <div  style={{fontSize:12,paddingTop:5,width:150,color:"#333333"}}>接收人:</div>
                    <div className='text-right' style={{width:"100%",}}>
                        <Select defaultValue="单选"  style={{ width:100,fontSize:12}} onChange={this.handleSelectChange}>
                            <Option value="0">吴彦祖</Option>
                            <Option value="1">陈冠希</Option>
                            <Option value="2">古天乐</Option>
                        </Select>
                        <img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty"></div>

                <div className="clearfix" style={{margin:10}}>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
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
    }
    handleSelectChange =(value) =>{
        this.setState({
            tripType:value
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