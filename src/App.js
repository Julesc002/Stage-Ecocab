import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import PosterUnTrajet from './pages/PosterUnTrajet';
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
        <Route path='/RechercherUnTrajet' />
        <Route path='/PosterUnTrajet' element={<PosterUnTrajet />} />
        <Route path='/Compte' element={<LoginWithEmail />} />
        <Route path='/Inscription' element={<CreateAccount />} />
      </Routes>
    </Layout>
  );
};

export default App;