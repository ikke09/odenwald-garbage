import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/de';
import App from './components/App/App';

moment.locale('de');
ReactDOM.render(<App />, document.getElementById('root'));
