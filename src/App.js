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
        <Route path='/' element={<Home />} />
        <Route path='/CommentCaMarche' element={<PageDeTest />} />
        <Route path='/RechercherUnTrajet' />
        <Route path='/PosterUnTrajet' />
        <Route path='/Compte' />
      </Routes>
    </Layout>
  );
};

export default App;