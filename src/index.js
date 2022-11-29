import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/style.bundle.min.css';
import './assets/css/style.css';
import { applyMiddleware, createStore } from 'redux';
import createRootReducer from './_redux/reducers';
import { rootSaga, sagaMiddleware } from './_redux/middleware';
import { Provider } from 'react-redux';

const reducer = createRootReducer();

const store = createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
