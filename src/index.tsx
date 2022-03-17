import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import { MantineProvider } from '@mantine/core';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './store/store';
import LandingPage from './LandingPage';


ReactDOM.render(
  <Provider store={store}>
    <IndexPage />
  </Provider>,
  document.getElementById('root')
);

function IndexPage() {
  const currentpage = useSelector((state: RootState) => state.pages.visiblePage)
  return (
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
      {currentpage === 'default' && <MainApp />}
      {currentpage === 'landing-page' && <LandingPage />}
    </MantineProvider>
  );
}