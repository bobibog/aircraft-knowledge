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
import flightReducer from './store/reducers/flight';
import acarsMessageReducer from './store/reducers/acarsMessage';
import acarsMessageAllReducer from './store/reducers/acarsMessageAll';
import userReducer from './store/reducers/user';
import adsbMessageReducer from './store/reducers/adsbMessage';
import acarsWithExtDataReducer from './store/reducers/acarsWithExtData';
import aircraftTypeReducer from './store/reducers/aircraftType';
import typeCodeReducer from './store/reducers/typeCode';
import currentLocationReducer from './store/reducers/currentLocation';
import acarsDecoderReducer from './store/reducers/acarsDecoder';
import statisticsReducer from './store/reducers/statistics';
import directionalRangesReducer from './store/reducers/directionalRanges';
import feedingTimeReducer from './store/reducers/feedingTime';
import feedingPercentageReducer from './store/reducers/feedingPercentage';
import feedingPercentagePerMessageTypeReducer from './store/reducers/feedingPercentagePerMessageType';
import acarsWithExtDataCompanyReducer from './store/reducers/acarsWithExtDataCompany';
import adsbMessageCompanyReducer from './store/reducers/adsbMessageCompany';
import currentLocationCompanyReducer from './store/reducers/currentLocationCompany';
import stationLastSeenReducer from './store/reducers/stationLastSeen';
import stationStatusReducer from './store/reducers/stationStatus';
import activeStationsNumberReducer from './store/reducers/activeStationsNumber';

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}

const rootReducer = combineReducers({
  airline: airlineReducer,
  aircraft: aircraftReducer,
  airport: airportReducer,
  flight: flightReducer,
  acarsMessage: acarsMessageReducer,
  user: userReducer,
  adsbMessage: adsbMessageReducer,
  acarsWithExtData: acarsWithExtDataReducer,
  aircraftType: aircraftTypeReducer,
  typeCode: typeCodeReducer,
  currentLocation: currentLocationReducer,
  acarsDecoder: acarsDecoderReducer,
  statistics: statisticsReducer,
  directionalRanges: directionalRangesReducer,
  feedingTime: feedingTimeReducer,
  feedingPercentage: feedingPercentageReducer,
  feedingPercentagePerMessageType: feedingPercentagePerMessageTypeReducer,
  acarsMessageAll: acarsMessageAllReducer,
  acarsWithExtDataCompany: acarsWithExtDataCompanyReducer,
  adsbMessageCompany: adsbMessageCompanyReducer,
  currentLocationCompany: currentLocationCompanyReducer,
  stationLastSeen: stationLastSeenReducer,
  stationStatus: stationStatusReducer,
  activeStationsNumber: activeStationsNumberReducer
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
  </React.StrictMode>,//dvostruki rerender zbog provera
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
