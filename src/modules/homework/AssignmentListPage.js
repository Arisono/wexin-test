/**
 * Created by Arison on 2018/11/6.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AssignmentListPage.css'
import {List, Icon} from 'antd';
import {Toast} from 'antd-mobile'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {fetchPost, fetchGet} from '../../utils/fetchRequest';
import {API} from '../../configs/api.config';
import {isObjEmpty} from '../../utils/common';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from "../../components/LoadingMore";

import {connect} from 'react-redux'

/**
 * 作业列表
 * Created by Arison on 17:48.
 */
class AssignmentListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'AssignmentListPage',
            role: this.props.match.params.role,
            pageIndex: '1',
            pageSize: '5',
            hasMoreData: true,
            data: []
        };

    }

    componentWillMount() {
        if ("teacher" == this.props.match.params.role) {
            document.title = "作业发布";
        } else {
            document.title = "作业通知";
        }
    }


    componentDidMount() {
        this.setState({
            role: this.props.match.params.role
        })
        fetchPost(API.homeWorkList, {
            userId: this.props.userInfo.userId,
            notifyType: '3',
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
        }).then((response) => {
            let listData
            if ("teacher" == this.state.role) {
                listData = response.data.creat
            } else {
                listData = response.data.notify
            }
            this.state.data.length = 0;
            for (let i = 0; i < listData.length; i++) {
                let model = listData[i];
                model.notifyDetails = model.notifyDetails.replace(/\r\n/g, '<br/>');
                let item = {
                    title: model.notifyName,
                    state: model.isRead == 1 ? '未读' : "已读",
                    content: model.notifyDetails,
                    end_time: model.endDate,
                    publisher: model.notifyCreatorName,
                    models: model
                };
                this.state.data.push(item)
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

    loadMoreAction = () => {
        setTimeout(() => {
            this.state.pageIndex++
            fetchPost(API.homeWorkList, {
                userId: this.props.userInfo.userId,
                notifyType: '3',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                let listData
                if ("teacher" == this.state.role) {
                    listData = response.data.creat
                } else {
                    listData = response.data.notify
                }
                if (listData.length > 0) {
                    for (let i = 0; i < listData.length; i++) {
                        let model = listData[i];
                        model.notifyDetails = model.notifyDetails.replace(/\r\n/g, '<br/>');
                        let item = {
                            title: model.notifyName,
                            state: model.isRead == 1 ? '未读' : "已读",
                            content: model.notifyDetails,
                            end_time: model.endDate,
                            publisher: model.notifyCreatorName,
                            models: model
                        };
                        this.state.data.push(item)
                    }
                    this.setState({
                        data: this.state.data
                    })
                } else {
                    this.setState({
                        hasMoreData: false,
                    })
                }


            }).catch((error) => {
                Toast.hide()

                if (typeof error === 'string') {
                    Toast.fail(error, 2)
                } else {
                    Toast.fail('请求异常', 2)
                }
            })
        }, 1000);
    }


    onAddAction = () => {
        this.props.history.push("/releaseAssignment");
    }


    render() {
        return <div className="container-fluid"
                    style={{padding: "0px", height: "1000px", backgroundColor: "#F3F3F3"}}>
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={this.loadMoreAction}
                hasMore={this.state.hasMoreData}
                loader={<LoadingMore/>}>
                <List
                    id="assignment_list"
                    dataSource={this.state.data}
                    renderItem={item => {
                        console.log("item()", item);
                        return (
                            <Link to={"/assignmentDetail/" + this.state.role + "/" + item.models.notifyId}
                                  id="menu_span_normal">
                                <List.Item className="row" id="list_item_noBorder">
                                    <div className="col-xs-12">
                                        <div className="row" id="padding">
                                            <div className="col-xs-6" id="row_left">
                                                <span id="span_header_left">{item.title}</span></div>
                                            <div className="col-xs-6" id="row_right">
                                                {item.state === "已读" ? (
                                                    <span id="span_header_right2">{item.state}</span>) : (
                                                    <span id="span_header_right">{item.state}</span>)}

                                            </div>
                                        </div>
                                        <div id="page_horizontal_line"></div>
                                        <div className="row" id="padding">
                                            <div className="col-xs-4">内容：</div>
                                            <div className="col-xs-8" id="span_display"
                                                 dangerouslySetInnerHTML={{__html: item.content}}>

                                            </div>
                                        </div>
                                        <div className="row" id="padding">
                                            <div className="col-xs-4">截止时间：</div>
                                            <div className="col-xs-8"><span id="span_display">{item.end_time}</span>
                                            </div>
                                        </div>
                                        <div className="row" id="padding">
                                            <div className="col-xs-4">发布老师：</div>
                                            <div className="col-xs-8"><span id="span_display">{item.publisher}</span>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            </Link>
                        )
                    }}
                />
            </InfiniteScroll>
            {
                this.state.role == "teacher" ? (<Icon type="plus-circle" theme='filled' className='common-add-icon'
                                                      onClick={this.onAddAction}/>) : ("")
            }

        </div>
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentListPage)