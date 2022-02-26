import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider theme={{
      colorScheme: 'dark',
      breakpoints: {
        xs: 500,
        sm: 800,
        md: 1000,
        lg: 1200,
        xl: 1400,
      }
    }}>
      <App />      
    </MantineProvider>
  </Provider>,
  document.getElementById('root')
);
