import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import PosterUnTrajet from './pages/PosterUnTrajet';
import MentionsLegales from './pages/MentionsLegales';
import PageRechercherUnTrajet from './pages/PageRechercherUnTrajet';
import LoginWithEmail from './pages/LoginWithEmail';
import CreateAccount from './pages/CreateAccount';
import HowDoesThisWork from './pages/HowDoesThisWork';


const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Pas encore d'attribut element={ nom de page } dans toutes les routes */}
        <Route path='/' element={<Home />} />
        <Route path='/CommentCaMarche' element={<HowDoesThisWork />} />
        <Route path='/RechercherUnTrajet' element={<PageRechercherUnTrajet />}/>
        <Route path='/PosterUnTrajet' element={<PosterUnTrajet />} />
        <Route path='/Compte' element={<LoginWithEmail />} />
        <Route path='/Inscription' element={<CreateAccount />} />
        <Route path='/mentionLegales' element={<MentionsLegales />} />
      </Routes>
    </Layout>
  );
};

export default App;