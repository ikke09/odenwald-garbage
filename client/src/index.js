import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app.component';
const config = require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
