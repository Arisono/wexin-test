import {USER_INFO, CLEAR_USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const initListState = {
    userId: 0,
    school: '',
    userName: '',
    students: [],
    stuName: '',
    stuId: '',
    student: {},
    userOpenid: '',
    userPhone: '',
    userRole: 0,
    userRoles: [],
    accessToken: '',
    userAvatar: ''
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