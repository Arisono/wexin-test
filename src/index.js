import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RouteConfig from "./configs/router.config";
import {Provider} from 'react-redux'
import store from './redux/store/store'
import {persistor} from './redux/store/store'
import {PersistGate} from 'redux-persist/lib/integration/react';
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import {LocaleProvider} from 'antd'
import {LocaleProvider as MoLocaleProvider} from 'antd-mobile'
import moment from 'moment';
import 'moment/locale/zh-cn';
import Bizgoblin from 'bizgoblin'


moment.locale('zh-cn');
// 关闭 F2 的体验改进计划打点请求
Bizgoblin.track(false)

ReactDOM.render(<LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouteConfig/>
            </PersistGate>
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
