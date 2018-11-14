/**
 * Created by Arison on 2018/11/1.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
import {Menu, Dropdown, Icon} from 'antd';

import  icon_group from '../../style/imgs/icon_group.png'
import  icon_menu from '../../style/imgs/icon_menu.png'
import  icon_home_menu_2 from '../../style/imgs/icon_home_menu_2.png'
import  icon_home_menu_3 from '../../style/imgs/icon_home_menu_3.png'
import  icon_home_menu_4 from '../../style/imgs/icon_home_menu_4.png'
import  icon_home_menu_5 from '../../style/imgs/icon_home_menu_5.png'
import  icon_home_menu_6 from '../../style/imgs/icon_home_menu_6.png'
import  icon_home_menu_7 from '../../style/imgs/icon_home_menu_7.png'

import  icon_home_menu_9 from '../../style/imgs/icon_home_menu_9.png'
import  icon_home_menu_10 from '../../style/imgs/icon_home_menu_10.png'
import  icon_home_menu_11 from '../../style/imgs/icon_home_menu_11.png'
import  icon_home_menu_12 from '../../style/imgs/icon_home_menu_12.png'
import  icon_home_menu_13 from '../../style/imgs/icon_home_menu_13.png'
import  icon_home_menu_14 from '../../style/imgs/icon_home_menu_14.png'

import  icon_home_help from '../../style/imgs/icon_home_help.png'
import  icon_home_message from '../../style/imgs/icon_home_message.png'

import {Carousel} from 'antd';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import  './AppHomePage.css'
import '../../style/css/app-gloal.css'
import {constants} from '../../utils/constants'
/**
 * Created by Arison on 2018/11/1.
 */
class AppHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTeacher: false
        }
    }

    onChangeRole({key}) {
        console.log("onChangeRole():"+key);
        switch (key) {
            case "2":
                console.log("onChangeRole() 教师");
                constants.isTeacher=true;
                this.setState({
                    isTeacher: true
                })
                break;
            case "1":
                console.log("onChangeRole() 家长");
                constants.isTeacher=false;
                this.setState({
                    isTeacher: false
                })
                break;
        }
    }

    roleMenu = (
        <Menu onClick={this.onChangeRole.bind(this)}>
            <Menu.Item key="1" style={{width:"90px",fontSize:"18px"}}>
                <span  >家长</span>
            </Menu.Item>
            <Menu.Item key="2" style={{width:"90px",fontSize:"18px"}}>
                <span  >教师</span>
            </Menu.Item>
        </Menu>
    );

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    componentDidMount(){
        console.log("componentDidMount()"+this.props.location.search);
        console.log("componentDidMount():query:"+this.props.location.query);
        const query =this.props.location.search;
       const params= query.split('&');
       const role=params[0].substr(5,params[0].length-1);
       if(role!=null){
           if(role.search("teacher")!=-1){
               constants.isTeacher=true;
           }else{
               constants.isTeacher=false;
           }
       }
       console.log("componentDidMount() role="+role);
        if(constants.isTeacher){
            this.setState({
                isTeacher: true
            })
        }else{
            this.setState({
                isTeacher: false
            })
        }
    }




    render() {
        let borderLine = {
            border: "1px solid #f4f4f4"
        };

        return <div className="container-fluid">
            {/*顶部Header*/}
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-xs-8 col-sm-8"></div>
                        <div className="col-xs-4 col-sm-4" id="col-clear">
                            <div style={{background: "#E9E9E9", marginTop: "20px", marginRight: "5px", padding: "1px"}}>
                                <span style={{color: "#2C7CF8", margin: "2px", fontSize: "15px"}}>     宝安区十八中学</span>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2" style={{marginBottom: "20px", marginTop: "20px"}}>
                            <img
                                src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
                                style={{marginRight: "10px"}} width={70} height={70} class="img-circle"/>
                        </div>
                        <div className="col-xs-10">
                            <div style={{marginTop: "30px", marginLeft: "15px"}}><span style={{fontSize: "17px"}}>尊敬的陈小明</span>
                                <Dropdown overlay={this.roleMenu} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#">
                                        {
                                            this.state.isTeacher?('老师'):('家长')
                                        }  <Icon type="down" style={{fontSize:"20px"}}/>
                                    </a>
                                </Dropdown>
                            </div>

                            {/* <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                             <span>王涵</span>

                             <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                             <span>王涵</span>*/}


                        </div>
                    </div>
                    {/*个人信息*/}
                    <div className="row" style={borderLine}></div>
                    <div className="row">
                        <div className="col-xs-4">
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "8px"
                            }}>
                                <img src={icon_group} style={{marginRight: "10px"}} width={12} height={12}/>
                                个人信息
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "8px"
                            }}>
                                <img src={icon_home_help} style={{marginRight: "10px"}} width={12} height={12}/>
                                使用帮助
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "8px"
                            }}>
                                <img src={icon_home_message} style={{marginRight: "10px"}} width={12} height={12}/>
                                系统消息
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {this.state.isTeacher ? (<TeacherMenu/>) : (<ParentMenu/>)}
            {this.state.isTeacher ? (
                <div></div>
            ) : (    <div>
                {/*班级相册*/}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-xs-12" style={{padding: "10px"}}>班级相册</div>
                        </div>
                        <div className="row" style={borderLine}></div>
                        <div className="row">

                            <div className="col-xs-12" style={{margin: "0px", padding: "0px"}}>
                                <Carousel afterChange={this.onChange.bind(this)}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 5px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "10px 0px 15px 10px", display: "inline"}}
                                             width={105} height={90}/>
                                    </div>
                                </Carousel>

                            </div>
                        </div>


                        <div className="row" style={{background: "#DADADA", height: "10px"}}/>
                    </div>
                </div>


                {/*精彩瞬间*/}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row" style={borderLine}>
                            <div className="col-xs-3" style={{padding: "10px"}}>精彩瞬间</div>
                        </div>
                        <div className="row"></div>

                        <div className="row">
                            <div className="col-xs-7">
                                <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "20px 0px 3px 10px"}} width={180} height={190}/>
                            </div>
                            <div className="col-xs-5">
                                <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "20px 0px 0px 0px"}} width={100} height={90}/>
                                <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 0px 0px"}} width={100} height={90}/>
                            </div>
                        </div>

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
        <div className="row" style={{background: "#DADADA", height: "10px"}}/>
        {/*家校互动*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row" >
                    <div  id="global_page_title">
                       家校互动
                    </div>
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
                        <div><img src={icon_menu} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "9px"}}><span
                            style={{fontSize: "12px"}}>

                            <Link to="/notifyBoPage">通知公告</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_2} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}><span
                            style={{fontSize: "12px"}}>班级交费</span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_3} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}>
                            <span style={{fontSize: "12px"}}>
                                  <Link to="/releaseAssignment">作业发布</Link>
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_4} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>
                            <Link to="/phonesSelect">  家长通讯录</Link>
                        </span></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_5} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "9px"}}><span
                            style={{fontSize: "12px"}}>
                             <Link to="/voteList"> 投票助手</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_6} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}><span
                            style={{fontSize: "12px"}}>
                            <Link to="/classAlbum">班级相册</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_7} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/leaveList"> 学生请假条 </Link>
                        </span></div>
                    </div>
                    {/* <div className="col-xs-3" style={borderLine}>
                     <div> <img src={icon_menu} style={{margin:"20px 20px 8px 20px"}}  width={20} height={20} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"8px"}}>  <span style={{fontSize:"12px"}}>作业通知</span></div>
                     </div>*/}
                </div>
            </div>
        </div>
        {/*分割线*/}
        <div className="row" style={{background: "#DADADA", height: "10px"}}/>
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
                        <div><img src={icon_home_menu_9} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "9px"}}><span
                            style={{fontSize: "12px"}}>

                            <Link to="/meetingSignIn">会议管理</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_10} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}><span
                            style={{fontSize: "12px"}}>

                            <Link to="/leaveAdd">请假申请</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_11} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/field-trip">出差申请</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_12} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{margin: "5px", fontSize: "12px"}}>

                            <Link to="/phonesSelect">  通讯录 </Link>
                        </span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_13} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/res_apply">用品申请</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/campusCardRecharge">校园卡充值</Link>
                        </span></div>
                    </div>
                    {/*   <div className="col-xs-3" style={borderLine}>
                     <div> <img src={icon_menu} style={{margin:"20px 20px 8px 20px"}}  width={20} height={20} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"8px"}}>  <span style={{fontSize:"12px"}}>出差申请</span></div>
                     </div>
                     <div className="col-xs-3" style={borderLine}>
                     <div> <img src={icon_menu} style={{margin:"20px 20px 8px 20px"}}  width={20} height={20} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"8px"}}>  <span style={{fontSize:"12px"}}>通讯录</span></div>
                     </div>*/}
                </div>
                <div className="row" style={{background: "#DADADA", height: "10px"}}/>
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
        <div className="row" style={{background: "#DADADA", height: "10px"}}/>
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
                        <div><img src={icon_menu} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>
                            <Link to="/access-notice">出入校通知</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_2} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}>
                            <Link to="/notifyBoPage">通知公告</Link>
                        </div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div ><img src={icon_home_menu_3} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/score-inquiry"> 成绩通知</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_4} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>作业通知</span></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_5} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>收费通知</span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_6} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>
                            <Link to="/leaveList">学生请假条</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_7} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/voteList"> 投票助手</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" id="row_center_align">
                        <div><img src={icon_menu} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>

                            <Link to="/phonesSelect">老师通讯录</Link>
                        </span></div>
                    </div>
                </div>
            </div>
        </div>
        {/*分割线*/}
        <div className="row" style={{background: "#DADADA", height: "10px"}}/>
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
                        <div><img src={icon_home_menu_9} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "9px"}}><span
                            style={{fontSize: "12px"}}>

                            <Link to="/rechargeList">充值缴费</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_10} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}><span
                            style={{fontSize: "12px"}}>入校登记</span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_11} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/class-schedule">课表查询</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_12} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{margin: "5px", fontSize: "12px"}}>

                            <Link to="/score-inquiry">成绩查询</Link>
                        </span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_13} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/classAlbum">  班级相册</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            <Link to="/principalMailbox">校长信箱</Link>
                        </span></div>
                    </div>
                    <div className="col-xs-3" id="row_center_align">
                        <div><img src={icon_menu} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "8px"}}><span
                            style={{fontSize: "12px"}}>问卷调查</span></div>
                    </div>
                    {/*   <div className="col-xs-3" style={borderLine}>
                     <div> <img src={icon_menu} style={{margin:"20px 20px 8px 20px"}}  width={30} height={30} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"8px"}}>  <span style={{fontSize:"12px"}}>通讯录</span></div>
                     </div>*/}
                </div>
                <div className="row" style={{background: "#DADADA", height: "10px"}}/>
            </div>
        </div>
    </div>
}


export  default AppHomePage;