import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BreakpointContextProvider from './context/breakpoint-context';
import {BrowserRouter} from 'react-router-dom';
import AuthContextProvider from './context/auth-context';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import reducer from './store/reducers/airline';
import airlineReducer from './store/reducers/airline';
import aircraftReducer from './store/reducers/aircraft';
import airportReducer from './store/reducers/airport';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  airline: airlineReducer,
  aircraft: aircraftReducer,
  airport: airportReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const queries = {
  xs: '(max-width: 600px)',
  sm: '(max-width: 960px)',
  md: '(max-width: 1280px)',
  lg: '(max-width: 1919px)',
  or: '(orientation: portrait)', // we can check orientation also
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BreakpointContextProvider queries={queries}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BreakpointContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
