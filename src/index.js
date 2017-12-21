// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.2.178:8098';
ReactDOM.render(<App />,
document.getElementById('root'));
registerServiceWorker();
