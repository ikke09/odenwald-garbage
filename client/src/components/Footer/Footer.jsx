import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <span>
        Erstellt mit Leidenschaft von{' '}
        <a href='https://christian-bechtluft.jimdosite.com/' target='_blank'>
          Christian Bechtluft
        </a>{' '}
        - Quellcode zu finden unter{' '}
        <a href='https://github.com/ikke09/odenwald-garbage' target='_blank'>
          GitHub
        </a>
      </span>
    </footer>
  );
};

export default Footer;
