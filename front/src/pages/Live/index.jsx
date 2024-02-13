import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Live from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Live />, document.getElementById('root'));
registerServiceWorker();
