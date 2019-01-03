/**
 * Created by RaoMeng on 2019/1/3
 * Desc: 智慧校园首页
 */

import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {switchUser} from "../../redux/actions/userInfo";
import {Avatar} from 'antd'
import {clearListState} from 'action/listState'
import {clearClassData} from "action/classData";
import {connect} from "react-redux";
import {CONFIG_TEACHER_MENU, CONFIG_PARENT_MENU} from "../../utils/homePage.constants";
import {isObjEmpty} from "../../utils/common";
import 'css/home-page.css'
import icon_group from "../../style/imgs/icon_group.png";


const mTopMenu = [{
    icon: require('imgs/ic_personal_info.png'),
    text: '个人信息',
    page: '/userInfoPage'
}, {
    icon: require('imgs/ic_use_help.png'),
    text: '使用帮助',
    page: '/useHelp'
}, {
    icon: require('imgs/ic_system_message.png'),
    text: '系统消息',
    page: '/systemMessage'
},]

class AppHomePage2 extends Component {

    constructor() {
        super()

        this.state = {
            students: [],
            studentIndex: 0,
        }
    }

    componentDidMount() {
        //清除列表缓存数据
        clearListState()()
        clearClassData()()

        document.title = "智慧校园";
    }

    componentWillUnmount() {

    }

    render() {
        const {userInfo} = this.props
        const {students, studentIndex} = this.state

        const teacherMenu = this.getTeacherMenu()
        const parentMenu = this.getParentMenu()

        const studentList = []
        if (!isObjEmpty(students)) {
            students.forEach((item, index) => {
                studentList.push(<StuItem isSelect={studentIndex === index} stuObj={item}
                                          stuIndex={index} onStuSwitch={this.onStuSwitch}/>)
            })
        }

        const topMenus = this.getTopMenus()

        return (
            <div className='home-page-root'>
                <div className='home-top-layout-root'>
                    <div></div>
                    <div className='home-top-msg-root'>
                        {isObjEmpty(userInfo.userAvatar) ?
                            <Avatar size={60} icon='user'/> :
                            <img
                                src={this.props.userInfo.userAvatar}
                                width={50} height={50} className="img-circle"
                                style={{border: '3px solid #ffffff'}}/>
                        }
                        <span
                            className='home-top-msg-text'>尊敬的{userInfo.userName + (userInfo.userRole === 1 ? '家长' : '老师')}</span>
                    </div>
                    <div className='home-student-layout-root'>
                        {studentList}
                    </div>
                    <div className='home-top-menu-root'>
                        {topMenus}
                    </div>
                </div>
                {userInfo.userRole == 2 ? teacherMenu : parentMenu}
            </div>
        )
    }

    getTopMenus = () => {
        const topMenus = []
        mTopMenu.forEach((topMenu, index) => {
            let menuPage = topMenu.page
            if (menuPage === '/userInfoPage') {
                if (this.props.userInfo.userRole == 1) {
                    menuPage = '/userInfoPage/2'
                } else {
                    menuPage = '/userInfoPage/1'
                }
            }
            topMenus.push(<TopMenuItem icon={topMenu.icon} text={topMenu.text} page={menuPage}/>)
        })

        return topMenus
    }

    onStuSwitch = (stuIndex) => {
        this.setState({
            studentIndex: stuIndex
        })
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
                        teacherMenu.push(<FuncItem funcObj={funcItem}/>)
                    })
                }
            })
        }
        return teacherMenu
    }

    getParentMenu = () => {
        let parentMenu = []
        if (!isObjEmpty(CONFIG_PARENT_MENU)) {
            CONFIG_TEACHER_MENU.forEach((groupItem, groupIndex) => {
                if (groupIndex !== 0) {
                    parentMenu.push(<div className='gray-line'></div>)
                }
                parentMenu.push(<MenuGroup groupIcon={groupItem.groupIcon} groupText={groupItem.groupText}/>)

                const funcList = groupItem.funcList
                if (!isObjEmpty(funcList)) {
                    funcList.forEach((funcItem, funcIndex) => {
                        parentMenu.push(<FuncItem funcObj={funcItem}/>)
                    })
                }
            })
        }
        return parentMenu
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
        this.props.history.push(this.props.funcObj.funcPage)
    }
}

class StuItem extends Component {
    render() {
        return (
            <div onClick={this.onStuSwitch}>
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
        this.props.history.push(this.props.page)
    }
}

let mapStateToProps = (state) => ({
    userInfo: {...state.redUserInfo}
})

let mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHomePage2)
