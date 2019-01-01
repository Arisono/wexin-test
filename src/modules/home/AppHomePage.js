/**
 * Created by Arison on 2018/11/1.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Menu, Dropdown, message, Icon, Carousel, List} from 'antd';
import ReactPlayer from 'react-player'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import icon_group from '../../style/imgs/icon_group.png'
import icon_home_menu_dengji from '../../style/imgs/icon_home_menu_dengji.png'
import icon_home_menu_2 from '../../style/imgs/icon_home_menu_2.png'
import icon_home_menu_3 from '../../style/imgs/icon_home_menu_3.png'
import icon_home_menu_4 from '../../style/imgs/icon_home_menu_4.png'
import icon_home_menu_5 from '../../style/imgs/icon_home_menu_5.png'
import icon_home_menu_6 from '../../style/imgs/icon_home_menu_6.png'
import icon_home_menu_7 from '../../style/imgs/icon_home_menu_7.png'
import icon_home_menu_8 from '../../style/imgs/icon_home_menu_8.png'


import icon_home_menu_9 from '../../style/imgs/icon_home_menu_9.png'
import icon_home_menu_10 from '../../style/imgs/icon_home_menu_10.png'
import icon_home_menu_11 from '../../style/imgs/icon_home_menu_11.png'
import icon_home_menu_12 from '../../style/imgs/icon_home_menu_12.png'
import icon_home_menu_13 from '../../style/imgs/icon_home_menu_13.png'
import icon_home_menu_14 from '../../style/imgs/icon_home_menu_14.png'
import icon_home_menu_15 from '../../style/imgs/icon_home_menu_15.png'


import icon_home_menu_21 from '../../style/imgs/icon_home_menu21.png'
import icon_home_menu_22 from '../../style/imgs/icon_home_menu22.png'
import icon_home_menu_23 from '../../style/imgs/icon_home_menu23.png'
import icon_home_menu_24 from '../../style/imgs/icon_home_menu24.png'
import icon_home_menu_25 from '../../style/imgs/icon_home_menu25.png'
import icon_home_menu_26 from '../../style/imgs/icon_home_menu26.png'
import icon_home_menu_27 from '../../style/imgs/icon_home_menu27.png'
import icon_home_menu_28 from '../../style/imgs/icon_home_menu28.png'
import icon_home_change from '../../style/imgs/icon_home_change.png'
import icon_home_menu_30 from '../../style/imgs/icon_home_menu30.png'
import icon_home_menu_31 from '../../style/imgs/icon_home_menu31.png'
import icon_home_menu_32 from '../../style/imgs/icon_home_menu32.png'
import icon_home_menu_33 from '../../style/imgs/icon_home_menu33.png'
import icon_home_menu_34 from '../../style/imgs/icon_home_menu34.png'
import icon_home_menu_35 from '../../style/imgs/icon_home_menu35.png'


import icon_home_help from '../../style/imgs/icon_home_help.png'
import icon_home_message from '../../style/imgs/icon_home_message.png'
import icon_home_oa from '../../style/imgs/icon_home_menu_oa.png'

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './AppHomePage.css'
import '../../style/css/app-gloal.css'
import {switchUser} from '../../redux/actions/userInfo'
import {connect} from "react-redux";
import {clearListState} from 'action/listState'
import {clearClassData} from "../../redux/actions/classData";
import {fetchPost, fetchGet} from "../../utils/fetchRequest";
import {API, _baseURL} from "../../configs/api.config";
import {Toast} from 'antd-mobile'
import {isObjEmpty} from '../../utils/common'


/**
 * Created by Arison on 2018/11/1.
 */
class AppHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPhoto: '',
            userId: '',
            userName: '',
            userPhone: '',
            userOpenid: '',
            isTeacher: false,
            pictures: {
                albums: [],
                videos: []
            },
            roles: ["家长"],
            studentIndex: 0,
            students: []
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    spliceArrayPicture = (arrays) => {
        let newArrays = [];
        if (arrays.length != 0) {
            let items = [];
            for (let i = 0; i < arrays.length; i++) {
                items.push(arrays[i]);
                if (i % 3 === 2) {
                    let model = {
                        index: i,
                        data: [...items]
                    };
                    newArrays.push(model);
                    items.length = 0;
                }
            }
            if (items.length != 0) {
                let model = {
                    index: arrays.length + 1,
                    data: [...items]
                };
                newArrays.push(model);
            }

        }
        return newArrays;
    }

    onChangeRole({key}) {
        switch (key) {
            case "2":
                switchUser({userRole: 2})();
                this.setState({
                    isTeacher: true
                })
                this.props.location.search = "?role=teacher"
                break;
            case "1":
                switchUser({
                    userRole: 1
                })();
                this.setState({
                    isTeacher: false
                })
                break;
        }
    }


    componentDidMount() {
        //清除列表缓存数据
        clearListState()()
        clearClassData()()

        document.title = "智慧校园";

        console.log("componentDidMount()", this.props.userInfo);
        Toast.loading("");
        //获取首页接口
        fetchGet(API.homeIndex, {
            userOpenid: isObjEmpty(this.props.userInfo.userOpenid) ? "1" : this.props.userInfo.userOpenid,
            userPhone: isObjEmpty(this.props.userInfo.userPhone) ? "13266699268" : this.props.userInfo.userPhone
        }).then((response) => {
            console.log("result():" + JSON.stringify(response));
            Toast.hide();
            this.state.userId = response.data.userId;
            this.state.userName = response.data.userName;
            // response.data.students.splice(1,1,{isSelected:false,...student});
            console.log("studId():", this.props.userInfo.stuId);
            if (isObjEmpty(this.props.userInfo.stuId)) {
                if (!isObjEmpty(response.data.students)) {
                    let student = response.data.students[0];
                    let student1 = {isSelected: true, ...student};
                    response.data.students.splice(0, 1, student1);
                }
            } else {
                if (!isObjEmpty(response.data.students)) {
                    for (let i = 0; i < response.data.students.length; i++) {
                        if (this.props.userInfo.stuId === response.data.students[i].stuId) {
                            response.data.students[i] = {isSelected: true, ...response.data.students[i]};
                            this.state.studentIndex = i;
                        } else {
                            response.data.students[i] = {isSelected: false, ...response.data.students[i]};
                        }
                    }
                }
            }
            this.state.students = response.data.students;
            this.state.pictures = response.data.pictures;
            this.state.roles = response.data.roles;
            this.state.userPhoto = response.data.userPhoto;
            this.state.userOpenid = response.data.userOpenid;
            this.state.userPhone = response.data.userPhone;
            if (response.data.roles.length === 1) {
                if (response.data.roles[0] === "家长") {
                    this.state.isTeacher = false;
                }
                if (response.data.roles[0] === "教师") {
                    this.state.isTeacher = true;
                }
            }

            let stuName = isObjEmpty(response.data.students) ? "" : response.data.students[0].stuName;
            let stuId = isObjEmpty(response.data.students) ? "" : response.data.students[0].stuId;
            switchUser({
                stuName: isObjEmpty(this.props.userInfo.stuName) ? stuName : this.props.userInfo.stuName,
                userId: this.state.userId,
                userName: this.state.userName,
                userOpenid: this.state.userOpenid,
                userPhone: this.state.userPhone,
                stuId: isObjEmpty(this.props.userInfo.stuId) ? stuId : this.props.userInfo.stuId,
                userRole: this.state.isTeacher ? 2 : 1
            })();

            this.setState({
                userPhoto: this.state.userPhone,
                userId: this.state.userId,
                userName: this.state.userName,
                userPhone: this.state.userPhone,
                userOpenid: this.state.userOpenid,
                pictures: this.state.pictures,
                roles: this.state.roles,
                students: this.state.students
            })
        }).catch((error) => {
            Toast.hide();
            console.log("error:" + JSON.stringify(error));
        })

        if (this.props.userInfo.userRole === 2) {//教师
            this.setState({
                isTeacher: true
            })
        } else {//家长
            this.setState({
                isTeacher: false
            })
        }
    }

    onItemClick = (index) => {
        console.log("onItemClick()", index);
        for (let i = 0; i < this.state.students.length; i++) {
            if (i != index) {
                this.state.students[i].isSelected = false;
            } else {
                this.state.students[i].isSelected = true;
                //更改全局状态
                switchUser({
                    stuId: this.state.students[i].stuId,
                    stuName: this.state.students[i].stuName
                })()
                //刷新相册和视频
                this.state.studentIndex = i;
            }
        }
        console.log("onItemClick()", this.props.userInfo);
        this.setState({
            students: this.state.students,
            studentIndex: this.state.studentIndex
        });
    }


    render() {
        let borderLine = {
            border: "1px solid #f4f4f4"
        };

        let roleMenu = (
            <Menu onClick={this.onChangeRole.bind(this)}>
                <Menu.Item key="1" style={{width: "90px", fontSize: "15px"}}>
                    <span>家长</span>
                </Menu.Item>
                <Menu.Item key="2" style={{width: "90px", fontSize: "15px"}}>
                    <span>教师</span>
                </Menu.Item>
            </Menu>
        );

        console.log(" render() userRole:", this.props.userInfo);
        return <div className="container-fluid">
            {/*顶部Header*/}
            <div className="row">
                <div className="col-sm-12">
                    <div className="row" id="header">
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-8 col-sm-8"></div>
                                <div className="col-xs-4 col-sm-4  flex_row_right">
                                    <div className="flex_center" style={{
                                        borderRadius: "4px 0px 0px 4px",
                                        background: "#BCC8CE",
                                        marginTop: "20px",
                                        marginLeft: "0px",
                                        padding: "2px"
                                    }}>
                                        <span style={{
                                            color: "#2C7CF8",
                                            margin: "0px",
                                            fontSize: "13px"
                                        }}>     宝安区十八中学</span>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3" id="global_row_right"
                                     style={{marginBottom: "30px", marginTop: "20px"}}>
                                    <img
                                        src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}
                                        width={60} height={60} class="img-circle"
                                        style={{border: '3px solid #ffffff'}}/>
                                </div>
                                <div className="col-xs-9" id="global-clear">
                                    <div style={{marginTop: "30px", marginLeft: "0px"}}><span
                                        style={{fontSize: "16px", color: "black"}}>尊敬的{this.state.userName}
                                        {
                                            this.state.isTeacher ? ('老师') : ('家长')
                                        }
                                </span>
                                        {this.state.roles.length === 2 ? (
                                            <Dropdown overlay={roleMenu} trigger={['click']}>
                                                <a className="ant-dropdown-link" href="#">
                                                    {/* <Icon type="down" style={{fontSize:"20px"}}/>*/}
                                                    <img style={{marginLeft: "5px"}} src={icon_home_change} width={15}
                                                         height={15}/>
                                                </a>
                                            </Dropdown>) : ("")}
                                    </div>

                                    {/*孩子列表*/}
                                    {this.state.isTeacher ? ("") : (<div className="margin_top_10 padding_right_10">
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            locale={{emptyText: ''}}
                                            dataSource={this.state.students}
                                            renderItem={(item, index) => (
                                                <List.Item className="flex clear_margin"
                                                           onClick={this.onItemClick.bind(this, index)}>

                                                    {item.isSelected === true ? (<div>
                                                        <img className="border-radius-50-blue"
                                                             src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
                                                             width={25} height={25}/>
                                                        <span
                                                            className="margin_left_5 color_blue text_bold">{item.stuName}</span>
                                                    </div>) : (<div>
                                                        <img className="border-radius-50"
                                                             src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
                                                             width={25} height={25}/>
                                                        <span className="margin_left_5">{item.stuName}</span>
                                                    </div>)}

                                                </List.Item>
                                            )}
                                        />,
                                    </div>)}


                                </div>
                            </div>
                        </div>
                    </div>
                    {/*个人信息*/}
                    <div className="row" style={borderLine}></div>
                    <div className="row" style={{backgroundColor: "#F3F3F3"}}>
                        <div className="col-xs-4">
                            <div className="margin_top_bottom_10" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>{
                                this.state.isTeacher ? (<Link to={"/userInfoPage/1"} id="menu_span_normal">
                                    <img src={icon_group} style={{marginRight: "10px"}} width={12} height={12}/>
                                    <span id="span_12">个人信息</span>
                                </Link>) : (<Link to={"/userInfoPage/2"} id="menu_span_normal">
                                    <img src={icon_group} style={{marginRight: "10px"}} width={12} height={12}/>
                                    <span id="span_12">个人信息</span>
                                </Link>)
                            }

                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="margin_top_bottom_10" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <img src={icon_home_help} style={{marginRight: "10px"}} width={12} height={12}/>
                                <Link className="flex_column flex_center" to="/useHelp" id="menu_span_normal"> <span
                                    id="span_12">使用帮助</span></Link>
                            </div>
                        </div>
                        <div className="col-xs-4 ">
                            <div className="margin_top_bottom_10" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <img src={icon_home_message} style={{marginRight: "10px"}} width={12} height={12}/>
                                <Link className="flex_column flex_center" to="/systemMessage"
                                      id="menu_span_normal"><span id="span_12">系统消息</span></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/*固定菜单*/}
            {this.state.isTeacher ? (<TeacherMenu/>) : (<ParentMenu/>)}

            {this.state.isTeacher ? (
                <div>
                    {/*班级相册*/}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-12" style={{padding: "10px"}}>班级相册</div>
                            </div>
                            <div className="row" style={borderLine}></div>
                            <div className="row">
                                <div className="col-xs-12" style={{margin: "0px", padding: "0px"}}>
                                    {isObjEmpty(this.state.pictures.albums) ? ("") : (
                                        <Carousel autoplay={true} dots={false}>
                                            {this.spliceArrayPicture(this.state.pictures.albums).map((item, index) => (
                                                <div>{
                                                    item.data.map((model, index) => {
                                                        console.log("imageUrl():", _baseURL + model.picUrl);
                                                        let image_url = _baseURL + model.picUrl;
                                                        if (model.picUrl === null) {
                                                            image_url = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=54924110,1820388093&fm=173&app=25&f=JPEG?w=218&h=146&s=32809D4D4E6250131F8058B203001012";
                                                        }
                                                        return <img
                                                            src={image_url}
                                                            style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                                            width={"31%"}/>
                                                    })
                                                }
                                                </div>
                                            ))}
                                        </Carousel>
                                    )}
                                </div>
                            </div>


                            <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
                        </div>
                    </div>
                    {/*精彩瞬间*/}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-3" style={{padding: "10px"}}>精彩瞬间</div>
                            </div>
                            <div className="row" id="page_horizontal_line"></div>

                            {this.state.pictures.videos.length < 3 ? ("") : (
                                <div className="row flex_row">
                                    <ReactPlayer
                                        playing={false}
                                        className="margin_10 border_normal"
                                        url={_baseURL + this.state.pictures.videos[0].picUrl}
                                        controls
                                        light={true}
                                        pip={true}
                                        width={'60%'} height={"254px"}/>


                                    <div style={{width: "40%"}} className="padding_right">
                                        <div className="margin_bottom_10 ">
                                            <ReactPlayer
                                                playing={false}
                                                url={_baseURL + this.state.pictures.videos[1].picUrl}
                                                className="border_normal padding_left"
                                                controls
                                                light={true}
                                                pip={true}
                                                width={"100%"} height={"120px"}/></div>
                                        <div>
                                            <ReactPlayer
                                                playing={false}
                                                url={_baseURL + this.state.pictures.videos[2].picUrl}
                                                className="border_normal padding_left"
                                                controls
                                                light={true}
                                                pip={true}
                                                width={"100%"} height={"120px"}/></div>
                                    </div>
                                </div>
                            )}

                            <div className="row" style={{height: "50px"}}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/*班级相册*/}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-12" style={{padding: "10px"}}>班级相册</div>
                            </div>
                            <div className="row" style={borderLine}></div>
                            <div className="row">
                                <div className="col-xs-12" style={{margin: "0px", padding: "0px"}}>
                                    {isObjEmpty(this.state.students) ? ("") : (
                                        <Carousel autoplay={true} dots={false}>
                                            {console.log("相册 render()", this.spliceArrayPicture(this.state.students[this.state.studentIndex].albums))}
                                            {this.spliceArrayPicture(this.state.students[this.state.studentIndex].albums).map((item, index) => (
                                                <div>{
                                                    item.data.map((model, index) => {
                                                        console.log("imageUrl():", _baseURL + model.picUrl);
                                                        let image_url = _baseURL + model.picUrl;
                                                        if (model.picUrl === null) {
                                                            image_url = "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=54924110,1820388093&fm=173&app=25&f=JPEG?w=218&h=146&s=32809D4D4E6250131F8058B203001012";
                                                        }
                                                        return <img
                                                            src={image_url}
                                                            style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                                            width={"31%"}
                                                            height={100}
                                                        />
                                                    })
                                                }
                                                </div>
                                            ))}
                                        </Carousel>
                                    )}


                                </div>
                            </div>


                            <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
                        </div>
                    </div>

                    {/*精彩瞬间*/}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-3" style={{padding: "10px"}}>精彩瞬间</div>
                            </div>
                            <div className="row" id="page_horizontal_line"></div>

                            {isObjEmpty(this.state.students) ? ("") : (<div>
                                {isObjEmpty(this.state.students[this.state.studentIndex].videos) ? ("") : (
                                    <div>
                                        {this.state.students[this.state.studentIndex].videos.length < 3 ? ("") : (
                                            <div className="row flex_row">
                                                <ReactPlayer
                                                    playing={false}
                                                    className="margin_10 border_normal"
                                                    url={_baseURL + this.state.students[this.state.studentIndex].videos[0].picUrl}
                                                    controls
                                                    light={true}
                                                    pip={true}
                                                    width={'60%'} height={"254px"}/>


                                                <div style={{width: "40%"}} className="padding_right">
                                                    <div className="margin_bottom_10 ">
                                                        <ReactPlayer
                                                            playing={false}
                                                            url={_baseURL + this.state.students[this.state.studentIndex].videos[1].picUrl}
                                                            className="border_normal padding_left"
                                                            controls
                                                            light={true}
                                                            pip={true}
                                                            width={"100%"} height={"120px"}/></div>
                                                    <div>
                                                        <ReactPlayer
                                                            playing={false}
                                                            url={_baseURL + this.state.students[this.state.studentIndex].videos[2].picUrl}
                                                            className="border_normal padding_left"
                                                            controls
                                                            light={true}
                                                            pip={true}
                                                            width={"100%"} height={"120px"}/></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>)}

                            <div className="row" style={{height: "50px"}}></div>
                        </div>
                    </div>
                </div>)}
        </div>
    }


}


function TeacherMenu() {
    console.log("teacherMenu()");
    let borderLine = {
        border: "1px solid #f4f4f4"
    };


    return <div>
        {/*分割线*/}
        <div className="row" style={{background: "#ffffff", height: "10px"}}/>
        {/*家校互动*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-xs-12" style={{padding: "10px"}}>家校互动</div>
                </div>
                <div className="row" style={borderLine}></div>
                {/*横向图文列表*/}
                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/notifyBoard/teacher">
                            <div><img src={icon_home_menu_22} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}>
                            <span
                                id="menu_span_normal">通知公告 </span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/assignmentList/teacher" id="menu_span_normal">
                            <div><img src={icon_home_menu_3} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}>
                                作业发布
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_center flex_column" to="/classRechargeList" id="menu_span_normal">
                            <div><img src={icon_home_menu_2} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px"}}><span
                                style={{fontSize: "12px"}}>班级交费</span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/voteListTab" id="menu_span_normal">
                            <div><img src={icon_home_menu_5} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>
                            投票助手
                        </span></div>
                        </Link>
                    </div>
                    {/*    <div className="col-xs-3" style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center"
                     }}>
                     <Link  className="flex_column flex_center" to="/phonesList"  id="menu_span_normal">
                     <div><img src={icon_home_menu_4} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                     </div>
                     <div style={{paddingBottom: "20px", paddingLeft: "0px"}}>
                     家长通讯录
                     </div>
                     </Link>
                     </div>*/}
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/leaveList/teacher" id="menu_span_normal">
                            <div><img src={icon_home_menu_6} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           学生请假条
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/classAlbum/teacher" id="menu_span_normal">
                            <div><img src={icon_home_menu_7} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>
                        班级相册
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3">
                        <Link className="flex_column flex_center" to="/wonderMoment/teacher" id="menu_span_normal">
                            <div><img src={icon_home_menu_8} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}>  <span style={{fontSize: "12px"}}>
                      精彩瞬间
                     </span></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {/*分割线*/}
        <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
        {/*校园服务*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-xs-12" style={{padding: "10px"}}>校园服务</div>
                </div>
                <div className="row" style={borderLine}></div>
                {/*横向图文列表*/}
                <div className="row">

                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/approvel" id="menu_span_normal">
                            <div><img src={icon_home_oa} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>
                          我的审批
                        </span></div>
                        </Link>
                    </div>

                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/meetingSignIn" id="menu_span_normal">
                            <div><img src={icon_home_menu_9} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>
                          会议管理
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/leaveAddC" id="menu_span_normal">
                            <div><img src={icon_home_menu_10} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span
                                style={{fontSize: "12px"}}>

                           请假申请
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/field-trip" id="menu_span_normal">
                            <div><img src={icon_home_menu_11} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           出差申请
                        </span></div>
                        </Link>
                    </div>


                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/res_apply" id="menu_span_normal">
                            <div><img src={icon_home_menu_12} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                          用品申请
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/phonesSelect" id="menu_span_normal">
                            <div><img src={icon_home_menu_13} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{margin: "5px", fontSize: "12px"}}>

                             通讯录
                        </span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/campusCardRecharge/teacher"
                              id="menu_span_normal">
                            <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            校园卡
                        </span></div>
                        </Link>
                    </div>
                    <Link className="flex_column flex_center" to="/class-schedule" id="menu_span_normal">
                        <div><img src={icon_home_menu_30} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           课表查询
                        </span></div>
                    </Link>

                    {/*</div>*/}
                </div>
                <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
            </div>
        </div>
    </div>
}

