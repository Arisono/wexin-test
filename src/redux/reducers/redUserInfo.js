import {USER_INFO} from "../constants/actionTypes";

const redUserInfo = (state = {
    userId: 0,
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
                userId: action.userId,
                userName: action.userName,
                userOpenid: action.userOpenid,
                userPhone: action.userPhone,
                userRole:action.userRole
            }
        default:
            return state
    }

}

export default redUserInfo