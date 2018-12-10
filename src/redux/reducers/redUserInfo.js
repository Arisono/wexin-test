import {USER_INFO} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const redUserInfo = (state = {
    userId: 10001,
    userName: '',
    userOpenid: '',
    userPhone: '',
    userRole: 0
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case USER_INFO:
            return {
                userId: getVisibleObj(action.userId || state.userId),
                userName: getVisibleObj(action.userName || state.userName),
                userOpenid: getVisibleObj(action.userOpenid || state.userOpenid),
                userPhone: getVisibleObj(action.userPhone || state.userPhone),
                userRole: getVisibleObj(action.userRole || state.userRole),
            }
        default:
            return state
    }

}

export default redUserInfo