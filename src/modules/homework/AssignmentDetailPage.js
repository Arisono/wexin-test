/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AssignmentDetailPage.css'
import '../../style/css/app-gloal.css'
import {List, Input, Button} from 'antd';
import {fetchPost, fetchGet} from '../../utils/fetchRequest';
import {API, _baseURL} from '../../configs/api.config';
import {isObjEmpty} from '../../utils/common';
import ImagesViewer from "../../components/imagesVIewer/ImagesViewer";
import {Toast} from 'antd-mobile'
import {Avatar} from 'antd'

import {connect} from 'react-redux'

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
            messageContent: null,
            files: [],
            data: [{
                name: '',
                content: ''
            }]
        };
    }


    componentWillMount() {
        document.title = "作业详情";
    }

    componentDidMount() {
        fetchGet(API.homeWorkDetail, {
            notifyId: this.state.id,
            userId: this.props.userInfo.userId
        }).then((response) => {
            let images = [];
            let temps = response.data.enclosure;
            for (let i = 0; i < temps.length; i++) {
                images.push(_baseURL + temps[i]);
            }
            response.data.notifyDetails = response.data.notifyDetails.replace(/\r\n/g, '<br/>');
            this.setState({
                teachName: response.data.notifyCreatorName,
                endTime: response.data.endDate,
                headerUrl: "",
                title: response.data.notifyName,
                content: response.data.notifyDetails,
                files: images,
            })

        }).catch((error) => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })

        this.getMessage();
    }

    onClickImage() {
        this.setState({
            previewVisible: true
        })
    }

    onMessageSend = () => {
        if (isObjEmpty(this.state.messageContent)) {
            Toast.info("请输入留言内容")
            return;
        }
        fetchPost(API.messageCreate, {
            messName: '这是留言',
            messContent: this.state.messageContent,
            userId: this.props.userInfo.userId,
            notifyId: this.state.id,
        }).then((response) => {
            console.log("response:" + JSON.stringify(response));
            if (response.success) {
                Toast.info("留言成功！");
                this.setState({
                    messageContent: ""
                });
                this.getMessage();
            }
        }).catch((error) => {
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })

    }

    getMessage() {
        fetchGet(API.messageList, {
            notifyId: this.state.id
        }).then((response) => {
            this.state.data.length = 0;
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
            Toast.hide()

            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('请求异常', 2)
            }
        })
    }


    onChangeMessage = (event) => {
        let msg = event.target.value;
        this.setState({
            messageContent: msg
        })
    }


    handleCancel = () => this.setState({previewVisible: false})

    render() {
        const {userInfo} = this.props

        return <div className="class-page-layout">
            <div style={{flex: '1'}}>
                <div className="homework-detail-top-layout common-flex-row">
                    {isObjEmpty(userInfo.userAvatar) ?
                        <Avatar size={55} icon='user'/> :
                        <img className="img-circle"
                             src={userInfo.userAvatar}
                             width={55} height={55}/>
                    }
                    <div className='common-flex-column-y-center' style={{paddingLeft: '14px'}}>
                        <div className="homework-detail-top-name">{this.state.teachName}老师</div>
                        <div className='homework-detail-top-time'>{this.state.endTime}</div>
                    </div>
                </div>
                <div className="homework-detail-title">{this.state.title} </div>
                <div className="homework-detail-content"
                     dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                <div className="margin_top_bottom_10 flex_center">
                    {this.state.previewVisible ?
                        <ImagesViewer onClose={this.handleCancel} urls={this.state.files}
                                      index={0}
                                      needPoint={this.state.files.length <= 9}/> : ""}
                    {this.state.files.length != 0 ? (<img onClick={this.onClickImage.bind(this)}
                                                          style={{margin: "0px"}}
                                                          src={this.state.files[0]}
                                                          width={290} height={150}/>) : ("")}

                </div>
                <div className="margin_top_bottom_10 homework-detail-leave-caption">留言{this.state.data.length != 0 ? (
                    <span>
                        ({this.state.data.length}条)
                    </span>) : (<div></div>)}</div>
                <div id="page_horizontal_line"></div>
            </div>

            <div className='homework-detail-leave-layout'
                 style={{paddingBottom: this.state.role === "teacher" ? '0' : '50px'}}>
                <List
                    locale={{emptyText: '暂无留言'}}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <div>
                                <span className="text_bold margin_left_right_20">{item.name}:</span>
                                <span>{item.content}</span>
                            </div>
                        </List.Item>
                    )}/>
            </div>
            {this.state.role === "teacher" ? "" :
                <div className="footer flex padding_10" style={{background: '#F2F2F2', alignItems: 'center'}}>
                    <img src={require('imgs/ic_edit.png')} width={28} height={28}/>
                    <input ref={ref => this.input_content = ref} value={this.state.messageContent}
                           onChange={this.onChangeMessage} placeholder="留言"
                           className='homework-detail-leave-input'></input>
                    <span onClick={this.onMessageSend} className="homework-detail-leave-send">发送</span>
                </div>}
        </div>
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetailPage)