import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
      <App />
  </RecoilRoot>

);

