import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageDeTest from './pages/PageDeTest';
import Layout from './components/Layout';


const App = () => {
  return (
    <Layout>
        <Routes>
          {/* Pas encore d'attribut element={ nom de page } dans toutes les routes */}
          <Route path='/' element={<Home/>} />
          <Route path='/HowItWorks' element={<PageDeTest />} />
          <Route path='/SearchRides' />
          <Route path='/PostARide' />
          <Route path='/Account' />
        </Routes>
    </Layout>
  );
};

export default App;