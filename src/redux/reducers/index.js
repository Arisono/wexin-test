import {combineReducers} from 'redux'
import redUserInfo from './redUserInfo'
import redListState from './redListState'

const reducers = combineReducers({redUserInfo, redListState})

export default reducers