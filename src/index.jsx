import React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import './index.css';
import moment from 'moment';
import 'moment/locale/de';
import App from './components/App/App';

const AppWrapper = styled(Grid)({
  height: '100vh',
  background: '#e8e5e5',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  justifyContent: 'center',
});

moment.locale('de');
ReactDOM.render(
  <AppWrapper container>
    <App />
  </AppWrapper>,
  document.getElementById('root'),
);
