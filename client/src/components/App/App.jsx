import React from 'react';
import moment from 'moment';
import './App.css';
import Garbage from '../Garbage/Garbage';
import DropDown from '../DropDown/DropDown';
import Footer from '../Footer/Footer';

const App = () => {
  return (
    <div className='app'>
      <h1>{moment().format('dddd, DD.MM.YYYY')}</h1>
      <Garbage />
      <div className='selection'>
        für
        <DropDown />
        <DropDown />
      </div>
      <Footer />
    </div>
  );
};

export default App;
