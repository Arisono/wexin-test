/**
 * Created by Arison on 2018/12/19.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MobileUpload from "../../components/upload/MobileUpload";
import {API} from "../../configs/api.config";

/**
 * Created by Arison on 16:06.
 */
class MobileUploadDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'MobileUploadDemo'
        };
    }

    componentDidMount(){

    }

    handleBack=(files)=>{
        console.log("handleBack()",files);
    }
    handleRemove=(files,index)=>{
        console.log("handleRemove()",files);
        console.log("handleRemove()",index);
    }

    render(){
        let targetProps={
            action:API.UPLOAD_FILE,
            size:4,
            handleBack:this.handleBack,
            handleRemove:this.handleRemove
        }
        return <div>
            <MobileUpload {...targetProps}></MobileUpload>
        </div>
    }
}

export  default MobileUploadDemo;