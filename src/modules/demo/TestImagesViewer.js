/**
 * Created by Arison on 2018/12/3.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImagesViewer from "../../components/imagesVIewer/ImagesViewer";
/**
 * Created by Arison on 14:13.
 */
class TestImagesViewer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'TestImagesViewer',
            files:[
                "https://upload-images.jianshu.io/upload_images/1131704-be7459b6d71b4fcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "https://upload-images.jianshu.io/upload_images/1131704-4ea9451586c1ef07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            ]
        }
        ;
    }


    componentDidMount(){

    }

    handleCancel=()=>{

    }

    render(){
        return <div className="container-fluid">
            <div className="row">
                 <div className="col-xs-12">
                     <ImagesViewer onClose={this.handleCancel}
                                   urls={this.state.files}
                                   index={0}
                                   needPoint={this.state.files.length <= 9}/> : ""}
                  </div>
              </div>

        </div>
    }
}

export  default TestImagesViewer;