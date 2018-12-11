/**
 * Created by RaoMeng on 2018/12/10
 * Desc: 列表数据缓存
 */

import {CLEAR_LIST_STATE, LIST_STATE} from "../constants/actionTypes";
import store from '../store/store'

export const saveListState = (data) => {
    return () => {
        store.dispatch({
            type: LIST_STATE,
            ...data
        })
    }
}

export const clearListState = () => {
    return () => {
        store.dispatch({
            type: CLEAR_LIST_STATE
        })
    }
}