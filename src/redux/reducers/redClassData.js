import {CLASS_DATA, CLEAR_CLASS_DATA} from "../constants/actionTypes";

const initClassData = {
    classList: [],
    classValue: [],
}

const redClassData = (state = initClassData, action) => {
    if (action === undefined) {
        return state
    }

    switch (action.type) {
        case CLASS_DATA:
            return {
                ...state,
                ...action
            }
        case CLEAR_CLASS_DATA:
            return initClassData
        default:
            return state
    }

}

export default redClassData