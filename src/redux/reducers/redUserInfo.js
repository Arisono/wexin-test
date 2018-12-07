import {USER_INFO} from "../constants/actionTypes";

const redUserInfo = (state = {
    userId: 10001,
    userName: '',
    userOpenid: '',
    userPhone: '',
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case USER_INFO:
            return {
                userId: action.userId || state.userId,
                userName: action.userName || state.userName,
                userOpenid: action.userOpenid || state.userOpenid,
                userPhone: action.userPhone || state.userPhone,
            }
        default:
            return state
    }

}

export default redUserInfo