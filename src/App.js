import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageDeTest from './pages/PageDeTest';


import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <Nav />
        </header>

          <Routes>
            {/* Pas encore d'attribut element={ nom de page } dans toutes les routes */}
            <Route path='/' element={<Home/>} />
            <Route path='/HowItWorks' element={<PageDeTest />} />
            <Route path='/SearchRides' />
            <Route path='/PostARide' />
            <Route path='/Account' />
          </Routes>

        <footer>
          <Footer/>
        </footer>
        
      </BrowserRouter>
    </>
  );
};

export default App;