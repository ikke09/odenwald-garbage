import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledProgressBar = styled(CircularProgress)({
  color: '#28587b',
});

const LoadingBar = () => (
  <motion.div
    className="loading"
    animate={{ scale: 2 }}
    transition={{
      duration: 0.7,
      yoyo: Infinity,
      ease: 'linear',
    }}
  >
    <StyledProgressBar size={64} />
  </motion.div>
);

export default LoadingBar;
