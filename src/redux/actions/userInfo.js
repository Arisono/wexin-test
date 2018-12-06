import {USER_INFO} from "../constants/actionTypes";
import store from '../store/store'

export const switchUser = (data) => {
    return () => {
        store.dispatch({
            type: USER_INFO,
            ...data
        })
    }
}