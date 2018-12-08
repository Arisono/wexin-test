/**
 * Created by Arison on 2018/12/3.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImagesViewer from "../imagesVIewer/ImagesViewer";
/**
 * Created by Arison on 16:55.
 */
class ImageGrid extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ImageGrid',
            rate: 3,
            previewVisible: false,
            images:this.props.images
        };
    }
    
    
    componentDidMount(){
        
    }
    onClickImage() {
        this.setState({
            previewVisible: true
        })
    }
    handleCancel = () => this.setState({previewVisible: false})
    render(){
        return <div className="flex flex_row_stretch">
            <div className="">
                {this.state.images.map((item)=>{
                    console.log("()",100/this.state.rate);
                    return ( <img
                        onClick={this.onClickImage.bind(this)}
                        className=" item_flex" style={{padding:"10px"}} src={item}   width={100/this.state.rate+"%"}  />);
                })}
                {this.state.previewVisible ?
                    <ImagesViewer onClose={this.handleCancel} urls={this.state.images}
                                  index={0}
                                  needPoint={this.state.images.length <= 9}/> : ""}
            </div>
        </div>
    }
}

export  default ImageGrid;