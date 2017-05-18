import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store"
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from '../assets/react-toolbox/theme'
import 'semantic-ui-css/semantic.min.css';
import './index.css';

// Binding react components with redux store.
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter> ,
  document.getElementById('app')
);
