/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AssignmentDetailPage.css'
import '../../style/css/app-gloal.css'
import {List,Input,Button} from 'antd';
import {fetchPost, fetchGet} from '../../utils/fetchRequest';
import {API, _baseURL} from '../../configs/api.config';
import {isObjEmpty} from  '../../utils/common';
import ImagesViewer from "../../components/imagesVIewer/ImagesViewer";
import {Toast} from 'antd-mobile'
/**
 * 作业详情
 * Created by Arison on 17:49.
 */


class AssignmentDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            role: this.props.match.params.role,
            name: 'AssignmentDetailPage',
            previewVisible: false,
            teachName: "",
            endTime: "",
            headerUrl: "",
            title: "",
            content: "",
            messageContent:null,
            files: [
                "https://upload-images.jianshu.io/upload_images/1131704-be7459b6d71b4fcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "https://upload-images.jianshu.io/upload_images/1131704-4ea9451586c1ef07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            ],
            data: [{
                name: '张山',
                content: '陈老师收到'
            }]
        };
    }


    componentWillMount() {
        document.title = "作业详情";
    }

    componentDidMount() {
        fetchGet(API.homeWorkDetail, {
            notifyId: this.state.id,
            userId: 10001
        }).then((response) => {
            console.log("API.homeWorkDetail response:" + JSON.stringify(response));
            // "notifyId":75,
            //     "notifyName":"作业12",
            //     "notifyType":3,
            //     "notifyDetails":"1",
            //     "notifyFiles":null,
            //     "notifyCreator":10000,
            //     "notifyCreatorName":null,
            //     "notifyAddress":null,
            //     "creatDate":"2018-11-30 15:24:03",
            //     "startDate":null,
            //     "endDate":"2018-11-30 15:23:11",
            //     "reminderDate":null,
            //     "notifyStatus":2,
            //     "notifyRemarks":null,
            //     "isRead":2,
            //     "leaveMessages":null,
            //     "notifyRecords":null
            let images = [];
            let temps = response.data.enclosure;
            for (let i = 0; i < temps.length; i++) {
                images.push(_baseURL + temps[i]);
            }
            console.log("images():", images);
            this.setState({
                teachName: response.data.notifyCreatorName,
                endTime: response.data.endDate,
                headerUrl: "",
                title: response.data.notifyName,
                content: response.data.notifyDetails,
                files: images,
            })

        }).catch((error) => {
            console.log("error:" + JSON.stringify(error));
        })

        this.getMessage();
    }

    onClickImage() {
        this.setState({
            previewVisible: true
        })
    }

    onMessageSend=()=>{
        if(isObjEmpty(this.state.messageContent)){
             Toast.info("请输入留言内容")
        }
        fetchPost(API.messageCreate,{
            messName:'这是留言',
            messContent:this.state.messageContent,
            userId:'10001',
            notifyId:this.state.id,
                  }).then((response)=>{
                      console.log("response:"+JSON.stringify(response));
                      if(response.success){
                         Toast.info("留言成功！");
                          this.getMessage();
                      }
                  }).catch((error)=>{
                      console.log("error:"+JSON.stringify(error));
                  })

    }

    getMessage() {
        fetchGet(API.messageList, {
            notifyId: this.state.id
        }).then((response) => {
            // "messId":3,
            //  "messName":"这是留言",
            //  "messDate":"2018-12-03 15:50:00",
            //  "messContent":"这个是作业的留言",
            //  "userId":10001,
            //  "userName":"饶猛",
            //  "userPhoto":null,
            //  "lvId":null,
            //  "notifyId":101
            console.log("response:" + JSON.stringify(response));
            this.state.data.length=0;
            for (let i = 0; i < response.data.length; i++) {

                let model = {
                    name: response.data[i].userName,
                    content: response.data[i].messContent
                }
                this.state.data.push(model);
            }

            this.setState({
                data: this.state.data
            })

        }).catch((error) => {
            console.log("error:" + JSON.stringify(error));
        })
    }


    onChangeMessage=(event)=>{
        let msg=    event.target.value;
        this.setState({
            messageContent:msg
        })
    }





    handleCancel = () => this.setState({previewVisible: false})

    render() {
        return <div className="container-fluid flex_column">
            <div className="row" id="layout_header">
                <div className="col-xs-4" id="padding10">
                    <img className="img-circle" style={{marginLeft: "10px"}}
                         src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}
                         width={80} height={80}/>
                </div>
                <div className="col-xs-8" id="padding10">
                    <div className="margin_top_bottom_15"><span className="span_19"
                                                                style={{color: "#0088DC"}}>{this.state.teachName}</span>
                    </div>
                    <div ><span className="span_16">{this.state.endTime}</span></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="margin_top_20">
                        <span className="span_20 text_bold">{this.state.title}</span>
                    </div>
                    <div className="margin_top_bottom_15"><span >{this.state.content}</span></div>
                    <div className="margin_top_bottom_15 flex_center">
                        {this.state.previewVisible ?
                            <ImagesViewer onClose={this.handleCancel} urls={this.state.files}
                                          index={0}
                                          needPoint={this.state.files.length <= 9}/> : ""}
                        <img onClick={this.onClickImage.bind(this)}
                             style={{margin: "0px"}}
                             src={this.state.files[0]}
                             width={290} height={150}/>
                    </div>
                </div>
            </div>
            <div className="row" id="page_block_min"></div>
            <div className="row">
                <div className="col-xs-12 margin_bottom_50">
                    <div className="margin_top_bottom_15">留言(20/40)</div>
                    <div id="page_horizontal_line"></div>
                    <div>
                        <List dataSource={this.state.data} renderItem={item => (
                            <List.Item>
                                <div>
                                    <span className="text_bold margin_left_right_10">{item.name}:</span>
                                    <span>{item.content}</span>
                                </div>
                            </List.Item>
                        )}/>


                    </div>
                </div>
            </div>
            {this.state.role==="teacher"?(""):(<div className="footer bg_white">
                <div className="flex padding_10">
                    <Input  onChange={this.onChangeMessage} placeholder="留言"  ></Input>
                    <Button  onClick={this.onMessageSend}  type={"primary"} className="margin_left_10">发送</Button>
                </div>
            </div>)}
        </div>
    }
}

export  default AssignmentDetailPage;