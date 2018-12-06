import {USER_INFO} from "../constants/actionTypes";

const redUserInfo = (state = {
    userId: 0,
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
                userId: action.userId,
                userName: action.userName,
                userOpenid: action.userOpenid,
                userPhone: action.userPhone,
            }
        default:
            return state
    }

}

export default redUserInfo