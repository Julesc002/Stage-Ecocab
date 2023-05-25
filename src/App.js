import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import PosterUnTrajet from './pages/PosterUnTrajet';
import MentionsLegales from './pages/MentionsLegales';
import PageRechercherUnTrajet from './pages/PageRechercherUnTrajet';
import LoginWithEmail from './pages/LoginWithEmail';
import CreateAccount from './pages/CreateAccount';
import HowDoesThisWork from './pages/HowDoesThisWork';
import TravelDetails from './pages/TravelDetails';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Profile from './pages/Profile';
import MesTrajets from './pages/MesTrajets';

const App = () => {

  const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected') === 'true');

  // Pour s'assurer que l'utilisateur reste connecté après rechargement de la page
  useEffect(() => {
    const storedIsConnected = localStorage.getItem('isConnected') === 'true';
    setIsConnected(storedIsConnected);
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CommentCaMarche' element={<HowDoesThisWork />} />
        <Route path='/RechercherUnTrajet' element={<PageRechercherUnTrajet />} />
        <Route path='/PosterUnTrajet' element={<PosterUnTrajet />} />
        {isConnected ? <Route path='/Compte' element={<Account />} /> : <Route path='/Compte' element={<LoginWithEmail />} />}
        <Route path='/Inscription' element={<CreateAccount />} />
        <Route path='/mentionLegales' element={<MentionsLegales />} />
        <Route path='/Details/:id' element={<TravelDetails />} />
        <Route path='/Contact' element={<Contact />} />
        {isConnected && (
          <>
            <Route path='/MesTrajets' element={<MesTrajets />} />
            <Route path='/Messages' />
            <Route path='/Profil' element={<Profile />} />
            <Route path='/HistoriqueDesPaiements' />
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;