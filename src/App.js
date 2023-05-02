import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageDeTest from './pages/PageDeTest';
import Layout from './components/Layout';
import PosterUnTrajet from './pages/PosterUnTrajet';
import MentionsLegales from './pages/MentionsLegales';
import PageRechercherUnTrajet from './pages/PageRechercherUnTrajet';


const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Pas encore d'attribut element={ nom de page } dans toutes les routes */}
        <Route path='/' element={<Home />} />
        <Route path='/CommentCaMarche' element={<PageDeTest />} />
        <Route path='/RechercherUnTrajet' element={<PageRechercherUnTrajet />}/>
        <Route path='/PosterUnTrajet' element={<PosterUnTrajet />}/>
        <Route path='/Compte' />
        <Route path='/MentionLegales' element={<MentionsLegales />} />
      </Routes>
    </Layout>
  );
};

export default App;