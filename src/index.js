import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import { MantineProvider } from '@mantine/core';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import LandingPage from './LandingPage';
import { updateVisiblePage } from './pages/pagesSlice';
import { getPageName } from './storage/data';
import { register } from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <IndexPage />
  </Provider>,
  document.getElementById('root')
);

function IndexPage() {
  const dispath = useDispatch();
  const currentpage = useSelector((state) => state.pages.visiblePage);

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const page = params.get('p');
    dispath(updateVisiblePage(getPageName(page || 'landing')));
  }, []);

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
      {currentpage !== 'landing-page'  && <MainApp />}
      {currentpage === 'landing-page' && <LandingPage />}
    </MantineProvider>
  );
}

register();