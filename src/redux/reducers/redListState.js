import {LIST_STATE} from "../constants/actionTypes";

const redListState = (state = {
    scrollTop: 0,
    listData: [],
    pageIndex: 0,
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case LIST_STATE:
            return {
                scrollTop: action.scrollTop || state.scrollTop,
                listData: action.listData || state.listData,
                pageIndex: action.pageIndex || state.pageIndex,
            }
        default:
            return state
    }

}

export default redListState