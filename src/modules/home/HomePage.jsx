/**
 * Created by RaoMeng on 2019/1/3
 * Desc: 智慧校园首页
 */

import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {switchUser} from "../../redux/actions/userInfo";
import {Avatar} from 'antd'
import {Toast, Modal} from 'antd-mobile'
import {clearListState} from 'action/listState'
import {clearClassData} from "action/classData";
import {connect} from "react-redux";
import {CONFIG_TEACHER_MENU, CONFIG_PARENT_MENU, CONFIG_HOME_TOP_MENU} from "../../utils/homePage.constants";
import {getStrValue, isObjEmpty} from "../../utils/common";
import 'css/home-page.css'
import {fetchGet} from "../../utils/fetchRequest";
import {_baseURL, API} from "../../configs/api.config";
import icon_home_change from "../../style/imgs/icon_home_change.png";

const operation = Modal.operation;

class HomePage extends Component {

    constructor() {
        super()

        this.state = {
            studentIndex: 0,
            albums: [],
            videos: []
        }
    }

    componentDidMount() {
        //清除列表缓存数据
        clearListState()()
        //清除班级缓存数据
        clearClassData()()

        document.title = "智慧校园";

        if (!isObjEmpty(this.props.userInfo.students)) {
            this.props.userInfo.students.forEach((item, index) => {
                if (this.props.userInfo.stuId == item.stuId) {
                    this.setState({
                        studentIndex: index
                    })
                }
            })
        }
        this.getHomeData()
    }

    componentWillUnmount() {

    }

    render() {
        const {userInfo} = this.props
        let {studentIndex} = this.state

        const teacherMenu = this.getTeacherMenu()
        const parentMenu = this.getParentMenu()
        const albumLayout = this.getAlbumLayout()
        const videoLayout = this.getVideoLayout()
        const topMenus = this.getTopMenus()

        const studentList = []
        if (!isObjEmpty(userInfo.students) && userInfo.userRole === 1) {
            userInfo.students.forEach((item, index) => {
                studentList.push(<StuItem isSelect={studentIndex === index} stuObj={item}
                                          stuIndex={index} onStuSwitch={this.onStuSwitch}/>)
            })
        }


        return (
            <div className='home-page-root'>
                <div className='home-top-layout-root'>
                    <div className='home-top-school-text'>{userInfo.school}</div>
                    <div className='home-top-msg-root'>
                        {isObjEmpty(userInfo.userAvatar) ?
                            <Avatar size={50} icon='user'/> :
                            <img
                                src={this.props.userInfo.userAvatar}
                                width={50} height={50} className="img-circle"
                                style={{border: '3px solid #ffffff'}}/>
                        }
                        <span
                            className='home-top-msg-text'>尊敬的{userInfo.userName + (userInfo.userRole === 1 ? '家长' : '老师')}</span>
                        {userInfo.userRoles.length > 1 ?
                            <img style={{marginLeft: "5px"}} src={icon_home_change} width={16}
                                 height={16} onClick={this.onIdentitySwitch}/> : ''}

                    </div>
                    <div className='home-student-layout-root'>
                        {studentList}
                    </div>
                    <div className='home-top-menu-root'>
                        {topMenus}
                    </div>
                </div>
                {/*功能菜单*/}
                {userInfo.userRole == 1 ? parentMenu : teacherMenu}
                {/*班级相册*/}
                {albumLayout}
                {/*精彩瞬间*/}
                {videoLayout}
            </div>
        )
    }

    getHomeData = () => {
        const {userInfo} = this.props
        let {studentIndex} = this.state

        //获取首页接口
        fetchGet(API.homeIndex, {
            userOpenid: userInfo.userOpenid,
            userPhone: userInfo.userPhone
        }).then((response) => {
            Toast.hide();
            if (response && response.data) {
                const homeData = response.data

                let userRole = userInfo.userRole
                if (homeData.roles.length === 1) {
                    if (homeData.roles[0] === "家长") {
                        userRole = 1
                    }
                    if (homeData.roles[0] === "教师") {
                        userRole = 2
                    }
                }

                this.setState({
                    albums: homeData.pictures ? homeData.pictures.albums : [],
                    videos: homeData.pictures ? homeData.pictures.videos : []
                })

                switchUser({
                    stuName: userInfo.stuName || getStrValue(homeData.students, 0).stuName,
                    userId: homeData.userId,
                    school: homeData.schoolName,
                    students: homeData.students,
                    userName: homeData.userName,
                    userOpenid: homeData.userOpenid,
                    userPhone: homeData.userPhone,
                    stuId: userInfo.stuId || getStrValue(homeData.students, 0).stuId,
                    userRole: userRole,
                    userRoles: homeData.roles,
                    userAvatar: homeData.userPhoto
                })()

                if (!isObjEmpty(userInfo.students)) {
                    userInfo.students.forEach((item, index) => {
                        if (userInfo.stuId == item.stuId) {
                            studentIndex = index
                        }
                    })

                    this.setState({studentIndex})
                }
            }
        }).catch((error) => {
            Toast.hide();
            if (typeof error === 'string') {
                Toast.fail(error, 2)
            } else {
                Toast.fail('数据加载失败', 2)
            }
        })
    }

    onIdentitySwitch = () => {
        operation([
            {
                text: '家长', onPress: () => {
                    switchUser({userRole: 1})()
                }
            },
            {
                text: '教师', onPress: () => {
                    switchUser({userRole: 2})();
                }
            },
        ])
    }

