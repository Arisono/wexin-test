/**
 *   Created by FANGlh on 2019/1/19 12:32.
 *   Desc: 学生请接单列表
 */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LeaveListPage.css'
import '../../style/css/app-gloal.css'
import {Button,Icon,Input,List,Skeleton} from 'antd';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingMore from "../../components/LoadingMore";
import {fetchPost,fetchGet} from "../../utils/fetchRequest";
import {API,_baseURL} from "../../configs/api.config";
import {connect} from 'react-redux'
import LeaveItem from './LeaveItem';
import RefreshLayout from "../../components/RefreshLayout";

/**
 * Created by Arison on 11:22.
 */
class LeaveListPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'LeaveListPage',
            detailVisible: false,
            hasMoreData:true,
            pageIndex:1,
            pageSize:5,
            listItem:null,
            index:null,
            role:this.props.match.params.role,
            data:[],

            isRefreshing: false,
            isLoading: true
        };
    }

    componentWillMount(){
        document.title ="学生请假条";
    }

    componentDidMount(){
        this.getLeaveListData();
    }



    render(){
        return <div className="container-fluid" id="global_background" style={{height:'100vh',backgroundColor:'#F6F6F'}}>
            <div className="row" >
                <div  className="col-xs-12 clear_margin" >
                    <RefreshLayout
                        refreshing={this.state.isRefreshing}
                        // ref={el => {
                        //     this.container = el
                        // }}
                        onRefresh={this.loadMoreAction}>
                        <Skeleton loading={this.state.isLoading} active paragraph={{rows: 3}}>
                            <List dataSource={this.state.data}
                                renderItem={itemdata =>(
                                    <List.Item   id="row_background"  >
                                        <LeaveItem itemdata={itemdata} role={this.state.role}></LeaveItem>
                                    </List.Item>
                                )}/>
                        </Skeleton>
                    </RefreshLayout>
                    {
                        this.state.role=="teacher"?(""):(<Icon type="plus-circle" theme='filled' className='common-add-icon'
                                                               onClick={this.onAddAction} />)
                    }
                </div>
            </div>
        </div>
    }


    getLeaveListData() {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }
        this.state.pageIndex=1;
        this.state.pageSize=5;
        this.setState({
            hasMoreData:true,
        })
        if (this.state.role === "teacher") {
            console.log("getLeaveListData()",this.props.userInfo.userId);
            fetchGet(API.leaveListTeacher, {
                userId: this.props.userInfo.userId,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                this.state.data.length = 0;
                for (let i = 0; i < response.data.leaveNotify.length; i++) {
                    let model = {
                        lvId:response.data.leaveNotify[i].lvId,
                        title: response.data.leaveNotify[i].lvName,
                        endTime: response.data.leaveNotify[i].endDate,
                        startTime: response.data.leaveNotify[i].startDate,
                        content: response.data.leaveNotify[i].lvDetails,
                        enclosure:response.data.leaveNotify[i].enclosure,
                        leaveMessages:response.data.leaveNotify[i].leaveMessages
                    };
                    this.state.data.push(model);
                }
                if(response.data.length<this.state.pageSize){
                    this.setState({
                        hasMoreData:false,
                    })
                }
                this.setState({
                    data: this.state.data,
                    isRefreshing: false,
                    isLoading: false
                })

            }).catch((error) => {
                console.log("error:" + JSON.stringify(error));
                this.setState({
                    isRefreshing: false,
                    isLoading: false
                })
            })
        }
        if (this.state.role === "parent") {
            fetchGet(API.leaveListParent, {
                stuId: this.props.userInfo.stuId,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }).then((response) => {
                this.state.data.length = 0;
                for (let i = 0; i < response.data.length; i++) {
                    let model = {
                        lvId:response.data[i].lvId,
                        title: response.data[i].lvName,
                        endTime: response.data[i].endDate,
                        startTime: response.data[i].startDate,
                        content: response.data[i].lvDetails,
                        enclosure:response.data[i].enclosure,
                        leaveMessages:response.data[i].leaveMessages
                    };
                    this.state.data.push(model);
                }
                if(response.data.length<this.state.pageSize){
                    this.setState({
                        hasMoreData:false,
                    })
                }
                this.setState({
                    data: this.state.data
                })
            }).catch((error) => {
                console.log("error:" + JSON.stringify(error));
            })
        }
    }

    loadMoreAction=()=> {
        try {
            this.setState({
                isRefreshing: true
            })
        } catch (e) {
        }
        setTimeout(() => {
            this.state.pageIndex++;
            if (this.state.role === "teacher") {
                fetchGet(API.leaveListTeacher, {
                    userId: this.props.userInfo.userId,
                    pageIndex: this.state.pageIndex,
                    pageSize: this.state.pageSize
                }).then((response) => {
                    if(response.data.leaveNotify.length>0){
                        for (let i = 0; i < response.data.leaveNotify.length; i++) {
                            let model = {
                                lvId:response.data.leaveNotify[i].lvId,
                                title: response.data.leaveNotify[i].lvName,
                                endTime: response.data.leaveNotify[i].endDate,
                                startTime: response.data.leaveNotify[i].startDate,
                                content: response.data.leaveNotify[i].lvDetails,
                                enclosure:response.data.leaveNotify[i].enclosure,
                                leaveMessages:response.data.leaveNotify[i].leaveMessages
                            };
                            this.state.data.push(model);
                        }
                        this.setState({
                            data: this.state.data
                        })
                    }else{
                        this.setState({
                            hasMoreData:false,
                        })
                    }
                    this.setState({
                        isRefreshing: false,
                        isLoading: false
                    })
                }).catch((error) => {
                    console.log("error:" + JSON.stringify(error));
                    this.setState({
                        isRefreshing: false,
                        isLoading: false
                    })
                })
            }
            if (this.state.role === "parent") {
                fetchGet(API.leaveListParent, {
                    stuId: this.props.userInfo.stuId,
                    pageIndex: this.state.pageIndex,
                    pageSize: this.state.pageSize
                }).then((response) => {
                    console.log("response:" + JSON.stringify(response));
                    if(response.data.length>0){
                        for (let i = 0; i < response.data.length; i++) {
                            let model = {
                                lvId:response.data[i].lvId,
                                title: response.data[i].lvName,
                                endTime: response.data[i].endDate,
                                startTime: response.data[i].startDate,
                                content: response.data[i].lvDetails,
                                enclosure:response.data[i].enclosure,
                                leaveMessages:response.data[i].leaveMessages
                            };
                            this.state.data.push(model);
                        }
                        this.setState({
                            data: this.state.data
                        })
                    }else{
                        this.setState({
                            hasMoreData:false,
                        })
                    }
                    this.setState({
                        isRefreshing: false,
                        isLoading: false
                    })
                }).catch((error) => {
                    console.log("error:" + JSON.stringify(error));
                    this.setState({
                        isRefreshing: false,
                        isLoading: false
                    })
                })
            }
        }, 1000)

    }
    onAddAction=()=>{
        this.props.history.push("/leaveAdd/");
    }
    onItemOnClick=(index,item)=>{
        console.log("onItemOnClick()",JSON.stringify(item));
        this.props.history.push('/leavedetail/' +item.lvId+'/'+this.state.role)
        return;
        this.setState({
            detailVisible: true,
            listItem:item,
            index:index
        })

    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo},
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveListPage)