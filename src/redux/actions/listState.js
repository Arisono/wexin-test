import {LIST_STATE} from "../constants/actionTypes";
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
            type: LIST_STATE,
            scrollTop: 0,
            listData: [],
            pageIndex: 1,
            itemIndex: -1,
        })
    }
}