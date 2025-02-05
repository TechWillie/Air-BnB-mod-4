import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// you'll be using Provider from Redux to provide the Redux store. 
// Import this component and the configureStore function that you just wrote 
// in frontend/src/store/store.js into frontend/src/main.jsx.
import {Provider} from 'react-redux'
import configureStore from './store/store';

// Create a variable to access your store and... 
const store = configureStore();

// It should not be exposed in production; make sure this is only set in development.
if (process.env.NODE_ENV !== 'production') {
  // expose it on the window. 
  window.store = store;
}

// Next, wrap the rendered App component in Redux's Provider component, 
// passing store as a prop of the same name to Provider.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
