import React from 'react';
import ReactDOM from 'react-dom';
import ShidujApp from './ShidujApp';
import './styles/styles.scss';

import { disableReactDevTools } from './disableReactDevTools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <ShidujApp />
  </React.StrictMode>,
  document.getElementById('root')
);