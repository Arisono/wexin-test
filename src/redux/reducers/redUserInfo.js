import {USER_INFO} from "../constants/actionTypes";

const redUserInfo = (state = {
    userId: 10001,
    userName: '',
    userOpenid: '',
    userPhone: '',
    userRole:0
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case USER_INFO:
            console.log("redUserInfo()",action);
            return {
                userId: action.userId || state.userId,
                userName: action.userName || state.userName,
                userOpenid: action.userOpenid || state.userOpenid,
                userPhone: action.userPhone || state.userPhone,
                userRole:action.userRole
            }
        default:
            return state
    }

}

export default redUserInfo