import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePages from "./modules/home/HomePages";
import RouteConfig from "./configs/router.config";

import FieldTrip from './modules/hiPages/field-trip/FieldTrip';

ReactDOM.render(<FieldTrip/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
