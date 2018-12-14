import {USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const redUserInfo = (state = {
    userId: 10001,
    userName: '',
    userOpenid: '',
    userPhone: '13266699268',
    stuId:'',
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