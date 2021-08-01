import React from 'react';
import './App.css';
import Banner from './components/banner/Banner';
import NavBar from './components/navbar/NavBar';
import Main from './containers/Main';

function App() {
  return (
    <div className="app">
      <Banner/>
      <NavBar/>
      <Main />
    </div >
  );
}

export default App;
