import {USER_INFO} from "../constants/actionTypes";

export const switchUser = (data) => {
    return dispatch => {
        dispatch({
            type: USER_INFO,
            ...data
        })
    }
}