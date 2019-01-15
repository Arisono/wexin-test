import {USER_INFO, CLEAR_USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const initListState = {
    userId: 10001,
    school: '',
    userName: '',
    students: [],
    stuName: '',
    stuId: '',
    student: '',
    userOpenid: 'o8lZ9uJjHXWw2oaHBgSXXnP9pwpU',
    userPhone: '13641490964',
    userRole: 0,
    userRoles: [],
    accessToken: '17_2JV4JY47Ht5gTNCVHPQ3ya6ov9GPmtz_0JACss95_KdxnCVOWhrkmcLqBb27KmnEsYtLaWHxAT_bV_K44hRKD9A1yFib9IFYSkAdrVGtY-A',
    userAvatar: '',
    userSex: 0
}

const redUserInfo = (state = initListState, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                ...action
            }
        case CLEAR_USER_INFO:
            return initListState
        default:
            return state
    }

}

export default redUserInfo