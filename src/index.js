import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BreakpointContextProvider from './context/breakpoint-context';

const queries = {
  xs: '(max-width: 600px)',
  sm: '(max-width: 960px)',
  md: '(max-width: 1280px)',
  lg: '(max-width: 1920px)',
  or: '(orientation: portrait)', // we can check orientation also
}

ReactDOM.render(
  <React.StrictMode>
    <BreakpointContextProvider queries={queries}>
      <App />
    </BreakpointContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
