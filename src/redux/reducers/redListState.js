import {CLEAR_LIST_STATE, LIST_STATE} from "../constants/actionTypes";

const initListState = {
    scrollTop: 0,
    listData: [],
    pageIndex: 1,
    itemIndex: -1,

    tabIndex: 0,
    scrollTop2: 0,
    listData2: [],
    pageIndex2: 1,
    itemIndex2: -1,
}

const redListState = (state = initListState, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case LIST_STATE:
            return {
                ...state,
                ...action
            }
        case CLEAR_LIST_STATE:
            return initListState
        default:
            return state
    }

}

export default redListState