import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/de';
import './index.css';
import App from './components/App/App';
const config = require('dotenv').config();

moment.locale('de');
ReactDOM.render(<App />, document.getElementById('root'));
