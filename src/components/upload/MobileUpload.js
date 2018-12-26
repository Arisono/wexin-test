/**
 * Created by Arison on 2018/12/19.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ImagePicker} from 'antd-mobile'
import {API,_baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import PropTypes from 'prop-types';

/**
 * Created by Arison on 10:42.
 */
class MobileUpload extends React.Component{

    static propTypes = {
        action:PropTypes.string,
        size:PropTypes.number,
        handleBack:PropTypes.func,
        handleRemove: PropTypes.func
    }

    static defaultProps = {
        action:API.UPLOAD_FILE,
        size:4,
    }

    constructor(props){
        super(props);
        this.state={
            name:'MobileUpload',
            type:"",
            index:0,
            files:[
            ]
        };
    }
    
    
    componentDidMount(){
        
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        if(type==='add'){
            this.uploadFile(files[files.length-1].file);
            this.setState({
                files,
                type,
                index
            });
        }else if(type==='remove'){
            this.setState({
                files:files
            });
            if(this.props.handleRemove){
                this.props.handleRemove(this.state.files,index);
            }
        }

    }

    uploadFile=(file)=>{
        const formData = new FormData();
        formData.append('file', file);
        console.log("uploadFile()",file);
        Toast.loading("")
        fetch(this.props.action,{
            method :"POST",
            body: formData,
            mode: 'cors',
            credentials: 'include'
        }).then(function(response) {
           let  result= response.json();
            if(response.status===200){
                console.log("text:",result);
                return result;
            }else{
                Toast.success("上传失败！")
            }
        }).then(result=>{
            if(result.success){
                Toast.success("上传成功！");
                let imageUrl=_baseURL+result.data;
                this.state.files[this.state.files.length-1].url=imageUrl;
                this.setState({
                    files:this.state.files
                });
                if(this.props.handleBack){
                    this.props.handleBack(this.state.files);
                }
            }
        }).catch(function(ex) {
            Toast.success("上传失败！")
            console.log('parsing failed', ex)
        })
    }

    render(){
        return <div>
            <ImagePicker
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < this.props.size}
                multiple={false}/>
            <div>
            </div>
        </div>
    }
}

export  default MobileUpload;