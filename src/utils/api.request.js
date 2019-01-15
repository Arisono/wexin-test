import {fetchGet} from "./fetchRequest";
import {getIntValue, getStrValue, isObjEmpty} from "./common";
import {Toast} from 'antd-mobile'
import {API} from 'api'
import {ORGANIZATION_TEACHER, ORGANIZATION_PARENT} from './api.constants'
import {switchUser} from "../redux/actions/userInfo";
import store from './../redux/store/store'

export const getOrganization = (type, paramId, isMultiple) => {
    Toast.loading('', 0)

    let params = {}
    if (type === ORGANIZATION_TEACHER) {
        params = {
            userId: paramId
        }
    } else {
        params = {
            stuId: paramId
        }
    }
    return fetchGet(API.USER_GETOBJECT, params).then(response => {
        Toast.hide()
        const parentTarget = []
        const studentTarget = []
        const teacherTarget = []
        if (response && response.data) {
            const schoolArray = response.data.schools
            const teacherArray = response.data.teachers

            if (!isObjEmpty(teacherArray)) {
                teacherArray.forEach((teacherObj, index) => {
                    if (teacherObj) {
                        teacherTarget.push({
                            title: getStrValue(teacherObj, 'userName'),
                            userId: getIntValue(teacherObj, 'userId'),
                            userPhone: getStrValue(teacherObj, 'userPhone'),
                            value: getStrValue(teacherObj, 'userName') + `-2-${index}`,
                            key: `2-${index}`,
                        })
                    }
                })
            }

            if (!isObjEmpty(schoolArray)) {

                schoolArray.forEach((schoolObj, sIndex) => {
                    if (schoolObj) {
                        const parentArray = schoolObj.parents
                        const parentData = []
                        if (!isObjEmpty(parentArray)) {
                            parentArray.forEach((parentObj, pIndex) => {
                                parentData.push({
                                    title: getStrValue(parentObj, 'userName'),
                                    userId: getIntValue(parentObj, 'userId'),
                                    userPhone: getStrValue(parentObj, 'userPhone'),
                                    value: getStrValue(parentObj, 'userName') + `-0-${sIndex}-${pIndex}`,
                                    key: `0-${sIndex}-${pIndex}`,
                                })
                            })

                            parentTarget.push({
                                title: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName'),
                                value: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName') + `-0-${sIndex}`,
                                key: `0-${sIndex}`,
                                selectable: isMultiple,
                                children: parentData,
                            })
                        }

                        const studentArray = schoolObj.students
                        const studentData = []
                        if (!isObjEmpty(studentArray)) {
                            studentArray.forEach((studentObj, pIndex) => {
                                studentData.push({
                                    title: getStrValue(studentObj, 'stuName'),
                                    userId: getIntValue(studentObj, 'stuId'),
                                    userPhone: getStrValue(studentObj, 'userPhone'),
                                    value: getStrValue(studentObj, 'stuName') + `-1-${sIndex}-${pIndex}`,
                                    key: `1-${sIndex}-${pIndex}`,
                                })
                            })

                            studentTarget.push({
                                title: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName'),
                                value: getStrValue(schoolObj, 'parentName') + getStrValue(schoolObj, 'schName') + `-0-${sIndex}`,
                                key: `1-${sIndex}`,
                                selectable: isMultiple,
                                children: studentData,
                            })
                        }
                    }
                })
            }
        }

        return {
            parents: [{
                title: `全体家长`,
                value: `0`,
                key: `0`,
                selectable: isMultiple,
                children: parentTarget,
            }],
            students: [{
                title: `全体学生`,
                value: `1`,
                key: `1`,
                selectable: isMultiple,
                children: studentTarget,
            }],
            teachers: [{
                title: `全体老师`,
                value: `2`,
                key: `2`,
                selectable: isMultiple,
                children: teacherTarget,
            }]
        }
    }).catch(error => {
        Toast.hide()

        if (typeof error === 'string') {
            Toast.fail(error, 2)
        } else {
            Toast.fail('请求异常', 2)
        }
        return null
    })
}

export const getWeixinInfo = () => {
    const userInfo = store.getState().redUserInfo

    fetchGet('https://api.weixin.qq.com/cgi-bin/user/info', {
        access_token: userInfo.accessToken,
        openid: userInfo.userOpenid,
        lang: 'zh_CN',
    }).then(response => {
        if (!isObjEmpty(response)) {
            alert(response)
            switchUser({
                userAvatar: response.headimgurl ? response.headimgurl : userInfo.userAvatar,
                userOpenid: response.openid ? response.openid : userInfo.userOpenid,
            })()
        }
    }).catch(error => {
        alert(error)
    })
}