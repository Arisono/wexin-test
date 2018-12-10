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
                scrollTop: getVisibleObj(action.scrollTop, state.scrollTop),
                listData: getVisibleObj(action.listData, state.listData),
                pageIndex: getVisibleObj(action.pageIndex, state.pageIndex),
                itemIndex: getVisibleObj(action.itemIndex, state.itemIndex),
                tabIndex: getVisibleObj(action.tabIndex, state.tabIndex),
                scrollTop2: getVisibleObj(action.scrollTop2, state.scrollTop2),
                listData2: getVisibleObj(action.listData2, state.listData2),
                pageIndex2: getVisibleObj(action.pageIndex2, state.pageIndex2),
                itemIndex2: getVisibleObj(action.itemIndex2, state.itemIndex2),
            }
        default:
            return state
    }

}

export default redListState