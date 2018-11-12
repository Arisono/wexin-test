/**
*   Created by FANGlh on 2018/11/9 17:39.
*/

import React,{Component} from 'react';
import './ResApply.css';
import nextArrowimg from '../../../style/imgs/next_arrow.png';
import { Select,Upload,Modal,Icon } from 'antd';

const Option = Select.Option;

function UserItem(props){
    return(
        <div >
            <div className="res_detail">物品明细({props.key})</div>
            <div className="item_sty">
                <div className="left_title">物品用途</div>
                <input className="text-right right_input" type="text" placeholder="请输入"  />
            </div>
            <div className="comhline_sty1"></div>
            <div className="item_sty">
                <div className="left_title">数量</div>
                <input className="text-right right_input" type="number" placeholder="请输入"  />
            </div>
            <div className="comhline_sty1"></div>
        </div>
    )
}
export default class ResApply extends Component{
    constructor(){
        super();
        this.state = {
            resUser:null, //物品用途
            receivingSays:null, //领取说明
            Receiver:null, //接收人
            selectContentArray: [1,2],

            previewVisible: false,
            previewImage: '',
            fileList: [], //附件
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
                   <input ref='resUser' className="text-right right_input" type="text" placeholder="请输入"  autoFocus="autoFocus"/>
               </div>

                <div >
                    {this.state.selectContentArray.map((itemata,index) => <UserItem key ={index} itemata = {itemata} handelSItem={this.handelSItem}></UserItem>)}
                    <div onClick={this.addUserItem} className="text-center" style={{color:"#0CE11D",fontSize:12,margin:10}}>+ <span style={{color:"#666666"}}>添加物品明细</span></div>
                </div>

                <textarea ref='receivingSays' className="form-control textarea_sty" rows="5"  placeholder="领取说明" ></textarea>
                <div className="comhline_sty1"></div>

                <div className="item_sty">
                    <div className="left_title" style={{fontSize:12,paddingTop:5}}>接收人:</div>
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

                <div  className="item_sty">
                    <div style={{width:150,fontSize:15,color:"#666666"}}>附件</div>
                </div>

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