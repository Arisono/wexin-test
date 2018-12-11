/**
 * Created by RaoMeng on 2018/12/10
 * Desc: 班级数据缓存
 */

import {CLEAR_CLASS_DATA, CLASS_DATA} from "../constants/actionTypes";
import store from '../store/store'

export const saveClassData = (data) => {
    return () => {
        store.dispatch({
            type: CLASS_DATA,
            ...data
        })
    }
}

export const clearClassData = () => {
    return () => {
        store.dispatch({
            type: CLEAR_CLASS_DATA
        })
    }
}