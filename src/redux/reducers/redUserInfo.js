const redUserInfo = (state = {
    userId: 0,
    userName: '',
    userOpenid: '',
    userPhone: '',
}, action) => {
    if (action === undefined) {
        return state
    }

    return {
        userId: action.userId,
        userName: action.userName,
        userOpenid: action.userOpenid,
        userPhone: action.userPhone,
    }
}

export default redUserInfo