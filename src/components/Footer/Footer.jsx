import React from 'react';
import { styled } from '@material-ui/core/styles';

const FooterWrapper = styled('span')({
  position: 'absolute',
  display: 'block',
  bottom: '10px',
  width: '100%',
  'text-align': 'center',
});

const Footer = () => (
  <FooterWrapper>
      Erstellt mit Leidenschaft von
    {' '}
    <a href={process.env.REACT_APP_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
        Christian Bechtluft
    </a>
    {' '}
      - Quellcode auf
    {' '}
    <a href={process.env.REACT_APP_REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
        GitHub
    </a>
  </FooterWrapper>
);

export default Footer;