    getAlbumLayout = () => {
        const {albums} = this.state
        if (isObjEmpty(albums)) {
            return <div></div>
        } else {
            return <div>
                <div className='gray-line'></div>
                <MenuGroup groupIcon={require('imgs/ic_group_album.png')} groupText='班级相册'/>
            </div>
        }
    }

    getVideoLayout = () => {
        const {videos} = this.state

        if (isObjEmpty(videos)) {
            return <div></div>
        } else {
            return <div>
                <div className='gray-line'></div>
                <MenuGroup groupIcon={require('imgs/ic_group_moment.png')} groupText='精彩瞬间'/>
            </div>
        }
    }

    getTopMenus = () => {
        const topMenus = []
        CONFIG_HOME_TOP_MENU.forEach((topMenu, index) => {
            let menuPage = topMenu.page
            if (menuPage === '/userInfoPage') {
                if (this.props.userInfo.userRole == 1) {
                    menuPage = '/userInfoPage/2'
                } else {
                    menuPage = '/userInfoPage/1'
                }
            }
            topMenus.push(<TopMenuItem icon={topMenu.icon} text={topMenu.text} page={menuPage}
                                       onMenuClick={this.onTopFunc}/>)
        })

        return topMenus
    }

    onStuSwitch = (stuIndex) => {
        this.setState({
            studentIndex: stuIndex
        })
        switchUser({
            stuName: this.props.userInfo.students[stuIndex].stuName,
            stuId: this.props.userInfo.students[stuIndex].stuId,
        })()
    }

    getTeacherMenu = () => {
        let teacherMenu = []
        if (!isObjEmpty(CONFIG_TEACHER_MENU)) {
            CONFIG_TEACHER_MENU.forEach((groupItem, groupIndex) => {
                if (groupIndex !== 0) {
                    teacherMenu.push(<div className='gray-line'></div>)
                }
                teacherMenu.push(<MenuGroup groupIcon={groupItem.groupIcon} groupText={groupItem.groupText}/>)

                const funcList = groupItem.funcList
                if (!isObjEmpty(funcList)) {
                    funcList.forEach((funcItem, funcIndex) => {
                        teacherMenu.push(<FuncItem funcObj={funcItem} onFuncClick={this.onFuncClick}/>)
                    })
                }
            })
        }
        return teacherMenu
    }

    getParentMenu = () => {
        let parentMenu = []
        if (!isObjEmpty(CONFIG_PARENT_MENU)) {
            CONFIG_PARENT_MENU.forEach((groupItem, groupIndex) => {
                if (groupIndex !== 0) {
                    parentMenu.push(<div className='gray-line'></div>)
                }
                parentMenu.push(<MenuGroup groupIcon={groupItem.groupIcon} groupText={groupItem.groupText}/>)

                const funcList = groupItem.funcList
                if (!isObjEmpty(funcList)) {
                    funcList.forEach((funcItem, funcIndex) => {
                        parentMenu.push(<FuncItem funcObj={funcItem} onFuncClick={this.onFuncClick}/>)
                    })
                }
            })
        }
        return parentMenu
    }

    onTopFunc = (page) => {
        this.props.history.push(page)
    }

    onFuncClick = (page) => {
        if (!isObjEmpty(page)) {
            this.props.history.push(page)
        }
    }
}

class MenuGroup extends Component {
    render() {
        return (
            <div className='home-group-item-layout'>
                <img className='home-group-item-icon' src={this.props.groupIcon}/>
                <span className='home-group-item-text'>{this.props.groupText}</span>
            </div>
        )
    }
}

class FuncItem extends Component {
    render() {
        const {funcObj} = this.props

        return (
            isObjEmpty(funcObj) ?
                <div></div> :
                <div className='home-func-item-root' onClick={this.onFuncClick}>
                    <div className='home-func-item-layout'>
                        <img className='home-func-item-icon' src={funcObj.funcIcon}/>
                        <span className='home-func-item-text'>{funcObj.funcText}</span>
                    </div>
                </div>
        )
    }

    onFuncClick = () => {
        if (this.props.onFuncClick) {
            this.props.onFuncClick(this.props.funcObj.funcPage)
        }
    }
}

class StuItem extends Component {
    render() {
        return (
            <div onClick={this.onStuSwitch} className='home-top-stu-layout'>
                <img className={this.props.isSelect ? 'border-radius-50-blue' : 'border-radius-50'}
                     src={"https://upload-images.jianshu.io/upload_images/1131704-eb8f2d63ed00682d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
                     width={25} height={25}/>
                <span
                    className={this.props.isSelect ? "margin_left_5 color_blue text_bold"
                        : 'margin_left_5'}>{this.props.stuObj.stuName}</span>
            </div>
        );
    }

    onStuSwitch = () => {
        if (this.props.onStuSwitch) {
            this.props.onStuSwitch(this.props.stuIndex)
        }
    }
}

class TopMenuItem extends Component {
    render() {
        return (
            <div className='home-top-menu-item' onClick={this.onMenuClick}>
                <img className='home-top-menu-icon' src={this.props.icon}/>
                <span className='home-top-menu-text'>{this.props.text}</span>
            </div>
        );
    }

    onMenuClick = () => {
        if (this.props.onMenuClick) {
            this.props.onMenuClick(this.props.page)
        }
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)