function ParentMenu() {
    let borderLine = {
        border: "1px solid #f4f4f4"
    };
    return <div>
        {/*分割线*/}
        <div className="row" style={{background: "#ffffff", height: "10px"}}/>
        {/*家校互动*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-xs-12" style={{padding: "10px"}}>家校互动</div>
                </div>
                <div className="row" style={borderLine}></div>
                {/*横向图文列表*/}
                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/access-notice" id="menu_span_normal">
                        <div><img src={icon_home_menu_21} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>
                           出入校通知
                        </span></div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/notifyBoard/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_22} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}>
                            通知公告
                        </div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/score-inquiry" id="menu_span_normal">
                        <div><img src={icon_home_menu_23} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            成绩通知
                        </span></div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/assignmentList/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_24} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           作业通知
                        </span></div>
                    </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/rechargeList" id="menu_span_normal">
                            <div><img src={icon_home_menu_25} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>交费通知</span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/leaveList/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_26} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>
                            学生请假条
                        </span></div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/voteList" id="menu_span_normal">
                        <div><img src={icon_home_menu_27} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            投票助手
                        </span></div>
                    </Link>
                    </div>
                    <div className="col-xs-3" id="row_center_align">
                        <Link className="flex_column flex_center" to="/phonesList/parent" id="menu_span_normal">
                            <div><img src={icon_home_menu_28} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>

                          老师通讯录
                        </span></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {/*分割线*/}
        <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
        {/*校园服务*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-xs-12" style={{padding: "10px"}}>校园服务</div>
                </div>
                <div className="row" style={borderLine}></div>
                {/*横向图文列表*/}
                <div className="row">

                    {/*      <div className="col-xs-3" style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center"
                     }}>
                     <Link className="flex_column flex_center" to="/rechargeList" id="menu_span_normal">
                     <div><img src={icon_home_menu_29} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                     </div>
                     <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                     style={{fontSize: "12px"}}>

                     充值缴费
                     </span></div>
                     </Link>
                     </div>*/}
                    {/*  <div className="col-xs-3" style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center"
                     }}>
                     <div><img src={icon_home_menu_dengji} style={{margin: "20px 20px 8px 20px"}} width={20}
                     height={20}/></div>
                     <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                     style={{fontSize: "12px"}}>入校登记</span></div>
                     </div>*/}
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/class-schedule" id="menu_span_normal">
                        <div><img src={icon_home_menu_30} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           课表查询
                        </span></div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/score-inquiry" id="menu_span_normal">
                        <div><img src={icon_home_menu_31} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{margin: "5px", fontSize: "12px"}}>

                           成绩查询
                        </span>
                        </div>
                    </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/campusCardRecharge/parent" id="menu_span_normal">
                            <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            校园卡
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/classAlbum/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_33} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                             班级相册
                        </span></div>
                    </Link>
                    </div>
                </div>

                <div className="row">


                    <div className="col-xs-3" id="row_center_align">
                        <div><img src={icon_home_menu_34} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>  <Link className="flex_column flex_center"
                                                               to="/wonderMoment/parent"
                                                               id="menu_span_normal">精彩瞬间</Link></span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_center flex_column" to="/principalMailbox" id="menu_span_normal">
                            <div>
                                <img src={icon_home_menu_35} style={{margin: "20px 20px 8px 20px"}} width={20}
                                     height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           校长信箱
                        </span></div>
                        </Link>
                    </div>
                    {/*  <div className="col-xs-3" id="row_center_align">
                     <div><img src={icon_menu} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                     <div style={{paddingBottom: "20px",paddingLeft: "0px"}}><span
                     style={{fontSize: "12px"}} id="menu_span_normal">问卷调查</span></div>
                     </div>*/}
                    {/*   <div className="col-xs-3" style={borderLine}>
                     <div> <img src={icon_menu} style={{margin:"20px 20px 8px 20px"}}  width={30} height={30} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"0px"}}>  <span style={{fontSize:"12px"}}>通讯录</span></div>
                     </div>*/}
                </div>
                <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
            </div>
        </div>
    </div>
}


let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => {
    return {switchUser: () => dispatch(switchUser())}
}


export default connect(mapStateToProps, mapDispatchToProps)(AppHomePage)