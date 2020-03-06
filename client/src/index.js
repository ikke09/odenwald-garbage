import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
const config = require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
