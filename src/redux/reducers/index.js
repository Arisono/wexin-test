/**
 * Created by RaoMeng on 2018/12/10
 * Desc: 数据处理中心
 */

import {combineReducers} from 'redux'
import redUserInfo from './redUserInfo'
import redListState from './redListState'
import redClassData from './redClassData'

const reducers = combineReducers({redUserInfo, redListState, redClassData})

export default reducers