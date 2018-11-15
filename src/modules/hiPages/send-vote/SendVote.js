/**
*   Created by FANGlh on 2018/11/8 14:57.
*/

import React,{Component} from 'react';
import  './SendVote.css';
import { DatePicker,Select,Switch,Upload, Icon, Modal,TreeSelect} from 'antd';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import moment from 'moment'
import 'antd/dist/antd.css';
import SelectItem from './SelectItem';

const Option = Select.Option;


export default class SendVote extends Component{
    componentWillMount() {
        document.title = '发起投票'
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
           votePerson:['0-0-0']
        }
    }

    render(){
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;

        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                key: '0-0',
                children: [{
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                }],
            }, {
                title: 'Node2',
                value: '0-1',
                key: '0-1',
                children: [{
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                }, {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                }, {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                }],
            }];
        const tProps = {
            treeData,
            value: this.state.votePerson,
            onChange: this.selectPersononChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
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
                <TreeSelect {...tProps} />
                <div className="comhline_sty"></div>
                <textarea autoFocus="autoFocus" ref='voteTitle' className="form-control textarea_sty" rows="2" placeholder="请填写投票主题…" ></textarea>
                <div className="comhline_sty"></div>

                <div >
                    {this.state.voteOptionss.map((itemata,index) => <SelectItem index={index} itemata = {itemata} handelSItem={this.handelSItem} removeSItem ={this.removeSItem}></SelectItem>)}
                    <div onClick={this.addSelectItem} className="text-center" style={{color:"#0CE11D",fontSize:12,margin:10}}>+ <span >添加选项</span></div>
                </div>

                <div className="comhline_sty"></div>
                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#333333"}}>投票类型:</div>
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
                    <div style={{width:150,fontSize:15,color:"#333333"}}>结束时间:</div>
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
                    <div style={{width:150,fontSize:15,color:"#333333"}}>匿名投票:</div>
                    <div className="text-right" style={{width:"100%",}}>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultunchecked = "false"  onChange={this.switchStatues}/>
                        <img src={nextArrowimg} className="nextarr_sty"/></div>
                </div>
                <div className="comhline_sty1"></div>

                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#666666"}}>附件:</div>
                    <div className="text-right" style={{width:"100%",}}>{this.state.fileList.length}/4张</div>
                </div>


                <div className="clearfix" style={{margin:10}}>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={this.state.fileList}                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        multiple={true}>
                        {this.state.fileList.length >= 9 ? null : uploadButton}
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                </div>

                <center><button type="button" className="btn btn-primary comBtn_sty"  onClick={this.doSendVote}>提交</button></center>
            </div>
        )
    }
    //发布提交
    doSendVote = (event)=>{
        console.log('state',this.state)
    }
    selectPersononChange = (value) => {
        console.log('selectPersononChange ', value);
        this.setState({votePerson:value });
    }
    removeSItem = (index)=>{
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

    handleChange = ({fileList} ) => {
        this.setState({
            fileList:fileList,
        })
    }

}