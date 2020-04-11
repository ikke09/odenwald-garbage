import React from 'react';
import { styled } from '@material-ui/core/styles';

const FooterWrapper = styled('span')({
  position: 'absolute',
  display: 'block',
  bottom: '10px',
  width: '100%',
  'text-align': 'center',
});

const Footer = () => {
  return (
    <FooterWrapper>
      Erstellt mit Leidenschaft von{' '}
      <a href='https://christian-bechtluft.jimdosite.com/' target='_blank' rel='noopener noreferrer'>
        Christian Bechtluft
      </a>{' '}
      - Quellcode auf{' '}
      <a href='https://github.com/ikke09/odenwald-garbage' target='_blank' rel='noopener noreferrer'>
        GitHub
      </a>
    </FooterWrapper>
  );
};

export default Footer;
