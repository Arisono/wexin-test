import {USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const redUserInfo = (state = {
    userId: 10001,
    userName: '饶猛',
    stuName:"",
    userOpenid: '',
    userPhone: '13641490964',
    stuId:'10003',
    userRole: 0
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }

}

export default redUserInfo