import {USER_INFO, CLEAR_USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const initListState = {
    userId: 10000,
    school: '',
    userName: 'kl',
    students: [],
    stuName: '',
    stuId: '',
    userOpenid: 'o8lZ9uMueMe5ksrphaRmqM0LJCTo',
    userPhone: '13025449611',
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