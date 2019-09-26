import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px'
};

const Spinner = () => (
  <div style={style}>
    <CircularProgress size={50} thickness={5} data-testid="spinner" />
  </div>
);

export default Spinner;
