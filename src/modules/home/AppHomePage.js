/**
 * Created by Arison on 2018/11/1.
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Menu, Dropdown, Icon} from 'antd';
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import  icon_group from '../../style/imgs/icon_group.png'
import  icon_home_menu_dengji from '../../style/imgs/icon_home_menu_dengji.png'
import  icon_home_menu_2 from '../../style/imgs/icon_home_menu_2.png'
import  icon_home_menu_3 from '../../style/imgs/icon_home_menu_3.png'
import  icon_home_menu_4 from '../../style/imgs/icon_home_menu_4.png'
import  icon_home_menu_5 from '../../style/imgs/icon_home_menu_5.png'
import  icon_home_menu_6 from '../../style/imgs/icon_home_menu_6.png'
import  icon_home_menu_7 from '../../style/imgs/icon_home_menu_7.png'
import  icon_home_menu_8 from '../../style/imgs/icon_home_menu_8.png'


import  icon_home_menu_9 from '../../style/imgs/icon_home_menu_9.png'
import  icon_home_menu_10 from '../../style/imgs/icon_home_menu_10.png'
import  icon_home_menu_11 from '../../style/imgs/icon_home_menu_11.png'
import  icon_home_menu_12 from '../../style/imgs/icon_home_menu_12.png'
import  icon_home_menu_13 from '../../style/imgs/icon_home_menu_13.png'
import  icon_home_menu_14 from '../../style/imgs/icon_home_menu_14.png'
import  icon_home_menu_15 from '../../style/imgs/icon_home_menu_15.png'


import  icon_home_menu_21 from '../../style/imgs/icon_home_menu21.png'
import  icon_home_menu_22 from '../../style/imgs/icon_home_menu22.png'
import  icon_home_menu_23 from '../../style/imgs/icon_home_menu23.png'
import  icon_home_menu_24 from '../../style/imgs/icon_home_menu24.png'
import  icon_home_menu_25 from '../../style/imgs/icon_home_menu25.png'
import  icon_home_menu_26 from '../../style/imgs/icon_home_menu26.png'
import  icon_home_menu_27 from '../../style/imgs/icon_home_menu27.png'
import  icon_home_menu_28 from '../../style/imgs/icon_home_menu28.png'
import  icon_home_change from '../../style/imgs/icon_home_change.png'
import  icon_home_menu_30 from '../../style/imgs/icon_home_menu30.png'
import  icon_home_menu_31 from '../../style/imgs/icon_home_menu31.png'
import  icon_home_menu_32 from '../../style/imgs/icon_home_menu32.png'
import  icon_home_menu_33 from '../../style/imgs/icon_home_menu33.png'
import  icon_home_menu_34 from '../../style/imgs/icon_home_menu34.png'
import  icon_home_menu_35 from '../../style/imgs/icon_home_menu35.png'


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

    componentWillReceiveProps(nextProps) {

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
                this.props.location.search="?role=teacher"
                console.log("onChangeRole():"+this.props.location.search);
                this.props.history.push("/homePage"+this.props.location.search);
                break;
            case "1":
                console.log("onChangeRole() 家长");
                constants.isTeacher=false;
                this.setState({
                    isTeacher: false
                })
                this.props.location.search="?role=parent"
                this.props.history.push("/homePage"+this.props.location.search);
                break;
        }
    }

    roleMenu = (
        <Menu onClick={this.onChangeRole.bind(this)}>
            <Menu.Item key="1" style={{width:"90px",fontSize:"15px"}}>
                <span  >家长</span>
            </Menu.Item>
            <Menu.Item key="2" style={{width:"90px",fontSize:"15px"}}>
                <span  >教师</span>
            </Menu.Item>
        </Menu>
    );

  /*  onChange(a, b, c) {
        console.log(a, b, c);
    }*/

    componentDidMount(){
        document.title ="智慧校园";
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
       console.log("componentDidMount() role:"+role);
       console.log("componentDidMount() path:"+this.props.location.pathname);
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
        var settings = {
            className: "center",
            centerMode: true,
            infinite: false,
            centerPadding: "20px",
            slidesToShow: 3,
            speed: 500
        };
        return <div className="container-fluid">
            {/*顶部Header*/}
            <div className="row" >
                <div className="col-sm-12">
                   <div className="row" id="header">
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-8 col-sm-8"></div>
                            <div className="col-xs-4 col-sm-4  flex_row_right" >
                                <div className="flex_center" style={{ borderRadius:"4px 0px 0px 4px",background: "#BCC8CE", marginTop: "20px", marginLeft: "0px", padding: "2px"}}>
                                    <span style={{color: "#2C7CF8", margin: "0px", fontSize: "13px"}}>     宝安区十八中学</span>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-3"  id="global_row_right" style={{ marginBottom: "30px", marginTop: "20px"}}>
                                <img
                                    src={"http://img5.imgtn.bdimg.com/it/u=1494163297,265276102&fm=26&gp=0.jpg"}
                                    width={60} height={60} class="img-circle" style={{border:'3px solid #ffffff'}}/>
                            </div>
                            <div className="col-xs-9" id="global-clear">
                                <div style={{marginTop: "30px", marginLeft: "0px"}}><span style={{fontSize: "16px",color:"black"}}>尊敬的陈小明
                                    {
                                        this.state.isTeacher?('老师'):('家长')
                                    }
                                </span>
                                    <Dropdown overlay={this.roleMenu} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="#">
                                             {/* <Icon type="down" style={{fontSize:"20px"}}/>*/}
                                              <img style={{marginLeft:"5px"}} src={icon_home_change}  width={15} height={15} />
                                        </a>
                                    </Dropdown>
                                </div>

                                {this.state.isTeacher?(""):( <div>
                                    <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                                    <span>王涵</span>

                                    <img src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"} style={{margin:"10px"}}  width={25} height={25} class="img-circle" />
                                    <span>王涵</span>
                                </div>)}


                            </div>
                        </div>
                    </div>
                   </div>
                    {/*个人信息*/}
                    <div className="row" style={borderLine}></div>
                    <div className="row" style={{backgroundColor:"#F3F3F3"}}>
                        <div className="col-xs-4">
                            <div className="margin_top_bottom_10" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>{
                               this.state.isTeacher?(<Link to={"/userInfoPage/1"} id="menu_span_normal">
                                   <img src={icon_group} style={{marginRight: "10px"}} width={12} height={12}/>
                                   <span id="span_12">个人信息</span>
                               </Link>):(<Link to={"/userInfoPage/2"} id="menu_span_normal">
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
                                <Link className="flex_column flex_center" to="/useHelp" id="menu_span_normal">   <span id="span_12">使用帮助</span></Link>
                            </div>
                        </div>
                        <div className="col-xs-4 ">
                            <div className="margin_top_bottom_10" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <img src={icon_home_message} style={{marginRight: "10px"}} width={12} height={12}/>
                                 <Link className="flex_column flex_center" to="/systemMessage" id="menu_span_normal"><span id="span_12">系统消息</span></Link>
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
                            <div className="col-xs-12" style={{ margin: "0px", padding: "0px"}}>
                                <Carousel autoplay={true} dots={false} >
                                    <div >
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                    </div>
                                    <div >
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                    </div>
                                    <div >
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                        <img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} style={{margin: "5px 0px 5px 5px", display: "inline"}}
                                             width={"31%"} />
                                    </div>
                                </Carousel>

                            </div>
                        </div>


                        <div className="row" style={{background: "#F3F3F3", height: "10px"}}/>
                    </div>
                </div>


                {/*精彩瞬间*/}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row" >
                            <div className="col-xs-3" style={{padding: "10px"}}>精彩瞬间</div>
                        </div>
                        <div className="row" id="page_horizontal_line"></div>

                        <div className="row flex_row" >

                            <img className=" padding_left" src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}  width={'60%'} height={"220px"}/>

                            <div style={{width:"40%"}} className="padding_right">
                                <div className="margin_bottom_5"><img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}  width={"100%"} height={"92px"}/></div>
                                <div><img src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}  width={"100%"} height={"92px"}/></div>
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
        <div className="row" style={{background: "#ffffff", height: "10px"}}/>
        {/*家校互动*/}
        <div className="row">
            <div className="col-sm-12">
                <div className="row" >
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
                        <Link  className="flex_column flex_center" to="/notifyBoard/teacher">
                        <div><img src={icon_home_menu_22} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
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
                            <div><img src={icon_home_menu_3} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
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
                        <Link  className="flex_center flex_column" to="/classRechargeList" id="menu_span_normal">
                        <div><img src={icon_home_menu_2} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
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
                        <Link className="flex_column flex_center" to="/voteListTab"  id="menu_span_normal">
                            <div><img src={icon_home_menu_5} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
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
                        <Link className="flex_column flex_center" to="/leaveList/teacher"  id="menu_span_normal">
                        <div><img src={icon_home_menu_6} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
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
                        <Link className="flex_column flex_center" to="/classAlbum/teacher"  id="menu_span_normal">
                            <div><img src={icon_home_menu_7} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                            </div>
                            <div style={{paddingBottom: "20px",paddingLeft: "0px"}}><span
                                style={{fontSize: "12px"}}>
                        班级相册
                        </span></div>
                        </Link>
                    </div>
                     <div className="col-xs-3" >
                         <Link className="flex_column flex_center" to="/wonderMoment/teacher" id="menu_span_normal">
                     <div> <img src={icon_home_menu_8} style={{margin:"20px 20px 8px 20px"}}  width={20} height={20} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"0px"}}>  <span style={{fontSize:"12px"}}>
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
                        <Link className="flex_column flex_center" to="/meetingSignIn"  id="menu_span_normal">
                        <div><img src={icon_home_menu_9} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
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
                        <Link className="flex_column flex_center" to="/leaveAddC"  id="menu_span_normal">
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
                        <Link className="flex_column flex_center" to="/field-trip"  id="menu_span_normal">
                        <div><img src={icon_home_menu_11} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           出差申请
                        </span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center" to="/res_apply"   id="menu_span_normal">
                            <div><img src={icon_home_menu_12} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                          用品申请
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
                        <Link className="flex_column flex_center" to="/phonesSelect"  id="menu_span_normal">
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
                        <Link className="flex_column flex_center"  to="/campusCardRecharge"  id="menu_span_normal">
                        <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            校园卡
                        </span></div>
                        </Link>
                    </div>
                       <div className="col-xs-3 flex_center flex_column" >
                     <div> <img src={icon_home_menu_15} style={{margin:"20px 20px 8px 20px"}}  width={20} height={20} /></div>
                     <div style={{paddingBottom:"20px",paddingLeft:"0px"}}>  <span style={{fontSize:"12px"}}>课表查询</span></div>
                     </div>

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
                    }}> <Link className="flex_column flex_center" to="/access-notice"  id="menu_span_normal">
                        <div><img src={icon_home_menu_21} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>
                           出入校通知
                        </span></div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link className="flex_column flex_center" to="/notifyBoard/parent"  id="menu_span_normal">
                        <div><img src={icon_home_menu_22} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}>
                           通知公告
                        </div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link  className="flex_column flex_center" to="/score-inquiry"  id="menu_span_normal">
                        <div ><img src={icon_home_menu_23} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            成绩通知
                        </span></div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link  className="flex_column flex_center" to="/assignmentList/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_24} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           作业通知
                        </span></div></Link>
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
                        <div><img src={icon_home_menu_25} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div  style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>交费通知</span></div>
                        </Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><Link className="flex_column flex_center" to="/leaveList/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_26} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>
                            学生请假条
                        </span></div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link className="flex_column flex_center" to="/voteList" id="menu_span_normal">
                        <div><img src={icon_home_menu_27} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/>
                        </div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            投票助手
                        </span></div></Link>
                    </div>
                    <div className="col-xs-3" id="row_center_align">
                        <Link className="flex_column flex_center" to="/phonesSelect" id="menu_span_normal">
                        <div><img src={icon_home_menu_28} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>

                          老师通讯录
                        </span></div></Link>
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
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div><img src={icon_home_menu_dengji} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px", paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}}>入校登记</span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link className="flex_column flex_center" to="/class-schedule" id="menu_span_normal">
                        <div><img src={icon_home_menu_30} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           课表查询
                        </span></div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> <Link className="flex_column flex_center" to="/score-inquiry" id="menu_span_normal">
                        <div><img src={icon_home_menu_31} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{margin: "5px", fontSize: "12px"}}>

                           成绩查询
                        </span>
                        </div></Link>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_column flex_center"  to="/campusCardRecharge"  id="menu_span_normal">
                            <div><img src={icon_home_menu_14} style={{margin: "20px 20px 8px 20px"}} width={20}
                                      height={20}/></div>
                            <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                            校园卡
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
                    }}> <Link className="flex_column flex_center" to="/classAlbum/parent" id="menu_span_normal">
                        <div><img src={icon_home_menu_33} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                             班级相册
                        </span></div></Link>
                    </div>

                    <div className="col-xs-3" id="row_center_align">
                        <div><img src={icon_home_menu_34} style={{margin: "20px 20px 8px 20px"}} width={20} height={20}/></div>
                        <div style={{paddingBottom: "20px",paddingLeft: "0px"}}><span
                            style={{fontSize: "12px"}} >  <Link className="flex_column flex_center" to="/wonderMoment/parent" id="menu_span_normal">精彩瞬间</Link></span></div>
                    </div>
                    <div className="col-xs-3" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link className="flex_center flex_column" to="/principalMailbox" id="menu_span_normal"><div>
                            <img src={icon_home_menu_35} style={{margin: "20px 20px 8px 20px"}} width={20}
                                  height={20}/></div>
                        <div style={{paddingBottom: "20px"}}><span style={{fontSize: "12px"}}>

                           校长信箱
                        </span></div></Link>
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


export  default AppHomePage;