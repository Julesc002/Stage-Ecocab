import React from 'react';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageDeTest from './pages/PageDeTest';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <Nav />
        </header>
        <footer>
          <Footer/>
        </footer>
        <Routes>
          {/* Pas encore d'attribut element={ nom de page } dans toutes les routes */}
          <Route path='/HowItWorks' element={<PageDeTest />} />
          <Route path='/SearchRides' />
          <Route path='/PostARide' />
          <Route path='/Account' />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;