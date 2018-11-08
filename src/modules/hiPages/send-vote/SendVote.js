/**
*   Created by FANGlh on 2018/11/8 14:57.
*/

import React,{Component} from 'react';
import  './SendVote.css';
import { DatePicker,Select,Switch,Upload, Icon, Modal } from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import moment from 'moment'
import add_annex from '../../../style/imgs/add_annex.png';
import 'antd/dist/antd.css';

const Option = Select.Option;


function ComImg(){
    return(
        <div >
            <img className="annex_img" src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} alt=""/>
        </div>
    )
}
export default class SendVote extends Component{
    constructor(props){
        super(props);
        this.state = {
            voteTitle:null,
            endValue:null,
            voteType:null,
            nonameVote:false,
            annexNumbers:0,

           annexArray:[],
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
    render(){
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return(
            <div onChange={this.handelValueCom}>
                <textarea autoFocus="autoFocus" ref='voteTitle' className="form-control textarea_sty" rows="2" placeholder="请填写投票主题…" ></textarea>
                <div className="comhline_sty"></div>
                <div className="comhline_sty"></div>

                <div  className="item_sty">
                    <div style={{width:150}}>投票类型:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <Select defaultValue="请选择" style={{ width:100 }} onChange={this.handleSelectChange}>
                            <Option value="0">单选</Option>
                            <Option value="1">多选</Option>
                        </Select>
                        <img src={nextArrowimg} className="nextarr_sty"/>
                    </div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150}}>结束时间:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={this.state.endValue}
                            placeholder="请选择结束时间"
                            onChange={this.SelechEndTime}
                        />
                        <img src={nextArrowimg} className="nextarr_sty"/></div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150}}>匿名投票:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultunchecked = "false"  onChange={this.switchStatues}/>
                        <img src={nextArrowimg} className="nextarr_sty"/></div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150}}>附件:</div>
                    <div className="text-right" style={{width:"100%",}}>{this.state.annexNumbers}/4张</div>
                </div>

                {/*<div className="annex_sty">*/}
                    {/*{this.state.annexArray.map((itemata,index) => <ComImg key={index} itemata = {itemata}></ComImg>)}*/}
                    {/*<img onClick={this.addAnnex} className="annex_img"  src={add_annex}/>*/}
                {/*</div>*/}

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

                <center><button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSendVote}>发布</button></center>
            </div>
        )
    }
    //发布提交
    doSendVote = (event)=>{
        console.log('state',this.state)
    }
    addAnnex = (event)=>{
        console.log('addAnnex')
    }
    SelechEndTime = (value) =>{
        // console.log('value',moment(value.toLocaleString()).format('YYYY-MM-DD HH:mm:ss'))
        this.setState({
            endValue:value
        })
    }
    handleSelectChange =(value) =>{
        this.setState({
            voteType:value
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

    handleChange = ({ fileList }) => this.setState({ fileList })

}