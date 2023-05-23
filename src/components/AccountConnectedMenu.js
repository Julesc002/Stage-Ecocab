import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountConnectedMenu = () => {

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        localStorage.removeItem('user');
        // Recharger la page
        window.location.reload();
    }

    return (
        <div className='accountMenu'>
            <h1 className='accountMenu_mainTitle'> Mon compte </h1>
            <NavLink to="/Profil" className='accountMenu_infoBtnContainer'>
                <button className='accountMenu_infoBtnContainer_infoBtn'> Profil </button>
            </NavLink>
            <NavLink to='/MesTrajets' className='accountMenu_infoBtnContainer'>
                <button className='accountMenu_infoBtnContainer_infoBtn'> Mes trajets </button>
            </NavLink>
            <NavLink to='/Messages' className='accountMenu_infoBtnContainer'>
                <button className='accountMenu_infoBtnContainer_infoBtn'> Messages </button>
            </NavLink>
            <NavLink to='/HistoriqueDesPaiements' className='accountMenu_infoBtnContainer'>
                <button className='accountMenu_infoBtnContainer_infoBtn'> Historique des paiements </button>
            </NavLink>
            <button className='accountMenu_logout' onClick={handleLogout}> Se déconnecter </button>
        </div>
    );
};

export default AccountConnectedMenu;