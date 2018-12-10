import {LIST_STATE} from "../constants/actionTypes";
import {getVisibleObj} from "../../utils/common";

const redListState = (state = {
    scrollTop: 0,
    listData: [],
    pageIndex: 1,
    itemIndex: -1,

    tabIndex: 0,
    scrollTop2: 0,
    listData2: [],
    pageIndex2: 1,
    itemIndex2: -1,
}, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case LIST_STATE:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }

}

export default redListState